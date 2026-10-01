import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useBuildingStore } from '../../store/buildingStore';
import { BUILDING_A02_BMS_DATA, BmsEquipmentMeshItem, getEquipmentSystem } from '../../data/buildingA02BmsData';
import { FloorId } from '../../types/building';

// Height map for Building A02 floors
const FLOOR_ELEVATION_MAP: Record<FloorId, number> = {
  B1: -2.8,
  GF: 0.0,
  '1F': 3.25,
  '2F': 6.5,
  '3F': 9.75,
  RF: 13.0,
  UR: 15.6
};

// 1. Damper Mesh (SMD / VMD)
const DamperMesh: React.FC<{ item: BmsEquipmentMeshItem; isSelected: boolean }> = ({ item, isSelected }) => {
  return (
    <group position={item.position}>
      {/* Rectangular Galvanized Steel Duct Casing */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.65, 0.9]} />
        <meshStandardMaterial color="#64748b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Interior Airway Passage */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.0, 0.5, 0.92]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      {/* Damper Louver Blades (Angled Open 1=OPEN) */}
      {[-0.28, 0, 0.28].map((ox, i) => (
        <mesh key={i} position={[ox, 0, 0]} rotation={[0, 0.35, 0]}>
          <boxGeometry args={[0.04, 0.46, 0.85]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
      ))}
      {/* Electric Actuator Servo Box */}
      <mesh position={[0.65, 0.05, 0]} castShadow>
        <boxGeometry args={[0.18, 0.32, 0.28]} />
        <meshStandardMaterial color="#d97706" roughness={0.4} />
      </mesh>
      {/* Status LED Beacon (Green for 1=OPEN) */}
      <mesh position={[0.75, 0.16, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
      {/* Selection Wireframe Ring */}
      {isSelected && (
        <mesh>
          <boxGeometry args={[1.4, 0.85, 1.1]} />
          <meshBasicMaterial color="#f59e0b" wireframe />
        </mesh>
      )}
    </group>
  );
};

// 2. Fan Coil Unit Mesh (FCU)
const FcuMesh: React.FC<{ item: BmsEquipmentMeshItem; isSelected: boolean }> = ({ item, isSelected }) => {
  return (
    <group position={item.position}>
      {/* Cassette Body Casing */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.45, 1.5]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Circular Intake Air Grille */}
      <mesh position={[0, -0.23, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.02, 16]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Chilled Water Supply & Return Pipework */}
      <mesh position={[0.8, 0.0, 0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 0.35, 8]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} />
      </mesh>
      <mesh position={[0.8, 0.0, -0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 0.35, 8]} />
        <meshStandardMaterial color="#ef4444" metalness={0.8} />
      </mesh>
      {isSelected && (
        <mesh>
          <boxGeometry args={[1.7, 0.65, 1.7]} />
          <meshBasicMaterial color="#22d3ee" wireframe />
        </mesh>
      )}
    </group>
  );
};

// 3. Pressurization Fan Mesh (PF / SF) with rotating impeller
const FanMesh: React.FC<{ item: BmsEquipmentMeshItem; isSelected: boolean }> = ({ item, isSelected }) => {
  const impellerRef = useRef<THREE.Group>(null);
  const isRunning = item.status === 'ACTIVE' || item.points.some(p => p.pointName === 'Status' && p.currentValue === 1);

  useFrame((_, delta) => {
    if (impellerRef.current && isRunning) {
      impellerRef.current.rotation.z += delta * 15;
    }
  });

  return (
    <group position={item.position}>
      {/* Cylindrical Fan Casing */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.65, 0.65, 1.6, 20]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Flange Rings */}
      {[-0.8, 0.8].map((ox, i) => (
        <mesh key={i} position={[ox, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.75, 0.75, 0.08, 20]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
      ))}
      {/* Rotating Fan Impeller Blades */}
      <group ref={impellerRef} position={[0, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.3, 12]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
            <boxGeometry args={[0.06, 0.55, 0.14]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} />
          </mesh>
        ))}
      </group>
      {/* Differential Pressure Sensor (DPT) Box */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[0.2, 0.16, 0.2]} />
        <meshStandardMaterial color="#0284c7" />
      </mesh>
      {isSelected && (
        <mesh>
          <boxGeometry args={[2.0, 1.6, 1.6]} />
          <meshBasicMaterial color="#f59e0b" wireframe />
        </mesh>
      )}
    </group>
  );
};

