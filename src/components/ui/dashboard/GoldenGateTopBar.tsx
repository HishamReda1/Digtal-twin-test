import React, { useState, useEffect } from 'react';
import { useBuildingStore, SystemTab } from '../../../store/buildingStore';
import {
  Icon3DView,
  IconFire,
  IconElectric,
  IconCommunity,
  IconMetering,
  IconSecurity,
  IconPlumbing,
  IconHVAC,
  IconMaintenance,
  IconClock,
  IconWeatherCloud,
  IconBell
} from './DashboardIcons';

const SYSTEM_TABS: {
  id: SystemTab;
  label: string;
  IconComponent: React.FC<{ size?: number; className?: string }>;
}[] = [
  { id: '3d_view', label: '3D View', IconComponent: Icon3DView },
  { id: 'fire', label: 'Fire', IconComponent: IconFire },
  { id: 'electric', label: 'Electric', IconComponent: IconElectric },
  { id: 'community', label: 'Community', IconComponent: IconCommunity },
  { id: 'metering', label: 'Metering', IconComponent: IconMetering },
  { id: 'security', label: 'Security', IconComponent: IconSecurity },
  { id: 'plumbing', label: 'Plumbing', IconComponent: IconPlumbing },
  { id: 'hvac', label: 'HVAC', IconComponent: IconHVAC },
  { id: 'maintenance', label: 'Maintenance', IconComponent: IconMaintenance }
];

export const GoldenGateTopBar: React.FC = () => {
  const activeSystemTab = useBuildingStore((s) => s.activeSystemTab);
  const setActiveSystemTab = useBuildingStore((s) => s.setActiveSystemTab);
  const toggleSiteMaps = useBuildingStore((s) => s.toggleSiteMaps);

  const [timeStr, setTimeStr] = useState('4:24:23 PM');
  const [dateStr, setDateStr] = useState('TUE, Oct 15, 2026');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
      setDateStr(
        now
          .toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
          .toUpperCase()
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between pointer-events-none select-none">
      {/* Brand: GOLDEN GATE */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={toggleSiteMaps}
          className="text-left group cursor-pointer transition-transform hover:scale-105"
        >
          <span className="font-['Inter',sans-serif] font-black text-xl tracking-[0.25em] text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.7)]">
            GOLDEN GATE
          </span>
          <span className="block text-[9px] font-mono tracking-widest text-cyan-400/80 -mt-0.5">
            SOUTH 90TH ST • NEW CAIRO
          </span>
        </button>
      </div>

      {/* Center System Tabs Pill Dock (Exact Vector Icons from Frame 475.svg) */}
      <nav className="pointer-events-auto flex items-center gap-1.5 px-4 py-2 bg-[#0c1328]/85 backdrop-blur-2xl border border-indigo-500/30 rounded-full shadow-[0_8px_32px_rgba(4,7,18,0.7)]">
        {SYSTEM_TABS.map((tab) => {
          const isActive = activeSystemTab === tab.id;
          const Icon = tab.IconComponent;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSystemTab(tab.id)}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all duration-200 group cursor-pointer ${
                isActive
                  ? 'scale-105'
                  : 'opacity-70 hover:opacity-100 hover:scale-102'
              }`}
            >
              {/* Circular Icon Bubble with Skeuomorphic Gloss & Bevel */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-white shadow-[0_0_18px_rgba(245,158,11,0.9)] ring-2 ring-amber-300'
                    : 'bg-[#182038] text-slate-300 group-hover:bg-[#202b4a] group-hover:text-white border border-slate-700/60 shadow-[inset_0_1px_3px_rgba(255,255,255,0.1)]'
                }`}
              >
                <Icon size={16} />
              </div>
              {/* Tab Label */}
              <span
                className={`text-[10px] mt-1 font-['Inter',sans-serif] tracking-wider transition-colors ${
                  isActive ? 'text-amber-300 font-bold' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Right Telemetry & Weather Section */}
      <div className="flex items-center gap-4 pointer-events-auto">
        {/* Clock */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-[#0c1328]/85 backdrop-blur-xl border border-indigo-500/30 rounded-xl font-['JetBrains_Mono',monospace] text-right shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          <IconClock size={16} className="text-white opacity-85" />
          <div>
            <span className="block text-xs font-bold text-white tracking-wide">
              {timeStr}
            </span>
            <span className="block text-[9px] text-slate-400 tracking-wider">
              {dateStr}
            </span>
          </div>
        </div>

        {/* Real Cairo Weather Capsule */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-[#0c1328]/85 backdrop-blur-xl border border-indigo-500/30 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          <IconWeatherCloud size={20} className="text-white opacity-90" />
          <div className="text-left font-['Inter',sans-serif]">
            <span className="block text-xs font-bold text-white font-mono">
              22°C
            </span>
            <span className="block text-[9px] text-slate-300 leading-tight">
              Partially Cloudy
            </span>
            <span className="block text-[8px] text-slate-500">Cairo, Egypt</span>
          </div>
        </div>

        {/* Notification Bell */}
        <button
          className="relative w-9 h-9 rounded-full bg-[#0c1328]/85 backdrop-blur-xl border border-indigo-500/30 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)] cursor-pointer"
          title="System Notifications"
        >
          <IconBell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-pulse" />
        </button>
      </div>
    </header>
  );
};
