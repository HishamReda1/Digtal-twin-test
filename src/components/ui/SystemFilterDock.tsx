import React from 'react';
import { useBuildingStore, SystemTab } from '../../store/buildingStore';
import {
  Icon3DView,
  IconHVAC,
  IconFire,
  IconMetering,
  IconElectric,
  IconPlumbing
} from './dashboard/DashboardIcons';

interface SystemFilterOption {
  id: SystemTab;
  labelEn: string;
  labelAr: string;
  badge: string;
  color: string;
  icon: React.FC<{ size?: number; className?: string }>;
}

const SYSTEM_OPTIONS: SystemFilterOption[] = [
  {
    id: '3d_view',
    labelEn: 'All Systems',
    labelAr: 'كافة الأنظمة',
    badge: 'ALL',
    color: 'border-slate-500 text-slate-200 bg-slate-800/80',
    icon: Icon3DView
  },
  {
    id: 'hvac',
    labelEn: 'HVAC & Air',
    labelAr: 'التكييف والتهوية',
    badge: '28 pts',
    color: 'border-cyan-400 text-cyan-300 bg-cyan-950/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]',
    icon: IconHVAC
  },
  {
    id: 'fire',
    labelEn: 'Fire & Safety',
    labelAr: 'إنذار ودخان',
    badge: '8 pts',
    color: 'border-rose-500 text-rose-300 bg-rose-950/60 shadow-[0_0_15px_rgba(244,63,94,0.3)]',
    icon: IconFire
  },
  {
    id: 'metering',
    labelEn: 'Energy & BTU',
    labelAr: 'الطاقة والعدادات',
    badge: '37 pts',
    color: 'border-emerald-400 text-emerald-300 bg-emerald-950/60 shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    icon: IconMetering
  },
  {
    id: 'electric',
    labelEn: 'Elevators & Power',
    labelAr: 'المصاعد والكهرباء',
    badge: '18 pts',
    color: 'border-amber-400 text-amber-300 bg-amber-950/60 shadow-[0_0_15px_rgba(245,158,11,0.3)]',
    icon: IconElectric
  },
  {
    id: 'plumbing',
    labelEn: 'Water & ETS',
    labelAr: 'المياه والتبريد',
    badge: '14 pts',
    color: 'border-sky-400 text-sky-300 bg-sky-950/60 shadow-[0_0_15px_rgba(56,189,248,0.3)]',
    icon: IconPlumbing
  }
];

export const SystemFilterDock: React.FC = () => {
  const activeSystemTab = useBuildingStore((s) => s.activeSystemTab);
  const setActiveSystemTab = useBuildingStore((s) => s.setActiveSystemTab);
  const activeBuilding = useBuildingStore((s) => s.activeBuilding);

  return (
    <div className="absolute top-[82px] left-1/2 -translate-x-1/2 pointer-events-auto z-30 select-none">
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#091024]/90 backdrop-blur-2xl border border-indigo-500/30 shadow-[0_12px_40px_rgba(3,7,20,0.85)]">
        {/* Context indicator */}
        <div className="px-2.5 py-1 flex flex-col justify-center border-r border-slate-700/60 mr-0.5">
          <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            {activeBuilding ? `BLDG ${activeBuilding}` : 'MASTERPLAN'}
          </span>
          <span className="text-[10px] font-bold text-white whitespace-nowrap">
            فلترة الأنظمة // SYSTEMS
          </span>
        </div>

        {/* Filter Pills */}
        {SYSTEM_OPTIONS.map((opt) => {
          const isActive = activeSystemTab === opt.id;
          const Icon = opt.icon;

          return (
            <button
              key={opt.id}
              onClick={() => setActiveSystemTab(opt.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-['Inter',sans-serif] text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? `${opt.color} border ring-1 ring-white/30 scale-105`
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <Icon size={14} className={isActive ? 'animate-pulse' : 'text-slate-400'} />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[11px] font-bold whitespace-nowrap">{opt.labelEn}</span>
                <span className="text-[8px] text-slate-400 font-normal whitespace-nowrap">
                  {opt.labelAr}
                </span>
              </div>
              <span
                className={`ml-1 text-[9px] font-mono px-1.5 py-0.2 rounded-md ${
                  isActive
                    ? 'bg-black/40 text-white font-bold'
                    : 'bg-slate-800/80 text-slate-400'
                }`}
              >
                {opt.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
