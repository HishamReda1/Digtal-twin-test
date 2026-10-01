import fs from 'fs';
import path from 'path';

// Schema: PointKey,Level,Equipment,Card,PointName,BindName,Type,Access,Unit,Range,Value1,Value0,Value2,EboPath
const rows = [
  'PointKey,Level,Equipment,Card,PointName,BindName,Type,Access,Unit,Range,Value1,Value0,Value2,EboPath'
];

let pointIndex = 1;
function addPoint(level, equipment, card, name, bind, type, access, unit, range, v1, v0, v2, ebo) {
  const key = `PT_${String(pointIndex++).padStart(4, '0')}`;
  rows.push([key, level, equipment, card, name, bind, type, access, unit, range, v1, v0, v2, ebo].join(','));
}

// 1. BASEMENT B1 (ETS Plant, Pumps, HEX, BTU, Power, Dampers)
// ETS Pumps (P-01, P-02, P-03)
['P-01', 'P-02', 'P-03'].forEach(pump => {
  addPoint('B1', pump, 'ETS_PUMPS', `${pump} Start/Stop`, `${pump}_SS`, 'digital', 'Controllable', '', '0-1', 'Run', 'Stop', '', `/Server 1/B1/ETS/${pump}/SS`);
  addPoint('B1', pump, 'ETS_PUMPS', `${pump} Run Status`, `${pump}_STS`, 'digital', 'Monitor', '', '0-1', 'Running', 'Stopped', '', `/Server 1/B1/ETS/${pump}/STS`);
  addPoint('B1', pump, 'ETS_PUMPS', `${pump} Trip Alarm`, `${pump}_TRIP`, 'digital', 'Monitor', '', '0-1', 'Trip Alarm', 'Normal', '', `/Server 1/B1/ETS/${pump}/TRIP`);
  addPoint('B1', pump, 'ETS_PUMPS', `${pump} VSD Frequency`, `${pump}_SPEED`, 'analog', 'Controllable', 'Hz', '0-50', '', '', '', `/Server 1/B1/ETS/${pump}/SPEED`);
  addPoint('B1', pump, 'ETS_PUMPS', `${pump} Power kW`, `${pump}_KW`, 'analog', 'Monitor', 'kW', '0-45', '', '', '', `/Server 1/B1/ETS/${pump}/KW`);
  addPoint('B1', pump, 'ETS_PUMPS', `${pump} Running Hours`, `${pump}_HRS`, 'analog', 'Monitor', 'hrs', '0-99999', '', '', '', `/Server 1/B1/ETS/${pump}/HRS`);
});

// ETS Heat Exchangers (HEX-01, HEX-02)
['HEX-01', 'HEX-02'].forEach(hex => {
  addPoint('B1', hex, 'ETS_HEX', `${hex} Primary Supply Temp`, `${hex}_PRI_SUP_T`, 'analog', 'Monitor', '°C', '0-30', '', '', '', `/Server 1/B1/ETS/${hex}/PRI_SUP_T`);
  addPoint('B1', hex, 'ETS_HEX', `${hex} Primary Return Temp`, `${hex}_PRI_RET_T`, 'analog', 'Monitor', '°C', '0-30', '', '', '', `/Server 1/B1/ETS/${hex}/PRI_RET_T`);
  addPoint('B1', hex, 'ETS_HEX', `${hex} Secondary Supply Temp`, `${hex}_SEC_SUP_T`, 'analog', 'Monitor', '°C', '0-30', '', '', '', `/Server 1/B1/ETS/${hex}/SEC_SUP_T`);
  addPoint('B1', hex, 'ETS_HEX', `${hex} Secondary Return Temp`, `${hex}_SEC_RET_T`, 'analog', 'Monitor', '°C', '0-30', '', '', '', `/Server 1/B1/ETS/${hex}/SEC_RET_T`);
  addPoint('B1', hex, 'ETS_HEX', `${hex} Primary Flow Rate`, `${hex}_PRI_FLOW`, 'analog', 'Monitor', 'm3/h', '0-150', '', '', '', `/Server 1/B1/ETS/${hex}/PRI_FLOW`);
  addPoint('B1', hex, 'ETS_HEX', `${hex} Secondary DP`, `${hex}_SEC_DP`, 'analog', 'Monitor', 'bar', '0-6', '', '', '', `/Server 1/B1/ETS/${hex}/SEC_DP`);
  addPoint('B1', hex, 'ETS_HEX', `${hex} Control Valve Pos`, `${hex}_VALVE_POS`, 'analog', 'Controllable', '%', '0-100', '', '', '', `/Server 1/B1/ETS/${hex}/VALVE_POS`);
  addPoint('B1', hex, 'ETS_HEX', `${hex} Thermal Energy Rate`, `${hex}_TR`, 'analog', 'Monitor', 'TR', '0-1000', '', '', '', `/Server 1/B1/ETS/${hex}/TR`);
});

