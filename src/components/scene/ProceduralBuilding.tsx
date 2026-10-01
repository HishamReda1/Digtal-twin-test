import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { BUILDINGS_CONFIG, BuildingId, BuildingMeta, FLOOR_CONFIGS, FloorId } from '../../types/building';
import { useBuildingStore } from '../../store/buildingStore';

interface BuildingUnitProps {
  meta: BuildingMeta;
  isActive: boolean;
  isHovered: boolean;
  activeFloor: FloorId | null;
  hoveredFloor: FloorId | null;
  onSelect: (id: BuildingId) => void;
  onHover: (id: BuildingId | null) => void;
  onFloorSelect: (flId: FloorId | null) => void;
  onFloorHover: (flId: FloorId | null) => void;
  stoneMat: THREE.Material;
  slabMat: THREE.Material;
  glassMat: THREE.Material;
  glassLitMat: THREE.Material;
  glassHoverMat: THREE.Material;
  frameMat: THREE.Material;
  woodMat: THREE.Material;
  activeOutlineMat: THREE.Material;
  hoverOutlineMat: THREE.Material;
}

const BuildingUnit: React.FC<BuildingUnitProps> = ({
  meta,
  isActive,
  isHovered,
  activeFloor,
  hoveredFloor,
  onSelect,
  onHover,
  onFloorSelect,
  onFloorHover,
  stoneMat,
  slabMat,
  glassMat,
  glassLitMat,
  glassHoverMat,
  frameMat,
  woodMat,
  activeOutlineMat,
  hoverOutlineMat
}) => {
  const { id, name, type, position, size, hasPool, hasPergola, hasSolarPV, hasCanopy, occupancy } = meta;
  const [width, totalHeight, depth] = size;
  const floorHeight = totalHeight / 4;

  const floorKeys: FloorId[] = ['GF', '1F', '2F', '3F'];

  return (
    <group
      name={`Building_${id}`}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(id);
      }}
      onPointerOut={() => {
        onHover(null);
        onFloorHover(null);
      }}
    >
      {/* 1. Multi-level Floors & Architectural Envelope */}
      {floorKeys.map((flId, flIdx) => {
        const yElevation = flIdx * floorHeight;
        const isFloorActive = isActive && activeFloor === flId;
        const isFloorHovered = isActive && hoveredFloor === flId;
        const flWidth = flIdx === 3 ? width * 0.88 : width; // Stepped upper terrace
        const flDepth = flIdx === 3 ? depth * 0.88 : depth;

        return (
          <group
            key={flId}
            position={[0, yElevation, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHover(id);
              if (isActive) {
                onFloorHover(flId);
              } else {
                onFloorHover(null);
              }
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              if (isActive) {
                onFloorHover(null);
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (!isActive) {
                // First click: select building and focus camera
                onSelect(id);
                onFloorSelect(null);
              } else {
                // When already inside building: select/toggle floor
                onFloorSelect(isFloorActive ? null : flId);
              }
            }}
          >
            {/* Floor Base Slab */}
            <mesh position={[0, 0.12, 0]} castShadow receiveShadow material={slabMat}>
              <boxGeometry args={[flWidth + 0.35, 0.24, flDepth + 0.35]} />
            </mesh>

            {/* Glass Facade with Multi-tier Lighting */}
            <mesh
              position={[0, floorHeight / 2, 0]}
              castShadow
              material={
                isFloorActive
                  ? glassLitMat
                  : isFloorHovered
                  ? glassHoverMat
                  : isHovered
                  ? glassLitMat
                  : glassMat
              }
            >
              <boxGeometry args={[flWidth, floorHeight - 0.2, flDepth]} />
            </mesh>

            {/* Corner Travertine Sandstone Piers */}
            {[-flWidth / 2, flWidth / 2].map((x, xi) =>
              [-flDepth / 2, flDepth / 2].map((z, zi) => (
                <mesh
                  key={`pier-${xi}-${zi}`}
                  position={[x, floorHeight / 2, z]}
                  castShadow
                  material={stoneMat}
                >
                  <boxGeometry args={[0.7, floorHeight - 0.1, 0.7]} />
                </mesh>
              ))
            )}

            {/* Facade Vertical Bronze Mullions */}
            {Array.from({ length: Math.floor(flWidth / 3.2) }).map((_, i) => {
              const mx = -flWidth / 2 + 1.6 + i * 3.2;
              return (
                <mesh
                  key={`mul-${i}`}
                  position={[mx, floorHeight / 2, flDepth / 2 + 0.04]}
                  material={frameMat}
                >
                  <boxGeometry args={[0.08, floorHeight - 0.2, 0.15]} />
                </mesh>
              );
            })}

            {/* Floor Ceiling Slab Band */}
            <mesh
              position={[0, floorHeight - 0.12, 0]}
              castShadow
              receiveShadow
              material={slabMat}
            >
              <boxGeometry args={[flWidth + 0.35, 0.24, flDepth + 0.35]} />
            </mesh>

            {/* Active Floor Glowing Contour Frame */}
            {isFloorActive && (
              <mesh position={[0, floorHeight / 2, 0]}>
                <boxGeometry args={[flWidth + 0.5, floorHeight + 0.1, flDepth + 0.5]} />
                <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.85} />
              </mesh>
            )}

            {/* Hovered Floor Glowing Cyan Edge Halo */}
            {isFloorHovered && !isFloorActive && (
              <mesh position={[0, floorHeight / 2, 0]}>
                <boxGeometry args={[flWidth + 0.4, floorHeight + 0.08, flDepth + 0.4]} />
                <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.7} />
              </mesh>
            )}

            {/* 3D Callout Tooltip next to Hovered Floor */}
            {isFloorHovered && (
              <Html position={[flWidth / 2 + 1.2, floorHeight / 2, 0]} center distanceFactor={55}>
                <div className="px-2.5 py-1 rounded-md bg-[#070e1c]/95 border border-cyan-400 text-[10px] font-mono font-bold text-cyan-300 shadow-[0_0_15px_#22d3ee] whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-100 flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>
                    {id} • {flId} {FLOOR_CONFIGS[flId]?.name || ''}
                  </span>
                </div>
              </Html>
            )}

            {/* Ground Level Outdoor Dining Terrace (GF only) */}
            {flIdx === 0 && (
              <group position={[0, 0, flDepth / 2 + 1.1]}>
                <mesh position={[0, 0.05, 0.8]} receiveShadow material={woodMat}>
                  <boxGeometry args={[flWidth * 0.9, 0.1, 1.8]} />
                </mesh>
                {/* Dining Parasols */}
                {[-flWidth * 0.28, flWidth * 0.28].map((tx, ti) => (
                  <group key={`para-${ti}`} position={[tx, 0.1, 0.8]}>
                    <mesh position={[0, 1.3, 0]}>
                      <coneGeometry args={[0.7, 0.25, 8]} />
                      <meshStandardMaterial color="#fef3c7" roughness={0.6} />
                    </mesh>
                    <mesh position={[0, 0.65, 0]} material={frameMat}>
                      <cylinderGeometry args={[0.02, 0.02, 1.3, 8]} />
                    </mesh>
                  </group>
                ))}
              </group>
            )}

            {/* Stepped Balcony Railing on Level 3 */}
            {flIdx === 3 && (
              <group position={[0, 0.5, flDepth / 2 + 0.5]}>
                <mesh material={glassMat}>
                  <boxGeometry args={[flWidth, 0.8, 0.05]} />
                </mesh>
                <mesh position={[0, 0.42, 0]} material={frameMat}>
                  <boxGeometry args={[flWidth, 0.06, 0.08]} />
                </mesh>
              </group>
            )}
          </group>
        );
      })}

      {/* 2. Rooftop Architectural Features */}
      <group position={[0, totalHeight, 0]}>
        {/* Roof Parapet Slab */}
        <mesh position={[0, 0.1, 0]} material={slabMat}>
          <boxGeometry args={[width * 0.86, 0.2, depth * 0.86]} />
        </mesh>

        {/* Timber Roof Deck */}
        <mesh position={[0, 0.22, 0]} material={woodMat}>
          <boxGeometry args={[width * 0.78, 0.06, depth * 0.78]} />
        </mesh>

        {/* Rooftop Pergola Feature */}
        {hasPergola && (
          <group position={[-width * 0.15, 0.22, -depth * 0.15]}>
            {/* Columns */}
            {[-2.2, 2.2].map((px, pi) =>
              [-2, 2].map((pz, pzi) => (
                <mesh
                  key={`col-${pi}-${pzi}`}
                  position={[px, 1.1, pz]}
                  material={frameMat}
                >
                  <boxGeometry args={[0.15, 2.2, 0.15]} />
                </mesh>
              ))
            )}
            {/* Wooden Slats */}
            {Array.from({ length: 6 }).map((_, si) => (
              <mesh
                key={`slat-${si}`}
                position={[0, 2.2, -2 + si * 0.8]}
                material={frameMat}
              >
                <boxGeometry args={[4.8, 0.08, 0.1]} />
              </mesh>
            ))}
          </group>
        )}

        {/* Swimming Pool (Building A13 Sky Pool as shown in CAM-TOP) */}
        {hasPool && (
          <group position={[width * 0.15, 0.23, depth * 0.1]}>
            {/* Pool Basin Rim */}
            <mesh position={[0, 0.05, 0]} material={stoneMat}>
              <boxGeometry args={[width * 0.45, 0.1, depth * 0.45]} />
            </mesh>
            {/* Turquoise Illuminated Water Surface */}
            <mesh position={[0, 0.11, 0]}>
              <boxGeometry args={[width * 0.38, 0.02, depth * 0.38]} />
              <meshStandardMaterial
                color="#06b6d4"
                roughness={0.1}
                metalness={0.8}
                emissive="#0891b2"
                emissiveIntensity={0.6}
              />
            </mesh>
          </group>
        )}

        {/* Solar PV Panels (Row angled South for Cairo solar yield) */}
        {hasSolarPV && (
          <group position={[width * 0.15, 0.4, -depth * 0.1]}>
            {[-1.5, 0, 1.5].map((pz, pi) => (
              <mesh
                key={`pv-${pi}`}
                position={[0, 0, pz]}
                rotation={[-0.35, 0, 0]}
                castShadow
              >
                <boxGeometry args={[width * 0.4, 0.05, 1.2]} />
                <meshStandardMaterial
                  color="#0f172a"
                  roughness={0.15}
                  metalness={0.9}
                />
              </mesh>
            ))}
          </group>
        )}

        {/* MEP Chiller Mechanical Screening Pod */}
        <mesh position={[-width * 0.25, 0.7, depth * 0.2]} material={frameMat}>
          <boxGeometry args={[width * 0.3, 1.2, depth * 0.25]} />
        </mesh>
      </group>

      {/* 3. Colorful Courtyard Tensile Fabric Canopy (Between plaza buildings) */}
      {hasCanopy && (
        <group position={[0, 3.8, depth / 2 + 3.5]}>
          <mesh rotation={[0.1, 0, 0.05]}>
            <planeGeometry args={[width * 0.85, 4]} />
            <meshStandardMaterial
              color="#fbbf24"
              roughness={0.4}
              side={THREE.DoubleSide}
              transparent
              opacity={0.85}
            />
          </mesh>
        </group>
      )}

      {/* 4. Selection / Hover Outline Bounding Ring */}
      {(isActive || isHovered) && (
        <mesh position={[0, totalHeight / 2, 0]}>
          <boxGeometry args={[width + 0.8, totalHeight + 0.4, depth + 0.8]} />
          <primitive object={isActive ? activeOutlineMat : hoverOutlineMat} attach="material" />
        </mesh>
      )}

      {/* 5. 3D Floating Building Badge (A01 - A25) matching CAM-TOP Masterplan */}
      <Html position={[0, totalHeight + 2.8, 0]} center distanceFactor={70}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(id);
          }}
          className={`cursor-pointer group flex flex-col items-center select-none transition-all duration-300 ${
            isActive ? 'scale-125 z-40' : isHovered ? 'scale-110 z-30' : 'scale-90 hover:scale-105'
          }`}
        >
          {/* Main ID Pill */}
          <div
            className={`px-2.5 py-1 rounded-full font-['JetBrains_Mono',monospace] font-bold text-xs tracking-wider border shadow-lg backdrop-blur-md flex items-center gap-1.5 transition-all ${
              isActive
                ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-[0_0_20px_#f59e0b] ring-2 ring-amber-300'
                : isHovered
                ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_#22d3ee]'
                : 'bg-[#0a1124]/90 text-slate-200 border-indigo-500/40 hover:border-cyan-400'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isActive ? 'bg-slate-950 animate-ping' : 'bg-emerald-400'
              }`}
            />
            <span>{id}</span>
          </div>

          {/* Expanded Metadata Tooltip on Hover/Active */}
          {(isActive || isHovered) && (
            <div className="mt-1 px-3 py-1.5 rounded-lg bg-[#070e1c]/95 border border-indigo-500/40 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-150">
              <span className="font-['Inter',sans-serif] font-bold text-[11px] text-white">
                {name}
              </span>
              <div className="flex items-center gap-2 mt-0.5 text-[9px] font-mono">
                <span className="text-cyan-300">{type}</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-bold">{occupancy}% Occ</span>
              </div>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

// The Signature Central Golden Ring Plaza (O-Canopy) in CAM-TOP.jpg
const CentralGoldenRingCanopy: React.FC = () => {
  return (
    <group position={[0, 7.8, -2]}>
      {/* 1. Large Perforated Circular Golden Ring O-Canopy */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <ringGeometry args={[6.5, 13.5, 64]} />
        <meshStandardMaterial
          color="#d97706"
          roughness={0.25}
          metalness={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer Ring Gold Fascia Rim */}
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[13.5, 13.5, 0.45, 64, 1, true]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.2}
          metalness={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Ring Gold Fascia Rim */}
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[6.5, 6.5, 0.45, 48, 1, true]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.2}
          metalness={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Radial Gold Ring Trellis Spokes */}
      {Array.from({ length: 16 }).map((_, i) => {
        const rad = (i * Math.PI) / 8;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const cx = 10 * cos;
        const cz = 10 * sin;
        return (
          <mesh
            key={`spoke-${i}`}
            position={[cx, 0, cz]}
            rotation={[0, -rad, 0]}
            material={
              new THREE.MeshStandardMaterial({
                color: '#b45309',
                metalness: 0.9,
                roughness: 0.2
              })
            }
          >
            <boxGeometry args={[6.8, 0.1, 0.12]} />
          </mesh>
        );
      })}

      {/* Slender Inclined Structural Columns */}
      {Array.from({ length: 8 }).map((_, i) => {
        const rad = (i * Math.PI) / 4;
        const x = 11.5 * Math.cos(rad);
        const z = 11.5 * Math.sin(rad);
        return (
          <mesh
            key={`ring-col-${i}`}
            position={[x, -3.8, z]}
            rotation={[0.08 * Math.sin(rad), 0, -0.08 * Math.cos(rad)]}
          >
            <cylinderGeometry args={[0.18, 0.25, 7.8, 12]} />
            <meshStandardMaterial color="#92400e" metalness={0.9} roughness={0.3} />
          </mesh>
        );
      })}

      {/* Golden Uplighting Glow in Atrium Plaza */}
      <pointLight position={[0, -2, 0]} color="#f59e0b" intensity={2.5} distance={28} />

      {/* Central Plaza Water Fountain */}
      <group position={[0, -7.7, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[4.2, 4.4, 0.3, 32]} />
          <meshStandardMaterial color="#1a2333" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[3.8, 3.8, 0.1, 32]} />
          <meshStandardMaterial
            color="#0284c7"
            roughness={0.1}
            metalness={0.9}
            emissive="#0369a1"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* 3D Title Floating above The Golden Ring */}
      <Html position={[0, 3.2, 0]} center distanceFactor={80}>
        <div className="px-3 py-1 rounded-full bg-[#0a1124]/90 border border-amber-400/60 shadow-[0_0_24px_rgba(245,158,11,0.7)] backdrop-blur-md flex items-center gap-2 select-none pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-['Inter',sans-serif] font-black text-xs text-amber-300 tracking-widest whitespace-nowrap">
            THE GOLDEN RING PLAZA // البلازا الرئيسية
          </span>
        </div>
      </Html>
    </group>
  );
};

