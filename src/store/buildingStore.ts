import { create } from 'zustand';
import {
  FloorId,
  FloorNodeName,
  EXPECTED_FLOOR_NODES,
  FLOOR_CONFIGS,
  BuildingId,
  BUILDINGS_CONFIG
} from '../types/building';
import { BmsEquipmentMeshItem } from '../data/buildingA02BmsData';

export type SystemTab =
  | '3d_view'
  | 'fire'
  | 'electric'
  | 'community'
  | 'metering'
  | 'security'
  | 'plumbing'
  | 'hvac'
  | 'maintenance';

export interface BuildingState {
  // Model & Floor Discovery
  isModelLoaded: boolean;
  isLoading: boolean;
  loadingProgress: number;
  loadingStatusMessage: string;
  modelSource: 'glb' | 'procedural';
  discoveredNodes: string[];
  registeredFloors: FloorNodeName[];
  missingNodes: FloorNodeName[];
  
  // 25 Masterplan Buildings (A01 - A25)
  activeBuilding: BuildingId | null;
  hoveredBuilding: BuildingId | null;
  setActiveBuilding: (id: BuildingId | null) => void;
  setHoveredBuilding: (id: BuildingId | null) => void;

  // Equipment Inspection & Mesh Binding (Building A02 points)
  selectedEquipment: BmsEquipmentMeshItem | null;
  setSelectedEquipment: (item: BmsEquipmentMeshItem | null) => void;

  // Active BMS System Mode from Top Dock
  activeSystemTab: SystemTab;
  setActiveSystemTab: (tab: SystemTab) => void;
  
  // Floor Selection & Isolation
  activeFloor: FloorId | null;
  hoveredFloor: FloorId | null;
  
  // Exploded View (Phase 2 readiness)
  isExploded: boolean;
  explosionGap: number; // units per floor
  
  // Camera & Navigation
  cameraAzimuth: number; // 0 to 360 degrees
  cameraElevation: number; // degrees
  cameraDistance: number;
  isInteracting: boolean;
  
  // Dev & Telemetry UI
  isDevPanelOpen: boolean;
  isSiteMapsOpen: boolean;
  showPins: boolean;
  showEnvironment: boolean;
  environmentMode: 'cairo_night' | 'cairo_day' | 'cairo_sunset';
  skyTime: number; // 0 to 24 hours (e.g. 12 = noon, 17.5 = sunset, 21 = night)
  isSkyAutoPlaying: boolean;
  skySpeed: number; // hours per sec
  currentFps: number;
  drawCalls: number;
  triangles: number;
  
  // Actions
  setLoadingProgress: (progress: number, message?: string) => void;
  setModelLoaded: (source: 'glb' | 'procedural') => void;
  registerModelNodes: (nodes: string[]) => void;
  setActiveFloor: (floor: FloorId | null) => void;
  setHoveredFloor: (floor: FloorId | null) => void;
  toggleExploded: () => void;
  setExplosionGap: (gap: number) => void;
  setCameraAzimuth: (azimuth: number, elevation?: number, distance?: number) => void;
  toggleDevPanel: () => void;
  toggleSiteMaps: () => void;
  togglePins: () => void;
  toggleEnvironment: () => void;
  setEnvironmentMode: (mode: 'cairo_night' | 'cairo_day' | 'cairo_sunset') => void;
  setSkyTime: (time: number) => void;
  toggleSkyAutoPlay: () => void;
  setSkySpeed: (speed: number) => void;
  updatePerformance: (fps: number, drawCalls?: number, triangles?: number) => void;
}