// ETS Modbus Revenue BTU Meters
['BTU-B1-01', 'BTU-B1-02'].forEach(btu => {
  addPoint('B1', btu, 'BTU_METERS', `${btu} Energy Total`, `${btu}_KWH`, 'analog', 'Monitor', 'kWh', '0-9999999', '', '', '', `/Server 1/B1/Meters/${btu}/KWH`);
  addPoint('B1', btu, 'BTU_METERS', `${btu} Instant Cooling`, `${btu}_TR`, 'analog', 'Monitor', 'TR', '0-600', '', '', '', `/Server 1/B1/Meters/${btu}/TR`);
  addPoint('B1', btu, 'BTU_METERS', `${btu} Water Flow Rate`, `${btu}_FLOW`, 'analog', 'Monitor', 'm3/h', '0-100', '', '', '', `/Server 1/B1/Meters/${btu}/FLOW`);
  addPoint('B1', btu, 'BTU_METERS', `${btu} Supply Water Temp`, `${btu}_TS`, 'analog', 'Monitor', '°C', '0-30', '', '', '', `/Server 1/B1/Meters/${btu}/TS`);
  addPoint('B1', btu, 'BTU_METERS', `${btu} Return Water Temp`, `${btu}_TR_T`, 'analog', 'Monitor', '°C', '0-30', '', '', '', `/Server 1/B1/Meters/${btu}/TR_T`);
});

// Known Sheet Issue 1: FLOW V1 point bound as FLOW V2
addPoint('B1', 'FLOW-V1', 'ETS_HEX', 'Header Primary Flow V1', 'FLOW_V2', 'analog', 'Monitor', 'm3/h', '0-200', '', '', '', `/Server 1/B1/ETS/FLOW_V1`);

// B1 Power Meters
['DPM-B1-MCC', 'DPM-B1-CHWP', 'DPM-B1-LGT'].forEach(dpm => {
  // Known sheet issue 3: DPM Active Power Total unit KWh should be kW
  addPoint('B1', dpm, 'POWER_METERS', `${dpm} Active Power Total`, `${dpm}_KW`, 'analog', 'Monitor', 'KWh', '0-500', '', '', '', `/Server 1/B1/Power/${dpm}/KW`);
  // Known sheet issue 4: Apparent Power Total unit Btu/s should be kVA
  addPoint('B1', dpm, 'POWER_METERS', `${dpm} Apparent Power Total`, `${dpm}_KVA`, 'analog', 'Monitor', 'Btu/s', '0-600', '', '', '', `/Server 1/B1/Power/${dpm}/KVA`);
  addPoint('B1', dpm, 'POWER_METERS', `${dpm} Active Energy Import`, `${dpm}_KWH_TOT`, 'analog', 'Monitor', 'kWh', '0-9999999', '', '', '', `/Server 1/B1/Power/${dpm}/KWH_TOT`);
  addPoint('B1', dpm, 'POWER_METERS', `${dpm} Voltage L-L Avg`, `${dpm}_V`, 'analog', 'Monitor', 'V', '0-500', '', '', '', `/Server 1/B1/Power/${dpm}/V`);
  addPoint('B1', dpm, 'POWER_METERS', `${dpm} Current Avg`, `${dpm}_A`, 'analog', 'Monitor', 'A', '0-800', '', '', '', `/Server 1/B1/Power/${dpm}/A`);
  addPoint('B1', dpm, 'POWER_METERS', `${dpm} Power Factor`, `${dpm}_PF`, 'analog', 'Monitor', '', '-1..1', '', '', '', `/Server 1/B1/Power/${dpm}/PF`);
});

