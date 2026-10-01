import React from 'react';

export const ParkingSpotsCard: React.FC = () => {
  return (
    <div className="bg-[#0e1428]/85 backdrop-blur-2xl border border-indigo-500/25 rounded-2xl p-4 shadow-[0_12px_40px_rgba(4,7,20,0.85)] text-slate-300 font-['Inter',sans-serif] pointer-events-auto select-none min-w-[260px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-0.5">
        <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold flex items-center justify-center text-xs">
          P
        </span>
        <h3 className="font-bold text-white text-sm tracking-wide">
          Parking Spots
        </h3>
      </div>
      <p className="text-[10px] text-slate-400 mb-3">
        Real-time tracking of vacant spots
      </p>

      {/* Main Count & Occupancy Badge */}
      <div className="flex items-baseline justify-between gap-4 mt-1">
        <div className="flex items-baseline gap-1.5">
          <span className="font-['Inter',sans-serif] font-black text-3xl text-white tracking-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
            412
          </span>
          <span className="text-xs font-semibold text-slate-400">Free</span>
        </div>

        {/* Occupancy Pill Badge */}
        <span className="px-3 py-1 rounded-full bg-indigo-600/30 border border-indigo-400/40 text-indigo-300 text-xs font-bold font-mono shadow-[0_0_12px_rgba(99,102,241,0.3)]">
          78% Occupancy
        </span>
      </div>
    </div>
  );
};
