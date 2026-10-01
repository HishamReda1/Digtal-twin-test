import React, { useState, useEffect } from 'react';

export interface WeatherData {
  success: boolean;
  coordinates: {
    dms: string;
    lat: number;
    lng: number;
  };
  location: string;
  temperatureC: number;
  temperatureF: number;
  apparentC: number;
  humidity: number;
  wetBulbC: number;
  condition: string;
  icon: string;
  isDay: boolean;
  windSpeedKmH: number;
  windSpeedMs: number;
  windDirection: string;
  windDeg: number;
  elevationM: number;
  observedAt: string;
  cached?: boolean;
}

export const WeatherWidget: React.FC = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/weather?latitude=30.02186&longitude=31.51036');
      const json: WeatherData = await res.json();
      if (json && json.success) {
        setData(json);
      }
    } catch (e) {
      console.warn('[WeatherWidget] Error fetching live weather:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const displayTemp = data
    ? unit === 'C'
      ? `${data.temperatureC.toFixed(1)}°C`
      : `${data.temperatureF.toFixed(1)}°F`
    : '27.1°C';

  return (
    <div className="relative select-none font-['JetBrains_Mono',monospace]">
      {/* TopBar Interactive Weather Pill */}
      <button
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        className="flex items-center gap-2 px-2.5 py-1 bg-[#19202e]/75 hover:bg-[#1f293d] border border-slate-700/60 hover:border-cyan-400/60 rounded text-[11px] transition-all group"
        title="Real-Time Weather at 30°01'18.7&quot;N 31°30'37.3&quot;E (Click for detailed ambient telemetry)"
      >
        <span className="text-base group-hover:scale-110 transition-transform">
          {data?.icon || '☀️'}
        </span>
        <span className="text-white font-bold">{displayTemp}</span>
        <span className="text-slate-600">|</span>
        <span className="text-emerald-400 font-medium">
          {data ? `${data.humidity}% RH` : '35% RH'}
        </span>
        <span className="text-slate-600 hidden xl:inline">|</span>
        <span className="text-slate-400 hidden xl:inline">
          {data ? `${data.windSpeedMs} m/s ${data.windDirection}` : '5.1 m/s W'}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
      </button>

      {/* Detailed Ambient Popover Card */}
      {isPopoverOpen && (
        <div className="absolute right-0 top-10 mt-1 w-72 bg-[#0c1321]/95 backdrop-blur-xl border border-cyan-500/40 rounded-xl shadow-[0_12px_40px_rgba(7,14,28,0.95)] p-3.5 z-50 text-xs text-slate-300 space-y-2.5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/25 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              <span className="font-['Inter',sans-serif] font-bold text-white text-[11px] uppercase tracking-wider">
                NEW CAIRO AMBIENT
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUnit(unit === 'C' ? 'F' : 'C');
                }}
                className="px-1.5 py-0.5 rounded bg-[#19202e] border border-slate-700 text-cyan-300 font-bold text-[9px] hover:border-cyan-400"
              >
                °{unit === 'C' ? 'F' : 'C'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPopoverOpen(false);
                }}
                className="text-slate-400 hover:text-white p-0.5"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Condition Banner */}
          <div className="p-2.5 rounded bg-[#151b2a] border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{data?.icon || '☀️'}</span>
              <div>
                <span className="text-white font-bold block text-[13px]">
                  {data?.condition || 'Clear Sky'}
                </span>
                <span className="text-[9px] text-slate-400">
                  Feels like {data?.apparentC ? `${data.apparentC}°C` : '24.5°C'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-cyan-300 font-mono">
                {displayTemp}
              </span>
              <span className="text-[9px] text-emerald-400 block font-semibold">
                ● LIVE STATION
              </span>
            </div>
          </div>

          {/* Detailed Psychrometric & Wind Grid */}
          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            <div className="p-2 rounded bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[9px]">Relative Humidity</span>
              <span className="text-slate-200 font-bold">{data?.humidity || 35}% RH</span>
            </div>
            <div className="p-2 rounded bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[9px]" title="Wet-Bulb Temperature for Cooling ETS">
                Wet-Bulb Temp (Tw)
              </span>
              <span className="text-emerald-400 font-bold">{data?.wetBulbC || 17.8}°C</span>
            </div>
            <div className="p-2 rounded bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[9px]">Wind Vector</span>
              <span className="text-slate-200 font-bold">
                {data ? `${data.windSpeedKmH} km/h ${data.windDirection}` : '18.4 km/h W'}
              </span>
            </div>
            <div className="p-2 rounded bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[9px]">Site Elevation</span>
              <span className="text-cyan-300 font-bold">{data?.elevationM || 317} m AMSL</span>
            </div>
          </div>

          {/* Geographical Coordinates */}
          <div className="p-2 rounded bg-[#101726] border border-slate-800 text-[9px] space-y-0.5">
            <div className="flex justify-between text-slate-400">
              <span>Coordinates:</span>
              <span className="text-cyan-300 font-mono">30°01'18.7"N 31°30'37.3"E</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Location:</span>
              <span className="text-slate-300">South 90th St, New Cairo</span>
            </div>
          </div>

          {/* Refresh Action */}
          <div className="pt-1 flex items-center justify-between text-[9px] text-slate-400">
            <span>Observed: {data?.observedAt ? data.observedAt.replace('T', ' ') : 'Live'}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                fetchWeather();
              }}
              disabled={loading}
              className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
            >
              {loading ? 'Fetching...' : '↺ Refresh Now'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