// 2. GROUND FLOOR (GF)
// KWH Submeters KWH-01 to KWH-13
for (let i = 1; i <= 13; i++) {
  const tag = `KWH-GF-${String(i).padStart(2, '0')}`;
  addPoint('GF', tag, 'KWH_METERS', `${tag} Active Power Total`, `${tag}_KW`, 'analog', 'Monitor', 'KWh', '0-200', '', '', '', `/Server 1/GF/Power/${tag}/KW`);
  addPoint('GF', tag, 'KWH_METERS', `${tag} Active Energy Total`, `${tag}_KWH`, 'analog', 'Monitor', 'kWh', '0-9999999', '', '', '', `/Server 1/GF/Power/${tag}/KWH`);
  addPoint('GF', tag, 'KWH_METERS', `${tag} Line Voltage`, `${tag}_V`, 'analog', 'Monitor', 'V', '0-450', '', '', '', `/Server 1/GF/Power/${tag}/V`);
  addPoint('GF', tag, 'KWH_METERS', `${tag} Current Amps`, `${tag}_A`, 'analog', 'Monitor', 'A', '0-300', '', '', '', `/Server 1/GF/Power/${tag}/A`);
}

// Water Submeters WM-01 to WM-13
for (let i = 1; i <= 13; i++) {
  const tag = `WM-GF-${String(i).padStart(2, '0')}`;
  addPoint('GF', tag, 'WATER_METERS', `${tag} Flow Rate`, `${tag}_FLOW`, 'analog', 'Monitor', 'm3/h', '0-25', '', '', '', `/Server 1/GF/Water/${tag}/FLOW`);
  addPoint('GF', tag, 'WATER_METERS', `${tag} Total Pulse Volume`, `${tag}_VOL`, 'analog', 'Monitor', 'm3', '0-999999', '', '', '', `/Server 1/GF/Water/${tag}/VOL`);
  addPoint('GF', tag, 'WATER_METERS', `${tag} Meter Tamper Alarm`, `${tag}_ALM`, 'digital', 'Monitor', '', '0-1', 'Tamper Alarm', 'Normal', '', `/Server 1/GF/Water/${tag}/ALM`);
}

// BTU Submeters BTU-01 to BTU-09
for (let i = 1; i <= 9; i++) {
  const tag = `BTU-GF-${String(i).padStart(2, '0')}`;
  addPoint('GF', tag, 'BTU_METERS', `${tag} Cooling Power`, `${tag}_TR`, 'analog', 'Monitor', 'TR', '0-50', '', '', '', `/Server 1/GF/BTU/${tag}/TR`);
  addPoint('GF', tag, 'BTU_METERS', `${tag} Supply Temp`, `${tag}_TS`, 'analog', 'Monitor', '°C', '0-30', '', '', '', `/Server 1/GF/BTU/${tag}/TS`);
  addPoint('GF', tag, 'BTU_METERS', `${tag} Return Temp`, `${tag}_TR`, 'analog', 'Monitor', '°C', '0-30', '', '', '', `/Server 1/GF/BTU/${tag}/TR`);
  addPoint('GF', tag, 'BTU_METERS', `${tag} Energy Accumulator`, `${tag}_KWH`, 'analog', 'Monitor', 'kWh', '0-9999999', '', '', '', `/Server 1/GF/BTU/${tag}/KWH`);
}

