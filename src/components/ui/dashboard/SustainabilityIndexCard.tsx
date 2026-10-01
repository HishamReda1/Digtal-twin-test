import React from 'react';
import { IconLeafHeader } from './DashboardIcons';

export const SustainabilityIndexCard: React.FC = () => {
  return (
    <div className="bg-[#0e1428]/85 backdrop-blur-2xl border border-indigo-500/25 rounded-2xl p-4 shadow-[0_12px_40px_rgba(4,7,20,0.85)] text-slate-300 font-['Inter',sans-serif] pointer-events-auto select-none min-w-[420px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <IconLeafHeader size={16} className="text-emerald-400" />
        <h3 className="font-bold text-white text-sm tracking-wide">
          Sustainability Index
        </h3>
      </div>

      {/* Dual Metrics Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* 1. Energy Consumption */}
        <div className="flex items-center justify-between border-r border-slate-800/80 pr-4">
          <div>
            <span className="block text-[10px] text-slate-400">
              Energy Consumption
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-['Inter',sans-serif] font-black text-2xl text-white tracking-tight">
                14.2
              </span>
              <span className="text-xs font-mono text-slate-400 font-semibold">
                MWh
              </span>
            </div>
          </div>

          {/* Circular Badge Ring */}
          <div className="w-12 h-12 rounded-full border-2 border-amber-400/80 bg-amber-500/10 flex flex-col items-center justify-center shadow-[0_0_12px_rgba(251,191,36,0.35)]">
            <span className="text-[11px] font-bold text-amber-300 leading-tight">
              88%
            </span>
            <span className="text-[8px] text-amber-200/70 -mt-0.5 uppercase">
              Total
            </span>
          </div>
        </div>

        {/* 2. Water Consumption */}
        <div className="flex items-center justify-between pl-2">
          <div>
            <span className="block text-[10px] text-slate-400">
              Water Consumption
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-['Inter',sans-serif] font-black text-2xl text-white tracking-tight">
                2150
              </span>
              <span className="text-xs font-mono text-slate-400 font-semibold">
                m³
              </span>
            </div>
          </div>

          {/* Circular Badge Ring */}
          <div className="w-12 h-12 rounded-full border-2 border-indigo-400/80 bg-indigo-500/10 flex flex-col items-center justify-center shadow-[0_0_12px_rgba(129,140,248,0.35)]">
            <span className="text-[11px] font-bold text-indigo-300 leading-tight">
              24%
            </span>
            <span className="text-[8px] text-indigo-200/70 -mt-0.5 uppercase">
              Total
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
