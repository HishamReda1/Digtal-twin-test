import React from 'react';
import { useBuildingStore } from '../../store/buildingStore';

export const LoadingScreen: React.FC = () => {
  const isModelLoaded = useBuildingStore((s) => s.isModelLoaded);
  const loadingProgress = useBuildingStore((s) => s.loadingProgress);
  const loadingStatusMessage = useBuildingStore((s) => s.loadingStatusMessage);
  const registeredFloors = useBuildingStore((s) => s.registeredFloors);

  if (isModelLoaded) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070b14]/95 backdrop-blur-xl text-[#dce2f6] font-['JetBrains_Mono',monospace]">
      <div className="w-[420px] max-w-[90vw] p-6 rounded-xl border border-cyan-500/30 bg-[#0c1321]/90 shadow-[0_0_50px_rgba(34,211,238,0.25)] space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <h1 className="font-['Inter'] font-bold text-white text-base tracking-widest uppercase">
              GOLDEN GATE
            </h1>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
            TWIN OS v4.2
          </span>
        </div>

        {/* Radar Graphic */}
        <div className="flex justify-center py-2">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-pulse" />
            <div className="absolute inset-2 rounded-full border border-cyan-500/40" />
            <div className="absolute inset-6 rounded-full border border-dashed border-cyan-400/60 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">{loadingStatusMessage}</span>
            <span className="text-cyan-400 font-bold">{Math.round(loadingProgress)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#151b2a] overflow-hidden border border-cyan-500/20">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 shadow-[0_0_8px_#22d3ee] transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>

        {/* Telemetry Status Lines */}
        <div className="text-[11px] space-y-1 text-slate-400 border-t border-cyan-500/15 pt-3">
          <div className="flex items-center justify-between">
            <span>SCENE ENGINE</span>
            <span className="text-emerald-400">THREE.JS / R3F MOUNTED</span>
          </div>
          <div className="flex items-center justify-between">
            <span>FLOOR NODES</span>
            <span className="text-cyan-300">
              {registeredFloors.length > 0 ? `${registeredFloors.length}/7 REGISTERED` : 'SCANNING HIERARCHY...'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>BACNET IP GATEWAY</span>
            <span className="text-emerald-400">READY</span>
          </div>
        </div>
      </div>
    </div>
  );
};