export const useBuildingStore = create<BuildingState>((set) => ({
  isModelLoaded: false,
  isLoading: true,
  loadingProgress: 15,
  loadingStatusMessage: 'Initializing WebGL 3D Engine...',
  modelSource: 'procedural',
  discoveredNodes: [],
  registeredFloors: [],
  missingNodes: [],
  
  activeSystemTab: '3d_view',
  setActiveSystemTab: (tab) => set({ activeSystemTab: tab }),

  activeBuilding: null,
  hoveredBuilding: null,
  setActiveBuilding: (id) => set({ activeBuilding: id }),
  setHoveredBuilding: (id) => set({ hoveredBuilding: id }),

  selectedEquipment: null,
  setSelectedEquipment: (item) => set({ selectedEquipment: item }),

  activeFloor: null,
  hoveredFloor: null,
  
  isExploded: false,
  explosionGap: 2.5,
  
  cameraAzimuth: 45,
  cameraElevation: 25,
  cameraDistance: 45,
  isInteracting: false,
  
  isDevPanelOpen: false,
  isSiteMapsOpen: false,
  showPins: true,
  showEnvironment: true,
  environmentMode: 'cairo_night',
  skyTime: 20.5,
  isSkyAutoPlaying: false,
  skySpeed: 0.5,
  currentFps: 60,
  drawCalls: 0,
  triangles: 0,
  
  setLoadingProgress: (progress, message) =>
    set((state) => ({
      loadingProgress: Math.min(100, Math.max(0, progress)),
      loadingStatusMessage: message ?? state.loadingStatusMessage
    })),
    
  setModelLoaded: (source) =>
    set({
      isModelLoaded: true,
      isLoading: false,
      loadingProgress: 100,
      loadingStatusMessage: 'Digital Twin Ready',
      modelSource: source
    }),
    
  registerModelNodes: (nodes) => {
    const registered: FloorNodeName[] = [];
    const missing: FloorNodeName[] = [];
    
    EXPECTED_FLOOR_NODES.forEach((expected) => {
      if (nodes.includes(expected)) {
        registered.push(expected);
      } else {
        missing.push(expected);
      }
    });
    
    console.log('[Digital Twin Floor Registry] Discovered nodes:', nodes);
    console.log('[Digital Twin Floor Registry] Registered floors:', registered);
    if (missing.length > 0) {
      console.warn('[Digital Twin Floor Registry] Missing expected floor nodes:', missing);
    }
    
    set({
      discoveredNodes: nodes,
      registeredFloors: registered,
      missingNodes: missing
    });
  },
  
  setActiveFloor: (floor) => set({ activeFloor: floor }),
  setHoveredFloor: (floor) => set({ hoveredFloor: floor }),
  toggleExploded: () => set((state) => ({ isExploded: !state.isExploded })),
  setExplosionGap: (gap) => set({ explosionGap: gap }),
  setCameraAzimuth: (azimuth, elevation, distance) =>
    set((state) => ({
      cameraAzimuth: azimuth,
      cameraElevation: elevation ?? state.cameraElevation,
      cameraDistance: distance ?? state.cameraDistance
    })),
  toggleDevPanel: () => set((state) => ({ isDevPanelOpen: !state.isDevPanelOpen })),
  toggleSiteMaps: () => set((state) => ({ isSiteMapsOpen: !state.isSiteMapsOpen })),
  togglePins: () => set((state) => ({ showPins: !state.showPins })),
  toggleEnvironment: () => set((state) => ({ showEnvironment: !state.showEnvironment })),
  setEnvironmentMode: (mode) =>
    set({
      environmentMode: mode,
      skyTime: mode === 'cairo_day' ? 12.5 : mode === 'cairo_sunset' ? 18.0 : 20.5
    }),
  setSkyTime: (time) => {
    let mode: 'cairo_night' | 'cairo_day' | 'cairo_sunset' = 'cairo_night';
    if (time >= 7 && time < 17) mode = 'cairo_day';
    else if ((time >= 5.5 && time < 7) || (time >= 17 && time < 19.5)) mode = 'cairo_sunset';
    set({ skyTime: time, environmentMode: mode });
  },
  toggleSkyAutoPlay: () => set((state) => ({ isSkyAutoPlaying: !state.isSkyAutoPlaying })),
  setSkySpeed: (speed) => set({ skySpeed: speed }),
  updatePerformance: (fps, drawCalls, triangles) =>
    set((state) => ({
      currentFps: Math.round(fps),
      drawCalls: drawCalls ?? state.drawCalls,
      triangles: triangles ?? state.triangles
    }))
}));
