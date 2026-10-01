import React, { useState } from 'react';
import { useBuildingStore } from '../../store/buildingStore';
import { DATA_OVERRIDES } from '../../data/overrides';
import { EXPECTED_FLOOR_NODES } from '../../types/building';

export const DevPanel: React.FC = () => {
  const isDevPanelOpen = useBuildingStore((s) => s.isDevPanelOpen);
  const toggleDevPanel = useBuildingStore((s) => s.toggleDevPanel);
  const discoveredNodes = useBuildingStore((s) => s.discoveredNodes);
  const registeredFloors = useBuildingStore((s) => s.registeredFloors);
  const missingNodes = useBuildingStore((s) => s.missingNodes);
  const modelSource = useBuildingStore((s) => s.modelSource);
  const currentFps = useBuildingStore((s) => s.currentFps);
  const drawCalls = useBuildingStore((s) => s.drawCalls);
  const triangles = useBuildingStore((s) => s.triangles);
  const cameraAzimuth = useBuildingStore((s) => s.cameraAzimuth);
  const cameraElevation = useBuildingStore((s) => s.cameraElevation);
  const cameraDistance = useBuildingStore((s) => s.cameraDistance);
  const isExploded = useBuildingStore((s) => s.isExploded);
  const toggleExploded = useBuildingStore((s) => s.toggleExploded);
  const explosionGap = useBuildingStore((s) => s.explosionGap);
  const setExplosionGap = useBuildingStore((s) => s.setExplosionGap);

  const [activeTab, setActiveTab] = useState<'NODES' | 'DATA_QUALITY' | 'PERF'>('NODES');

  if (!isDevPanelOpen) return null;

  return (
    <div className="fixed right-20 top-20 w-[420px] max-w-[95vw] max-h-[85vh] flex flex-col bg-[#070e1c]/95 backdrop-blur-xl border border-cyan-500/40 rounded-xl shadow-[0_12px_40px_rgba(7,14,28,0.95)] z-50 pointer-events-auto font-['JetBrains_Mono',monospace] text-xs overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/25 bg-[#0c1321]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          <span className="text-white font-bold tracking-wider uppercase text-[11px]">
            DEV DIAGNOSTICS & TELEMETRY
          </span>
        </div>
        <button
          onClick={toggleDevPanel}
          className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          title="Close Dev Panel"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-[#0a101d] text-[10px]">
        <button
          onClick={() => setActiveTab('NODES')}
          className={`flex-1 py-2 text-center border-b-2 font-bold transition-all ${
            activeTab === 'NODES'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          NODES &amp; MESH ({discoveredNodes.length})
        </button>
        <button
          onClick={() => setActiveTab('DATA_QUALITY')}
          className={`flex-1 py-2 text-center border-b-2 font-bold transition-all ${
            activeTab === 'DATA_QUALITY'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          DATA OVERRIDES ({DATA_OVERRIDES.length})
        </button>
        <button
          onClick={() => setActiveTab('PERF')}
          className={`flex-1 py-2 text-center border-b-2 font-bold transition-all ${
            activeTab === 'PERF'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          PERFORMANCE
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 overflow-y-auto space-y-3 flex-1 custom-scroll text-[11px]">
        {activeTab === 'NODES' && (
          <div className="space-y-3">
            <div className="p-2.5 rounded bg-[#151b2a] border border-cyan-500/20 space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Model Source:</span>
                <span className="text-cyan-300 font-bold uppercase">{modelSource}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Registered Floors:</span>
                <span className="text-emerald-400 font-bold">
                  {registeredFloors.length} / {EXPECTED_FLOOR_NODES.length}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Missing Nodes:</span>
                <span className={missingNodes.length > 0 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                  {missingNodes.length > 0 ? missingNodes.join(', ') : 'None (All Valid)'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-1.5">
                Top-Level Node Hierarchy
              </span>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {discoveredNodes.map((node, i) => {
                  const isExpected = EXPECTED_FLOOR_NODES.includes(node as any);
                  return (
                    <div
                      key={node}
                      className="flex items-center justify-between p-1.5 rounded bg-[#101726] border border-slate-800"
                    >
                      <span className="font-mono text-white text-[10px] flex items-center gap-1.5">
                        <span className="text-slate-500">{i + 1}.</span>
                        {node}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                          isExpected
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {isExpected ? 'VERIFIED' : 'CUSTOM'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exploded View Control Preview (Phase 2 Preview) */}
            <div className="p-2.5 rounded bg-[#151b2a] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-bold">Exploded View (Phase 2)</span>
                <button
                  onClick={toggleExploded}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                    isExploded
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {isExploded ? 'EXPLODED' : 'COLLAPSED'}
                </button>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Gap Spacing:</span>
                <span className="text-cyan-300">{explosionGap.toFixed(1)}m</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6"
                step="0.1"
                value={explosionGap}
                onChange={(e) => setExplosionGap(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-700 rounded appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>
        )}

        {activeTab === 'DATA_QUALITY' && (
          <div className="space-y-3">
            <div className="p-2.5 rounded bg-[#151b2a] border border-cyan-500/20 text-slate-300 text-[10px] leading-relaxed">
              Data quality checks automatically validate and rectify known sheet anomalies via{' '}
              <code className="text-cyan-300">/src/data/overrides.ts</code> without modifying the raw source CSV.
            </div>

            <div className="space-y-2">
              {DATA_OVERRIDES.map((ov, idx) => (
                <div key={idx} className="p-2 rounded bg-[#101726] border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold text-[10px]">
                      {ov.field.toUpperCase()} OVERRIDE
                    </span>
                    <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      ACTIVE
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-300">
                    <span className="line-through text-slate-500 mr-1.5">{ov.originalValue}</span>
                    <span className="text-emerald-400 font-bold">➔ {ov.overrideValue}</span>
                  </div>
                  <p className="text-[9px] text-slate-400">{ov.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'PERF' && (
          <div className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 rounded bg-[#101726] border border-slate-800">
                <span className="text-slate-400 block">Frame Rate</span>
                <span className="text-lg font-bold text-emerald-400">{currentFps} FPS</span>
              </div>
              <div className="p-2 rounded bg-[#101726] border border-slate-800">
                <span className="text-slate-400 block">Draw Calls</span>
                <span className="text-lg font-bold text-cyan-300">{drawCalls}</span>
              </div>
              <div className="p-2 rounded bg-[#101726] border border-slate-800">
                <span className="text-slate-400 block">Triangles</span>
                <span className="text-lg font-bold text-slate-200">{triangles.toLocaleString()}</span>
              </div>
              <div className="p-2 rounded bg-[#101726] border border-slate-800">
                <span className="text-slate-400 block">DPR Setting</span>
                <span className="text-lg font-bold text-cyan-400">1.0 - 1.5</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#151b2a] border border-slate-800 space-y-1 text-[10px]">
              <span className="text-slate-400 font-bold block uppercase mb-1">Camera Telemetry</span>
              <div className="flex justify-between">
                <span className="text-slate-400">Azimuth Angle:</span>
                <span className="text-cyan-300 font-mono">{cameraAzimuth}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Elevation:</span>
                <span className="text-cyan-300 font-mono">{cameraElevation}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Distance:</span>
                <span className="text-cyan-300 font-mono">{cameraDistance}m</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
