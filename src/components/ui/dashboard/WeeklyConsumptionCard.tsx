import React from 'react';
import { IconCalendarHeader } from './DashboardIcons';

const WEEK_DATA = [
  { day: 'Sunday', irrigation: 78, water: 48 },
  { day: 'Monday', irrigation: 52, water: 82 },
  { day: 'Tuesday', irrigation: 80, water: 22 },
  { day: 'Wednesday', irrigation: 64, water: 44 },
  { day: 'Thursday', irrigation: 75, water: 90 },
  { day: 'Friday', irrigation: 68, water: 86 },
  { day: 'Saturday', irrigation: 72, water: 84 }
];

export const WeeklyConsumptionCard: React.FC = () => {
  return (
    <div className="w-84 bg-[#0e1428]/85 backdrop-blur-2xl border border-indigo-500/25 rounded-2xl p-4 shadow-[0_12px_40px_rgba(4,7,20,0.85)] text-slate-300 font-['Inter',sans-serif] pointer-events-auto select-none">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <IconCalendarHeader size={16} className="text-white" />
        <h3 className="font-bold text-white text-sm tracking-wide">
          Weekly Consumption
        </h3>
      </div>
      <p className="text-[10px] text-slate-400 mb-2">Comparative Analysis</p>

      {/* Legend */}
      <div className="flex items-center gap-3 text-[10px] mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
          <span className="text-slate-300">Irrigation Consumption</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]" />
          <span className="text-slate-300">Water Consumption</span>
        </div>
      </div>

      {/* 7-Day Dual Bar Chart */}
      <div className="relative h-36 flex items-end pt-3 pb-6 border-b border-slate-800/80">
        {/* Y-Axis Ticks */}
        <div className="absolute left-0 top-0 bottom-6 w-5 flex flex-col justify-between text-[8px] font-mono text-slate-500 text-right pr-1">
          <span>100</span>
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>

        {/* Horizontal Grid Lines */}
        <div className="absolute left-6 right-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="border-b border-slate-800/40 w-full" />
          ))}
        </div>

        {/* Grouped Bars Container */}
        <div className="ml-7 flex-1 h-full flex items-end justify-between pr-1">
          {WEEK_DATA.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-end h-full w-9 group relative cursor-pointer"
            >
              {/* Bars Row */}
              <div className="flex items-end gap-1 w-full justify-center h-full">
                {/* Irrigation (Cyan Bar) */}
                <div
                  className="w-2.5 rounded-t-sm bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)] group-hover:brightness-125 transition-all"
                  style={{ height: `${item.irrigation}%` }}
                />
                {/* Water (Amber Bar) */}
                <div
                  className="w-2.5 rounded-t-sm bg-gradient-to-t from-amber-600 to-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)] group-hover:brightness-125 transition-all"
                  style={{ height: `${item.water}%` }}
                />
              </div>

              {/* Day Label */}
              <span className="absolute -bottom-5 text-[8px] font-mono text-slate-400 truncate max-w-full">
                {item.day.slice(0, 3)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