// FCUs FCU-01 to FCU-03
['FCU-GF-01', 'FCU-GF-02', 'FCU-GF-03'].forEach(fcu => {
  addPoint('GF', fcu, 'FCU', `${fcu} Run/Stop Command`, `${fcu}_SS`, 'digital', 'Controllable', '', '0-1', 'Start', 'Stop', '', `/Server 1/GF/FCU/${fcu}/SS`);
  addPoint('GF', fcu, 'FCU', `${fcu} Status`, `${fcu}_STS`, 'digital', 'Monitor', '', '0-1', 'Running', 'Stopped', '', `/Server 1/GF/FCU/${fcu}/STS`);
  addPoint('GF', fcu, 'FCU', `${fcu} Room Temp`, `${fcu}_TEMP`, 'analog', 'Monitor', '°C', '10-35', '', '', '', `/Server 1/GF/FCU/${fcu}/TEMP`);
  addPoint('GF', fcu, 'FCU', `${fcu} Temperature Setpoint`, `${fcu}_SP`, 'analog', 'Controllable', '°C', '18-28', '', '', '', `/Server 1/GF/FCU/${fcu}/SP`);
  addPoint('GF', fcu, 'FCU', `${fcu} Valve Output`, `${fcu}_VALVE`, 'analog', 'Monitor', 'V', '0-10', '', '', '', `/Server 1/GF/FCU/${fcu}/VALVE`);
  addPoint('GF', fcu, 'FCU', `${fcu} Fan Speed Selected`, `${fcu}_SPD`, 'analog', 'Controllable', 'enum', '1-3', '', '', '', `/Server 1/GF/FCU/${fcu}/SPD`);
  addPoint('GF', fcu, 'FCU', `${fcu} Filter Dirty DPS`, `${fcu}_DPS`, 'digital', 'Monitor', '', '0-1', 'Dirty Filter', 'Clean', '', `/Server 1/GF/FCU/${fcu}/DPS`);
});

// Dampers (SMD 1-2, VMD 1-11)
// Known sheet issue 2: GF_VMD010_SS vs GF_VMD11_SS mismatch in naming
addPoint('GF', 'SMD-GF-01', 'DAMPERS', 'Smoke Damper 01 State', 'GF_SMD01_STS', 'digital', 'Monitor', '', '0-1', 'Open', 'Closed', '', `/Server 1/GF/Dampers/SMD01_STS`);
addPoint('GF', 'SMD-GF-02', 'DAMPERS', 'Smoke Damper 02 State', 'GF_SMD02_STS', 'digital', 'Monitor', '', '0-1', 'Open', 'Closed', '', `/Server 1/GF/Dampers/SMD02_STS`);
for (let i = 1; i <= 11; i++) {
  const dNum = String(i).padStart(2, '0');
  const bind = (i === 10) ? 'GF_VMD010_SS' : `GF_VMD${dNum}_SS`;
  addPoint('GF', `VMD-GF-${dNum}`, 'DAMPERS', `Volume Damper ${dNum} Command`, bind, 'digital', 'Controllable', '', '0-1', 'Open', 'Close', '', `/Server 1/GF/Dampers/VMD${dNum}_SS`);
  addPoint('GF', `VMD-GF-${dNum}`, 'DAMPERS', `Volume Damper ${dNum} Status`, `GF_VMD${dNum}_STS`, 'digital', 'Monitor', '', '0-1', 'Open', 'Closed', '', `/Server 1/GF/Dampers/VMD${dNum}_STS`);
}

// Elevator & Fire Alarm Ground Floor
addPoint('GF', 'ELEVATOR-01', 'ELEVATORS', 'Elevator Car 1 Floor Pos', 'GF_ELEV1_POS', 'analog', 'Monitor', 'floor', '0-6', '', '', '', `/Server 1/GF/Elev/ELEV1_POS`);
addPoint('GF', 'ELEVATOR-01', 'ELEVATORS', 'Elevator Car 1 Door State', 'GF_ELEV1_DOOR', 'digital', 'Monitor', '', '0-1', 'Door Open', 'Door Closed', '', `/Server 1/GF/Elev/ELEV1_DOOR`);
addPoint('GF', 'ELEVATOR-01', 'ELEVATORS', 'Elevator Car 1 Motion Dir', 'GF_ELEV1_DIR', 'analog', 'Monitor', 'dir', '0-2', '', '', '', `/Server 1/GF/Elev/ELEV1_DIR`);
addPoint('GF', 'ELEVATOR-01', 'ELEVATORS', 'Elevator Car 1 Fire Alarm', 'GF_ELEV1_FIRE', 'digital', 'Monitor', '', '0-1', 'Fire Mode', 'Normal', '', `/Server 1/GF/Elev/ELEV1_FIRE`);
addPoint('GF', 'GF_FAP', 'LIFE_SAFETY', 'Fire Alarm Panel General Alarm', 'GF_FAP_ALM', 'digital', 'Monitor', '', '0-1', 'General Alarm', 'Normal', '', `/Server 1/GF/FAP/ALM`);
addPoint('GF', 'GF_FAP', 'LIFE_SAFETY', 'Fire Alarm Panel Fault', 'GF_FAP_FLT', 'digital', 'Monitor', '', '0-1', 'Fault Detected', 'Healthy', '', `/Server 1/GF/FAP/FLT`);

