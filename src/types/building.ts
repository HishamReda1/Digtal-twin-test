export type FloorId = 'B1' | 'GF' | '1F' | '2F' | '3F' | 'RF' | 'UR';

export type FloorNodeName =
  | 'Floor_B1'
  | 'Floor_GF'
  | 'Floor_1F'
  | 'Floor_2F'
  | 'Floor_3F'
  | 'Floor_RF'
  | 'Floor_UR';

export interface FloorMeta {
  id: FloorId;
  nodeName: FloorNodeName;
  name: string;
  badge: string;
  subtitle: string;
  elevation: number; // in 3D scene units (Y-axis)
  height: number;
  orderIndex: number; // 0 for B1 to 6 for UR
  accentColor: string;
  description: string;
}

export const FLOOR_CONFIGS: Record<FloorId, FloorMeta> = {
  B1: {
    id: 'B1',
    nodeName: 'Floor_B1',
    name: 'Basement 1 ETS Plant',
    badge: 'B1 SUBSTATION',
    subtitle: 'DISTRICT COOLING HEAT EXCHANGER STATION',
    elevation: -2.8,
    height: 2.8,
    orderIndex: 0,
    accentColor: '#6366f1',
    description: 'ETS Plate Heat Exchangers, Primary/Secondary CHW pumps, Revenue BTU metering'
  },
  GF: {
    id: 'GF',
    nodeName: 'Floor_GF',
    name: 'Ground Floor Main',
    badge: 'GF MAIN HUB',
    subtitle: 'MAIN SERVICES, HIGH-DENSITY METERING & FCUS',
    elevation: 0,
    height: 3.4,
    orderIndex: 1,
    accentColor: '#22d3ee',
    description: 'Main lobby, 13x KWH power submeters, 13x water meters, 9x BTU meters, FCUs & dampers'
  },
  '1F': {
    id: '1F',
    nodeName: 'Floor_1F',
    name: '1st Floor Mezzanine',
    badge: '1F MEZZANINE',
    subtitle: 'COMMERCIAL ZONE & DAMPER MONITORING',
    elevation: 3.4,
    height: 3.0,
    orderIndex: 2,
    accentColor: '#38bdf8',
    description: 'Commercial suites, 2x BTU submeters, EMCC distribution, volume and smoke dampers'
  },
  '2F': {
    id: '2F',
    nodeName: 'Floor_2F',
    name: '2nd Floor Suites',
    badge: '2F PODIUM',
    subtitle: 'TENANT DISTRIBUTION & LIFE SAFETY MATRIX',
    elevation: 6.4,
    height: 3.0,
    orderIndex: 3,
    accentColor: '#0ea5e9',
    description: 'Tenant office space, life safety loops, elevator hall calls, BTU monitoring'
  },
  '3F': {
    id: '3F',
    nodeName: 'Floor_3F',
    name: '3rd Floor Commercial',
    badge: '3F EXECUTIVE',
    subtitle: 'OFFICE FLOORS & COOLING SUB-METERING',
    elevation: 9.4,
    height: 3.0,
    orderIndex: 4,
    accentColor: '#06b6d4',
    description: 'Executive suites, chilled water submetering, smoke dampers VMD 4-5'
  },
  RF: {
    id: 'RF',
    nodeName: 'Floor_RF',
    name: 'Main Roof Level',
    badge: 'RF LOUVER DECK',
    subtitle: 'CHILLED WATER FCUS & ELEVATOR MACHINE ROOM',
    elevation: 12.4,
    height: 3.2,
    orderIndex: 5,
    accentColor: '#10b981',
    description: 'Acoustic louvers, FCU 1-3, Elevator machine room (sts1..sts6), pressurization fans'
  },
  UR: {
    id: 'UR',
    nodeName: 'Floor_UR',
    name: 'Upper Roof Level',
    badge: 'UR ROOF TOP',
    subtitle: 'FRESH AIR HANDLING & PRESSURIZATION PLANT',
    elevation: 15.6,
    height: 2.8,
    orderIndex: 6,
    accentColor: '#22d3ee',
    description: 'FAHU-UR with static pressure control, stairwell pressurization fans PF-02/03, smoke extract'
  }
};

export const EXPECTED_FLOOR_NODES: FloorNodeName[] = [
  'Floor_B1',
  'Floor_GF',
  'Floor_1F',
  'Floor_2F',
  'Floor_3F',
  'Floor_RF',
  'Floor_UR'
];

export const ORDERED_FLOOR_IDS: FloorId[] = ['UR', 'RF', '3F', '2F', '1F', 'GF', 'B1'];

