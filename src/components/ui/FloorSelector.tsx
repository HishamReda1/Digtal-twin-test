import React from 'react';
import { useBuildingStore } from '../../store/buildingStore';
import { ORDERED_FLOOR_IDS, FloorId, FLOOR_CONFIGS, BUILDINGS_CONFIG } from '../../types/building';

export const FloorSelector: React.FC = () => {
  const activeBuilding = useBuildingStore((s) => s.activeBuilding);
  const setActiveBuilding = useBuildingStore((s) => s.setActiveBuilding);
  const activeFloor = useBuildingStore((s) => s.activeFloor);
  const setActiveFloor = useBuildingStore((s) => s.setActiveFloor);
  const setHoveredFloor = useBuildingStore((s) => s.setHoveredFloor);

  const buildingMeta = activeBuilding ? BUILDINGS_CONFIG[activeBuilding] : null;

  // Stepping controls (+ / -)
  const handleStepUp = () => {
    const list = [...ORDERED_FLOOR_IDS].reverse(); // B1 to UR
    const currentIndex = list.indexOf(activeFloor || 'GF');
    if (currentIndex < list.length - 1) {
      setActiveFloor(list[currentIndex + 1]);
    }
  };

  const handleStepDown = () => {
    const list = [...ORDERED_FLOOR_IDS].reverse(); // B1 to UR
    const currentIndex = list.indexOf(activeFloor || 'GF');
    if (currentIndex > 0) {
      setActiveFloor(list[currentIndex - 1]);
    }
  };

  return (
    <aside className="flex flex-col items-center gap-2 pointer-events-auto p-2.5 rounded-2xl bg-[#080e1e]/90 backdrop-blur-xl border border-indigo-500/30 shadow-[0_8px_32px_rgba(4,7,20,0.85)] z-30 select-none min-w-[56px] transition-all">
      {/* Active Building Context Badge */}
      {buildingMeta ? (
        <div className="flex flex-col items-center gap-1 pb-1 border-b border-slate-700/60 w-full">
          <div className="flex items-center gap-1">
            <span className="font-['JetBrains_Mono',monospace] font-bold text-xs text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/40 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
              {activeBuilding}
            </span>
            <button
              onClick={() => {
                setActiveBuilding(null);
                setActiveFloor(null);
              }}
              title="Return to Masterplan Overview"
              className="w-5 h-5 rounded-full bg-slate-800 hover:bg-rose-500/30 text-slate-400 hover:text-rose-300 text-xs flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest text-center truncate max-w-[70px]">
            {activeFloor ? `FL ${activeFloor}` : 'ALL FLOORS'}
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center pb-1 border-b border-slate-700/60 w-full">
          <span className="font-['Inter',sans-serif] font-bold text-[9px] text-cyan-400 uppercase tracking-widest">
            LEVEL
          </span>
          <span className="text-[7px] font-mono text-slate-500">25 BLDGS</span>
        </div>
      )}

      {/* Floor Buttons List */}
      {ORDERED_FLOOR_IDS.map((floorId) => {
        const isActive = activeFloor === floorId;
        const config = FLOOR_CONFIGS[floorId];

        return (
          <div key={floorId} className="relative flex items-center justify-center">
            <button
              onClick={() => setActiveFloor(isActive ? null : floorId)}
              onMouseEnter={() => setHoveredFloor(floorId)}
              onMouseLeave={() => setHoveredFloor(null)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-['JetBrains_Mono',monospace] text-[11px] transition-all cursor-pointer ${
                isActive
                  ? 'font-bold bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-[0_0_18px_#f59e0b] ring-2 ring-amber-300 scale-105'
                  : 'text-slate-300 hover:text-cyan-300 hover:bg-[#1a233d] border border-slate-700/60'
              }`}
              title={`${config.name} (${config.badge})`}
            >
              {floorId}
            </button>
            {isActive && (
              <span className="absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#070e1c] animate-pulse" />
            )}
          </div>
        );
      })}

      <div className="w-6 h-px bg-slate-700/50 my-1" />

      {/* Step up button */}
      <button
        onClick={handleStepUp}
        className="w-8 h-8 rounded-lg bg-[#19223c]/80 border border-slate-700/60 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-300 flex items-center justify-center hover:bg-[#232f50] transition-colors cursor-pointer"
        title="Ascend Level (+)"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Step down button */}
      <button
        onClick={handleStepDown}
        className="w-8 h-8 rounded-lg bg-[#19223c]/80 border border-slate-700/60 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-300 flex items-center justify-center hover:bg-[#232f50] transition-colors cursor-pointer"
        title="Descend Level (-)"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
    </aside>
  );
};
