import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useBuildingStore } from '../../store/buildingStore';

// High-Poly Curved Blade Geometry (Tapered 7-vertex ribbon)
function createGrassBladeGeometry(): THREE.BufferGeometry {
  const geom = new THREE.BufferGeometry();
  
  // Height = 1.0, Width at base = 0.12, tapering to tip at 0.0
  const positions: number[] = [
    // Level 0 (Base)
    -0.06, 0.0, 0.0,
     0.06, 0.0, 0.0,
    // Level 1 (Mid-lower, slight curve)
    -0.045, 0.32, 0.02,
     0.045, 0.32, 0.02,
    // Level 2 (Mid-upper, more curve)
    -0.028, 0.65, 0.06,
     0.028, 0.65, 0.06,
    // Level 3 (Tip)
     0.0,   1.0,  0.12
  ];

  const indices: number[] = [
    0, 1, 2,  1, 3, 2, // Quad 1
    2, 3, 4,  3, 5, 4, // Quad 2
    4, 5, 6            // Tip Triangle
  ];

  const uvs: number[] = [
    0.0, 0.0,
    1.0, 0.0,
    0.1, 0.32,
    0.9, 0.32,
    0.25, 0.65,
    0.75, 0.65,
    0.5, 1.0
  ];

  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();

  return geom;
}