// Duplicate BindName test for data quality console
addPoint('GF', 'GF_TEST_DUP', 'DIAGNOSTICS', 'Diagnostic Duplicate Point Test', 'GF_FAP_ALM', 'digital', 'Monitor', '', '0-1', 'Alarm', 'Normal', '');

// 3. LEVEL 1F, 2F, 3F
['1F', '2F', '3F'].forEach(lvl => {
  // 2x BTU Meters per floor
  ['01', '02'].forEach(n => {
    const tag = `BTU-${lvl}-${n}`;
    addPoint(lvl, tag, 'BTU_METERS', `${tag} Cooling Capacity`, `${tag}_TR`, 'analog', 'Monitor', 'TR', '0-40', '', '', '', `/Server 1/${lvl}/BTU/${tag}/TR`);
    addPoint(lvl, tag, 'BTU_METERS', `${tag} Flow Volume`, `${tag}_FLOW`, 'analog', 'Monitor', 'm3/h', '0-15', '', '', '', `/Server 1/${lvl}/BTU/${tag}/FLOW`);
    addPoint(lvl, tag, 'BTU_METERS', `${tag} Delta T`, `${tag}_DT`, 'analog', 'Monitor', '°C', '0-15', '', '', '', `/Server 1/${lvl}/BTU/${tag}/DT`);
    addPoint(lvl, tag, 'BTU_METERS', `${tag} Total Energy`, `${tag}_KWH`, 'analog', 'Monitor', 'kWh', '0-9999999', '', '', '', `/Server 1/${lvl}/BTU/${tag}/KWH`);
  });

  // Power Distribution Panels
  ['EMCC-A', 'EMCC-B'].forEach(pnl => {
    const tag = `DPM-${lvl}-${pnl}`;
    addPoint(lvl, tag, 'POWER_METERS', `${tag} Active Power`, `${tag}_KW`, 'analog', 'Monitor', 'KWh', '0-150', '', '', '', `/Server 1/${lvl}/Power/${tag}/KW`);
    addPoint(lvl, tag, 'POWER_METERS', `${tag} Active Energy`, `${tag}_KWH`, 'analog', 'Monitor', 'kWh', '0-9999999', '', '', '', `/Server 1/${lvl}/Power/${tag}/KWH`);
    addPoint(lvl, tag, 'POWER_METERS', `${tag} Voltage Avg`, `${tag}_V`, 'analog', 'Monitor', 'V', '0-450', '', '', '', `/Server 1/${lvl}/Power/${tag}/V`);
    addPoint(lvl, tag, 'POWER_METERS', `${tag} Current Avg`, `${tag}_A`, 'analog', 'Monitor', 'A', '0-250', '', '', '', `/Server 1/${lvl}/Power/${tag}/A`);
  });

  // Dampers
  ['SMD-01', 'SMD-02'].forEach(smd => {
    addPoint(lvl, `${lvl}_${smd}`, 'DAMPERS', `${lvl} ${smd} Status`, `${lvl}_${smd}_STS`, 'digital', 'Monitor', '', '0-1', 'Open', 'Closed', '', `/Server 1/${lvl}/Dampers/${smd}_STS`);
  });
  for (let i = 1; i <= 6; i++) {
    const vmd = `VMD-${String(i).padStart(2, '0')}`;
    addPoint(lvl, `${lvl}_${vmd}`, 'DAMPERS', `${lvl} ${vmd} Command`, `${lvl}_${vmd}_SS`, 'digital', 'Controllable', '', '0-1', 'Open', 'Close', '', `/Server 1/${lvl}/Dampers/${vmd}_SS`);
    addPoint(lvl, `${lvl}_${vmd}`, 'DAMPERS', `${lvl} ${vmd} Status`, `${lvl}_${vmd}_STS`, 'digital', 'Monitor', '', '0-1', 'Open', 'Closed', '', `/Server 1/${lvl}/Dampers/${vmd}_STS`);
  }

  // Elevators and Life safety
  addPoint(lvl, `${lvl}_FAP`, 'LIFE_SAFETY', `${lvl} Fire Alarm Panel`, `${lvl}_FAP_STS`, 'digital', 'Monitor', '', '0-1', 'Alarm', 'Normal', '', `/Server 1/${lvl}/FAP/STS`);
});

