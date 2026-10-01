import { FloorId } from '../types/building';

export type PointType = 'digital' | 'analog';
export type PointCategory = 'Monitor' | 'Control' | 'Controllable';

export interface BmsDataPoint {
  equipment: string;
  cardName: string;
  pointName: string;
  bindName: string;
  pointType: PointType;
  values: string;
  category: PointCategory;
  valueRange?: string;
  units?: string;
  currentValue: number | string | boolean;
}

export interface BmsEquipmentMeshItem {
  id: string;
  name: string;
  floor: FloorId;
  type: 'SMD' | 'VMD' | 'FCU' | 'ELEVATOR' | 'BTU' | 'KWH' | 'WM' | 'PF' | 'SF' | 'FAHU' | 'DPM' | 'FAP';
  position: [number, number, number]; // Local coordinates relative to Building A02 [x, y, z]
  rotation?: [number, number, number];
  status: 'ONLINE' | 'ACTIVE' | 'NORMAL' | 'WARNING' | 'ALERT';
  summaryBadge: string;
  points: BmsDataPoint[];
}

export function getEquipmentSystem(type: BmsEquipmentMeshItem['type']): string {
  switch (type) {
    case 'FCU':
    case 'VMD':
    case 'PF':
    case 'FAHU':
      return 'hvac';
    case 'SMD':
    case 'SF':
    case 'FAP':
      return 'fire';
    case 'BTU':
    case 'KWH':
    case 'DPM':
      return 'metering';
    case 'WM':
      return 'plumbing';
    case 'ELEVATOR':
      return 'electric';
    default:
      return 'hvac';
  }
}

