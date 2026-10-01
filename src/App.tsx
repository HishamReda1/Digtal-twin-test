/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BuildingCanvas } from './components/scene/BuildingCanvas';
import { ExecutiveDashboardHUD } from './components/ui/dashboard/ExecutiveDashboardHUD';
import { SpatialPins } from './components/ui/SpatialPins';
import { DevPanel } from './components/ui/DevPanel';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { SiteMapsModal } from './components/ui/SiteMapsModal';
import { SkyController } from './components/ui/SkyController';
import { EquipmentPointInspector } from './components/ui/EquipmentPointInspector';
import { SystemFilterDock } from './components/ui/SystemFilterDock';
import { useBuildingStore } from './store/buildingStore';

export default function App() {
  const activeBuilding = useBuildingStore((s) => s.activeBuilding);
  const activeFloor = useBuildingStore((s) => s.activeFloor);
  const selectedEquipment = useBuildingStore((s) => s.selectedEquipment);
  const setSelectedEquipment = useBuildingStore((s) => s.setSelectedEquipment);
  const setActiveBuilding = useBuildingStore((s) => s.setActiveBuilding);
  const setActiveFloor = useBuildingStore((s) => s.setActiveFloor);
  const setHoveredBuilding = useBuildingStore((s) => s.setHoveredBuilding);
  const setHoveredFloor = useBuildingStore((s) => s.setHoveredFloor);

  // Global ESC key listener: equipment drawer -> floor -> building -> masterplan
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedEquipment) {
          // If viewing equipment point schedule, close drawer
          setSelectedEquipment(null);
        } else if (activeFloor) {
          // If a floor is active, return to the building level
          setActiveFloor(null);
          setHoveredFloor(null);
        } else if (activeBuilding) {
          // If a building is active, return to masterplan overview
          setActiveBuilding(null);
          setHoveredBuilding(null);
          setHoveredFloor(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    selectedEquipment,
    activeFloor,
    activeBuilding,
    setSelectedEquipment,
    setActiveFloor,
    setActiveBuilding,
    setHoveredFloor,
    setHoveredBuilding
  ]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#070b14] text-[#dce2f6] font-['Inter',sans-serif]">
      {/* 1. 3D WebGL Digital Twin Canvas */}
      <BuildingCanvas />

      {/* 2. Holographic BIM Loading Screen */}
      <LoadingScreen />

      {/* 3. Executive Dashboard HUD (matching Frame 475.png style) */}
      <ExecutiveDashboardHUD />

      {/* 4. 3D Spatial Pins Overlay */}
      <SpatialPins />

      {/* 5. Dev Diagnostic & Sheet Overrides Panel */}
      <DevPanel />

      {/* 6. Google Maps Grounded Location Intel Modal */}
      <SiteMapsModal />

      {/* 7. Ultra Dynamic Sky & Solar Time-Lapse Controller */}
      <SkyController />

      {/* 8. Building A02 Real-World Equipment BMS Point Inspector */}
      <EquipmentPointInspector />

      {/* 9. Floating System Filter Dock (HVAC, Fire, Metering, Elevators, Plumbing) */}
      <SystemFilterDock />
    </div>
  );
}
