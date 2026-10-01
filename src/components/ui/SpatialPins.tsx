import React from 'react';
import { useBuildingStore } from '../../store/buildingStore';
import { FloorId } from '../../types/building';

export const SpatialPins: React.FC = () => {
  const showPins = useBuildingStore((s) => s.showPins);
  const activeBuilding = useBuildingStore((s) => s.activeBuilding);
  const activeFloor = useBuildingStore((s) => s.activeFloor);
  const setActiveFloor = useBuildingStore((s) => s.setActiveFloor);

  if (!showPins || activeBuilding) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden font-['JetBrains_Mono',monospace]">
      {/* PIN UR: Upper Roof FAHU & PF */}
      <div
        onClick={() => setActiveFloor('UR')}
        className={`absolute top-[15%] left-[36%] pointer-events-auto cursor-pointer group transition-all duration-300 ${
          activeFloor === 'UR' ? 'scale-105 z-30' : 'opacity-85 hover:opacity-100 hover:scale-105'
        }`}
      >
        <div className="relative flex items-center">
          <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-[#070b14] shadow-[0_0_12px_#22d3ee] flex items-center justify-center animate-pulse">
            <span className="w-1.5 h-1.5 bg-[#070b14] rounded-full" />
          </span>
          <div className="ml-2 px-2.5 py-1 rounded bg-[#070e1c]/90 backdrop-blur-md border border-cyan-400/50 text-[10px] text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.25)] flex items-center gap-1.5 group-hover:border-cyan-400">
            <span className="font-bold">UR // FAHU &amp; PF-02/03</span>
            <span className="text-emerald-400 font-semibold ml-1">480 Pa</span>
          </div>
        </div>
      </div>

      {/* PIN RF: Main Roof Louvers & FCU */}
      <div
        onClick={() => setActiveFloor('RF')}
        className={`absolute top-[28%] right-[30%] pointer-events-auto cursor-pointer group transition-all duration-300 ${
          activeFloor === 'RF' ? 'scale-105 z-30' : 'opacity-85 hover:opacity-100 hover:scale-105'
        }`}
      >
        <div className="relative flex items-center">
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#070b14] shadow-[0_0_12px_#10b981] flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-[#070b14] rounded-full" />
          </span>
          <div className="ml-2 px-2.5 py-1 rounded bg-[#070e1c]/90 backdrop-blur-md border border-emerald-500/50 text-[10px] text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.25)] flex items-center gap-1.5 group-hover:border-emerald-400">
            <span className="font-bold">RF // FCU-01..03 &amp; PF-RF-01</span>
            <span className="text-white font-semibold ml-1">3x RUN</span>
          </div>
        </div>
      </div>

      {/* PIN 3F: Level 3 Commercial Cooling */}
      <div
        onClick={() => setActiveFloor('3F')}
        className={`absolute top-[48%] right-[22%] pointer-events-auto cursor-pointer group transition-all duration-300 ${
          activeFloor === '3F' ? 'scale-105 z-30' : 'opacity-85 hover:opacity-100 hover:scale-105'
        }`}
      >
        <div className="relative flex items-center">
          <span className="w-3 h-3 rounded-full bg-cyan-400 border border-[#070b14] shadow-[0_0_10px_#22d3ee] animate-pulse" />
          <div className="ml-2 px-2 py-0.5 rounded bg-[#070e1c]/90 backdrop-blur-md border border-cyan-500/40 text-[10px] text-slate-200 flex items-center gap-1 group-hover:border-cyan-400">
            <span className="text-cyan-400 font-bold">3F // 2x BTU METERS</span>
            <span className="text-slate-400">| VMD 4-5</span>
          </div>
        </div>
      </div>

      {/* PIN GF: Ground Floor High-Density Hub */}
      <div
        onClick={() => setActiveFloor('GF')}
        className={`absolute left-[29%] bottom-[20%] pointer-events-auto cursor-pointer group transition-all duration-300 z-30 ${
          activeFloor === 'GF' ? 'scale-105' : 'opacity-90 hover:opacity-100 hover:scale-105'
        }`}
      >
        <div className="relative flex items-center">
          <span className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-[#070e1c] shadow-[0_0_16px_#22d3ee] animate-ping absolute" />
          <span className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-[#070e1c] shadow-[0_0_14px_#22d3ee] flex items-center justify-center">
            <span className="w-2 h-2 bg-slate-950 rounded-full" />
          </span>
          <div className="w-10 h-px bg-gradient-to-r from-cyan-400 to-cyan-500/80 shadow-[0_0_6px_#22d3ee]" />

          {/* Anchored HUD Card */}
          <div className="p-3 bg-[#070e1c]/92 backdrop-blur-md border border-cyan-400/50 rounded-lg shadow-[0_0_24px_rgba(34,211,238,0.3)] flex flex-col gap-2 min-w-[270px] group-hover:border-cyan-300">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] text-cyan-400 font-['Inter',sans-serif] tracking-wider uppercase block font-bold">
                  PRIMARY HUB
                </span>
                <span className="text-[12px] font-bold text-white font-['JetBrains_Mono',monospace]">
                  GROUND FLOOR INFRA
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                ONLINE
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 bg-[#151b2a]/70 p-1.5 rounded text-[10px] text-center border border-slate-700/40">
              <div>
                <span className="text-cyan-400 font-bold">13</span>
                <span className="text-slate-400 block text-[8px]">KWH METERS</span>
              </div>
              <div>
                <span className="text-slate-200 font-bold">13</span>
                <span className="text-slate-400 block text-[8px]">WATER METERS</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">9</span>
                <span className="text-slate-400 block text-[8px]">BTU COOLING</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PIN B1: Basement ETS District Cooling Substation */}
      <div
        onClick={() => setActiveFloor('B1')}
        className={`absolute left-[44%] bottom-[12%] pointer-events-auto cursor-pointer group transition-all duration-300 ${
          activeFloor === 'B1' ? 'scale-105 z-30' : 'opacity-85 hover:opacity-100 hover:scale-105'
        }`}
      >
        <div className="relative flex items-center">
          <span className="w-3.5 h-3.5 rounded-full bg-indigo-500 border-2 border-[#070b14] shadow-[0_0_12px_#6366f1] flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-[#070b14] rounded-full" />
          </span>
          <div className="ml-2 px-2.5 py-1 rounded bg-[#070e1c]/90 backdrop-blur-md border border-indigo-400/50 text-[10px] text-indigo-300 shadow-[0_0_14px_rgba(99,102,241,0.25)] flex items-center gap-1.5 group-hover:border-cyan-400">
            <span className="font-bold">B1 // ETS HEAT EXCHANGER PLANT</span>
            <span className="text-emerald-400 font-semibold ml-1">5.5°C SUPPLY</span>
          </div>
        </div>
      </div>
    </div>
  );
};
