import React from 'react';
import { IconAirHeader } from './DashboardIcons';

export const AirQualityCard: React.FC = () => {
  return (
    <div className="w-80 bg-[#0e1428]/85 backdrop-blur-2xl border border-indigo-500/25 rounded-2xl p-4 shadow-[0_12px_40px_rgba(4,7,20,0.85)] text-slate-300 font-['Inter',sans-serif] pointer-events-auto select-none">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <IconAirHeader size={16} className="text-white" />
        <h3 className="font-bold text-white text-sm tracking-wide">
          Air Quality Index
        </h3>
      </div>
      <p className="text-[10px] text-slate-400 mb-3">
        Environmental Health &amp; Filtration System
      </p>

      {/* Circular Gauge Dial */}
      <div className="relative flex items-center justify-center my-2">
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* SVG Radial Gauge Dial */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Background Track Circle */}
            <circle
              cx="80"
              cy="80"
              r="66"
              fill="none"
              stroke="#19223c"
              strokeWidth="6"
              strokeDasharray="4 3"
            />
            {/* Active Colored Arc (Gradient from cyan to amber/orange) */}
            <circle
              cx="80"
              cy="80"
              r="66"
              fill="none"
              stroke="url(#aqiGradient)"
              strokeWidth="7"
              strokeDasharray="414"
              strokeDashoffset="75"
              strokeLinecap="round"
              className="transition-all duration-1000 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
            />
            <defs>
              <linearGradient id="aqiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="60%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
          </svg>

          {/* Perimeter Gauge Numbers */}
          <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400">
            200
          </span>
          <span className="absolute top-3 right-6 text-[9px] font-mono text-slate-400">
            300
          </span>
          <span className="absolute bottom-6 right-3 text-[9px] font-mono text-slate-400">
            400
          </span>
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400">
            500
          </span>
          <span className="absolute top-1/2 left-2 -translate-y-1/2 text-[9px] font-mono text-slate-400">
            100
          </span>

          {/* Center Dark Metallic Disc */}
          <div className="absolute w-24 h-24 rounded-full bg-gradient-to-b from-[#161f38] to-[#090d1c] border border-slate-700 shadow-[inset_0_2px_8px_rgba(255,255,255,0.1),0_8px_20px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center">
            <span className="font-['Inter',sans-serif] font-black text-2xl text-white tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              450
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider">
              PPM
            </span>
          </div>
        </div>
      </div>

      {/* Environmental Telemetry Metrics Table */}
      <div className="mt-2 space-y-2 border-t border-slate-800/80 pt-2.5 text-xs font-['Inter',sans-serif]">
        <div className="flex justify-between items-center text-slate-400">
          <span>Relative Humidity</span>
          <span className="font-mono font-bold text-white">45%</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span>Oxygen Level</span>
          <span className="font-mono font-bold text-white">20.9%</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span>PM Index</span>
          <span className="font-mono font-bold text-white">12 µg/m³</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span>Filter Status</span>
          <span className="font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
            Clean
          </span>
        </div>
      </div>
    </div>
  );
};
