import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { EffectComposer, Bloom, FXAA, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { BuildingModel } from './BuildingModel';
import { SiteEnvironmentScene } from './SiteEnvironmentScene';
import { RealisticGrassField } from './RealisticGrassField';
import { RealisticMasterplanLandscaping } from './RealisticFoliage';
import { BuildingA02EquipmentMeshes } from './BuildingA02EquipmentMeshes';
import { UltraDynamicSky } from './UltraDynamicSky';
import { FloorCameraTransition } from './FloorCameraTransition';
import { useBuildingStore } from '../../store/buildingStore';

// Tracking camera position and azimuth for HUD compass
const CameraTracker: React.FC = () => {
  const { camera } = useThree();
  const setCameraAzimuth = useBuildingStore((s) => s.setCameraAzimuth);
  const updatePerformance = useBuildingStore((s) => s.updatePerformance);

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useFrame(({ gl }) => {
    // 1. Azimuth angle computation
    const camPos = camera.position;
    const rad = Math.atan2(camPos.x, camPos.z);
    let deg = Math.round((rad * 180) / Math.PI);
    if (deg < 0) deg += 360;
    
    // Distance from center
    const dist = Math.round(camPos.length());
    setCameraAzimuth(deg, Math.round(camPos.y), dist);

    // 2. FPS & Render Telemetry Calculation every 30 frames
    frameCount.current++;
    const now = performance.now();
    if (now - lastTime.current >= 500) {
      const fps = (frameCount.current * 1000) / (now - lastTime.current);
      const drawCalls = gl.info.render.calls;
      const triangles = gl.info.render.triangles;
      updatePerformance(fps, drawCalls, triangles);
      frameCount.current = 0;
      lastTime.current = now;
    }
  });

  return null;
};

// Ground plane with cybernetic grid
const SpatialEnvironment: React.FC = () => {
  return (
    <group position={[0, -2.85, 0]}>
      {/* Sci-fi architectural ground grid */}
      <gridHelper args={[120, 60, '#22d3ee', '#1e293b']} position={[0, 0.01, 0]} />
      {/* Outer faint boundary grid */}
      <gridHelper args={[240, 40, '#0369a1', '#091e3a']} position={[0, 0, 0]} />

      {/* Dark reflective circular pedestal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.05, 0]}>
        <circleGeometry args={[45, 64]} />
        <meshStandardMaterial
          color="#070e1c"
          roughness={0.7}
          metalness={0.8}
        />
      </mesh>

      {/* Coordinate axes indicator rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[20, 20.15, 64]} />
        <meshBasicMaterial color="#0284c7" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[35, 35.15, 64]} />
        <meshBasicMaterial color="#0369a1" transparent opacity={0.25} />
      </mesh>
    </group>
  );
};

export const BuildingCanvas: React.FC = () => {
  const cameraControlsRef = useRef<CameraControls>(null);
  const environmentMode = useBuildingStore((s) => s.environmentMode);

  // Allow zoom in / out triggers from external store/buttons
  useEffect(() => {
    // Initial camera position matching CAM-TOP masterplan angle
    if (cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(12, 75, 120, 0, 6, -2, false);
    }
  }, []);

  const isDay = environmentMode === 'cairo_day';
  const isSunset = environmentMode === 'cairo_sunset';

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-[#070b14]">
      <Canvas
        camera={{ position: [12, 75, 120], fov: 45, near: 0.1, far: 800 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isDay ? 1.25 : isSunset ? 1.15 : 1.1
        }}
        shadows
      >
        <color
          attach="background"
          args={[isDay ? '#0c1a2e' : isSunset ? '#1a101f' : '#070b14']}
        />
        <fogExp2
          attach="fog"
          args={[isDay ? '#0c1a2e' : isSunset ? '#1a101f' : '#070b14', 0.005]}
        />

        {/* Dynamic Lighting Setup */}
        <ambientLight
          color={isDay ? '#94a3b8' : isSunset ? '#fdba74' : '#0f172a'}
          intensity={isDay ? 1.4 : isSunset ? 1.1 : 0.85}
        />
        
        {/* Hemisphere Sky / Ground ambient */}
        <hemisphereLight
          color={isDay ? '#38bdf8' : isSunset ? '#fb923c' : '#38bdf8'}
          groundColor={isDay ? '#334155' : isSunset ? '#291823' : '#070b14'}
          intensity={isDay ? 0.9 : 0.65}
        />

        {/* Ultra Dynamic Atmospheric Sky (Physical Sky Dome, Sun Path, Clouds, Twinkling Stars) */}
        <UltraDynamicSky />

        {/* Cyan Rim & Silhouette Fill */}
        <directionalLight
          position={[-30, 20, -25]}
          intensity={isSunset ? 0.4 : 0.7}
          color={isSunset ? '#f97316' : '#22d3ee'}
        />

        {/* Spatial Grid & Floor Base */}
        <SpatialEnvironment />

        {/* Real-World South 90th St Environment Scene */}
        <SiteEnvironmentScene />

        {/* Photorealistic Blade-based Grassworks Field & Wind Simulation */}
        <RealisticGrassField />

        {/* High-Poly Date Palms, Cypress Trees & Bougainvillea Shrubbery */}
        <RealisticMasterplanLandscaping />

        {/* Building Model (GLB or Procedural Twin) */}
        <BuildingModel />

        {/* Building A02 Real-world BMS Equipment Meshes & 3D Telemetry Indicators */}
        <BuildingA02EquipmentMeshes />

        {/* Camera Tracking Telemetry */}
        <CameraTracker />

        {/* Smooth Floor Camera Spring Transition (@react-spring/three) */}
        <FloorCameraTransition controlsRef={cameraControlsRef} />

        {/* Global Post-Processing Pipeline (Bloom, FXAA & Vignette) */}
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom
            intensity={1.25}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.35}
            mipmapBlur
          />
          <FXAA />
          <Vignette eskil={false} offset={0.15} darkness={0.65} />
        </EffectComposer>

        {/* Drei CameraControls */}
        <CameraControls
          ref={cameraControlsRef}
          makeDefault
          dollySpeed={0.8}
          truckSpeed={0.8}
          minDistance={10}
          maxDistance={280}
          maxPolarAngle={Math.PI / 2 + 0.05} // Keep slightly above horizon
        />
      </Canvas>
    </div>
  );
};
