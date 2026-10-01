import React, { useState } from 'react';
import { useBuildingStore } from '../../store/buildingStore';
import { FLOOR_CONFIGS, FloorId, ORDERED_FLOOR_IDS } from '../../types/building';

export const LeftDeck: React.FC = () => {
  const activeFloor = useBuildingStore((s) => s.activeFloor);
  const setActiveFloor = useBuildingStore((s) => s.setActiveFloor);
  const toggleDevPanel = useBuildingStore((s) => s.toggleDevPanel);
  const [search, setSearch] = useState('');

  const floorMeta = activeFloor ? FLOOR_CONFIGS[activeFloor] : FLOOR_CONFIGS['GF'];

  return (
    <section className="w-[360px] 2xl:w-[410px] h-full p-4 flex flex-col pointer-events-auto z-30 transition-all duration-300 select-none">
      <div className="h-full flex flex-col rounded-xl p-3.5 bg-[#0c1321]/80 backdrop-blur-md border border-cyan-400/25 shadow-[0_8px_32px_rgba(7,14,28,0.85)] overflow-hidden">
        {/* Floor Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Inter',sans-serif] text-[16px] tracking-wide text-white uppercase font-bold">
                  {floorMeta.name}
                </h2>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-['JetBrains_Mono',monospace] bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {floorMeta.badge}
                </span>
              </div>
              <p className="font-['Inter',sans-serif] text-[9px] text-slate-400 tracking-widest uppercase">
                {floorMeta.subtitle}
              </p>
            </div>
          </div>
          <span className="font-['JetBrains_Mono',monospace] text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
            NORMAL RUN
          </span>
        </div>

        {/* Building Levels Selector Strip */}
        <div className="py-2.5 shrink-0 border-b border-slate-700/40">
          <div className="flex items-center justify-between text-slate-400 font-['Inter',sans-serif] text-[9px] uppercase tracking-wider mb-1.5 font-semibold">
            <span>Building Levels (7 Configured)</span>
            <span className="text-cyan-400 font-['JetBrains_Mono',monospace] text-[10px]">ALL SYSTEMS 100% OK</span>
          </div>
          <div className="grid grid-cols-7 gap-1 font-['JetBrains_Mono',monospace] text-[11px]">
            {ORDERED_FLOOR_IDS.map((fid) => {
              const isActive = activeFloor === fid;
              return (
                <button
                  key={fid}
                  onClick={() => setActiveFloor(fid)}
                  className={`py-1 text-center rounded transition-all ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_#22d3ee] border border-cyan-400'
                      : 'bg-[#151b2a]/70 border border-slate-700/50 text-slate-400 hover:border-cyan-400/50 hover:text-cyan-300'
                  }`}
                >
                  {fid}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search / Filter Inside Floor Deck */}
        <div className="pt-2.5 pb-2 shrink-0 flex items-center gap-2">
          <div className="relative flex-1">
            <svg
              className="w-4 h-4 absolute left-2 top-2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter equipment, tag, meter..."
              className="w-full bg-[#070e1c]/80 border border-slate-700/60 rounded py-1 pl-7 pr-2 font-['JetBrains_Mono',monospace] text-[11px] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <button
            onClick={() => setSearch('')}
            className="px-2 py-1 rounded bg-[#19202e]/60 border border-slate-700/50 font-['JetBrains_Mono',monospace] text-[10px] text-slate-400 hover:text-cyan-300"
          >
            RESET
          </button>
        </div>

        {/* Floor Overview Card Content */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scroll font-['JetBrains_Mono',monospace]">
          {/* Card 1: Floor Substructure Profile */}
          <div className="p-3 rounded-lg bg-[#151b2a]/80 border border-cyan-500/20 space-y-1.5">
            <div className="flex items-center justify-between border-b border-slate-700/30 pb-1">
              <span className="font-bold text-white text-[11px] flex items-center gap-1.5">
                <span className="text-cyan-400">⚡</span> FLOOR TOPOLOGY
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/25">
                DISCOVERED
              </span>
            </div>
            <div className="text-[11px] text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Node Identifier:</span>
                <span className="text-cyan-300">{floorMeta.nodeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">BIM Elevation:</span>
                <span className="text-slate-200">{floorMeta.elevation.toFixed(1)} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Clear Height:</span>
                <span className="text-slate-200">{floorMeta.height.toFixed(1)} m</span>
              </div>
              <p className="text-[10px] text-slate-400 pt-1 leading-snug">
                {floorMeta.description}
              </p>
            </div>
          </div>

          {/* Card 2: Digital Twin Telemetry Summary */}
          <div className="p-3 rounded-lg bg-[#151b2a]/80 border border-cyan-500/20 space-y-1.5">
            <div className="flex items-center justify-between border-b border-slate-700/30 pb-1">
              <span className="font-bold text-white text-[11px] flex items-center gap-1.5">
                <span className="text-cyan-400">📊</span> SUB-METER SUMMARY
              </span>
              <span className="text-[10px] text-cyan-300 bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/25">
                LIVE
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#0c1321]/60 rounded text-center text-[10px]">
              <div>
                <span className="text-cyan-300 font-bold text-xs">
                  {activeFloor === 'GF' ? '13' : activeFloor === 'UR' ? '3' : '2'}
                </span>
                <span className="text-slate-400 block text-[8px]">KWH METERS</span>
              </div>
              <div>
                <span className="text-slate-200 font-bold text-xs">
                  {activeFloor === 'GF' ? '13' : '2'}
                </span>
                <span className="text-slate-400 block text-[8px]">WATER FLOW</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold text-xs">
                  {activeFloor === 'GF' ? '9' : activeFloor === 'B1' ? '2' : '2'}
                </span>
                <span className="text-slate-400 block text-[8px]">BTU COOLING</span>
              </div>
            </div>
          </div>

          {/* Card 3: Automation Status */}
          <div className="p-3 rounded-lg bg-[#151b2a]/80 border border-cyan-500/20 space-y-1 text-[11px]">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Modbus Loop:</span>
              <span className="text-emerald-400 font-bold">SYNCHRONIZED</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">BACnet Objects:</span>
              <span className="text-cyan-300">439 Total Mapped</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Life Safety Interlocks:</span>
              <span className="text-emerald-400">HEALTHY</span>
            </div>
          </div>
        </div>

        {/* Deck Footer */}
        <div className="pt-2.5 border-t border-cyan-500/20 shrink-0 flex items-center justify-between text-[10px] font-['JetBrains_Mono',monospace] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            MODBUS/BACNET: 48 NODE SYNC
          </span>
          <button
            onClick={toggleDevPanel}
            className="text-cyan-400 hover:underline flex items-center gap-0.5"
          >
            DEV TRACES ↗
          </button>
        </div>
      </div>
    </section>
  );
};
