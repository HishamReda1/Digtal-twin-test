import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Sky, Stars } from '@react-three/drei';
import { useBuildingStore } from '../../store/buildingStore';

// Atmospheric Cloud layer with gentle wind drift
const DynamicCloudLayer: React.FC<{ opacity: number }> = ({ opacity }) => {
  const cloudsRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.008;
    }
  });

  if (opacity <= 0.02) return null;

  return (
    <group ref={cloudsRef} position={[0, 45, 0]}>
      {/* Upper Atmospheric Cloud Puffs */}
      {[-40, -15, 20, 50].map((x, i) =>
        [-30, 10, 45].map((z, j) => (
          <mesh
            key={`cloud-${i}-${j}`}
            position={[x + ((i * 7) % 11), ((i + j) % 3) * 2, z + ((j * 13) % 9)]}
            rotation={[-Math.PI / 2, 0, (i + j) * 0.5]}
          >
            <planeGeometry args={[28 + (i % 3) * 6, 16 + (j % 2) * 5]} />
            <meshBasicMaterial
              color="#e2e8f0"
              transparent
              opacity={opacity * 0.22}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))
      )}
    </group>
  );
};

export const UltraDynamicSky: React.FC = () => {
  const skyTime = useBuildingStore((s) => s.skyTime);
  const isSkyAutoPlaying = useBuildingStore((s) => s.isSkyAutoPlaying);
  const skySpeed = useBuildingStore((s) => s.skySpeed);
  const setSkyTime = useBuildingStore((s) => s.setSkyTime);

  // Time-lapse frame advancement
  useFrame((_, delta) => {
    if (isSkyAutoPlaying) {
      let nextTime = skyTime + delta * skySpeed;
      if (nextTime >= 24) nextTime = 0;
      setSkyTime(nextTime);
    }
  });

  // Calculate Sun and Celestial Spherical Coordinates for Cairo (Lat ~30.02° N)
  const {
    sunPosition,
    moonPosition,
    sunIntensity,
    moonIntensity,
    sunColor,
    skyTurbidity,
    skyRayleigh,
    starsOpacity,
    cloudOpacity
  } = useMemo(() => {
    // Fraction of 24-hour cycle: 0 at midnight, 0.5 at 12:00 noon
    const dayProgress = (skyTime / 24) * 2 * Math.PI - Math.PI / 2;

    // Solar Elevation Angle (-90 to +90)
    // Noon (skyTime=12): sin(pi/2) = 1.0 (high sun)
    // Sunset (skyTime=18): sin(pi) = 0.0 (horizon)
    // Midnight (skyTime=0): sin(3pi/2) = -1.0 (opposite)
    const elevation = Math.sin(dayProgress);
    const azimuth = Math.cos(dayProgress);

    const radius = 100;
    const sunY = elevation * radius;
    const sunX = azimuth * radius * 0.9;
    const sunZ = -azimuth * radius * 0.4;

    const sunPos: [number, number, number] = [sunX, sunY, sunZ];
    const moonPos: [number, number, number] = [-sunX, -sunY * 0.8 + 20, -sunZ];

    const isDay = elevation > 0.05;
    const isSunset = Math.abs(elevation) <= 0.15;
    const isNight = elevation < -0.05;

    // Light Intensity calculation
    const sunInt = Math.max(0, elevation) * 2.2;
    const moonInt = isNight ? Math.min(0.6, Math.abs(elevation) * 0.5) : 0;

    // Sun Color Shift (White at noon -> Golden/Amber at sunset -> Dim Orange)
    let sColor = '#ffffff';
    if (elevation < 0.25 && elevation > 0) {
      // Golden Hour
      sColor = '#fb923c';
    } else if (elevation <= 0) {
      sColor = '#ea580c';
    }

    // Sky Scattering Parameters
    const turbidity = isSunset ? 10 : isDay ? 2.5 : 1.0;
    const rayleigh = isSunset ? 4.5 : isDay ? 0.6 : 0.05;
    const sOpacity = Math.max(0, -elevation * 1.4);
    const cOpacity = isDay ? 0.9 : isSunset ? 0.75 : 0.3;

    return {
      sunPosition: sunPos,
      moonPosition: moonPos,
      sunIntensity: sunInt,
      moonIntensity: moonInt,
      sunColor: sColor,
      skyTurbidity: turbidity,
      skyRayleigh: rayleigh,
      starsOpacity: Math.min(1, sOpacity),
      cloudOpacity: cOpacity
    };
  }, [skyTime]);

  return (
    <group name="UltraDynamicSkySystem">
      {/* 1. Preetham / Hosek-Wilkie Physical Sky Dome */}
      <Sky
        distance={450}
        sunPosition={sunPosition}
        turbidity={skyTurbidity}
        rayleigh={skyRayleigh}
        mieCoefficient={0.005}
        mieDirectionalG={0.82}
      />

      {/* 2. Twinkling Desert Night Stars (Fades out when sun rises) */}
      {starsOpacity > 0.05 && (
        <group>
          <Stars
            radius={140}
            depth={60}
            count={2800}
            factor={4}
            saturation={0.4}
            fade
            speed={1.2}
          />
        </group>
      )}

      {/* 3. Volumetric Drifting Clouds Layer */}
      <DynamicCloudLayer opacity={cloudOpacity} />

      {/* 4. Real-time Sun Directional Shadow-Casting Light */}
      {sunIntensity > 0.01 && (
        <directionalLight
          position={sunPosition}
          intensity={sunIntensity}
          color={sunColor}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
          shadow-camera-near={10}
          shadow-camera-far={160}
          shadow-camera-left={-45}
          shadow-camera-right={45}
          shadow-camera-top={45}
          shadow-camera-bottom={-45}
        />
      )}

      {/* 5. Celestial Moonlight when sun is below horizon */}
      {moonIntensity > 0.01 && (
        <directionalLight
          position={moonPosition}
          intensity={moonIntensity}
          color="#38bdf8"
          castShadow={false}
        />
      )}
    </group>
  );
};
