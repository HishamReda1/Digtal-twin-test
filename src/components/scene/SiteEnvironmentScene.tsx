import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useBuildingStore } from '../../store/buildingStore';

// Procedural Egyptian Date Palm for New Cairo landscaping
const DatePalm: React.FC<{ position: [number, number, number]; scale?: number }> = ({
  position,
  scale = 1
}) => {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.35, 4.4, 7]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      {/* Palm Fronds Foliage Crown */}
      <group position={[0, 4.3, 0]}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <mesh
            key={i}
            rotation={[0.4, (angle * Math.PI) / 180, -0.3]}
            position={[0, 0, 0]}
            castShadow
          >
            <coneGeometry args={[0.8, 2.6, 4]} />
            <meshStandardMaterial color="#1e4620" roughness={0.7} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// Street Light Pole along South 90th Street
const StreetLight: React.FC<{ position: [number, number, number]; rotationY?: number }> = ({
  position,
  rotationY = 0
}) => {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Vertical Mast */}
      <mesh position={[0, 3.2, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 6.4, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Curved Arm */}
      <mesh position={[0.5, 6.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.06, 0.06, 1.4, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Lamp Luminaire */}
      <mesh position={[1.0, 6.5, 0]}>
        <boxGeometry args={[0.45, 0.1, 0.25]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
    </group>
  );
};

// Cairo Monorail (East Nile Line) running parallel along South 90th St
const CairoMonorailSystem: React.FC = () => {
  const trainRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (trainRef.current) {
      trainRef.current.position.x += delta * 22; // Monorail cruising speed
      if (trainRef.current.position.x > 140) {
        trainRef.current.position.x = -140;
      }
    }
  });

  return (
    <group position={[0, 0, 19]}>
      {/* Elevated Concrete Guideway Beam */}
      <mesh position={[0, 3.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[320, 0.7, 1.2]} />
        <meshStandardMaterial color="#64748b" roughness={0.7} />
      </mesh>

      {/* Track Power Rail */}
      <mesh position={[0, 3.8, 0]}>
        <boxGeometry args={[320, 0.08, 0.4]} />
        <meshStandardMaterial color="#334155" metalness={0.9} />
      </mesh>

      {/* Concrete Pylons / Piers */}
      {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((px) => (
        <group key={`pylon-${px}`} position={[px, 0, 0]}>
          {/* Main cylindrical pier */}
          <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.65, 0.75, 3.2, 16]} />
            <meshStandardMaterial color="#64748b" roughness={0.8} />
          </mesh>
          {/* Pier Cap */}
          <mesh position={[0, 3.0, 0]} castShadow>
            <boxGeometry args={[1.8, 0.4, 1.8]} />
            <meshStandardMaterial color="#475569" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Animated Sleek Monorail Train (East Nile Line) */}
      <group ref={trainRef} position={[-20, 4.3, 0]}>
        {/* Lead Car */}
        <mesh position={[9, 0, 0]} castShadow>
          <boxGeometry args={[5, 1.3, 1.6]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.4} />
        </mesh>
        {/* Aerodynamic Nose */}
        <mesh position={[11.8, -0.1, 0]} rotation={[0, 0, -Math.PI / 8]}>
          <boxGeometry args={[1.5, 1.1, 1.55]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
        {/* Headlight */}
        <mesh position={[12.6, -0.3, 0]}>
          <boxGeometry args={[0.1, 0.2, 0.9]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Passenger Coaches (4 intermediate cars) */}
        {[-4.5, 0, 4.5].map((cx) => (
          <group key={`coach-${cx}`} position={[cx, 0, 0]}>
            {/* Coach body */}
            <mesh castShadow>
              <boxGeometry args={[4.2, 1.3, 1.6]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.4} />
            </mesh>
            {/* Cyan Transit Stripe */}
            <mesh position={[0, -0.1, 0.82]}>
              <boxGeometry args={[4.2, 0.15, 0.02]} />
              <meshBasicMaterial color="#0284c7" />
            </mesh>
            <mesh position={[0, -0.1, -0.82]}>
              <boxGeometry args={[4.2, 0.15, 0.02]} />
              <meshBasicMaterial color="#0284c7" />
            </mesh>
            {/* Glowing Windows */}
            <mesh position={[0, 0.15, 0.82]}>
              <boxGeometry args={[3.8, 0.45, 0.02]} />
              <meshBasicMaterial color="#fef08a" />
            </mesh>
            <mesh position={[0, 0.15, -0.82]}>
              <boxGeometry args={[3.8, 0.45, 0.02]} />
              <meshBasicMaterial color="#fef08a" />
            </mesh>
          </group>
        ))}

        {/* Rear Car */}
        <mesh position={[-9, 0, 0]} castShadow>
          <boxGeometry args={[5, 1.3, 1.6]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.4} />
        </mesh>
        {/* Taillights */}
        <mesh position={[-11.6, -0.1, 0]}>
          <boxGeometry args={[0.1, 0.2, 0.8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>
    </group>
  );
};

// Animated Traffic Light Streaks on South 90th Street
const TrafficStream: React.FC = () => {
  const eastboundRef = useRef<THREE.Group>(null);
  const westboundRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (eastboundRef.current) {
      eastboundRef.current.position.x += delta * 24;
      if (eastboundRef.current.position.x > 120) {
        eastboundRef.current.position.x = -120;
      }
    }
    if (westboundRef.current) {
      westboundRef.current.position.x -= delta * 26;
      if (westboundRef.current.position.x < -120) {
        westboundRef.current.position.x = 120;
      }
    }
  });

  return (
    <group position={[0, -2.78, 36]}>
      {/* Eastbound Traffic (White/Golden headlights) */}
      <group ref={eastboundRef}>
        {[-80, -55, -30, -5, 20, 45, 70, 95].map((x, i) => (
          <mesh key={`headlight-${i}`} position={[x, 0.25, 4.5 + (i % 3) * 2]}>
            <boxGeometry args={[3.5, 0.18, 0.9]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.9} />
          </mesh>
        ))}
      </group>

      {/* Westbound Traffic (Red taillights) */}
      <group ref={westboundRef}>
        {[-90, -65, -40, -15, 10, 35, 60, 85].map((x, i) => (
          <mesh key={`taillight-${i}`} position={[x, 0.25, -4.5 - (i % 3) * 2]}>
            <boxGeometry args={[3.8, 0.18, 0.9]} />
            <meshBasicMaterial color="#ef4444" transparent opacity={0.95} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// New Cairo Residential Background Compounds (Behind Golden Gate, as seen in CAM19)
const BackgroundResidentialCompound: React.FC = () => {
  return (
    <group position={[15, -2.8, -50]}>
      {/* Gentle Desert Ground Plane */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <boxGeometry args={[260, 0.1, 60]} />
        <meshStandardMaterial color="#0b111e" roughness={0.9} />
      </mesh>

      {/* Clustered New Cairo Residential Villas with Glowing Windows */}
      {Array.from({ length: 42 }).map((_, i) => {
        const row = Math.floor(i / 14);
        const col = i % 14;
        const vx = -110 + col * 17 + ((row % 2) * 5);
        const vz = -15 + row * 16;
        const vh = 6 + (i % 3) * 2;
        return (
          <group key={`villa-${i}`} position={[vx, 0, vz]}>
            {/* Villa massing */}
            <mesh position={[0, vh / 2, 0]} castShadow>
              <boxGeometry args={[8.5, vh, 9]} />
              <meshStandardMaterial color="#1a2333" roughness={0.7} />
            </mesh>
            {/* Warm interior window lights */}
            <mesh position={[0, vh * 0.5, 4.55]}>
              <boxGeometry args={[5, 1.2, 0.05]} />
              <meshBasicMaterial color="#fed7aa" />
            </mesh>
            {/* Villa garden palm */}
            <DatePalm position={[5.5, 0, 3]} scale={0.65} />
          </group>
        );
      })}

      {/* Compound Street Lights */}
      {[-80, -40, 0, 40, 80].map((sx) => (
        <group key={`c-light-${sx}`} position={[sx, 0, -2]}>
          <mesh position={[0, 2.5, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 5, 6]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh position={[0, 5.1, 0]}>
            <boxGeometry args={[0.4, 0.1, 0.4]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export const SiteEnvironmentScene: React.FC = () => {
  const showEnvironment = useBuildingStore((s) => s.showEnvironment);
  const toggleSiteMaps = useBuildingStore((s) => s.toggleSiteMaps);

  if (!showEnvironment) return null;

  return (
    <group name="NewCairoEnvironmentScene">
      {/* ============================================================== */}
      {/* 1. CAIRO MONORAIL (EAST NILE LINE) ELEVATED GUIDEWAY & TRAIN    */}
      {/* ============================================================== */}
      <CairoMonorailSystem />

      {/* ============================================================== */}
      {/* 2. SOUTH 90TH STREET (شارع التسعين الجنوبي) HIGHWAY BOULEVARD   */}
      {/* ============================================================== */}
      <group position={[0, -2.82, 36]}>
        {/* Asphalt Main Expressway (10 lanes, 320m wide) */}
        <mesh receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[320, 0.08, 26]} />
          <meshStandardMaterial color="#141a26" roughness={0.85} />
        </mesh>

        {/* Central Median Island with Date Palm Grove */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[320, 0.16, 2.8]} />
          <meshStandardMaterial color="#0c1321" roughness={0.9} />
        </mesh>

        {/* Palms along Median */}
        {[-140, -115, -90, -65, -40, -15, 10, 35, 60, 85, 110, 135].map((x) => (
          <DatePalm key={`med-palm-${x}`} position={[x, 0.2, 0]} scale={0.8} />
        ))}

        {/* Highway Street Light Poles */}
        {[-135, -90, -45, 0, 45, 90, 135].map((x) => (
          <StreetLight key={`med-light-${x}`} position={[x, 0.2, 0]} />
        ))}

        {/* White Dashed Lane Dividers */}
        {[-6.5, -3.2, 3.2, 6.5].map((zOffset, zi) => (
          <group key={`lane-${zi}`} position={[0, 0.06, zOffset]}>
            {Array.from({ length: 44 }).map((_, i) => (
              <mesh key={i} position={[-150 + i * 7.2, 0, 0]}>
                <planeGeometry args={[3.2, 0.18]} />
                <meshBasicMaterial color="#94a3b8" side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Yellow Curb Edge Lines */}
        {[-12.8, 12.8].map((zEdge, ei) => (
          <mesh key={`yellow-${ei}`} position={[0, 0.06, zEdge]}>
            <boxGeometry args={[320, 0.02, 0.2]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        ))}

        {/* Animated Moving Vehicle Streams */}
        <TrafficStream />

        {/* 3D Floating Street Sign */}
        <Html position={[0, 5.5, 13]} center distanceFactor={60}>
          <div
            onClick={toggleSiteMaps}
            className="cursor-pointer group px-3.5 py-1.5 rounded-lg bg-[#070e1c]/90 border border-cyan-400/50 shadow-[0_0_18px_rgba(34,211,238,0.35)] backdrop-blur-md flex items-center gap-2.5 font-['JetBrains_Mono',monospace] text-cyan-300 hover:border-cyan-400 transition-all select-none"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <div className="flex flex-col text-left">
              <span className="font-bold text-xs text-white">
                SOUTH 90th STREET // شارع التسعين الجنوبي
              </span>
              <span className="text-[9px] text-slate-400">
                Cairo Monorail Corridor • 30°01'18.7"N 31°30'37.3"E
              </span>
            </div>
          </div>
        </Html>
      </group>

      {/* ============================================================== */}
      {/* 3. GOLDEN GATE PEDESTRIAN PROMENADE & FINE DINING TERRACES     */}
      {/* ============================================================== */}
      <group position={[15, -2.8, 11]}>
        {/* Stone Promenade Platform */}
        <mesh receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[160, 0.06, 12]} />
          <meshStandardMaterial color="#1a2333" roughness={0.7} />
        </mesh>

        {/* Linear Water Reflection Basins & Fountains */}
        {[-40, 10, 60].map((bx) => (
          <mesh key={`basin-${bx}`} position={[bx, 0.05, 1]}>
            <boxGeometry args={[14, 0.1, 3.2]} />
            <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}

        {/* Promenade Palm Trees */}
        {[-65, -45, -25, -5, 15, 35, 55, 75, 95].map((px) => (
          <DatePalm key={`prom-palm-${px}`} position={[px, 0.05, 4.5]} scale={0.9} />
        ))}
      </group>

      {/* ============================================================== */}
      {/* 4. NEW CAIRO BACKGROUND RESIDENTIAL VILLA COMPOUNDS (CAM19)    */}
      {/* ============================================================== */}
      <BackgroundResidentialCompound />

      {/* ============================================================== */}
      {/* 5. GEOGRAPHIC PINS TO TRANSIT & HUBS                            */}
      {/* ============================================================== */}
      <Html position={[85, 4, 25]} center distanceFactor={75}>
        <div className="px-2.5 py-1 rounded bg-[#070e1c]/85 border border-slate-700/60 text-slate-400 font-['JetBrains_Mono',monospace] text-[9px] flex items-center gap-1.5 select-none pointer-events-none">
          <span className="text-amber-400">➔</span> AUC CAMPUS (4.2 km EAST)
        </div>
      </Html>

      <Html position={[-85, 4, 25]} center distanceFactor={75}>
        <div className="px-2.5 py-1 rounded bg-[#070e1c]/85 border border-slate-700/60 text-slate-400 font-['JetBrains_Mono',monospace] text-[9px] flex items-center gap-1.5 select-none pointer-events-none">
          <span className="text-cyan-400">➔</span> MIDDLE RING ROAD CORRIDOR
        </div>
      </Html>
    </group>
  );
};
