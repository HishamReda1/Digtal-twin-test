export interface PointOverride {
  pointKey?: string;
  bindNameMatch?: string;
  field: 'bindName' | 'unit' | 'eboPath' | 'pointName';
  originalValue: string;
  overrideValue: string;
  reason: string;
}

export const DATA_OVERRIDES: PointOverride[] = [
  {
    bindNameMatch: 'FLOW_V2',
    field: 'bindName',
    originalValue: 'FLOW_V2',
    overrideValue: 'FLOW_V1',
    reason: 'Known sheet issue: FLOW V1 point bound incorrectly as FLOW V2'
  },
  {
    bindNameMatch: 'GF_VMD010_SS',
    field: 'bindName',
    originalValue: 'GF_VMD010_SS',
    overrideValue: 'GF_VMD10_SS',
    reason: 'Known sheet issue: GF_VMD010_SS numbering normalization vs GF_VMD11_SS'
  },
  {
    field: 'unit',
    originalValue: 'KWh',
    overrideValue: 'kW',
    reason: 'Known sheet issue: DPM Active Power Total unit KWh should be kW'
  },
  {
    field: 'unit',
    originalValue: 'Btu/s',
    overrideValue: 'kVA',
    reason: 'Known sheet issue: Apparent Power Total unit Btu/s should be kVA'
  }
];

export interface DataQualityIssue {
  type: 'DUPLICATE_BIND_NAME' | 'MISSING_EBO_PATH' | 'INCORRECT_UNIT' | 'NAMING_ANOMALY';
  pointKey: string;
  bindName: string;
  description: string;
  severity: 'WARNING' | 'ERROR' | 'INFO';
  appliedOverride?: string;
}
