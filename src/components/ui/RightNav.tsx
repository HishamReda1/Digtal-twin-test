import React, { useState } from 'react';

export type NavTab = 'HOME' | 'BLDG' | 'HVAC' | 'METERS' | 'SAFETY' | 'SOLAR';

interface RightNavProps {
  activeTab?: NavTab;
  onTabChange?: (tab: NavTab) => void;
}

export const RightNav: React.FC<RightNavProps> = ({ activeTab = 'BLDG', onTabChange }) => {
  const [current, setCurrent] = useState<NavTab>(activeTab);

  const handleSelect = (tab: NavTab) => {
    setCurrent(tab);
    onTabChange?.(tab);
  };

  const tabs: { id: NavTab; label: string; icon: string }[] = [
    { id: 'HOME', label: 'HOME', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'BLDG', label: 'BLDG', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'HVAC', label: 'HVAC', icon: 'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5' },
    { id: 'METERS', label: 'METERS', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'SAFETY', label: 'SAFETY', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { id: 'SOLAR', label: 'SOLAR', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' }
  ];

  return (
    <aside className="fixed right-4 top-1/2 -translate-y-1/2 z-40 pointer-events-auto select-none">
      <nav className="flex flex-col gap-2 p-1.5 bg-[#070e1c]/85 backdrop-blur-md border border-cyan-500/25 rounded-xl shadow-[0_4px_24px_rgba(7,14,28,0.7)]">
        {tabs.map((tab) => {
          const isActive = current === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={`group flex flex-col items-center justify-center w-14 h-14 rounded-lg transition-all ${
                isActive
                  ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.35)]'
                  : 'bg-[#19202e]/40 hover:bg-[#19202e] hover:text-cyan-300 text-slate-400 border border-slate-700/30'
              }`}
              title={tab.label}
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={tab.icon} />
              </svg>
              <span className="font-['Inter',sans-serif] font-bold text-[9px] mt-0.5 tracking-wider">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
