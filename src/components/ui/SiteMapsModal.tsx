import React, { useEffect, useState } from 'react';
import { useBuildingStore } from '../../store/buildingStore';

interface MapsInfoResponse {
  success: boolean;
  text: string;
  groundingChunks?: any[];
  fallback?: boolean;
  locationName?: string;
  coordinates?: {
    dms: string;
    lat: number;
    lng: number;
  };
  siteContext?: {
    district: string;
    governorate: string;
    climate: string;
    designCoolingLoad: string;
    elevationMeters: number;
  };
}

export const SiteMapsModal: React.FC = () => {
  const isSiteMapsOpen = useBuildingStore((s) => s.isSiteMapsOpen);
  const toggleSiteMaps = useBuildingStore((s) => s.toggleSiteMaps);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MapsInfoResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchMapsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/maps/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: 30.02186,
          longitude: 31.51036,
          query:
            'Provide real-time site, transit, surrounding developments, and infrastructure details for Golden Gate complex at 30°01\'18.7"N 31°30\'37.3"E on South 90th Street in New Cairo, Egypt.'
        })
      });
      const json: MapsInfoResponse = await res.json();
      setData(json);
    } catch (err: any) {
      console.error('[SiteMapsModal] Failed to fetch maps info:', err);
      setError('Unable to contact Maps Grounding service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSiteMapsOpen && !data) {
      fetchMapsData();
    }
  }, [isSiteMapsOpen, data]);

  if (!isSiteMapsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/80 backdrop-blur-md select-none font-['JetBrains_Mono',monospace]">
      <div className="w-[580px] max-w-full bg-[#0c1321] border border-cyan-400/40 rounded-xl shadow-[0_16px_50px_rgba(7,14,28,0.95)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-cyan-500/25 bg-[#070e1c]">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
            <div>
              <h3 className="text-white text-xs font-bold uppercase tracking-wider font-['Inter',sans-serif]">
                SITE LOCATION &amp; GOOGLE MAPS GROUNDING
              </h3>
              <p className="text-[10px] text-cyan-300">
                30°01'18.7"N 31°30'37.3"E // NEW CAIRO, EGYPT
              </p>
            </div>
          </div>
          <button
            onClick={toggleSiteMaps}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-300 custom-scroll">
          {/* Status Badge */}
          <div className="flex items-center justify-between p-2 rounded bg-[#151b2a] border border-cyan-500/30">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                GROUNDED WITH GOOGLE MAPS
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px]">
              gemini-3.5-flash
            </span>
          </div>

          {/* Coordinate Quick Facts */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[9px] uppercase">DMS Coordinates</span>
              <span className="text-cyan-300 font-bold">30°01'18.7"N 31°30'37.3"E</span>
            </div>
            <div className="p-2.5 rounded bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[9px] uppercase">Decimal Coordinates</span>
              <span className="text-slate-200 font-bold">30.02186° N, 31.51036° E</span>
            </div>
            <div className="p-2.5 rounded bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[9px] uppercase">Corridor Address</span>
              <span className="text-white font-semibold">South 90th Street, New Cairo</span>
            </div>
            <div className="p-2.5 rounded bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[9px] uppercase">District &amp; Country</span>
              <span className="text-white font-semibold">Fifth Settlement, Cairo, Egypt</span>
            </div>
          </div>

          {/* Loading or Grounded Text */}
          {loading ? (
            <div className="py-8 flex flex-col items-center justify-center space-y-2 text-slate-400">
              <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <span>Querying Google Maps Grounding via Gemini...</span>
            </div>
          ) : error ? (
            <div className="p-3 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300">
              {error}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3.5 rounded bg-[#151b2a] border border-slate-800 space-y-2">
                <span className="text-cyan-300 font-bold text-[11px] block uppercase">
                  Site &amp; Infrastructure Intelligence
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed whitespace-pre-line font-['Inter',sans-serif]">
                  {data?.text}
                </p>
              </div>

              {/* District MEP Context */}
              <div className="p-3 rounded bg-[#101726] border border-slate-800 space-y-1.5 text-[11px]">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">
                  BMS Digital Twin Geo-Context
                </span>
                <div className="flex justify-between">
                  <span className="text-slate-400">Climate Zone:</span>
                  <span className="text-slate-200">BWh (Hot Desert) // High Solar Irradiance</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">District Cooling Supply:</span>
                  <span className="text-emerald-400 font-bold">5.5°C Secondary CHW Loop</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Solar Yield Potential:</span>
                  <span className="text-amber-300 font-bold">2,150 kWh/m² / year</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-cyan-500/20 bg-[#070e1c] flex items-center justify-between text-[11px]">
          <button
            onClick={fetchMapsData}
            disabled={loading}
            className="px-3 py-1 rounded bg-[#19202e] border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Intel
          </button>

          <div className="flex items-center gap-2">
            <a
              href="https://www.google.com/maps/search/?api=1&query=30.021861,31.510361"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 font-bold transition-all flex items-center gap-1"
            >
              Open in Google Maps ↗
            </a>
            <button
              onClick={toggleSiteMaps}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
