import React from 'react';
import { IconElevatorHeader } from './DashboardIcons';

export const ElevatorPerformanceCard: React.FC = () => {
  return (
    <div className="w-80 bg-[#0e1428]/85 backdrop-blur-2xl border border-indigo-500/25 rounded-2xl p-4 shadow-[0_12px_40px_rgba(4,7,20,0.85)] text-slate-300 font-['Inter',sans-serif] pointer-events-auto select-none">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <IconElevatorHeader size={16} className="text-white" />
        <h3 className="font-bold text-white text-sm tracking-wide">
          Elevator Performance
        </h3>
      </div>
      <p className="text-[10px] text-slate-400 mb-4">
        Comparative Analysis of Car Occupancy
      </p>

      {/* Progress Bars & Grid */}
      <div className="relative pt-1 pb-2">
        {/* Vertical Dashed Grid Lines */}
        <div className="absolute inset-0 flex justify-between pointer-events-none pl-12 pr-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-full border-r border-dashed border-slate-700/50"
            />
          ))}
        </div>

        {/* AVG Bar */}
        <div className="flex items-center gap-3 mb-3 relative z-10">
          <span className="w-9 text-xs font-mono text-slate-300 font-semibold">
            AVG
          </span>
          <div className="flex-1 h-3 bg-[#151b32] rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 shadow-[0_0_12px_rgba(129,140,248,0.7)]"
              style={{ width: '70%' }}
            />
          </div>
        </div>

        {/* Peak Bar */}
        <div className="flex items-center gap-3 relative z-10">
          <span className="w-9 text-xs font-mono text-slate-300 font-semibold">
            Peak
          </span>
          <div className="flex-1 h-3 bg-[#151b32] rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 shadow-[0_0_14px_rgba(245,158,11,0.8)]"
              style={{ width: '88%' }}
            />
          </div>
        </div>

        {/* Axis Labels */}
        <div className="flex justify-between pl-12 pr-1 mt-3 text-[9px] font-mono text-slate-400">
          <span>20%</span>
          <span>40%</span>
          <span>60%</span>
          <span>80%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};