// Shader Material replicating Grassworks procedural wind & subsurface color gradient
const GrassShaderMaterial = {
  vertexShader: `
    uniform float uTime;
    uniform float uWindSpeed;
    uniform float uWindStrength;
    
    attribute vec3 aInstancePosition;
    attribute vec4 aInstanceRotationScale; // [rotY, scaleX, scaleY, scaleZ]
    attribute float aWindPhase;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying float vHeightPercent;

    void main() {
      vUv = uv;
      vNormal = normal;
      vHeightPercent = position.y;

      // Unpack rotation and scale
      float rotY = aInstanceRotationScale.x;
      vec3 scale = aInstanceRotationScale.yzw;

      // Scale blade
      vec3 scaledPos = position * scale;

      // Rotate around Y
      float cosY = cos(rotY);
      float sinY = sin(rotY);
      mat3 rotMat = mat3(
        cosY, 0.0, sinY,
        0.0,  1.0, 0.0,
        -sinY, 0.0, cosY
      );
      vec3 rotatedPos = rotMat * scaledPos;

      // Calculate World Position for global wind wave
      vec3 baseWorldPos = aInstancePosition;
      
      // Wind wave calculation: multi-frequency sine wave across X and Z
      float wave = sin(uTime * uWindSpeed + baseWorldPos.x * 0.12 + baseWorldPos.z * 0.18 + aWindPhase);
      float wave2 = cos(uTime * (uWindSpeed * 0.75) + baseWorldPos.x * 0.25 - baseWorldPos.z * 0.1);
      float combinedWind = (wave * 0.7 + wave2 * 0.3) * uWindStrength;

      // Quadratic displacement: base stays anchored at y=0, tips sway dramatically
      float sway = pow(vHeightPercent, 1.8) * combinedWind;
      
      // Directional breeze (+X slightly tilted to +Z)
      rotatedPos.x += sway * 0.85;
      rotatedPos.z += sway * 0.35;
      // Slight vertical drop when bent
      rotatedPos.y -= abs(sway) * 0.15;

      vec3 finalWorldPos = baseWorldPos + rotatedPos;
      vWorldPos = finalWorldPos;

      gl_Position = projectionMatrix * viewMatrix * vec4(finalWorldPos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColorRoot;
    uniform vec3 uColorMid;
    uniform vec3 uColorTip;
    uniform vec3 uSunDirection;
    uniform float uSunIntensity;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying float vHeightPercent;

    void main() {
      // 3-stop Color Gradient (Root -> Mid -> Sunlit Tip)
      vec3 color;
      if (vHeightPercent < 0.45) {
        color = mix(uColorRoot, uColorMid, vHeightPercent / 0.45);
      } else {
        color = mix(uColorMid, uColorTip, (vHeightPercent - 0.45) / 0.55);
      }

      // Simple Subsurface Scattering & Diffuse Lighting
      vec3 lightDir = normalize(uSunDirection);
      float NdotL = max(dot(vNormal, lightDir), 0.0);
      // Soft ambient wrap light for translucent foliage look
      float wrapLight = (NdotL + 0.35) / 1.35;

      // Tip translucency boost
      float tipGlow = pow(vHeightPercent, 2.0) * 0.35;

      vec3 finalColor = color * (wrapLight * uSunIntensity + tipGlow + 0.2);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

interface GrassZone {
  bounds: [number, number, number, number]; // [minX, maxX, minZ, maxZ]
  elevation: number;
  count: number;
  scaleRange: [number, number];
}

export const RealisticGrassField: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const environmentMode = useBuildingStore((s) => s.environmentMode);

  const isDay = environmentMode === 'cairo_day';
  const isSunset = environmentMode === 'cairo_sunset';

  // Define high-density grass zones matching Golden Gate masterplan CAM-TOP layout
  const zones: GrassZone[] = useMemo(() => [
    // 1. South 90th Street Central Median Strip (Dense green parkway)
    {
      bounds: [-145, 145, 34.5, 37.5],
      elevation: -2.65,
      count: 2400,
      scaleRange: [0.7, 1.1]
    },
    // 2. South 90th Street Frontage Boulevard Verges (South edge of retail walkway)
    {
      bounds: [-130, 130, 21.0, 24.5],
      elevation: -2.68,
      count: 2200,
      scaleRange: [0.65, 1.0]
    },
    // 3. Central Promenade & Pedestrian Park Spine (Between building rows)
    {
      bounds: [-125, 125, -5.0, 0.0],
      elevation: 0.05,
      count: 2600,
      scaleRange: [0.6, 0.95]
    },
    // 4. Central Golden Ring Plaza Gardens (Surrounding the Fountain)
    {
      bounds: [-22, 22, -9.0, 5.0],
      elevation: 0.1,
      count: 1400,
      scaleRange: [0.75, 1.15]
    },
    // 5. West-Central Pocket Parks (Between A06/A07 and A08/A10)
    {
      bounds: [-78, -58, -5.0, 0.5],
      elevation: 0.08,
      count: 900,
      scaleRange: [0.7, 1.05]
    },
    // 6. East-Central Pocket Parks (Flanking A21 Anchor Mall)
    {
      bounds: [55, 62, -18.0, 10.0],
      elevation: 0.08,
      count: 1100,
      scaleRange: [0.7, 1.05]
    }
  ], []);

  const totalGrassCount = useMemo(() => {
    return zones.reduce((sum, z) => sum + z.count, 0);
  }, [zones]);

  const bladeGeometry = useMemo(() => createGrassBladeGeometry(), []);

  // Custom Instanced Attributes
  const { instancePositions, instanceRotScales, instanceWindPhases } = useMemo(() => {
    const pos = new Float32Array(totalGrassCount * 3);
    const rotScales = new Float32Array(totalGrassCount * 4);
    const phases = new Float32Array(totalGrassCount);

    let idx = 0;
    zones.forEach((zone) => {
      const [minX, maxX, minZ, maxZ] = zone.bounds;
      const widthX = maxX - minX;
      const depthZ = maxZ - minZ;

      for (let i = 0; i < zone.count; i++) {
        // Scatter within zone
        const x = minX + Math.random() * widthX;
        const z = minZ + Math.random() * depthZ;
        const y = zone.elevation;

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;

        // Random rotation around Y (0 to 2*PI)
        const rotY = Math.random() * Math.PI * 2;
        // Random scale (height & width jitter)
        const scaleY = zone.scaleRange[0] + Math.random() * (zone.scaleRange[1] - zone.scaleRange[0]);
        const scaleX = 0.8 + Math.random() * 0.4;
        const scaleZ = scaleX;

        rotScales[idx * 4] = rotY;
        rotScales[idx * 4 + 1] = scaleX;
        rotScales[idx * 4 + 2] = scaleY;
        rotScales[idx * 4 + 3] = scaleZ;

        // Random wind phase offset
        phases[idx] = Math.random() * Math.PI * 2;

        idx++;
      }
    });

    return {
      instancePositions: pos,
      instanceRotScales: rotScales,
      instanceWindPhases: phases
    };
  }, [zones, totalGrassCount]);

  // Shader Uniforms
  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uWindSpeed: { value: 2.2 },
      uWindStrength: { value: 0.42 },
      uColorRoot: {
        value: new THREE.Color(isSunset ? '#1a2b16' : '#142912') // Rich humus dark root
      },
      uColorMid: {
        value: new THREE.Color(isSunset ? '#4d7c2a' : '#3f7823') // Vibrant emerald blade
      },
      uColorTip: {
        value: new THREE.Color(isSunset ? '#eab308' : '#84cc16') // Sunlit Cairo golden tip
      },
      uSunDirection: {
        value: new THREE.Vector3(45, 60, 30).normalize()
      },
      uSunIntensity: {
        value: isDay ? 1.3 : isSunset ? 1.0 : 0.45
      }
    };
  }, [isDay, isSunset]);

  const customMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: GrassShaderMaterial.vertexShader,
      fragmentShader: GrassShaderMaterial.fragmentShader,
      uniforms,
      side: THREE.DoubleSide
    });
  }, [uniforms]);

  // Animate procedural wind in real time
  useFrame((state) => {
    if (customMaterial) {
      customMaterial.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[bladeGeometry, customMaterial, totalGrassCount]}
      frustumCulled={false}
      castShadow
      receiveShadow
    >
      <instancedBufferAttribute
        attach="geometry-attributes-aInstancePosition"
        args={[instancePositions, 3]}
      />
      <instancedBufferAttribute
        attach="geometry-attributes-aInstanceRotationScale"
        args={[instanceRotScales, 4]}
      />
      <instancedBufferAttribute
        attach="geometry-attributes-aWindPhase"
        args={[instanceWindPhases, 1]}
      />
    </instancedMesh>
  );
};