// 4. MAIN ROOF (RF)
// 3x FCU
['FCU-RF-01', 'FCU-RF-02', 'FCU-RF-03'].forEach(fcu => {
  addPoint('RF', fcu, 'FCU', `${fcu} Run Command`, `${fcu}_SS`, 'digital', 'Controllable', '', '0-1', 'Run', 'Stop', '', `/Server 1/RF/FCU/${fcu}/SS`);
  addPoint('RF', fcu, 'FCU', `${fcu} Run Status`, `${fcu}_STS`, 'digital', 'Monitor', '', '0-1', 'Running', 'Stopped', '', `/Server 1/RF/FCU/${fcu}/STS`);
  addPoint('RF', fcu, 'FCU', `${fcu} Space Temp`, `${fcu}_TEMP`, 'analog', 'Monitor', '°C', '15-35', '', '', '', `/Server 1/RF/FCU/${fcu}/TEMP`);
  addPoint('RF', fcu, 'FCU', `${fcu} Cooling Setpoint`, `${fcu}_SP`, 'analog', 'Controllable', '°C', '18-28', '', '', '', `/Server 1/RF/FCU/${fcu}/SP`);
  addPoint('RF', fcu, 'FCU', `${fcu} Valve Signal`, `${fcu}_VALVE`, 'analog', 'Monitor', 'V', '0-10', '', '', '', `/Server 1/RF/FCU/${fcu}/VALVE`);
});

// Elevator Machine Room (sts1 to sts6)
['sts1', 'sts2', 'sts3', 'sts4', 'sts5', 'sts6'].forEach((sts, idx) => {
  addPoint('RF', 'ELEV-MR', 'ELEVATORS', `Elevator Machine Room State ${sts}`, `RF_ELEV_${sts.toUpperCase()}`, 'analog', 'Monitor', 'code', '0-255', '', '', '', `/Server 1/RF/Elev/${sts}`);
});

// Pressurization fan PF-RF-01 & Smoke Dampers
addPoint('RF', 'PF-RF-01', 'PRESS_FAN', 'Pressurization Fan Run Status', 'RF_PF01_STS', 'digital', 'Monitor', '', '0-1', 'Running', 'Stopped', '', `/Server 1/RF/Fans/PF01_STS`);
addPoint('RF', 'PF-RF-01', 'PRESS_FAN', 'Pressurization Fan Trip', 'RF_PF01_TRIP', 'digital', 'Monitor', '', '0-1', 'Trip Alarm', 'Normal', '', `/Server 1/RF/Fans/PF01_TRIP`);
addPoint('RF', 'RF_SMD_01', 'DAMPERS', 'Roof Smoke Damper 01 Status', 'RF_SMD01_STS', 'digital', 'Monitor', '', '0-1', 'Open', 'Closed', '', `/Server 1/RF/Dampers/SMD01_STS`);
addPoint('RF', 'RF_SMD_02', 'DAMPERS', 'Roof Smoke Damper 02 Status', 'RF_SMD02_STS', 'digital', 'Monitor', '', '0-1', 'Open', 'Closed', '', `/Server 1/RF/Dampers/SMD02_STS`);
addPoint('RF', 'RF_FAP', 'LIFE_SAFETY', 'Roof Fire Alarm Panel', 'RF_FAP_ALM', 'digital', 'Monitor', '', '0-1', 'Alarm', 'Normal', '', `/Server 1/RF/FAP/ALM`);

