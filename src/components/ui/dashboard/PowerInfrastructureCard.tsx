import React from 'react';
import { IconPowerHeader } from './DashboardIcons';

export const PowerInfrastructureCard: React.FC = () => {
  return (
    <div className="w-84 bg-[#0e1428]/85 backdrop-blur-2xl border border-indigo-500/25 rounded-2xl p-4 shadow-[0_12px_40px_rgba(4,7,20,0.85)] text-slate-300 font-['Inter',sans-serif] pointer-events-auto select-none">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <IconPowerHeader size={16} className="text-white" />
        <h3 className="font-bold text-white text-sm tracking-wide">
          Power Infrastructure
        </h3>
      </div>
      <p className="text-[10px] text-slate-400 mb-2">
        Main High-Voltage Transformer Load
      </p>

      {/* Semicircular Arc Gauge */}
      <div className="relative flex flex-col items-center justify-center my-1">
        <div className="relative w-44 h-24 overflow-hidden flex items-end justify-center">
          {/* SVG Semicircle Gauge */}
          <svg className="w-44 h-44 -mt-20" viewBox="0 0 160 160">
            {/* Background Arc */}
            <path
              d="M 20 80 A 60 60 0 0 1 140 80"
              fill="none"
              stroke="#19223c"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Active Amber Glow Arc */}
            <path
              d="M 20 80 A 60 60 0 0 1 140 80"
              fill="none"
              stroke="url(#powerArcGradient)"
              strokeWidth="10"
              strokeDasharray="188.5"
              strokeDashoffset="48"
              strokeLinecap="round"
              className="drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]"
            />
            <defs>
              <linearGradient id="powerArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="60%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center KPI Display */}
          <div className="absolute bottom-1 flex flex-col items-center justify-center">
            <span className="text-[10px] font-mono text-slate-400 -mb-0.5">
              Main Kpi
            </span>
            <span className="font-['Inter',sans-serif] font-black text-2xl text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
              74.2%
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="mt-3 space-y-2 border-t border-slate-800/80 pt-2.5 text-xs font-['Inter',sans-serif]">
        <div className="flex justify-between items-center text-slate-400">
          <span>Active Power</span>
          <span className="font-mono font-bold text-white">6230 kw</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span>Reactive Power</span>
          <span className="font-mono font-bold text-white">1140 kVAR</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span>Peak Today</span>
          <span className="font-mono font-bold text-white">88%</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span>Status</span>
          <span className="font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
            Optimal
          </span>
        </div>
      </div>
    </div>
  );
};
