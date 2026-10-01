import React from 'react';
import { GoldenGateTopBar } from './GoldenGateTopBar';
import { ElevatorPerformanceCard } from './ElevatorPerformanceCard';
import { AirQualityCard } from './AirQualityCard';
import { WeeklyConsumptionCard } from './WeeklyConsumptionCard';
import { PowerInfrastructureCard } from './PowerInfrastructureCard';
import { ParkingSpotsCard } from './ParkingSpotsCard';
import { SustainabilityIndexCard } from './SustainabilityIndexCard';
import { FloorSelector } from '../FloorSelector';

export const ExecutiveDashboardHUD: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 overflow-hidden">
      {/* 1. Atmospheric Purple / Magenta Side Horizon Ambient Glow (matching Frame 475.png) */}
      <div className="absolute left-0 top-1/3 -translate-y-1/2 w-48 h-96 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 top-1/3 -translate-y-1/2 w-48 h-96 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* 2. Top Header Bar with Brand, System Tabs Dock, Time & Weather */}
      <GoldenGateTopBar />

      {/* 3. Main Viewport Floating Cards Layout */}
      <div className="w-full flex-1 flex justify-between items-start pt-20 pb-4 relative">
        {/* Left Stack */}
        <div className="flex flex-col gap-4 pointer-events-auto">
          <ElevatorPerformanceCard />
          <AirQualityCard />
        </div>

        {/* Center Zone: Floor Selector Dock */}
        <div className="absolute left-90 top-1/2 -translate-y-1/2 pointer-events-auto">
          <FloorSelector />
        </div>

        {/* Right Stack */}
        <div className="flex flex-col gap-4 pointer-events-auto">
          <WeeklyConsumptionCard />
          <PowerInfrastructureCard />
        </div>
      </div>

      {/* 4. Bottom Horizontal Deck */}
      <div className="w-full flex justify-center items-center gap-5 pb-2 pointer-events-auto">
        <ParkingSpotsCard />
        <SustainabilityIndexCard />
      </div>
    </div>
  );
};
