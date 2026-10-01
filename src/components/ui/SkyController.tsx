import React, { useState } from 'react';
import { useBuildingStore } from '../../store/buildingStore';

function formatHoursToTime(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return `${String(displayH).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
}

export const SkyController: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const skyTime = useBuildingStore((s) => s.skyTime);
  const isSkyAutoPlaying = useBuildingStore((s) => s.isSkyAutoPlaying);
  const setSkyTime = useBuildingStore((s) => s.setSkyTime);
  const toggleSkyAutoPlay = useBuildingStore((s) => s.toggleSkyAutoPlay);

  // Solar Metrics based on time
  const dayProgress = (skyTime / 24) * 2 * Math.PI - Math.PI / 2;
  const solarElevation = Math.max(0, Math.sin(dayProgress));
  const solarIrradiance = Math.round(solarElevation * 1020);
  const uvIndex = (solarElevation * 11).toFixed(1);

  return (
    <div className="fixed bottom-12 right-20 z-40 select-none font-['JetBrains_Mono',monospace]">
      {/* Expanded Controller Card */}
      {isOpen && (
        <div className="mb-2 p-3.5 w-80 bg-[#070e1c]/95 backdrop-blur-xl border border-cyan-400/40 rounded-xl shadow-[0_12px_40px_rgba(7,14,28,0.95)] text-slate-300 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-pulse" />
              <span className="font-['Inter',sans-serif] font-bold text-white text-xs uppercase tracking-wider">
                ULTRA DYNAMIC SKY &amp; SUN
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Time Scrubber Display & Play Toggle */}
          <div className="p-2 rounded bg-[#101726] border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Solar Time</span>
              <span className="text-lg font-bold text-cyan-300 font-mono">
                {formatHoursToTime(skyTime)}
              </span>
            </div>
            <button
              onClick={toggleSkyAutoPlay}
              className={`px-3 py-1 rounded text-[11px] font-bold border transition-all flex items-center gap-1.5 ${
                isSkyAutoPlaying
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                  : 'bg-[#19202e] border-slate-700 text-slate-300 hover:border-cyan-400'
              }`}
            >
              {isSkyAutoPlaying ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  PAUSE
                </>
              ) : (
                <>▶ AUTO TIME-LAPSE</>
              )}
            </button>
          </div>

          {/* Time Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>00:00 (Midnight)</span>
              <span>12:00 (Noon)</span>
              <span>23:59</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              step="0.1"
              value={skyTime}
              onChange={(e) => setSkyTime(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#151b2a] rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Quick Preset Buttons */}
          <div className="grid grid-cols-4 gap-1 text-[10px]">
            <button
              onClick={() => setSkyTime(6.25)}
              className="py-1 rounded bg-[#151b2a] hover:bg-cyan-500/20 border border-slate-700/60 hover:border-cyan-400 text-slate-300 text-center"
              title="06:15 AM Dawn"
            >
              🌅 DAWN
            </button>
            <button
              onClick={() => setSkyTime(12)}
              className="py-1 rounded bg-[#151b2a] hover:bg-cyan-500/20 border border-slate-700/60 hover:border-cyan-400 text-slate-300 text-center"
              title="12:00 PM Midday Sun"
            >
              ☀️ NOON
            </button>
            <button
              onClick={() => setSkyTime(17.8)}
              className="py-1 rounded bg-[#151b2a] hover:bg-cyan-500/20 border border-slate-700/60 hover:border-cyan-400 text-slate-300 text-center"
              title="05:48 PM Golden Hour"
            >
              🌇 SUNSET
            </button>
            <button
              onClick={() => setSkyTime(21.5)}
              className="py-1 rounded bg-[#151b2a] hover:bg-cyan-500/20 border border-slate-700/60 hover:border-cyan-400 text-slate-300 text-center"
              title="09:30 PM Cyber Night"
            >
              🌙 NIGHT
            </button>
          </div>

          {/* Cairo Solar Metrics */}
          <div className="p-2 rounded bg-[#101726] border border-slate-800 grid grid-cols-2 gap-2 text-[10px]">
            <div>
              <span className="text-slate-400 block text-[9px]">Solar Irradiance</span>
              <span className="text-amber-300 font-bold">{solarIrradiance} W/m²</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px]">UV Index</span>
              <span className="text-cyan-300 font-bold">{uvIndex}</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 rounded-full bg-[#070e1c]/90 backdrop-blur-md border border-cyan-400/50 hover:border-cyan-400 text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.25)] flex items-center gap-2 transition-all hover:scale-105"
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-xs font-bold font-['Inter',sans-serif]">
          {isSkyAutoPlaying ? '☀️ TIME-LAPSE ACTIVE' : `SKY: ${formatHoursToTime(skyTime)}`}
        </span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};