// 4. Fresh Air Handling Unit Mesh (FAHU)
const FahuMesh: React.FC<{ item: BmsEquipmentMeshItem; isSelected: boolean }> = ({ item, isSelected }) => {
  return (
    <group position={item.position}>
      {/* Main Double-Skin Insulated Acoustic Casing */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4.2, 1.8, 2.2]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.2} roughness={0.4} />
      </mesh>
      {/* Inspection Access Doors */}
      {[-1.2, 0, 1.2].map((ox, i) => (
        <mesh key={i} position={[ox, 0, 1.11]}>
          <planeGeometry args={[0.9, 1.4]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
        </mesh>
      ))}
      {/* Glass Inspection Viewport */}
      <mesh position={[0, 0.2, 1.12]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial color="#0284c7" transparent opacity={0.6} />
      </mesh>
      {/* Supply Air Duct Spigot */}
      <mesh position={[2.15, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.6, 0.6, 0.4, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </mesh>
      {/* Fresh Air Intake Louvers */}
      <mesh position={[-2.15, 0.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.6, 0.6, 0.4, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      {/* Control Actuator Valves (PICV) */}
      <mesh position={[0.4, 1.0, 0.6]}>
        <cylinderGeometry args={[0.08, 0.08, 0.35, 8]} />
        <meshStandardMaterial color="#d97706" />
      </mesh>
      {isSelected && (
        <mesh>
          <boxGeometry args={[4.5, 2.1, 2.5]} />
          <meshBasicMaterial color="#22d3ee" wireframe />
        </mesh>
      )}
    </group>
  );
};

// 5. Electrical & Metering Cabinets (DPM / BTU / KWH / WM / FAP)
const PanelMesh: React.FC<{ item: BmsEquipmentMeshItem; isSelected: boolean }> = ({ item, isSelected }) => {
  const isFap = item.type === 'FAP';
  const isDpm = item.type === 'DPM';

  return (
    <group position={item.position}>
      {/* Wall Enclosure Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.85, 1.3, 0.35]} />
        <meshStandardMaterial
          color={isFap ? '#dc2626' : isDpm ? '#334155' : '#1e293b'}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      {/* LCD Digital Telemetry Screen */}
      <mesh position={[0, 0.25, 0.18]}>
        <planeGeometry args={[0.55, 0.35]} />
        <meshBasicMaterial color="#0284c7" />
      </mesh>
      {/* Indicator Lamps */}
      {[-0.18, 0, 0.18].map((ox, i) => (
        <mesh key={i} position={[ox, -0.15, 0.18]}>
          <circleGeometry args={[0.035, 8]} />
          <meshBasicMaterial color={i === 0 ? '#22c55e' : i === 1 ? '#eab308' : '#38bdf8'} />
        </mesh>
      ))}
      {isSelected && (
        <mesh>
          <boxGeometry args={[1.05, 1.5, 0.55]} />
          <meshBasicMaterial color="#f59e0b" wireframe />
        </mesh>
      )}
    </group>
  );
};

export const BuildingA02EquipmentMeshes: React.FC = () => {
  const activeBuilding = useBuildingStore((s) => s.activeBuilding);
  const activeFloor = useBuildingStore((s) => s.activeFloor);
  const activeSystemTab = useBuildingStore((s) => s.activeSystemTab);
  const selectedEquipment = useBuildingStore((s) => s.selectedEquipment);
  const setSelectedEquipment = useBuildingStore((s) => s.setSelectedEquipment);

  // Position offset of Building A02 in world space
  const a02Position: [number, number, number] = [-107, 0, -12];

  // Only render when looking at A02 (or in masterplan)
  const isA02Active = activeBuilding === 'A02';

  // Gather equipment items
  const floorKeys = (activeFloor ? [activeFloor] : (['GF', '1F', '2F', '3F', 'RF', 'UR'] as FloorId[]));

  return (
    <group position={a02Position} name="BuildingA02_BMS_Telemetry_Meshes">
      {floorKeys.map((flId) => {
        const rawItems = BUILDING_A02_BMS_DATA[flId] || [];
        const items = rawItems.filter((item) => {
          if (
            activeSystemTab === '3d_view' ||
            activeSystemTab === 'community' ||
            activeSystemTab === 'security' ||
            activeSystemTab === 'maintenance'
          ) {
            return true;
          }
          const sys = getEquipmentSystem(item.type);
          return sys === activeSystemTab;
        });

        const floorY = FLOOR_ELEVATION_MAP[flId] || 0;

        return (
          <group key={flId} position={[0, floorY, 0]}>
            {items.map((item) => {
              const isSelected = selectedEquipment?.id === item.id;

              return (
                <group
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEquipment(isSelected ? null : item);
                  }}
                >
                  {/* Physical 3D Equipment Model */}
                  {item.type === 'SMD' || item.type === 'VMD' ? (
                    <DamperMesh item={item} isSelected={isSelected} />
                  ) : item.type === 'FCU' ? (
                    <FcuMesh item={item} isSelected={isSelected} />
                  ) : item.type === 'PF' || item.type === 'SF' ? (
                    <FanMesh item={item} isSelected={isSelected} />
                  ) : item.type === 'FAHU' ? (
                    <FahuMesh item={item} isSelected={isSelected} />
                  ) : (
                    <PanelMesh item={item} isSelected={isSelected} />
                  )}

                  {/* 3D Spatial Tag directly bound to the Mesh */}
                  <Html
                    position={[item.position[0], item.position[1] + 1.2, item.position[2]]}
                    center
                    distanceFactor={isA02Active ? 42 : 75}
                  >
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEquipment(isSelected ? null : item);
                      }}
                      className={`cursor-pointer group flex flex-col items-center select-none transition-all duration-200 ${
                        isSelected
                          ? 'scale-110 z-40'
                          : 'scale-90 hover:scale-105 opacity-85 hover:opacity-100'
                      }`}
                    >
                      {/* Badge Pill */}
                      <div
                        className={`px-2 py-0.5 rounded-full border shadow-xl backdrop-blur-md flex items-center gap-1.5 font-['JetBrains_Mono',monospace] text-[9px] font-bold transition-all whitespace-nowrap ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-300 shadow-[0_0_15px_#f59e0b]'
                            : item.status === 'ALERT'
                            ? 'bg-rose-500/90 text-white border-rose-300'
                            : 'bg-[#091124]/90 text-slate-200 border-indigo-500/40 hover:border-cyan-400'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected
                              ? 'bg-slate-950 animate-ping'
                              : item.type === 'FAP'
                              ? 'bg-emerald-400'
                              : 'bg-cyan-400 animate-pulse'
                          }`}
                        />
                        <span className="text-white">{item.name.split(' ')[0]}</span>
                        <span className="text-slate-400 font-normal">|</span>
                        <span className={isSelected ? 'text-slate-950' : 'text-emerald-400'}>
                          {item.summaryBadge}
                        </span>
                      </div>
                    </div>
                  </Html>
                </group>
              );
            })}
          </group>
        );
      })}
    </group>
  );
};
