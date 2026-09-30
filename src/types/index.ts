export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
export type AlertSeverity = 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED';

export interface ExplainableFactor {
  factor: string;
  percentage: number;
  description: string;
}

export interface Zone {
  id: string;
  code: string;
  name: string;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  population: number;
  populationAtRisk: number;
  rainfall: number; // mm/hr
  waterLevel: number; // meters
  thresholdWaterLevel: number; // meters
  elevation: number; // meters MSL
  slope: number; // %
  drainageCapacity: number; // % effective
  predictedFloodTimeMin: number; // minutes to overflow
  confidence: number; // %
  humanImpactScore: number; // 0 - 100
  vulnerability: {
    elderlyCount: number;
    childrenCount: number;
    slumsOrInformalPop: number;
    criticalInfraCount: number;
    hospitalsNearby: string[];
    schoolsNearby: string[];
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  polygonSvgPoints: string; // SVG path data or points for the interactive GIS map
  explainableFactors: ExplainableFactor[];
}

export interface Sensor {
  id: string;
  code: string;
  name: string;
  type: 'WATER_LEVEL' | 'RAIN_GAUGE' | 'RIVER_FLOW' | 'DRAIN_SURCHARGE';
  location: string;
  zoneId: string;
  lat: number;
  lng: number;
  mapX: number; // 0-100% relative map coordinates
  mapY: number;
  value: number;
  unit: string;
  threshold: number;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL' | 'OFFLINE';
  battery: number;
  lastPing: string;
  trend: 'RISING' | 'STABLE' | 'FALLING';
  rateOfChange: string;
}

export interface IncidentEvidence {
  iotSensorMatch: string;
  matchingCitizenReports: number;
  weatherAnomalyDetected: boolean;
  locationConfidencePercent: number;
  cctvVerified: boolean;
}

export type IncidentStatus = 'UNVERIFIED' | 'AI_CHECKING' | 'LIKELY' | 'VERIFIED' | 'FALSE_POSITIVE';

export interface Incident {
  id: string;
  code: string;
  title: string;
  type: 'WATERLOGGING' | 'UNDERPASS_FLOOD' | 'RIVER_OVERFLOW' | 'STRANDED_CITIZENS' | 'DRAIN_BURST' | 'BRIDGE_RISK';
  severity: RiskLevel;
  location: string;
  zoneId: string;
  lat: number;
  lng: number;
  mapX: number;
  mapY: number;
  reportsCount: number;
  verificationScore: number; // %
  status: IncidentStatus;
  timestamp: string;
  source: 'CITIZEN_APP' | 'SOCIAL_MEDIA' | 'IOT_SENSOR' | 'EMERGENCY_CALL' | 'CCTV' | 'FIELD_RESPONDER';
  evidence: IncidentEvidence;
  actionTaken?: string;
  assignedResources?: string[];
  notes?: string;
}

export interface EvacuationRoute {
  id: string;
  name: string;
  sourceZone: string;
  destinationShelter: string;
  durationMin: number;
  safetyScore: number; // %
  status: 'SAFE' | 'MODERATE_RISK' | 'UNSAFE' | 'BLOCKED';
  riskFactors: string[];
  whyRecommended?: string[];
  svgPath: string; // SVG path command for rendering in GIS viewer
  color: string;
}

export type ResourceType = 
  | 'AMBULANCE' 
  | 'RESCUE_BOAT' 
  | 'NDRF_TEAM' 
  | 'FIRE_UNIT' 
  | 'WATER_PUMP' 
  | 'POLICE_UNIT' 
  | 'MEDICAL_TEAM' 
  | 'FOOD_SUPPLY';

export type ResourceStatus = 'AVAILABLE' | 'DISPATCHED' | 'EN_ROUTE' | 'ON_SCENE' | 'MAINTENANCE';

export interface EmergencyResource {
  id: string;
  callsign: string;
  type: ResourceType;
  status: ResourceStatus;
  baseStation: string;
  lat: number;
  lng: number;
  mapX: number;
  mapY: number;
  targetMapX?: number;
  targetMapY?: number;
  assignedIncidentId?: string;
  assignedZoneId?: string;
  etaMinutes?: number;
  crewCount: number;
  capacityOrPower: string;
  speedKmH: number;
}

export interface Shelter {
  id: string;
  code: string;
  name: string;
  zone: string;
  capacity: number;
  occupied: number;
  available: number;
  status: 'OPEN' | 'FULL' | 'STANDBY';
  medicalSupport: boolean;
  powerStatus: 'ONLINE' | 'GENERATOR' | 'OFFLINE';
  foodStockDays: number;
  lat: number;
  lng: number;
  mapX: number;
  mapY: number;
  contact: string;
  distanceKm: number;
  elevation: number;
}

export interface AlertNotification {
  id: string;
  title: string;
  severity: AlertSeverity;
  zoneNames: string[];
  channels: ('SMS' | 'PUSH' | 'WHATSAPP' | 'SIREN' | 'RADIO' | 'PUBLIC_PORTAL')[];
  languages: {
    en: string;
    hi: string;
    mr: string;
  };
  timestamp: string;
  status: 'DRAFT' | 'SCHEDULED' | 'BROADCASTED';
  recipientsCount: number;
  isSimulated: boolean;
}

export interface ActionPlanItem {
  id: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8';
  timeframe: 'IMMEDIATE_15M' | 'NEXT_30M' | 'HOUR_1_TO_3';
  action: string;
  reason: string;
  affectedPopulation: number;
  assignedResource: string;
  eta: string;
  status: 'PENDING' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
}

export interface DecisionLogEntry {
  id: string;
  timestamp: string;
  event: string;
  category: 'AI_DETECTION' | 'VERIFICATION' | 'ROUTING' | 'DISPATCH' | 'ALERT' | 'SYSTEM';
  actor: string;
  details?: string;
}

export interface WhatChangedItem {
  id: string;
  timeAgo: string;
  type: 'increase' | 'warning' | 'verified' | 'dispatched' | 'shelter';
  message: string;
  badge?: string;
}

export interface SimulationParams {
  rainfall: 25 | 50 | 75 | 100 | 150;
  duration: 1 | 3 | 6 | 12;
  drainageEfficiency: 'Normal' | 'Reduced' | 'Failed';
  riverCondition: 'Normal' | 'High' | 'Overflow';
  traffic: 'Normal' | 'Heavy' | 'Gridlock';
}

export interface SimulationResult {
  floodedAreaSqKm: number;
  maxWaterDepthM: number;
  populationExposed: number;
  roadsAffectedCount: number;
  hospitalsThreatenedCount: number;
  sheltersAvailableCount: number;
  economicExposureCr: number;
  recommendedActions: string[];
}

export type ActiveTab = 
  | 'overview'
  | 'intelligence'
  | 'map'
  | 'incidents' 
  | 'response'
  | 'alerts' 
  | 'analytics'
  | 'command-center' 
  | 'risk-map' 
  | 'forecast' 
  | 'evacuation' 
  | 'resources' 
  | 'data-sources' 
  | 'system-health'
  | 'responder-mode';

export interface TimelineOption {
  label: string;
  offsetHours: number;
  rainfallMultiplier: number;
  waterLevelMultiplier: number;
  riskBoost: number;
}