// 25 Individual Buildings across the Golden Gate Masterplan (A01 to A25)
export type BuildingId =
  | 'A01'
  | 'A02'
  | 'A03'
  | 'A04'
  | 'A05'
  | 'A06'
  | 'A07'
  | 'A08'
  | 'A09'
  | 'A10'
  | 'A11'
  | 'A12'
  | 'A13'
  | 'A14'
  | 'A15'
  | 'A16'
  | 'A17'
  | 'A18'
  | 'A19'
  | 'A20'
  | 'A21'
  | 'A22'
  | 'A23'
  | 'A24'
  | 'A25';

export interface BuildingMeta {
  id: BuildingId;
  name: string;
  type: 'Retail & Anchor' | 'Fine Dining' | 'Commercial Office' | 'Plaza Pavilion' | 'Executive Hub';
  floors: number;
  position: [number, number, number]; // [x, y, z]
  size: [number, number, number]; // [width, height, depth]
  hasPool?: boolean;
  hasPergola?: boolean;
  hasSolarPV?: boolean;
  hasCanopy?: boolean;
  occupancy: number; // percentage
  status: 'Operational' | 'Optimal' | 'Maintenance';
}

export const BUILDINGS_CONFIG: Record<BuildingId, BuildingMeta> = {
  // Zone 1: West Entertainment & Retail Pods
  A01: {
    id: 'A01',
    name: 'Building A01 - West Gateway',
    type: 'Retail & Anchor',
    floors: 4,
    position: [-126, 0, -12],
    size: [17, 13, 15],
    hasSolarPV: true,
    hasPergola: true,
    occupancy: 84,
    status: 'Operational'
  },
  A02: {
    id: 'A02',
    name: 'Building A02 - Terraced Retail',
    type: 'Retail & Anchor',
    floors: 4,
    position: [-107, 0, -12],
    size: [16, 13, 15],
    hasPergola: true,
    occupancy: 91,
    status: 'Optimal'
  },
  A03: {
    id: 'A03',
    name: 'Building A03 - South Promenade Cafe',
    type: 'Fine Dining',
    floors: 3,
    position: [-126, 0, 7],
    size: [14, 10, 14],
    hasCanopy: true,
    occupancy: 76,
    status: 'Optimal'
  },
  A04: {
    id: 'A04',
    name: 'Building A04 - West Anchor Podium',
    type: 'Retail & Anchor',
    floors: 4,
    position: [-106, 0, 7],
    size: [19, 13, 18],
    hasPergola: true,
    occupancy: 88,
    status: 'Optimal'
  },
  A05: {
    id: 'A05',
    name: 'Building A05 - Promenade Suites',
    type: 'Commercial Office',
    floors: 4,
    position: [-88, 0, 7],
    size: [15, 13, 17],
    hasSolarPV: true,
    occupancy: 82,
    status: 'Operational'
  },

  // Zone 2: West-Central Courtyard & Offices
  A06: {
    id: 'A06',
    name: 'Building A06 - Garden Office',
    type: 'Commercial Office',
    floors: 4,
    position: [-88, 0, -13],
    size: [16, 13, 15],
    hasPergola: true,
    occupancy: 79,
    status: 'Operational'
  },
  A07: {
    id: 'A07',
    name: 'Building A07 - North Office Pavilion',
    type: 'Commercial Office',
    floors: 4,
    position: [-68, 0, -13],
    size: [16, 13, 15],
    hasSolarPV: true,
    occupancy: 94,
    status: 'Optimal'
  },
  A08: {
    id: 'A08',
    name: 'Building A08 - South Dining Hub',
    type: 'Fine Dining',
    floors: 4,
    position: [-68, 0, 7],
    size: [16, 13, 17],
    hasPergola: true,
    hasCanopy: true,
    occupancy: 89,
    status: 'Optimal'
  },
  A09: {
    id: 'A09',
    name: 'Building A09 - Tech Courtyard North',
    type: 'Commercial Office',
    floors: 4,
    position: [-48, 0, -13],
    size: [17, 13, 15],
    hasSolarPV: true,
    occupancy: 85,
    status: 'Operational'
  },
  A10: {
    id: 'A10',
    name: 'Building A10 - Tech Courtyard South',
    type: 'Commercial Office',
    floors: 4,
    position: [-48, 0, 7],
    size: [17, 13, 17],
    hasCanopy: true,
    occupancy: 90,
    status: 'Optimal'
  },
  A11: {
    id: 'A11',
    name: 'Building A11 - Plaza West Gateway',
    type: 'Plaza Pavilion',
    floors: 4,
    position: [-30, 0, -13],
    size: [14, 13, 15],
    hasPergola: true,
    occupancy: 86,
    status: 'Operational'
  },

  // Zone 3: Central Golden Ring Plaza (O-Canopy)
  A12: {
    id: 'A12',
    name: 'Building A12 - Plaza Gourmet West',
    type: 'Fine Dining',
    floors: 4,
    position: [-30, 0, 7],
    size: [14, 13, 16],
    hasPergola: true,
    occupancy: 95,
    status: 'Optimal'
  },
  A13: {
    id: 'A13',
    name: 'Building A13 - Sky Pool & Lounge NW',
    type: 'Plaza Pavilion',
    floors: 4,
    position: [-13, 0, -14],
    size: [16, 13, 16],
    hasPool: true,
    hasPergola: true,
    occupancy: 97,
    status: 'Optimal'
  },
  A14: {
    id: 'A14',
    name: 'Building A14 - Plaza South Gate West',
    type: 'Fine Dining',
    floors: 4,
    position: [-13, 0, 8],
    size: [14, 13, 15],
    hasPergola: true,
    occupancy: 92,
    status: 'Optimal'
  },
  A15: {
    id: 'A15',
    name: 'Building A15 - Sky Lounge NE',
    type: 'Plaza Pavilion',
    floors: 4,
    position: [13, 0, -14],
    size: [16, 13, 16],
    hasPergola: true,
    occupancy: 93,
    status: 'Optimal'
  },
  A16: {
    id: 'A16',
    name: 'Building A16 - Plaza South Gate East',
    type: 'Fine Dining',
    floors: 4,
    position: [13, 0, 8],
    size: [14, 13, 15],
    hasPergola: true,
    occupancy: 88,
    status: 'Optimal'
  },

  // Zone 4: East-Central Mega Anchor & Commercial Hub
  A17: {
    id: 'A17',
    name: 'Building A17 - Executive Office North',
    type: 'Commercial Office',
    floors: 4,
    position: [30, 0, -13],
    size: [15, 13, 15],
    hasPergola: true,
    occupancy: 81,
    status: 'Operational'
  },
  A18: {
    id: 'A18',
    name: 'Building A18 - Boulevard Cafe South',
    type: 'Fine Dining',
    floors: 4,
    position: [30, 0, 7],
    size: [15, 13, 15],
    hasCanopy: true,
    occupancy: 87,
    status: 'Optimal'
  },
  A19: {
    id: 'A19',
    name: 'Building A19 - Business Pod North',
    type: 'Commercial Office',
    floors: 4,
    position: [48, 0, -13],
    size: [17, 13, 15],
    hasSolarPV: true,
    occupancy: 89,
    status: 'Optimal'
  },
  A20: {
    id: 'A20',
    name: 'Building A20 - Boulevard Retail South',
    type: 'Retail & Anchor',
    floors: 4,
    position: [48, 0, 7],
    size: [17, 13, 16],
    hasPergola: true,
    occupancy: 85,
    status: 'Operational'
  },
  A21: {
    id: 'A21',
    name: 'Building A21 - Grand Anchor Mall & Atrium',
    type: 'Retail & Anchor',
    floors: 4,
    position: [73, 0, -3],
    size: [28, 14, 27],
    hasSolarPV: true,
    hasPergola: true,
    occupancy: 96,
    status: 'Optimal'
  },

  // Zone 5: Far East Boutique Corporate Pods
  A22: {
    id: 'A22',
    name: 'Building A22 - East Corporate North',
    type: 'Commercial Office',
    floors: 4,
    position: [99, 0, -12],
    size: [16, 13, 15],
    hasSolarPV: true,
    occupancy: 78,
    status: 'Operational'
  },
  A23: {
    id: 'A23',
    name: 'Building A23 - East Promenade South',
    type: 'Commercial Office',
    floors: 4,
    position: [99, 0, 8],
    size: [16, 13, 15],
    hasPergola: true,
    occupancy: 83,
    status: 'Operational'
  },
  A24: {
    id: 'A24',
    name: 'Building A24 - East Terminus North',
    type: 'Executive Hub',
    floors: 4,
    position: [119, 0, -12],
    size: [16, 13, 15],
    hasPergola: true,
    occupancy: 80,
    status: 'Operational'
  },
  A25: {
    id: 'A25',
    name: 'Building A25 - East Terminus South',
    type: 'Executive Hub',
    floors: 4,
    position: [119, 0, 8],
    size: [16, 13, 15],
    hasSolarPV: true,
    occupancy: 88,
    status: 'Optimal'
  }
};

