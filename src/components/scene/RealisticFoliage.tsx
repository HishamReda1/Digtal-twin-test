import React, { useMemo } from 'react';
import * as THREE from 'three';

// 1. High-Poly Date Palm (Phoenix Dactylifera) with realistic drooping leaflets
export const HighPolyDatePalm: React.FC<{
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
}> = ({ position, scale = 1.0, rotationY = 0 }) => {
  const trunkSegments = 10;
  const frondCount = 16;

  // Trunk geometry with curved organic profile
  const { trunkGeom, frondCurves } = useMemo(() => {
    // Generate curved trunk path
    const points: THREE.Vector3[] = [];
    const height = 9.5;
    for (let i = 0; i <= trunkSegments; i++) {
      const t = i / trunkSegments;
      const y = t * height;
      const x = Math.sin(t * Math.PI * 0.6) * 0.45;
      const z = Math.cos(t * Math.PI * 0.4) * 0.25;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const geom = new THREE.TubeGeometry(curve, 18, 0.42, 10, false);

    // Generate frond leaf arcs
    const fronds: { curve: THREE.CatmullRomCurve3; angle: number; droop: number }[] = [];
    for (let i = 0; i < frondCount; i++) {
      const angle = (i / frondCount) * Math.PI * 2;
      const droop = 0.7 + (i % 3) * 0.25;
      const fPoints: THREE.Vector3[] = [
        new THREE.Vector3(0, height, 0),
        new THREE.Vector3(
          Math.cos(angle) * 2.2,
          height + 1.2 - droop * 0.3,
          Math.sin(angle) * 2.2
        ),
        new THREE.Vector3(
          Math.cos(angle) * 4.6,
          height - 0.8 - droop * 1.2,
          Math.sin(angle) * 4.6
        ),
        new THREE.Vector3(
          Math.cos(angle) * 6.2,
          height - 2.8 - droop * 2.0,
          Math.sin(angle) * 6.2
        )
      ];
      fronds.push({
        curve: new THREE.CatmullRomCurve3(fPoints),
        angle,
        droop
      });
    }

    return { trunkGeom: geom, frondCurves: fronds };
  }, [trunkSegments, frondCount]);

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* Fibrous Bark Trunk */}
      <mesh geometry={trunkGeom} castShadow receiveShadow>
        <meshStandardMaterial
          color="#523d2b"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Trunk Base Ring Flare */}
      <mesh position={[0, 0.4, 0]} receiveShadow>
        <cylinderGeometry args={[0.55, 0.75, 0.8, 12]} />
        <meshStandardMaterial color="#423122" roughness={0.95} />
      </mesh>

      {/* Frond Foliage Ribs & Leaf Blades */}
      {frondCurves.map((frond, idx) => {
        return (
          <group key={`frond-${idx}`}>
            {/* Frond Central Spine (Rachis) */}
            <mesh>
              <tubeGeometry args={[frond.curve, 14, 0.045, 6, false]} />
              <meshStandardMaterial color="#65a30d" roughness={0.4} />
            </mesh>
            {/* Feathery Leaflet Fan Ribbons */}
            {Array.from({ length: 9 }).map((_, li) => {
              const t = 0.25 + (li / 9) * 0.7;
              const pt = frond.curve.getPoint(t);
              const leafletAngle = frond.angle + (li % 2 === 0 ? 0.35 : -0.35);
              return (
                <mesh
                  key={`leaf-${li}`}
                  position={[pt.x, pt.y, pt.z]}
                  rotation={[0.3, leafletAngle, -0.4]}
                >
                  <planeGeometry args={[1.2, 0.22]} />
                  <meshStandardMaterial
                    color="#4d7c0f"
                    roughness={0.35}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              );
            })}
          </group>
        );
      })}

      {/* Crown Date Clusters */}
      <mesh position={[0, 9.2, 0]} castShadow>
        <sphereGeometry args={[0.85, 12, 10]} />
        <meshStandardMaterial color="#b45309" roughness={0.8} />
      </mesh>
    </group>
  );
};

