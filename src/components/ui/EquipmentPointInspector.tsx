import React from 'react';
import { useBuildingStore } from '../../store/buildingStore';

export const EquipmentPointInspector: React.FC = () => {
  const selectedEquipment = useBuildingStore((s) => s.selectedEquipment);
  const setSelectedEquipment = useBuildingStore((s) => s.setSelectedEquipment);

  if (!selectedEquipment) return null;

  const { name, floor, type, status, summaryBadge, points } = selectedEquipment;

  return (
    <aside className="fixed right-6 top-24 bottom-24 w-96 bg-[#0c142b]/95 backdrop-blur-2xl border border-indigo-500/40 rounded-2xl p-5 shadow-[0_16px_50px_rgba(4,7,24,0.9)] z-50 flex flex-col font-['Inter',sans-serif] pointer-events-auto animate-in slide-in-from-right-8 duration-200">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-slate-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-400/40">
              BUILDING A02 • FL {floor}
            </span>
            <span className="text-[10px] font-mono text-cyan-400 font-bold">
              {type}
            </span>
          </div>
          <h2 className="text-base font-bold text-white mt-1 tracking-wide">
            {name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-300 font-semibold">
              {summaryBadge}
            </span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedEquipment(null)}
          className="w-7 h-7 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Close Inspector (ESC)"
        >
          ✕
        </button>
      </div>

      {/* Point Schedule Table (matching Excel BMS Sheets) */}
      <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-3 custom-scrollbar">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider pb-1">
          <span>POINT NAME // BIND</span>
          <span>LIVE VALUE</span>
        </div>

        {points.map((pt, idx) => {
          const isControl = pt.category === 'Control' || pt.category === 'Controllable';
          return (
            <div
              key={`${pt.bindName}-${idx}`}
              className="p-2.5 rounded-xl bg-[#141d38]/80 border border-slate-700/50 hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase ${
                        isControl
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {pt.category}
                    </span>
                    <span className="text-xs font-bold text-white font-mono">
                      {pt.pointName}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                    Bind: <span className="text-cyan-400">{pt.bindName}</span>
                  </div>
                </div>

                {/* Current Value Display / Control */}
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-white bg-slate-900/80 px-2 py-1 rounded border border-slate-700/60 inline-block shadow-inner">
                    {pt.currentValue !== undefined ? String(pt.currentValue) : '—'}
                    {pt.units ? ` ${pt.units}` : ''}
                  </span>
                </div>
              </div>

              {/* Point Meta footer */}
              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800/80 text-[9px] font-mono text-slate-500">
                <span>Card: {pt.cardName}</span>
                <span>
                  {pt.values || (pt.valueRange ? `Range: ${pt.valueRange}` : pt.pointType)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-700/60 mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>Total Points: {points.length}</span>
        <span className="text-emerald-400">MODBUS / BACnet IP Bound</span>
      </div>
    </aside>
  );
};
