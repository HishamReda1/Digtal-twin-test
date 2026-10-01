import React from 'react';
import { useBuildingStore } from '../../store/buildingStore';

export const BottomRibbon: React.FC = () => {
  const modelSource = useBuildingStore((s) => s.modelSource);
  const currentFps = useBuildingStore((s) => s.currentFps);
  const toggleSiteMaps = useBuildingStore((s) => s.toggleSiteMaps);

  return (
    <footer className="fixed bottom-0 left-0 w-full h-9 z-40 px-5 flex items-center justify-between pointer-events-auto bg-[#070e1c]/90 backdrop-blur-md border-t border-cyan-500/20 text-slate-400 font-['JetBrains_Mono',monospace] text-[11px] select-none">
      <div className="flex items-center gap-4">
        <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          BACNET IP GATEWAY #1 // 100% ONLINE
        </span>
        <span className="text-slate-600">|</span>
        <span>
          TOTAL BUILDING POWER: <strong className="text-cyan-400 font-bold">412.8 kW</strong>
        </span>
        <span className="text-slate-600">|</span>
        <span className="hidden sm:inline">
          CHILLED WATER FLOW: <strong className="text-emerald-400 font-bold">62.4 m³/h</strong>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-4 text-[10px]">
        <span>
          MODEL SOURCE:{' '}
          <strong className="text-white uppercase">
            {modelSource === 'glb' ? 'GLB / BIM' : 'PROCEDURAL BIM'}
          </strong>
        </span>
        <span className="text-slate-600">|</span>
        <span>
          FPS: <strong className={currentFps < 45 ? 'text-amber-400' : 'text-emerald-400'}>{currentFps}</strong>
        </span>
        <span className="text-slate-600">|</span>
        <button
          onClick={toggleSiteMaps}
          className="flex items-center gap-1 hover:text-cyan-300 transition-colors text-left"
          title="Open Google Maps Grounded Location Intel"
        >
          <span>COORDINATES:</span>
          <span className="text-cyan-300 font-semibold underline decoration-dotted">
            30°01'18.7"N 31°30'37.3"E
          </span>
          <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            MAPS
          </span>
        </button>
        <span className="text-slate-600">|</span>
        <span className="text-cyan-400 flex items-center gap-1 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          RAYTRACED TWIN SYNCHRONIZED
        </span>
      </div>
    </footer>
  );
};