// 2. High-Poly Magenta Bougainvillea Flowering Shrub
export const BougainvilleaBush: React.FC<{
  position: [number, number, number];
  scale?: number;
}> = ({ position, scale = 1.0 }) => {
  return (
    <group position={position} scale={scale}>
      {/* Green foliage base mound */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <dodecahedronGeometry args={[1.1, 2]} />
        <meshStandardMaterial color="#166534" roughness={0.65} />
      </mesh>
      {/* Vibrant Magenta/Purple Flower Clusters */}
      {[-0.6, 0.0, 0.6].map((ox, xi) =>
        [-0.5, 0.5].map((oz, zi) => (
          <mesh
            key={`blossom-${xi}-${zi}`}
            position={[ox + (zi - 0.5) * 0.2, 0.9 + xi * 0.15, oz]}
            castShadow
          >
            <dodecahedronGeometry args={[0.42, 1]} />
            <meshStandardMaterial
              color="#e11d48" // Rich Cairo Bougainvillea Pink/Rose
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
        ))
      )}
    </group>
  );
};

// 3. High-Poly Mediterranean Italian Cypress (Columnar evergreen)
export const ItalianCypress: React.FC<{
  position: [number, number, number];
  scale?: number;
}> = ({ position, scale = 1.0 }) => {
  return (
    <group position={position} scale={scale}>
      {/* Slender trunk */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.18, 2.4, 8]} />
        <meshStandardMaterial color="#3b2b1e" roughness={0.9} />
      </mesh>
      {/* Tiered Flame-like Foliage */}
      {[
        { y: 3.5, r: 0.85, h: 4.8 },
        { y: 6.8, r: 0.65, h: 4.2 },
        { y: 9.4, r: 0.35, h: 3.2 }
      ].map((tier, ti) => (
        <mesh key={`tier-${ti}`} position={[0, tier.y, 0]} castShadow>
          <coneGeometry args={[tier.r, tier.h, 10]} />
          <meshStandardMaterial
            color="#14532d" // Deep forest cypress green
            roughness={0.5}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
};

// 4. Master Landscaping Arrangement across Golden Gate Site
export const RealisticMasterplanLandscaping: React.FC = () => {
  return (
    <group name="HighPolyLandscapingScene">
      {/* ========================================================= */}
      {/* 1. SOUTH 90TH STREET MEDIAN HIGH-POLY PALMS               */}
      {/* ========================================================= */}
      {[-130, -105, -80, -55, -30, -5, 20, 45, 70, 95, 120].map((x, i) => (
        <HighPolyDatePalm
          key={`med-palm-hp-${x}`}
          position={[x, -2.65, 36.0]}
          scale={0.95}
          rotationY={(i * Math.PI) / 5}
        />
      ))}

      {/* ========================================================= */}
      {/* 2. BOUGAINVILLEA FLOWER BEDS ALONG HIGHWAY VERGE          */}
      {/* ========================================================= */}
      {[-120, -90, -60, -30, 0, 30, 60, 90, 120].map((x) => (
        <group key={`flower-group-${x}`}>
          <BougainvilleaBush position={[x - 3, -2.65, 23.0]} scale={0.9} />
          <BougainvilleaBush position={[x + 3, -2.65, 23.2]} scale={0.8} />
        </group>
      ))}

      {/* ========================================================= */}
      {/* 3. CENTRAL GOLDEN RING PLAZA PALM GROVES & CYPRESSES       */}
      {/* ========================================================= */}
      {/* Majestic Palms framing the Golden Ring */}
      {[-18, -12, 12, 18].map((px, pi) => (
        <HighPolyDatePalm
          key={`ring-palm-${pi}`}
          position={[px, 0.05, -2 + (pi % 2 === 0 ? 7 : -7)]}
          scale={1.05}
          rotationY={(pi * Math.PI) / 3}
        />
      ))}

      {/* Cypress Avenue lining plaza entry */}
      {[-24, 24].map((cx) =>
        [-8, 0, 8].map((cz, ci) => (
          <ItalianCypress
            key={`cyp-${cx}-${ci}`}
            position={[cx, 0.05, cz]}
            scale={0.85}
          />
        ))
      )}

      {/* ========================================================= */}
      {/* 4. COURTYARD GARDENS BETWEEN BUILDINGS                    */}
      {/* ========================================================= */}
      {/* West Courtyard (A03 / A04 / A05) */}
      <HighPolyDatePalm position={[-100, 0.05, 0]} scale={0.9} rotationY={0.8} />
      <BougainvilleaBush position={[-100, 0.05, -2.5]} scale={1.0} />

      {/* Tech Courtyard (A07 / A08 / A09) */}
      <HighPolyDatePalm position={[-60, 0.05, 0]} scale={0.9} rotationY={1.4} />
      <ItalianCypress position={[-58, 0.05, -2]} scale={0.8} />

      {/* East Corporate Pods (A22 / A23) */}
      <HighPolyDatePalm position={[108, 0.05, 0]} scale={0.9} rotationY={2.2} />
      <BougainvilleaBush position={[108, 0.05, 2]} scale={1.1} />
    </group>
  );
};