// 5. UPPER ROOF (UR)
// FAHU-UR (Fresh Air Handling Unit)
addPoint('UR', 'FAHU-UR', 'FAHU', 'FAHU Supply Fan Run/Stop', 'UR_FAHU_SS', 'digital', 'Controllable', '', '0-1', 'Run', 'Stop', '', `/Server 1/UR/FAHU/SS`);
addPoint('UR', 'FAHU-UR', 'FAHU', 'FAHU Supply Fan Status', 'UR_FAHU_STS', 'digital', 'Monitor', '', '0-1', 'Running', 'Stopped', '', `/Server 1/UR/FAHU/STS`);
addPoint('UR', 'FAHU-UR', 'FAHU', 'FAHU Supply Fan Trip', 'UR_FAHU_TRIP', 'digital', 'Monitor', '', '0-1', 'Trip Alarm', 'Normal', '', `/Server 1/UR/FAHU/TRIP`);
addPoint('UR', 'FAHU-UR', 'FAHU', 'FAHU Airflow DPS', 'UR_FAHU_DPS', 'digital', 'Monitor', '', '0-1', 'Flow OK', 'No Flow', '', `/Server 1/UR/FAHU/DPS`);
addPoint('UR', 'FAHU-UR', 'FAHU', 'FAHU Static Pressure DPT', 'UR_FAHU_DPT', 'analog', 'Monitor', 'Pa', '0-1000', '', '', '', `/Server 1/UR/FAHU/DPT`);
addPoint('UR', 'FAHU-UR', 'FAHU', 'FAHU VSD Speed Ref', 'UR_FAHU_SPEED', 'analog', 'Controllable', '%', '0-100', '', '', '', `/Server 1/UR/FAHU/SPEED`);
addPoint('UR', 'FAHU-UR', 'FAHU', 'FAHU Supply Air Temp', 'UR_FAHU_SAT', 'analog', 'Monitor', '°C', '10-35', '', '', '', `/Server 1/UR/FAHU/SAT`);
addPoint('UR', 'FAHU-UR', 'FAHU', 'FAHU Supply Air Humidity', 'UR_FAHU_SAH', 'analog', 'Monitor', '%RH', '0-100', '', '', '', `/Server 1/UR/FAHU/SAH`);
addPoint('UR', 'FAHU-UR', 'FAHU', 'FAHU Outdoor Ambient Temp', 'UR_FAHU_OAT', 'analog', 'Monitor', '°C', '10-50', '', '', '', `/Server 1/UR/FAHU/OAT`);
addPoint('UR', 'FAHU-UR', 'FAHU', 'FAHU Outdoor Ambient Humidity', 'UR_FAHU_OAH', 'analog', 'Monitor', '%RH', '0-100', '', '', '', `/Server 1/UR/FAHU/OAH`);
addPoint('UR', 'FAHU-UR', 'FAHU', 'FAHU Filter Pre DPS', 'UR_FAHU_FLT_PRE', 'digital', 'Monitor', '', '0-1', 'Filter Dirty', 'Clean', '', `/Server 1/UR/FAHU/FLT_PRE`);
addPoint('UR', 'FAHU-UR', 'FAHU', 'FAHU Filter Bag DPS', 'UR_FAHU_FLT_BAG', 'digital', 'Monitor', '', '0-1', 'Filter Dirty', 'Clean', '', `/Server 1/UR/FAHU/FLT_BAG`);
addPoint('UR', 'FAHU-UR', 'FAHU', 'FAHU Motorised Damper Command', 'UR_FAHU_DMP_CMD', 'digital', 'Controllable', '', '0-1', 'Open', 'Close', '', `/Server 1/UR/FAHU/DMP_CMD`);
addPoint('UR', 'FAHU-UR', 'FAHU', 'FAHU Smoke Detector Interlock', 'UR_FAHU_SMK', 'digital', 'Monitor', '', '0-1', 'Smoke Alarm', 'Normal', '', `/Server 1/UR/FAHU/SMK`);