export const ProceduralBuilding: React.FC = () => {
  const activeBuilding = useBuildingStore((s) => s.activeBuilding);
  const hoveredBuilding = useBuildingStore((s) => s.hoveredBuilding);
  const setActiveBuilding = useBuildingStore((s) => s.setActiveBuilding);
  const setHoveredBuilding = useBuildingStore((s) => s.setHoveredBuilding);

  const activeFloor = useBuildingStore((s) => s.activeFloor);
  const hoveredFloor = useBuildingStore((s) => s.hoveredFloor);
  const setActiveFloor = useBuildingStore((s) => s.setActiveFloor);
  const setHoveredFloor = useBuildingStore((s) => s.setHoveredFloor);

  // Reusable Materials
  const stoneMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#d4bea6', // Travertine Egyptian sandstone
        roughness: 0.65,
        metalness: 0.15
      }),
    []
  );

  const slabMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1f242d', // Charcoal spandrel band
        roughness: 0.45,
        metalness: 0.5
      }),
    []
  );

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#141c2c',
        emissive: '#38220f', // Warm interior nighttime light
        emissiveIntensity: 0.45,
        roughness: 0.1,
        metalness: 0.2,
        transparent: true,
        opacity: 0.85
      }),
    []
  );

  const glassLitMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#1e293b',
        emissive: '#0284c7', // Active cyan glow
        emissiveIntensity: 0.95,
        roughness: 0.1,
        metalness: 0.2,
        transparent: true,
        opacity: 0.9
      }),
    []
  );

  const glassHoverMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#1e293b',
        emissive: '#06b6d4', // Bright cyan hover light
        emissiveIntensity: 1.4,
        roughness: 0.05,
        metalness: 0.3,
        transparent: true,
        opacity: 0.95
      }),
    []
  );

  const frameMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#38322c', // Architectural bronze
        roughness: 0.35,
        metalness: 0.8
      }),
    []
  );

  const woodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#715843', // Warm teak wood decking
        roughness: 0.7,
        metalness: 0.1
      }),
    []
  );

  const activeOutlineMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#f59e0b',
        wireframe: true,
        transparent: true,
        opacity: 0.85
      }),
    []
  );

  const hoverOutlineMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#22d3ee',
        wireframe: true,
        transparent: true,
        opacity: 0.5
      }),
    []
  );

  const buildingList = useMemo(() => {
    return Object.values(BUILDINGS_CONFIG);
  }, []);

  return (
    <group name="GoldenGateMasterplan25Buildings">
      {/* 1. All 25 Distinct Buildings (A01 - A25) matching CAM-TOP Masterplan */}
      {buildingList.map((meta) => (
        <BuildingUnit
          key={meta.id}
          meta={meta}
          isActive={activeBuilding === meta.id}
          isHovered={hoveredBuilding === meta.id}
          activeFloor={activeFloor}
          hoveredFloor={hoveredFloor}
          onSelect={(id) => setActiveBuilding(activeBuilding === id ? null : id)}
          onHover={(id) => setHoveredBuilding(id)}
          onFloorSelect={(fl) => setActiveFloor(fl)}
          onFloorHover={(fl) => setHoveredFloor(fl)}
          stoneMat={stoneMat}
          slabMat={slabMat}
          glassMat={glassMat}
          glassLitMat={glassLitMat}
          glassHoverMat={glassHoverMat}
          frameMat={frameMat}
          woodMat={woodMat}
          activeOutlineMat={activeOutlineMat}
          hoverOutlineMat={hoverOutlineMat}
        />
      ))}

      {/* 2. Central Iconic Perforated Golden Ring O-Canopy */}
      <CentralGoldenRingCanopy />
    </group>
  );
};