export const BUILDING_A02_BMS_DATA: Record<FloorId, BmsEquipmentMeshItem[]> = {
  GF: [
    // Smoke Dampers
    {
      id: 'A02-GF-SMD-01',
      name: 'SMD-01 (Smoke Damper)',
      floor: 'GF',
      type: 'SMD',
      position: [-5.2, 2.6, -4.5],
      status: 'NORMAL',
      summaryBadge: 'OPEN // SAFE',
      points: [
        {
          equipment: 'SMD-01',
          cardName: 'Monitor Card',
          pointName: 'Status',
          bindName: 'GF_SMD01_STS',
          pointType: 'digital',
          values: '1= OPEN, 0= CLOSED',
          category: 'Monitor',
          currentValue: 1
        }
      ]
    },
    {
      id: 'A02-GF-SMD-02',
      name: 'SMD-02 (Smoke Damper)',
      floor: 'GF',
      type: 'SMD',
      position: [5.2, 2.6, -4.5],
      status: 'NORMAL',
      summaryBadge: 'OPEN // SAFE',
      points: [
        {
          equipment: 'SMD-02',
          cardName: 'Monitor Card',
          pointName: 'Status',
          bindName: 'GF_SMD02_STS',
          pointType: 'digital',
          values: '1= OPEN, 0= CLOSED',
          category: 'Monitor',
          currentValue: 1
        }
      ]
    },
    // Volume Control Dampers VMD-01..11
    {
      id: 'A02-GF-VMD-BANK',
      name: 'VMD-01..11 (Volume Dampers)',
      floor: 'GF',
      type: 'VMD',
      position: [-1.8, 2.7, -3.2],
      status: 'ACTIVE',
      summaryBadge: '11/11 OPEN',
      points: Array.from({ length: 11 }).map((_, i) => ({
        equipment: `VMD-${String(i + 1).padStart(2, '0')}`,
        cardName: 'Control Card',
        pointName: 'Start/Stop',
        bindName: `GF_VMD${String(i + 1).padStart(2, '0')}_SS`,
        pointType: 'digital',
        values: '1= OPEN, 0= CLOSED',
        category: 'Control',
        currentValue: 1
      }))
    },
    // Fire Alarm Panel
    {
      id: 'A02-GF-FAP',
      name: 'Fire Alarm Panel (FAP)',
      floor: 'GF',
      type: 'FAP',
      position: [6.8, 1.4, 4.2],
      status: 'NORMAL',
      summaryBadge: '0= NORMAL',
      points: [
        {
          equipment: 'Fire Alarm',
          cardName: 'Monitor Card',
          pointName: 'Status',
          bindName: 'GF_FAP',
          pointType: 'digital',
          values: '1= Alarm, 0= Normal',
          category: 'Monitor',
          currentValue: 0
        }
      ]
    },
    // Elevator-01 Core
    {
      id: 'A02-GF-ELEVATOR-01',
      name: 'Elevator-01 Main Shaft',
      floor: 'GF',
      type: 'ELEVATOR',
      position: [-5.5, 1.5, 1.0],
      status: 'ONLINE',
      summaryBadge: 'LVL GF // CALLS OK',
      points: [
        { equipment: 'Elevator-01', cardName: 'Monitor Card', pointName: 'sts1', bindName: 'sts1', pointType: 'digital', values: '1=Ready', category: 'Monitor', currentValue: 1 },
        { equipment: 'Elevator-01', cardName: 'Monitor Card', pointName: 'sts2', bindName: 'sts2', pointType: 'digital', values: '1=Ready', category: 'Monitor', currentValue: 1 },
        { equipment: 'Elevator-01', cardName: 'Monitor Card', pointName: 'sts3', bindName: 'sts3', pointType: 'digital', values: '1=Ready', category: 'Monitor', currentValue: 1 },
        { equipment: 'Elevator-01', cardName: 'Monitor Card', pointName: 'sts4', bindName: 'sts4', pointType: 'digital', values: '1=Ready', category: 'Monitor', currentValue: 1 },
        { equipment: 'Elevator-01', cardName: 'Monitor Card', pointName: 'sts5', bindName: 'sts5', pointType: 'digital', values: '1=Ready', category: 'Monitor', currentValue: 1 },
        { equipment: 'Elevator-01', cardName: 'Monitor Card', pointName: 'sts6', bindName: 'sts6', pointType: 'digital', values: '1=Ready', category: 'Monitor', currentValue: 1 }
      ]
    },
    // FCU-01
    {
      id: 'A02-GF-FCU-01',
      name: 'FCU-01 (Fan Coil Unit)',
      floor: 'GF',
      type: 'FCU',
      position: [-3.2, 2.5, 2.8],
      status: 'ONLINE',
      summaryBadge: '22.3°C // AUTO',
      points: [
        { equipment: 'FCU-01', cardName: 'Control Card', pointName: 'Start_Stop', bindName: 'Start_Stop', pointType: 'digital', values: '1=start, 0=Stop', category: 'Controllable', currentValue: 1 },
        { equipment: 'FCU-01', cardName: 'Control Card', pointName: 'SET_TEMP', bindName: 'SET_TEMP', pointType: 'analog', values: '', category: 'Controllable', valueRange: '16-30', units: 'celsius', currentValue: 22.5 },
        { equipment: 'FCU-01', cardName: 'Control Card', pointName: 'FAN_Speed_CMD', bindName: 'FAN_Speed_CMD', pointType: 'analog', values: '1=Low, 2=Middle, 3=High, 4=Auto', category: 'Controllable', currentValue: 4 },
        { equipment: 'FCU-01', cardName: 'Control Card', pointName: 'Mode_CMD', bindName: 'Mode_CMD', pointType: 'analog', values: '1=cool, 2=Auto, 3=heat', category: 'Controllable', currentValue: 1 },
        { equipment: 'FCU-01', cardName: 'Control Card', pointName: 'COOLING VALVE', bindName: 'COOLING VALVE', pointType: 'analog', values: '', category: 'Controllable', valueRange: '0-10', units: 'Volt', currentValue: 6.8 },
        { equipment: 'FCU-01', cardName: 'Monitor Card', pointName: 'TEMP', bindName: 'TEMP', pointType: 'analog', values: '', category: 'Monitor', valueRange: '15-50', units: 'celsius', currentValue: 22.3 }
      ]
    },
    // FCU-02
    {
      id: 'A02-GF-FCU-02',
      name: 'FCU-02 (Fan Coil Unit)',
      floor: 'GF',
      type: 'FCU',
      position: [0.0, 2.5, 2.8],
      status: 'ONLINE',
      summaryBadge: '22.6°C // AUTO',
      points: [
        { equipment: 'FCU-02', cardName: 'Control Card', pointName: 'Start_Stop', bindName: 'Start_Stop', pointType: 'digital', values: '1=start, 0=Stop', category: 'Controllable', currentValue: 1 },
        { equipment: 'FCU-02', cardName: 'Control Card', pointName: 'SET_TEMP', bindName: 'SET_TEMP', pointType: 'analog', values: '', category: 'Controllable', valueRange: '16-30', units: 'celsius', currentValue: 23.0 },
        { equipment: 'FCU-02', cardName: 'Control Card', pointName: 'FAN_Speed_CMD', bindName: 'FAN_Speed_CMD', pointType: 'analog', values: '1=Low, 2=Middle, 3=High, 4=Auto', category: 'Controllable', currentValue: 4 },
        { equipment: 'FCU-02', cardName: 'Control Card', pointName: 'COOLING VALVE', bindName: 'COOLING VALVE', pointType: 'analog', values: '', category: 'Controllable', valueRange: '0-10', units: 'Volt', currentValue: 7.2 },
        { equipment: 'FCU-02', cardName: 'Monitor Card', pointName: 'TEMP', bindName: 'TEMP', pointType: 'analog', values: '', category: 'Monitor', valueRange: '15-50', units: 'celsius', currentValue: 22.6 }
      ]
    },
    // FCU-03
    {
      id: 'A02-GF-FCU-03',
      name: 'FCU-03 (Fan Coil Unit)',
      floor: 'GF',
      type: 'FCU',
      position: [3.2, 2.5, 2.8],
      status: 'ONLINE',
      summaryBadge: '22.1°C // AUTO',
      points: [
        { equipment: 'FCU-03', cardName: 'Control Card', pointName: 'Start_Stop', bindName: 'Start_Stop', pointType: 'digital', values: '1=start, 0=Stop', category: 'Controllable', currentValue: 1 },
        { equipment: 'FCU-03', cardName: 'Control Card', pointName: 'SET_TEMP', bindName: 'SET_TEMP', pointType: 'analog', values: '', category: 'Controllable', valueRange: '16-30', units: 'celsius', currentValue: 22.0 },
        { equipment: 'FCU-03', cardName: 'Control Card', pointName: 'COOLING VALVE', bindName: 'COOLING VALVE', pointType: 'analog', values: '', category: 'Controllable', valueRange: '0-10', units: 'Volt', currentValue: 5.9 },
        { equipment: 'FCU-03', cardName: 'Monitor Card', pointName: 'TEMP', bindName: 'TEMP', pointType: 'analog', values: '', category: 'Monitor', valueRange: '15-50', units: 'celsius', currentValue: 22.1 }
      ]
    },
    // BTU Revenue Submeters (Quantity=9)
    {
      id: 'A02-GF-BTU-PANEL',
      name: 'BTU Revenue Submeters (Qty=9)',
      floor: 'GF',
      type: 'BTU',
      position: [-6.8, 1.2, -2.5],
      status: 'ONLINE',
      summaryBadge: '9x ACTIVE // ΔT 5.8°C',
      points: [
        { equipment: 'BTU (Quantity=9)', cardName: 'Monitor Card', pointName: 'DIFF TEMP', bindName: 'DIFF TEMP', pointType: 'analog', values: '', category: 'Monitor', units: '°C', currentValue: 5.8 },
        { equipment: 'BTU (Quantity=9)', cardName: 'Monitor Card', pointName: 'E3 - Cooling Energy', bindName: 'E3 - Cooling Energy', pointType: 'analog', values: '', category: 'Monitor', units: 'KWh', currentValue: 482.6 },
        { equipment: 'BTU (Quantity=9)', cardName: 'Monitor Card', pointName: 'FLOW V1', bindName: 'FLOW V2', pointType: 'analog', values: '', category: 'Monitor', units: 'm3/h', currentValue: 14.8 },
        { equipment: 'BTU (Quantity=9)', cardName: 'Monitor Card', pointName: 'Operating hours', bindName: 'Operating hours', pointType: 'analog', values: '', category: 'Monitor', units: 'hr', currentValue: 2410 },
        { equipment: 'BTU (Quantity=9)', cardName: 'Monitor Card', pointName: 'Temp 1', bindName: 'Temp 1', pointType: 'analog', values: '', category: 'Monitor', units: '°C', currentValue: 6.2 },
        { equipment: 'BTU (Quantity=9)', cardName: 'Monitor Card', pointName: 'Temp 2', bindName: 'Temp 2', pointType: 'analog', values: '', category: 'Monitor', units: '°C', currentValue: 12.0 }
      ]
    },
    // KWH Power Submeters (Quantity=13)
    {
      id: 'A02-GF-KWH-PANEL',
      name: 'KWH Power Submeters (Qty=13)',
      floor: 'GF',
      type: 'KWH',
      position: [6.8, 1.2, -2.5],
      status: 'ONLINE',
      summaryBadge: '13x SUBMETERS // 184 kW',
      points: [
        { equipment: 'KWH (Quantity=13)', cardName: 'Monitor Card', pointName: 'Active Power Total', bindName: 'GF_KWH_TOTAL', pointType: 'analog', values: '', category: 'Monitor', units: 'KWh', currentValue: 184.2 },
        { equipment: 'KWH (Quantity=13)', cardName: 'Monitor Card', pointName: 'Current Avg', bindName: 'GF_KWH_CURRENT', pointType: 'analog', values: '', category: 'Monitor', units: 'A', currentValue: 268 }
      ]
    },
    // Water Meters (Quantity=13)
    {
      id: 'A02-GF-WM-PANEL',
      name: 'WM Water Submeters (Qty=13)',
      floor: 'GF',
      type: 'WM',
      position: [0.0, 0.8, -6.5],
      status: 'ONLINE',
      summaryBadge: '13x METERS // 3.4 m³/h',
      points: [
        { equipment: 'WM (Quantity=13)', cardName: 'Monitor Card', pointName: 'Total Water Flow', bindName: 'GF_WM_FLOW', pointType: 'analog', values: '', category: 'Monitor', units: 'm3/h', currentValue: 3.4 }
      ]
    }
  ],

  '1F': [
    {
      id: 'A02-1F-SMD-01',
      name: 'SMD-01 (Smoke Damper)',
      floor: '1F',
      type: 'SMD',
      position: [-5.2, 2.6, -4.5],
      status: 'NORMAL',
      summaryBadge: '1= OPEN',
      points: [
        { equipment: 'SMD-01', cardName: 'Monitor Card', pointName: 'Status', bindName: '1F_SMD01_STS', pointType: 'digital', values: '1= OPEN, 0= CLOSED', category: 'Monitor', currentValue: 1 }
      ]
    },
    {
      id: 'A02-1F-SMD-02',
      name: 'SMD-02 (Smoke Damper)',
      floor: '1F',
      type: 'SMD',
      position: [5.2, 2.6, -4.5],
      status: 'NORMAL',
      summaryBadge: '1= OPEN',
      points: [
        { equipment: 'SMD-02', cardName: 'Monitor Card', pointName: 'Status', bindName: '1F_SMD02_STS', pointType: 'digital', values: '1= OPEN, 0= CLOSED', category: 'Monitor', currentValue: 1 }
      ]
    },
    {
      id: 'A02-1F-VMD-BANK',
      name: 'VMD-01..06 (Volume Dampers)',
      floor: '1F',
      type: 'VMD',
      position: [0.0, 2.6, -3.0],
      status: 'ACTIVE',
      summaryBadge: '6/6 OPEN',
      points: Array.from({ length: 6 }).map((_, i) => ({
        equipment: `VMD-${String(i + 1).padStart(2, '0')}`,
        cardName: 'Control Card',
        pointName: 'Start/Stop',
        bindName: `1F_VMD${String(i + 1).padStart(2, '0')}_SS`,
        pointType: 'digital',
        values: '1= OPEN, 0= CLOSED',
        category: 'Control',
        currentValue: 1
      }))
    },
    {
      id: 'A02-1F-FAP',
      name: '1F Fire Alarm Subpanel',
      floor: '1F',
      type: 'FAP',
      position: [6.8, 1.4, 4.2],
      status: 'NORMAL',
      summaryBadge: '0= NORMAL',
      points: [
        { equipment: 'Fire Alarm', cardName: 'Monitor Card', pointName: 'Status', bindName: '1F_FAP', pointType: 'digital', values: '1= Alarm, 0= Normal', category: 'Monitor', currentValue: 0 }
      ]
    },
    {
      id: 'A02-1F-BTU',
      name: 'BTU Submeters (Quantity=2)',
      floor: '1F',
      type: 'BTU',
      position: [-6.8, 1.2, -2.5],
      status: 'ONLINE',
      summaryBadge: '2x BTU // ΔT 5.4°C',
      points: [
        { equipment: 'BTU (Quantity=2)', cardName: 'Monitor Card', pointName: 'DIFF TEMP', bindName: 'DIFF TEMP', pointType: 'analog', values: '', category: 'Monitor', units: '°C', currentValue: 5.4 },
        { equipment: 'BTU (Quantity=2)', cardName: 'Monitor Card', pointName: 'E3 - Cooling Energy', bindName: 'E3 - Cooling Energy', pointType: 'analog', values: '', category: 'Monitor', units: 'KWh', currentValue: 124.8 },
        { equipment: 'BTU (Quantity=2)', cardName: 'Monitor Card', pointName: 'FLOW V1', bindName: 'FLOW V2', pointType: 'analog', values: '', category: 'Monitor', units: 'm3/h', currentValue: 4.8 }
      ]
    }
  ],

  '2F': [
    {
      id: 'A02-2F-SMD-01',
      name: 'SMD-01 (Smoke Damper)',
      floor: '2F',
      type: 'SMD',
      position: [-5.2, 2.6, -4.5],
      status: 'NORMAL',
      summaryBadge: '1= OPEN',
      points: [
        { equipment: 'SMD-01', cardName: 'Monitor Card', pointName: 'Status', bindName: '2F_SMD01_STS', pointType: 'digital', values: '1= OPEN, 0= CLOSED', category: 'Monitor', currentValue: 1 }
      ]
    },
    {
      id: 'A02-2F-SMD-02',
      name: 'SMD-02 (Smoke Damper)',
      floor: '2F',
      type: 'SMD',
      position: [5.2, 2.6, -4.5],
      status: 'NORMAL',
      summaryBadge: '1= OPEN',
      points: [
        { equipment: 'SMD-02', cardName: 'Monitor Card', pointName: 'Status', bindName: '2F_SMD02_STS', pointType: 'digital', values: '1= OPEN, 0= CLOSED', category: 'Monitor', currentValue: 1 }
      ]
    },
    {
      id: 'A02-2F-VMD-BANK',
      name: 'VMD-01..04 (Volume Dampers)',
      floor: '2F',
      type: 'VMD',
      position: [0.0, 2.6, -3.0],
      status: 'ACTIVE',
      summaryBadge: '4/4 OPEN',
      points: Array.from({ length: 4 }).map((_, i) => ({
        equipment: `VMD-${String(i + 1).padStart(2, '0')}`,
        cardName: 'Control Card',
        pointName: 'Start/Stop',
        bindName: `2F_VMD${String(i + 1).padStart(2, '0')}_SS`,
        pointType: 'digital',
        values: '1= OPEN, 0= CLOSED',
        category: 'Control',
        currentValue: 1
      }))
    },
    {
      id: 'A02-2F-FAP',
      name: '2F Fire Alarm Subpanel',
      floor: '2F',
      type: 'FAP',
      position: [6.8, 1.4, 4.2],
      status: 'NORMAL',
      summaryBadge: '0= NORMAL',
      points: [
        { equipment: 'Fire Alarm', cardName: 'Monitor Card', pointName: 'Status', bindName: '2F_FAP', pointType: 'digital', values: '1= Alarm, 0= Normal', category: 'Monitor', currentValue: 0 }
      ]
    },
    {
      id: 'A02-2F-BTU',
      name: 'BTU Submeters (Quantity=2)',
      floor: '2F',
      type: 'BTU',
      position: [-6.8, 1.2, -2.5],
      status: 'ONLINE',
      summaryBadge: '2x BTU // 118 kWh',
      points: [
        { equipment: 'BTU (Quantity=2)', cardName: 'Monitor Card', pointName: 'DIFF TEMP', bindName: 'DIFF TEMP', pointType: 'analog', values: '', category: 'Monitor', units: '°C', currentValue: 5.6 },
        { equipment: 'BTU (Quantity=2)', cardName: 'Monitor Card', pointName: 'E3 - Cooling Energy', bindName: 'E3 - Cooling Energy', pointType: 'analog', values: '', category: 'Monitor', units: 'KWh', currentValue: 118.2 }
      ]
    }
  ],

  '3F': [
    {
      id: 'A02-3F-VMD-BANK',
      name: 'VMD-04..05 (Volume Dampers)',
      floor: '3F',
      type: 'VMD',
      position: [0.0, 2.6, -3.0],
      status: 'ACTIVE',
      summaryBadge: '2/2 OPEN',
      points: [
        { equipment: 'VMD-04', cardName: 'Control Card', pointName: 'Start/Stop', bindName: '3F_VMD04_SS', pointType: 'digital', values: '1= OPEN, 0= CLOSED', category: 'Control', currentValue: 1 },
        { equipment: 'VMD-05', cardName: 'Control Card', pointName: 'Start/Stop', bindName: '3F_VMD05_SS', pointType: 'digital', values: '1= OPEN, 0= CLOSED', category: 'Control', currentValue: 1 }
      ]
    },
    {
      id: 'A02-3F-FAP',
      name: '3F Fire Alarm Subpanel',
      floor: '3F',
      type: 'FAP',
      position: [6.8, 1.4, 4.2],
      status: 'NORMAL',
      summaryBadge: '0= NORMAL',
      points: [
        { equipment: 'Fire Alarm', cardName: 'Monitor Card', pointName: 'Status', bindName: '3F_FAP', pointType: 'digital', values: '1= Alarm, 0= Normal', category: 'Monitor', currentValue: 0 }
      ]
    },
    {
      id: 'A02-3F-ELEVATORS',
      name: 'Elevator-01 & 02 Upper Lobby',
      floor: '3F',
      type: 'ELEVATOR',
      position: [-5.5, 1.5, 1.0],
      status: 'ONLINE',
      summaryBadge: '2 CARS // READY',
      points: [
        { equipment: 'Elevator-01', cardName: 'Monitor Card', pointName: 'sts1..sts6', bindName: 'sts1', pointType: 'digital', values: '1=Ready', category: 'Monitor', currentValue: 1 },
        { equipment: 'Elevator-02', cardName: 'Monitor Card', pointName: 'sts1..sts6', bindName: 'sts1', pointType: 'digital', values: '1=Ready', category: 'Monitor', currentValue: 1 }
      ]
    },
    {
      id: 'A02-3F-BTU',
      name: 'BTU Submeters (Quantity=2)',
      floor: '3F',
      type: 'BTU',
      position: [-6.8, 1.2, -2.5],
      status: 'ONLINE',
      summaryBadge: '2x BTU // 106 kWh',
      points: [
        { equipment: 'BTU (Quantity=2)', cardName: 'Monitor Card', pointName: 'DIFF TEMP', bindName: 'DIFF TEMP', pointType: 'analog', values: '', category: 'Monitor', units: '°C', currentValue: 5.2 },
        { equipment: 'BTU (Quantity=2)', cardName: 'Monitor Card', pointName: 'E3 - Cooling Energy', bindName: 'E3 - Cooling Energy', pointType: 'analog', values: '', category: 'Monitor', units: 'KWh', currentValue: 106.4 }
      ]
    }
  ],

  RF: [
    // Pressurization Fan PF-RF-01
    {
      id: 'A02-RF-PF-01',
      name: 'PF-RF-01 (Stair Pressurization Fan)',
      floor: 'RF',
      type: 'PF',
      position: [-3.8, 1.2, -4.2],
      status: 'ACTIVE',
      summaryBadge: 'ON // 450 Pa // 62% VSD',
      points: [
        { equipment: 'PF-RF-01', cardName: 'Monitor Card', pointName: 'Status', bindName: 'RF_PF01_STS', pointType: 'digital', values: '1= ON, 0= OFF', category: 'Monitor', currentValue: 1 },
        { equipment: 'PF-RF-01', cardName: 'Monitor Card', pointName: 'Trip', bindName: 'RF_PF01_TRIP', pointType: 'digital', values: '1= Trip Alarm, 0= Safe', category: 'Monitor', currentValue: 0 },
        { equipment: 'PF-RF-01', cardName: 'Monitor Card', pointName: 'DPS', bindName: 'RF_PF01_DPS', pointType: 'digital', values: '1= FLOW, 0= NO FLOW', category: 'Monitor', currentValue: 1 },
        { equipment: 'PF-RF-01', cardName: 'Monitor Card', pointName: 'DPT', bindName: 'RF_PF01_DPT', pointType: 'analog', values: '', category: 'Monitor', valueRange: '0-1000', units: 'Pa', currentValue: 450 },
        { equipment: 'PF-RF-01', cardName: 'Monitor Card', pointName: 'VSD FB', bindName: 'RF_PF01_FB', pointType: 'analog', values: '', category: 'Monitor', valueRange: '0-100', units: '%', currentValue: 62 },
        { equipment: 'PF-RF-01', cardName: 'Control Card', pointName: 'Start Stop', bindName: 'RF_PF01_SS', pointType: 'digital', values: '1= ON, 0= OFF', category: 'Controllable', currentValue: 1 },
        { equipment: 'PF-RF-01', cardName: 'Control Card', pointName: 'VSD Signal', bindName: 'RF_PF01_Signal', pointType: 'analog', values: '', category: 'Controllable', valueRange: '0-100', units: '%', currentValue: 62 }
      ]
    },
    // VSD-PF01-RF
    {
      id: 'A02-RF-VSD-PF01',
      name: 'VSD-PF01-RF Drive Telemetry',
      floor: 'RF',
      type: 'PF',
      position: [-5.5, 1.2, -4.2],
      status: 'ONLINE',
      summaryBadge: '42.5 Hz // 14.8 A // 8.2 kW',
      points: [
        { equipment: 'VSD-PF01-RF', cardName: 'Monitor Card', pointName: 'Actual Speed', bindName: 'Actual Speed', pointType: 'analog', values: '', category: 'Monitor', units: 'hz', currentValue: 42.5 },
        { equipment: 'VSD-PF01-RF', cardName: 'Monitor Card', pointName: 'Motor Input Current', bindName: 'Motor Input Current', pointType: 'analog', values: '', category: 'Monitor', units: 'A', currentValue: 14.8 },
        { equipment: 'VSD-PF01-RF', cardName: 'Monitor Card', pointName: 'Motor Power', bindName: 'Motor Power', pointType: 'analog', values: '', category: 'Monitor', units: 'KW', currentValue: 8.2 }
      ]
    },
    // Roof FCUs
    {
      id: 'A02-RF-FCU-BANK',
      name: 'RF FCU-01..03 (Roof Units)',
      floor: 'RF',
      type: 'FCU',
      position: [2.5, 1.0, 3.0],
      status: 'ONLINE',
      summaryBadge: '3x RUN // 22.0°C',
      points: [
        { equipment: 'FCU-01', cardName: 'Monitor Card', pointName: 'TEMP', bindName: 'TEMP', pointType: 'analog', values: '', category: 'Monitor', units: 'celsius', currentValue: 22.0 },
        { equipment: 'FCU-02', cardName: 'Monitor Card', pointName: 'TEMP', bindName: 'TEMP', pointType: 'analog', values: '', category: 'Monitor', units: 'celsius', currentValue: 22.2 },
        { equipment: 'FCU-03', cardName: 'Monitor Card', pointName: 'TEMP', bindName: 'TEMP', pointType: 'analog', values: '', category: 'Monitor', units: 'celsius', currentValue: 21.8 }
      ]
    },
    // Elevators 01, 02, 03 Machine Room
    {
      id: 'A02-RF-ELEVATORS-MR',
      name: 'Elevator Machine Room (MR)',
      floor: 'RF',
      type: 'ELEVATOR',
      position: [-5.2, 1.8, 1.2],
      status: 'ONLINE',
      summaryBadge: '3x HOIST MOTORS // OK',
      points: [
        { equipment: 'Elevator-01', cardName: 'Monitor Card', pointName: 'sts1..sts6', bindName: 'sts1', pointType: 'digital', values: '1=Safe', category: 'Monitor', currentValue: 1 },
        { equipment: 'Elevator-02', cardName: 'Monitor Card', pointName: 'sts1..sts6', bindName: 'sts1', pointType: 'digital', values: '1=Safe', category: 'Monitor', currentValue: 1 },
        { equipment: 'Elevator-03', cardName: 'Monitor Card', pointName: 'sts1..sts6', bindName: 'sts1', pointType: 'digital', values: '1=Safe', category: 'Monitor', currentValue: 1 }
      ]
    },
    // DPM-EMCC03-RF Digital Power Meter
    {
      id: 'A02-RF-DPM-EMCC03',
      name: 'DPM-EMCC03-RF Power Meter',
      floor: 'RF',
      type: 'DPM',
      position: [5.2, 1.2, -3.5],
      status: 'ONLINE',
      summaryBadge: '398 V // 50.0 Hz // PF 0.94',
      points: [
        { equipment: 'DPM-EMCC03-RF', cardName: 'Monitor Card', pointName: 'Voltage L-L Avg', bindName: 'Voltage L-L Avg', pointType: 'analog', values: '', category: 'Monitor', units: 'V', currentValue: 398.2 },
        { equipment: 'DPM-EMCC03-RF', cardName: 'Monitor Card', pointName: 'Frequency', bindName: 'Frequency', pointType: 'analog', values: '', category: 'Monitor', units: 'hz', currentValue: 50.02 },
        { equipment: 'DPM-EMCC03-RF', cardName: 'Monitor Card', pointName: 'Active Power Total', bindName: 'Active Power Total', pointType: 'analog', values: '', category: 'Monitor', units: 'KWh', currentValue: 46.8 },
        { equipment: 'DPM-EMCC03-RF', cardName: 'Monitor Card', pointName: 'Power Factor Total', bindName: 'Power Factor Total', pointType: 'analog', values: '', category: 'Monitor', units: '', currentValue: 0.94 }
      ]
    }
  ],

  UR: [
    // FAHU (Fresh Air Handling Unit)
    {
      id: 'A02-UR-FAHU',
      name: 'FAHU (Fresh Air Handling Unit)',
      floor: 'UR',
      type: 'FAHU',
      position: [0.0, 1.6, 0.0],
      status: 'ACTIVE',
      summaryBadge: 'SUPPLY 19.5°C // 520 Pa // FILTER OK',
      points: [
        { equipment: 'FAHU', cardName: 'Monitor Card', pointName: 'Status', bindName: 'UR_FAHU_Fan_STS', pointType: 'digital', values: '1= ON, 0= OFF', category: 'Monitor', currentValue: 1 },
        { equipment: 'FAHU', cardName: 'Monitor Card', pointName: 'DPT', bindName: 'UR_FAHU_DPT', pointType: 'analog', values: '', category: 'Monitor', valueRange: '0-1000', units: 'Pa', currentValue: 520 },
        { equipment: 'FAHU', cardName: 'Monitor Card', pointName: 'VSD FB', bindName: 'UR_FAHU_VSD_FB', pointType: 'analog', values: '', category: 'Monitor', valueRange: '0-100', units: '%', currentValue: 68 },
        { equipment: 'FAHU', cardName: 'Monitor Card', pointName: 'Supply Duct Temp', bindName: 'UR_FAHU_Supply_Temp', pointType: 'analog', values: '', category: 'Monitor', valueRange: '0-60', units: 'celsius', currentValue: 19.5 },
        { equipment: 'FAHU', cardName: 'Monitor Card', pointName: 'Supply Duct Humidity', bindName: 'UR_FAHU_Supply_Humd', pointType: 'analog', values: '', category: 'Monitor', valueRange: '0-100', units: 'Percentage', currentValue: 48.0 },
        { equipment: 'FAHU', cardName: 'Monitor Card', pointName: 'Outside Temp', bindName: 'UR_FAHU_Outside_Temp', pointType: 'analog', values: '', category: 'Monitor', valueRange: '0-60', units: 'celsius', currentValue: 24.2 },
        { equipment: 'FAHU', cardName: 'Monitor Card', pointName: 'Smoke Detector', bindName: 'UR_FAHU_Smoke_Detector_STS', pointType: 'digital', values: '1=Smoke Alarm, 0=Safe', category: 'Monitor', currentValue: 0 },
        { equipment: 'FAHU', cardName: 'Monitor Card', pointName: 'DPS Filter', bindName: 'DPS Filter', pointType: 'digital', values: '1=Dirty, 0=Clean', category: 'Monitor', currentValue: 0 },
        { equipment: 'FAHU', cardName: 'Control Card', pointName: 'FAN-SS', bindName: 'UR_FAHU_Fan_SS', pointType: 'digital', values: '1=ON, 0=OFF', category: 'Controllable', currentValue: 1 },
        { equipment: 'FAHU', cardName: 'Control Card', pointName: 'Fresh Damper CS', bindName: 'UR_FAHU_Damper1_SS', pointType: 'digital', values: '0=CLOSED, 1=OPEN', category: 'Controllable', currentValue: 1 },
        { equipment: 'FAHU', cardName: 'Control Card', pointName: 'PICV SIGNAL', bindName: 'UR_FAHU_PICV_Signal', pointType: 'analog', values: '', category: 'Controllable', valueRange: '0-100', units: '%', currentValue: 72 }
      ]
    },
    // Pressurization Fans PF-UR-02 & PF-UR-03
    {
      id: 'A02-UR-PF-02',
      name: 'PF-UR-02 (Pressurization Fan 02)',
      floor: 'UR',
      type: 'PF',
      position: [-4.5, 1.4, -4.5],
      status: 'ACTIVE',
      summaryBadge: 'ON // 480 Pa // VSD 70%',
      points: [
        { equipment: 'PF-UR-02', cardName: 'Monitor Card', pointName: 'Status', bindName: 'UR_PF02_STS', pointType: 'digital', values: '1= ON, 0= OFF', category: 'Monitor', currentValue: 1 },
        { equipment: 'PF-UR-02', cardName: 'Monitor Card', pointName: 'DPT', bindName: 'UR_PF02_DPT', pointType: 'analog', values: '', category: 'Monitor', valueRange: '0-1000', units: 'Pa', currentValue: 480 },
        { equipment: 'PF-UR-02', cardName: 'Monitor Card', pointName: 'VSD FB', bindName: 'UR_PF02_FB', pointType: 'analog', values: '', category: 'Monitor', valueRange: '0-100', units: '%', currentValue: 70 }
      ]
    },
    {
      id: 'A02-UR-PF-03',
      name: 'PF-UR-03 (Pressurization Fan 03)',
      floor: 'UR',
      type: 'PF',
      position: [4.5, 1.4, -4.5],
      status: 'ACTIVE',
      summaryBadge: 'ON // 490 Pa // VSD 72%',
      points: [
        { equipment: 'PF-UR-03', cardName: 'Monitor Card', pointName: 'Status', bindName: 'UR_PF03_STS', pointType: 'digital', values: '1= ON, 0= OFF', category: 'Monitor', currentValue: 1 },
        { equipment: 'PF-UR-03', cardName: 'Monitor Card', pointName: 'DPT', bindName: 'UR_PF03_DPT', pointType: 'analog', values: '', category: 'Monitor', valueRange: '0-1000', units: 'Pa', currentValue: 490 }
      ]
    },
    // Smoke Extract Fans SF-UR-01 & SF-UR-02
    {
      id: 'A02-UR-SF-01',
      name: 'SF-UR-01 (Smoke Extract Fan)',
      floor: 'UR',
      type: 'SF',
      position: [-4.5, 1.4, 4.5],
      status: 'NORMAL',
      summaryBadge: 'STANDBY // SAFE',
      points: [
        { equipment: 'SF-UR-01', cardName: 'Monitor Card', pointName: 'Status', bindName: 'UR_SF01_STS', pointType: 'digital', values: '1= ON, 0= OFF', category: 'Monitor', currentValue: 0 }
      ]
    },
    {
      id: 'A02-UR-SF-02',
      name: 'SF-UR-02 (Smoke Extract Fan)',
      floor: 'UR',
      type: 'SF',
      position: [4.5, 1.4, 4.5],
      status: 'NORMAL',
      summaryBadge: 'STANDBY // SAFE',
      points: [
        { equipment: 'SF-UR-02', cardName: 'Monitor Card', pointName: 'Status', bindName: 'UR_SF02_STS', pointType: 'digital', values: '1= ON, 0= OFF', category: 'Monitor', currentValue: 0 }
      ]
    },
    // Power Distribution Panels DPM-MCC01, DPM-EMCC01, DPM-EMCC02
    {
      id: 'A02-UR-DPM-BANK',
      name: 'DPM-MCC01 / EMCC01 / EMCC02 (Main Switchboard)',
      floor: 'UR',
      type: 'DPM',
      position: [6.5, 1.2, 0.0],
      status: 'ONLINE',
      summaryBadge: '399 V // 50.0 Hz // 128 kW',
      points: [
        { equipment: 'DPM-MCC01-UR', cardName: 'Monitor Card', pointName: 'Voltage L-L Avg', bindName: 'Voltage L-L Avg', pointType: 'analog', values: '', category: 'Monitor', units: 'V', currentValue: 399.0 },
        { equipment: 'DPM-MCC01-UR', cardName: 'Monitor Card', pointName: 'Frequency', bindName: 'Frequency', pointType: 'analog', values: '', category: 'Monitor', units: 'hz', currentValue: 50.01 },
        { equipment: 'DPM-MCC01-UR', cardName: 'Monitor Card', pointName: 'Active Power Total', bindName: 'Active Power Total', pointType: 'analog', values: '', category: 'Monitor', units: 'KWh', currentValue: 128.4 }
      ]
    }
  ],

  B1: [
    {
      id: 'A02-B1-ETS',
      name: 'District Cooling ETS Heat Exchanger Plant',
      floor: 'B1',
      type: 'BTU',
      position: [0.0, 1.2, 0.0],
      status: 'ONLINE',
      summaryBadge: 'CHW SUPPLY 5.5°C // 840 RT',
      points: [
        { equipment: 'ETS Heat Exchanger', cardName: 'Monitor Card', pointName: 'CHW Supply Temp', bindName: 'B1_ETS_CHW_ST', pointType: 'analog', values: '', category: 'Monitor', units: '°C', currentValue: 5.5 },
        { equipment: 'ETS Heat Exchanger', cardName: 'Monitor Card', pointName: 'CHW Return Temp', bindName: 'B1_ETS_CHW_RT', pointType: 'analog', values: '', category: 'Monitor', units: '°C', currentValue: 12.8 },
        { equipment: 'ETS Heat Exchanger', cardName: 'Monitor Card', pointName: 'Cooling Capacity', bindName: 'B1_ETS_CAPACITY', pointType: 'analog', values: '', category: 'Monitor', units: 'RT', currentValue: 840 }
      ]
    }
  ]
};