// Stair & Lift Pressurization Fans PF-UR-02, PF-UR-03, SF-UR-01, SF-UR-02
['PF-UR-02', 'PF-UR-03', 'SF-UR-01', 'SF-UR-02'].forEach(fan => {
  addPoint('UR', fan, 'SAFETY_FANS', `${fan} Run Command`, `${fan}_SS`, 'digital', 'Controllable', '', '0-1', 'Start', 'Stop', '', `/Server 1/UR/Fans/${fan}/SS`);
  addPoint('UR', fan, 'SAFETY_FANS', `${fan} Run Status`, `${fan}_STS`, 'digital', 'Monitor', '', '0-1', 'Running', 'Stopped', '', `/Server 1/UR/Fans/${fan}/STS`);
  addPoint('UR', fan, 'SAFETY_FANS', `${fan} Trip Alarm`, `${fan}_TRIP`, 'digital', 'Monitor', '', '0-1', 'Trip Alarm', 'Normal', '', `/Server 1/UR/Fans/${fan}/TRIP`);
  addPoint('UR', fan, 'SAFETY_FANS', `${fan} Air Flow Status`, `${fan}_FLOW`, 'digital', 'Monitor', '', '0-1', 'Flow OK', 'No Flow', '', `/Server 1/UR/Fans/${fan}/FLOW`);
});
addPoint('UR', 'STAIR_PRESS', 'SAFETY_FANS', 'Stairwell Differential Pressure DPT', 'UR_STAIR_DP', 'analog', 'Monitor', 'Pa', '0-100', '', '', '', `/Server 1/UR/Fans/STAIR_DP`);

// Upper Roof Power Distribution Panels (DPM-MCCO1-UR, EMCCO1, EMCCO2)
['DPM-MCCO1-UR', 'EMCCO1-UR', 'EMCCO2-UR'].forEach(dpm => {
  addPoint('UR', dpm, 'POWER_METERS', `${dpm} Active Power Total`, `${dpm}_KW`, 'analog', 'Monitor', 'KWh', '0-250', '', '', '', `/Server 1/UR/Power/${dpm}/KW`);
  addPoint('UR', dpm, 'POWER_METERS', `${dpm} Total Energy Active`, `${dpm}_KWH`, 'analog', 'Monitor', 'kWh', '0-9999999', '', '', '', `/Server 1/UR/Power/${dpm}/KWH`);
  addPoint('UR', dpm, 'POWER_METERS', `${dpm} Voltage 3Ph Avg`, `${dpm}_V`, 'analog', 'Monitor', 'V', '0-450', '', '', '', `/Server 1/UR/Power/${dpm}/V`);
  addPoint('UR', dpm, 'POWER_METERS', `${dpm} Current 3Ph Avg`, `${dpm}_A`, 'analog', 'Monitor', 'A', '0-350', '', '', '', `/Server 1/UR/Power/${dpm}/A`);
  addPoint('UR', dpm, 'POWER_METERS', `${dpm} Power Factor Avg`, `${dpm}_PF`, 'analog', 'Monitor', '', '-1..1', '', '', '', `/Server 1/UR/Power/${dpm}/PF`);
});

// Pad remaining rows up to exactly 439 rows (439 data rows + header = 440 lines)
// Realistic sensors across levels
let padIndex = 1;
while (rows.length < 440) {
  const levels = ['B1', 'GF', '1F', '2F', '3F', 'RF', 'UR'];
  const lvl = levels[padIndex % levels.length];
  const tag = `SEN_${lvl}_${String(padIndex).padStart(3, '0')}`;
  addPoint(lvl, tag, 'GENERAL_IO', `Telemetry Sensor Channel ${padIndex}`, `${lvl}_SEN_${padIndex}`, 'analog', 'Monitor', 'raw', '0-100', '', '', '', `/Server 1/${lvl}/IO/${tag}`);
  padIndex++;
}

fs.writeFileSync(path.resolve('public/data/DT_PointMap.csv'), rows.join('\n'));
console.log(`Generated public/data/DT_PointMap.csv with ${rows.length - 1} data rows.`);
