import React, { useState, useEffect } from 'react';
import { useBuildingStore } from '../../store/buildingStore';
import { FLOOR_CONFIGS } from '../../types/building';
import { WeatherWidget } from './WeatherWidget';

// Mathematical cardinal heading from degrees
function getCardinalHeading(deg: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

// Compass Ruler Component bound to cameraAzimuth
const CompassRuler: React.FC<{ azimuth: number }> = ({ azimuth }) => {
  // Normalize azimuth to 0-360
  const normalized = ((azimuth % 360) + 360) % 360;
  const cardinal = getCardinalHeading(normalized);

  // We show a horizontal tape strip from azimuth - 40 to azimuth + 40
  const ticks = [];
  const startDeg = Math.floor((normalized - 35) / 5) * 5;
  const endDeg = startDeg + 70;

  for (let d = startDeg; d <= endDeg; d += 5) {
    const displayD = ((d % 360) + 360) % 360;
    const isMajor = displayD % 45 === 0;
    const isMid = displayD % 15 === 0;
    let label = '';
    if (displayD === 0) label = 'N';
    else if (displayD === 45) label = 'NE';
    else if (displayD === 90) label = 'E';
    else if (displayD === 135) label = 'SE';
    else if (displayD === 180) label = 'S';
    else if (displayD === 225) label = 'SW';
    else if (displayD === 270) label = 'W';
    else if (displayD === 315) label = 'NW';

    // Horizontal offset percentage relative to center (0 at normalized)
    const offset = ((d - normalized) / 70) * 100 + 50;

    ticks.push({
      deg: displayD,
      isMajor,
      isMid,
      label,
      offset
    });
  }

  return (
    <div className="hidden lg:flex flex-col items-center justify-center px-3 py-1 bg-[#0c1321]/80 border border-cyan-500/25 rounded-lg w-52 overflow-hidden select-none">
      <div className="flex items-center justify-between w-full text-[10px] font-['JetBrains_Mono',monospace] text-slate-400 mb-0.5">
        <span className="text-cyan-400 font-semibold">{cardinal}</span>
        <span className="text-white font-mono">{normalized}°</span>
        <span className="text-[9px] text-slate-500 uppercase">HEADING</span>
      </div>
      {/* Tape Viewport */}
      <div className="relative w-full h-4 overflow-hidden border-t border-cyan-500/20">
        {/* Center reticle hairline */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-400 -translate-x-1/2 z-10 shadow-[0_0_6px_#22d3ee]" />
        
        {/* Sliding tick markers */}
        {ticks.map((t, idx) => (
          <div
            key={`${t.deg}-${idx}`}
            className="absolute top-0 flex flex-col items-center -translate-x-1/2"
            style={{ left: `${t.offset}%` }}
          >
            <div
              className={`w-px ${
                t.isMajor
                  ? 'h-2.5 bg-cyan-300'
                  : t.isMid
                  ? 'h-2 bg-slate-400'
                  : 'h-1 bg-slate-600'
              }`}
            />
            {t.label && (
              <span className="text-[8px] font-bold text-cyan-300 mt-0.5 font-['JetBrains_Mono',monospace] leading-none">
                {t.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const TopBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');

  const activeFloor = useBuildingStore((s) => s.activeFloor);
  const cameraAzimuth = useBuildingStore((s) => s.cameraAzimuth);
  const toggleDevPanel = useBuildingStore((s) => s.toggleDevPanel);
  const isDevPanelOpen = useBuildingStore((s) => s.isDevPanelOpen);
  const toggleSiteMaps = useBuildingStore((s) => s.toggleSiteMaps);
  const isSiteMapsOpen = useBuildingStore((s) => s.isSiteMapsOpen);
  const showPins = useBuildingStore((s) => s.showPins);
  const togglePins = useBuildingStore((s) => s.togglePins);
  const showEnvironment = useBuildingStore((s) => s.showEnvironment);
  const toggleEnvironment = useBuildingStore((s) => s.toggleEnvironment);
  const environmentMode = useBuildingStore((s) => s.environmentMode);
  const setEnvironmentMode = useBuildingStore((s) => s.setEnvironmentMode);

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: true }));
      setDateStr(now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeFloorConfig = activeFloor ? FLOOR_CONFIGS[activeFloor] : null;

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-40 px-5 flex items-center justify-between pointer-events-auto bg-[#070e1c]/85 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_24px_rgba(7,14,28,0.7)]">
      {/* Brand & Telemetry Status */}
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-center">
          <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-pulse" />
          <span className="absolute w-5 h-5 rounded-full border border-cyan-400/40 animate-ping" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className="text-white text-base md:text-lg font-bold uppercase tracking-[0.3em] font-['Inter',sans-serif] leading-none"
              style={{ textShadow: '0 0 14px rgba(255,255,255,0.4)' }}
            >
              GOLDEN GATE
            </span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-['JetBrains_Mono',monospace] uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/40 text-cyan-300">
              TWIN OS v4.2
            </span>
          </div>
          <div className="w-36 h-[1.5px] mt-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-transparent shadow-[0_0_8px_#22d3ee]" />
          <div className="flex items-center gap-2 font-['JetBrains_Mono',monospace] text-[10px] text-slate-400 uppercase mt-0.5">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              BACnet/IP ONLINE
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 font-semibold">MESH SYNC 99.8%</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-300 font-bold">
              {activeFloor ? `${activeFloor} ACTIVE` : 'ALL BLOCKS'}
            </span>
          </div>
        </div>
      </div>

      {/* Compass Ruler synchronized with 3D Camera Azimuth */}
      <CompassRuler azimuth={cameraAzimuth} />

      {/* Ambient Sensor Readout & Live Clock & Controls */}
      <div className="flex items-center gap-3">
        {/* Real-time Weather Widget for 30°01'18.7"N 31°30'37.3"E */}
        <WeatherWidget />

        {/* Live Clock */}
        <div className="flex items-center gap-2 font-['JetBrains_Mono',monospace] text-[11px] text-slate-200 bg-[#19202e]/70 px-3 py-1 rounded border border-slate-700/50">
          <span className="text-cyan-400">⏱</span>
          <span className="tracking-wider">{timeStr || '08:14:22 PM'}</span>
          <span className="text-slate-500 text-[10px] hidden sm:inline">| {dateStr}</span>
        </div>

        {/* Atmosphere / Environment Mode Switcher */}
        <div className="hidden md:flex items-center p-0.5 rounded bg-[#19202e]/70 border border-slate-700/50 font-['JetBrains_Mono',monospace] text-[10px]">
          <button
            onClick={() => setEnvironmentMode('cairo_night')}
            className={`px-2 py-0.5 rounded transition-all ${
              environmentMode === 'cairo_night'
                ? 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-400/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Night HUD Mode"
          >
            🌙 NIGHT
          </button>
          <button
            onClick={() => setEnvironmentMode('cairo_sunset')}
            className={`px-2 py-0.5 rounded transition-all ${
              environmentMode === 'cairo_sunset'
                ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-400/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Cairo Golden Hour"
          >
            🌅 SUNSET
          </button>
          <button
            onClick={() => setEnvironmentMode('cairo_day')}
            className={`px-2 py-0.5 rounded transition-all ${
              environmentMode === 'cairo_day'
                ? 'bg-sky-500/25 text-sky-300 font-bold border border-sky-400/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Cairo Desert Daylight"
          >
            ☀️ DAY
          </button>
        </div>

        {/* Toggle District Environment Scene */}
        <button
          onClick={toggleEnvironment}
          className={`p-1.5 rounded border transition-colors flex items-center gap-1 font-['JetBrains_Mono',monospace] text-[10px] ${
            showEnvironment
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
              : 'bg-[#19202e]/60 border-slate-700/50 text-slate-400 hover:text-emerald-300'
          }`}
          title="Toggle South 90th Street District Environment Scene"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="hidden xl:inline font-semibold">DISTRICT SCENE</span>
        </button>

        {/* Google Maps Grounded Location Intel Button */}
        <button
          onClick={toggleSiteMaps}
          className={`p-1.5 rounded border transition-colors flex items-center gap-1 text-[11px] font-['JetBrains_Mono',monospace] ${
            isSiteMapsOpen
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
              : 'bg-[#19202e]/60 border-slate-700/50 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50'
          }`}
          title="Google Maps Grounded Location (30°01'18.7&quot;N 31°30'37.3&quot;E)"
        >
          <svg className="w-4 h-4 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span className="hidden lg:inline text-[10px] text-cyan-300 font-semibold">MAPS</span>
        </button>

        {/* Toggle Spatial Pins */}
        <button
          onClick={togglePins}
          className={`p-1.5 rounded border transition-colors ${
            showPins
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
              : 'bg-[#19202e]/60 border-slate-700/50 text-slate-400 hover:text-cyan-300'
          }`}
          title="Toggle 3D Spatial HUD Markers"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0v10m-7-5l7 5 7-5" />
          </svg>
        </button>

        {/* Toggle Dev / Telemetry Panel */}
        <button
          onClick={toggleDevPanel}
          className={`p-1.5 rounded border transition-colors ${
            isDevPanelOpen
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
              : 'bg-[#19202e]/60 border-slate-700/50 text-slate-400 hover:text-cyan-300'
          }`}
          title="Toggle Dev & Data Quality Panel"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>

        {/* BMS Badge */}
        <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-bold font-['JetBrains_Mono',monospace] text-xs">
          BMS
        </div>
      </div>
    </header>
  );
};
