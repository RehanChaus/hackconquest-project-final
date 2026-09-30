import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  Zone,
  Sensor,
  Incident,
  EmergencyResource,
  Shelter,
  EvacuationRoute,
  AlertNotification,
  ActionPlanItem,
  DecisionLogEntry,
  WhatChangedItem,
  ActiveTab,
  SimulationParams,
  SimulationResult,
} from '../types';
import {
  INITIAL_ZONES,
  INITIAL_SENSORS,
  INITIAL_INCIDENTS,
  INITIAL_SHELTERS,
  INITIAL_RESOURCES,
  INITIAL_ROUTES,
  ALTERNATE_DYNAMIC_ROUTE_D,
  INITIAL_ACTION_PLANS,
  INITIAL_DECISION_LOGS,
  INITIAL_WHAT_CHANGED,
  TIMELINE_STEPS,
} from '../data/mockData';

interface MapLayersState {
  floodRisk: boolean;
  rainfall: boolean;
  waterLevel: boolean;
  vulnerability: boolean;
  populationDensity: boolean;
  traffic: boolean;
  drainage: boolean;
  incidents: boolean;
  resources: boolean;
  shelters: boolean;
  hospitals: boolean;
}

interface CommandContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedZone: Zone | null;
  setSelectedZone: (zone: Zone | null) => void;
  selectedSensor: Sensor | null;
  setSelectedSensor: (sensor: Sensor | null) => void;
  selectedIncident: Incident | null;
  setSelectedIncident: (incident: Incident | null) => void;
  selectedShelter: Shelter | null;
  setSelectedShelter: (shelter: Shelter | null) => void;
  selectedResource: EmergencyResource | null;
  setSelectedResource: (resource: EmergencyResource | null) => void;
  selectedRoute: EvacuationRoute | null;
  setSelectedRoute: (route: EvacuationRoute | null) => void;

  zones: Zone[];
  sensors: Sensor[];
  incidents: Incident[];
  resources: EmergencyResource[];
  shelters: Shelter[];
  routes: EvacuationRoute[];
  actionPlans: ActionPlanItem[];
  decisionLogs: DecisionLogEntry[];
  whatChanged: WhatChangedItem[];
  alerts: AlertNotification[];

  isEmergencyMode: boolean;
  toggleEmergencyMode: () => void;

  timelineIndex: number;
  setTimelineIndex: (idx: number) => void;

  mapLayers: MapLayersState;
  toggleMapLayer: (layer: keyof MapLayersState) => void;

  // Modals & Panels
  copilotOpen: boolean;
  setCopilotOpen: (open: boolean) => void;
  responsePlanModalOpen: boolean;
  setResponsePlanModalOpen: (open: boolean) => void;
  selectedZoneDrawerOpen: boolean;
  setSelectedZoneDrawerOpen: (open: boolean) => void;
  selectedIncidentDrawerOpen: boolean;
  setSelectedIncidentDrawerOpen: (open: boolean) => void;
  situationBriefText: string;
  setSituationBriefText: (text: string) => void;
  demoSimulationToast: { title: string; subtitle?: string; type?: 'info' | 'warning' | 'critical' | 'success' } | null;
  demoCompleted: boolean;
  simulationModalOpen: boolean;
  setSimulationModalOpen: (open: boolean) => void;
  simulationRunning: boolean;
  simulationStepText: string;
  simulationResult: SimulationResult | null;
  runSimulation: (params: SimulationParams) => Promise<void>;
  resetSimulationToDefault: () => void;

  explainableModalZone: Zone | null;
  setExplainableModalZone: (zone: Zone | null) => void;

  // Dynamic Routing
  isFlashFloodTriggered: boolean;
  triggerFlashFlood: () => void;
  resetDynamicRoute: () => void;
  isRecalculatingRoute: boolean;

  // Actions
  verifyIncident: (incidentId: string) => Promise<void>;
  deployResource: (resourceId: string, incidentId?: string) => void;
  optimizeAllResources: () => void;
  approveActionPlan: (planId: string) => void;
  approveAllActionPlans: () => void;
  rejectActionPlan: (planId: string) => void;
  sendAlertNotification: (alert: Omit<AlertNotification, 'id' | 'timestamp'>) => void;

  // Live Demo Scenario
  demoPlaying: boolean;
  demoStep: number;
  startLiveDemo: () => void;
  pauseLiveDemo: () => void;
  nextDemoEvent: () => void;
  resetLiveDemo: () => void;

  // Judge Mode
  judgeModeOpen: boolean;
  setJudgeModeOpen: (open: boolean) => void;
  judgeStep: number;
  setJudgeStep: (step: number) => void;
  nextJudgeStep: () => void;
  prevJudgeStep: () => void;

  // Metrics
  overallCityRisk: number;
  totalPopulationAtRisk: number;
  verifiedIncidentCount: number;
  activeResourceCount: number;
}

const CommandContext = createContext<CommandContextType | null>(null);

export const CommandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [selectedZone, setSelectedZone] = useState<Zone | null>(INITIAL_ZONES[0]);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(INITIAL_SENSORS[0]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(INITIAL_INCIDENTS[0]);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(INITIAL_SHELTERS[0]);
  const [selectedResource, setSelectedResource] = useState<EmergencyResource | null>(INITIAL_RESOURCES[0]);
  const [selectedRoute, setSelectedRoute] = useState<EvacuationRoute | null>(INITIAL_ROUTES[2]);

  const [zones, setZones] = useState<Zone[]>(INITIAL_ZONES);
  const [sensors, setSensors] = useState<Sensor[]>(INITIAL_SENSORS);
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [resources, setResources] = useState<EmergencyResource[]>(INITIAL_RESOURCES);
  const [shelters, setShelters] = useState<Shelter[]>(INITIAL_SHELTERS);
  const [routes, setRoutes] = useState<EvacuationRoute[]>(INITIAL_ROUTES);
  const [actionPlans, setActionPlans] = useState<ActionPlanItem[]>(INITIAL_ACTION_PLANS);
  const [decisionLogs, setDecisionLogs] = useState<DecisionLogEntry[]>(INITIAL_DECISION_LOGS);
  const [whatChanged, setWhatChanged] = useState<WhatChangedItem[]>(INITIAL_WHAT_CHANGED);
  const [alerts, setAlerts] = useState<AlertNotification[]>([]);

  const [isEmergencyMode, setIsEmergencyMode] = useState<boolean>(false);
  const [timelineIndex, setTimelineIndexState] = useState<number>(0);

  const [copilotOpen, setCopilotOpen] = useState<boolean>(false);
  const [responsePlanModalOpen, setResponsePlanModalOpen] = useState<boolean>(false);
  const [selectedZoneDrawerOpen, setSelectedZoneDrawerOpen] = useState<boolean>(false);
  const [selectedIncidentDrawerOpen, setSelectedIncidentDrawerOpen] = useState<boolean>(false);
  const [situationBriefText, setSituationBriefText] = useState<string>(
    'Flood risk is increasing across three low-lying zones. Riverside Ward currently requires the highest attention. Flooding may begin within approximately 42 minutes if current rainfall persists.'
  );
  const [demoSimulationToast, setDemoSimulationToast] = useState<{ title: string; subtitle?: string; type?: 'info' | 'warning' | 'critical' | 'success' } | null>(null);
  const [demoCompleted, setDemoCompleted] = useState<boolean>(false);

  const [simulationModalOpen, setSimulationModalOpen] = useState<boolean>(false);
  const [simulationRunning, setSimulationRunning] = useState<boolean>(false);
  const [simulationStepText, setSimulationStepText] = useState<string>('');
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [explainableModalZone, setExplainableModalZone] = useState<Zone | null>(null);

  // Dynamic Rerouting Wow-Moment
  const [isFlashFloodTriggered, setIsFlashFloodTriggered] = useState<boolean>(false);
  const [isRecalculatingRoute, setIsRecalculatingRoute] = useState<boolean>(false);

  // Live Demo
  const [demoPlaying, setDemoPlaying] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(0);
  const demoTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Judge Mode
  const [judgeModeOpen, setJudgeModeOpen] = useState<boolean>(false);
  const [judgeStep, setJudgeStep] = useState<number>(1);

  // Layers
  const [mapLayers, setMapLayers] = useState<MapLayersState>({
    floodRisk: true,
    rainfall: true,
    waterLevel: true,
    vulnerability: true,
    populationDensity: false,
    traffic: true,
    drainage: true,
    incidents: true,
    resources: true,
    shelters: true,
    hospitals: true,
  });

  const toggleMapLayer = (layer: keyof MapLayersState) => {
    setMapLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const toggleEmergencyMode = () => {
    setIsEmergencyMode(prev => !prev);
    addDecisionLog(
      isEmergencyMode ? 'SYSTEM' : 'ALERT',
      isEmergencyMode ? 'Emergency Operations Mode deactivated by operator' : 'EOC RED HIGH-ALERT Emergency Mode activated across Pune Basin',
      'Duty Commander'
    );
  };

  // Add helper for decision log
  const addDecisionLog = (
    category: DecisionLogEntry['category'],
    event: string,
    actor: string,
    details?: string
  ) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    const newLog: DecisionLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: timeStr,
      category,
      event,
      actor,
      details,
    };
    setDecisionLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  // Add helper for what changed
  const addWhatChanged = (
    type: WhatChangedItem['type'],
    message: string,
    badge?: string
  ) => {
    const newItem: WhatChangedItem = {
      id: `wc-${Date.now()}`,
      timeAgo: 'Just now',
      type,
      message,
      badge,
    };
    setWhatChanged(prev => [newItem, ...prev.slice(0, 19)]);
  };

  // Timeline change updates dynamic values
  const setTimelineIndex = (idx: number) => {
    setTimelineIndexState(idx);
    const step = TIMELINE_STEPS[idx];
    setZones(prev =>
      prev.map(zone => {
        const calculatedRisk = Math.min(100, Math.max(10, Math.round(zone.riskScore + step.riskBoost)));
        let newLevel: Zone['riskLevel'] = 'LOW';
        if (calculatedRisk >= 80) newLevel = 'CRITICAL';
        else if (calculatedRisk >= 60) newLevel = 'HIGH';
        else if (calculatedRisk >= 40) newLevel = 'MODERATE';

        const newRain = Math.round(zone.rainfall * step.rainfallMultiplier);
        const newWater = parseFloat((zone.waterLevel * step.waterLevelMultiplier).toFixed(1));
        const newPopAtRisk = Math.round(zone.populationAtRisk * (step.riskBoost > 0 ? 1 + step.riskBoost / 50 : 1 + step.riskBoost / 100));

        return {
          ...zone,
          riskScore: calculatedRisk,
          riskLevel: newLevel,
          rainfall: newRain,
          waterLevel: newWater,
          populationAtRisk: Math.max(100, newPopAtRisk),
        };
      })
    );
    addDecisionLog('SYSTEM', `Timeline prediction shifted to ${step.label} (${step.offsetHours}h forward simulation)`, 'Predictive Engine');
  };

  // Trigger Flash Flood dynamic rerouting wow moment
  const triggerFlashFlood = () => {
    setIsFlashFloodTriggered(true);
    setIsRecalculatingRoute(true);

    // Modify Route C to compromised
    setRoutes(prev =>
      prev.map(r => {
        if (r.id === 'route-c') {
          return {
            ...r,
            status: 'BLOCKED',
            safetyScore: 12,
            color: '#ef4444',
            riskFactors: ['⚠ FLASH FLOOD BREACH: Underpass culvert surge blocked approach at km 1.8!'],
          };
        }
        return r;
      })
    );

    addWhatChanged('warning', '⚠ Route C compromised by sudden flash flood surge at Bund Underpass', 'ALERT');
    addDecisionLog('ROUTING', 'Route C compromised! Dynamic Dijkstra rerouting triggered...', 'AI Routing Engine');

    setTimeout(() => {
      // Add Route D as new safe recommended route
      setRoutes(prev => {
        const filtered = prev.filter(r => r.id !== 'route-d');
        return [...filtered, ALTERNATE_DYNAMIC_ROUTE_D];
      });
      setSelectedRoute(ALTERNATE_DYNAMIC_ROUTE_D);
      setIsRecalculatingRoute(false);
      addWhatChanged('increase', '✓ Recalculated alternate Route D via Elevated Flyover (94% Safety Score)', 'SAFE ROUTE');
      addDecisionLog('ROUTING', 'Dynamic Route D generated successfully. Evacuation traffic diverted via Sancheti Flyover.', 'AI Routing Engine');
    }, 1800);
  };

  const resetDynamicRoute = () => {
    setIsFlashFloodTriggered(false);
    setIsRecalculatingRoute(false);
    setRoutes(INITIAL_ROUTES);
    setSelectedRoute(INITIAL_ROUTES[2]);
  };

  // Multi-source cross-validation animation for incident
  const verifyIncident = async (incidentId: string) => {
    setIncidents(prev =>
      prev.map(inc => (inc.id === incidentId ? { ...inc, status: 'AI_CHECKING' } : inc))
    );

    await new Promise(resolve => setTimeout(resolve, 1400));

    setIncidents(prev =>
      prev.map(inc => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            status: 'VERIFIED',
            verificationScore: 96,
            evidence: {
              ...inc.evidence,
              weatherAnomalyDetected: true,
              cctvVerified: true,
              locationConfidencePercent: 98,
            },
          };
        }
        return inc;
      })
    );

    const inc = incidents.find(i => i.id === incidentId);
    if (inc) {
      addWhatChanged('verified', `Incident #${inc.code} verified with 96% multi-sensor confidence`, 'VERIFIED');
      addDecisionLog('VERIFICATION', `Incident #${inc.code} (${inc.title}) upgraded to VERIFIED`, 'AI Cross-Validation Engine');
    }
  };

  // Dispatch emergency resource
  const deployResource = (resourceId: string, incidentId?: string) => {
    setResources(prev =>
      prev.map(res => {
        if (res.id === resourceId) {
          return {
            ...res,
            status: 'EN_ROUTE',
            assignedIncidentId: incidentId || 'inc-2048',
            etaMinutes: 6,
            // Move toward center incident on map
            targetMapX: 41,
            targetMapY: 23,
          };
        }
        return res;
      })
    );

    const unit = resources.find(r => r.id === resourceId);
    if (unit) {
      addWhatChanged('dispatched', `${unit.callsign} dispatched to Riverside Sector (ETA 6m)`, 'DISPATCH');
      addDecisionLog('DISPATCH', `${unit.callsign} transitioned AVAILABLE → EN_ROUTE`, 'EOC Dispatch Commander');
    }
  };

  // Optimize all resources (batch AI allocation)
  const optimizeAllResources = () => {
    setResources(prev =>
      prev.map((res, index) => {
        if (res.status === 'AVAILABLE') {
          return {
            ...res,
            status: index % 2 === 0 ? 'EN_ROUTE' : 'DISPATCHED',
            assignedIncidentId: index % 3 === 0 ? 'inc-2048' : 'inc-2049',
            etaMinutes: 4 + (index % 5),
            targetMapX: 30 + (index * 4),
            targetMapY: 22 + (index * 2),
          };
        }
        return res;
      })
    );

    addWhatChanged('dispatched', 'AI Resource Optimizer auto-assigned 8 available units by priority & distance', 'OPTIMIZED');
    addDecisionLog('DISPATCH', 'Optimal global resource assignment executed across 5 incident clusters', 'AI Resource Optimizer');
  };

  // Action plan approvals
  const approveActionPlan = (planId: string) => {
    setActionPlans(prev =>
      prev.map(p => (p.id === planId ? { ...p, status: 'APPROVED' } : p))
    );
    const plan = actionPlans.find(p => p.id === planId);
    if (plan) {
      addDecisionLog('DISPATCH', `Action Plan [${plan.priority}]: "${plan.action}" APPROVED by Commander`, 'EOC Commander');
      addWhatChanged('increase', `Plan ${plan.priority} authorized for immediate execution`, 'APPROVED');
    }
  };

  const approveAllActionPlans = () => {
    setActionPlans(prev => prev.map(p => ({ ...p, status: 'APPROVED' })));
    addDecisionLog('DISPATCH', 'Full AI Emergency Action Plan APPROVED in batch', 'EOC Chief Incident Commander');
    addWhatChanged('increase', 'All prioritized tactical actions authorized for immediate execution', 'ACTION PLAN');
  };

  const rejectActionPlan = (planId: string) => {
    setActionPlans(prev =>
      prev.map(p => (p.id === planId ? { ...p, status: 'REJECTED' } : p))
    );
    const plan = actionPlans.find(p => p.id === planId);
    if (plan) {
      addDecisionLog('SYSTEM', `Action Plan [${plan.priority}] REJECTED by Operator`, 'Operator');
    }
  };

  // Broadcast Alert Notification
  const sendAlertNotification = (alertData: Omit<AlertNotification, 'id' | 'timestamp'>) => {
    const newAlert: AlertNotification = {
      ...alertData,
      id: `alert-${Date.now()}`,
      timestamp: 'Just now',
    };
    setAlerts(prev => [newAlert, ...prev]);
    addWhatChanged('warning', `🚨 [${alertData.severity}] Alert broadcasted to ${alertData.recipientsCount.toLocaleString()} citizens via ${alertData.channels.join(', ')}`, 'ALERT BROADCAST');
    addDecisionLog('ALERT', `Critical alert dispatched to ${alertData.zoneNames.join(', ')} via multi-channel mesh`, 'EOC Alert Officer');
  };

  // Digital Twin Flood Simulation Engine
  const runSimulation = async (params: SimulationParams) => {
    setSimulationRunning(true);
    const steps = [
      'Analyzing multi-radar precipitation grids...',
      'Simulating topography & surface hydrological runoff...',
      'Evaluating underground storm drainage surcharge...',
      'Estimating localized flood bathymetry & water depth...',
      'Calculating human vulnerability & demographic exposure...',
      'Assessing road network accessibility & bridge security...',
      'Synthesizing optimal emergency intervention protocols...',
    ];

    for (let i = 0; i < steps.length; i++) {
      setSimulationStepText(steps[i]);
      await new Promise(r => setTimeout(r, 650));
    }

    // Compute simulation metrics based on parameters
    const rainFactor = params.rainfall / 75;
    const durFactor = params.duration / 3;
    const drainagePenalty = params.drainageEfficiency === 'Failed' ? 1.6 : params.drainageEfficiency === 'Reduced' ? 1.25 : 1.0;
    const riverPenalty = params.riverCondition === 'Overflow' ? 1.5 : params.riverCondition === 'High' ? 1.2 : 1.0;

    const compositeMultiplier = rainFactor * durFactor * drainagePenalty * riverPenalty;

    const result: SimulationResult = {
      floodedAreaSqKm: parseFloat((4.8 * compositeMultiplier).toFixed(1)),
      maxWaterDepthM: parseFloat((1.4 * compositeMultiplier).toFixed(2)),
      populationExposed: Math.round(18500 * compositeMultiplier),
      roadsAffectedCount: Math.round(14 * compositeMultiplier),
      hospitalsThreatenedCount: compositeMultiplier > 1.3 ? 2 : 1,
      sheltersAvailableCount: 7,
      economicExposureCr: Math.round(42 * compositeMultiplier),
      recommendedActions: [
        'Deploy high-capacity mobile dewatering units to Bund Garden basin',
        'Pre-position swift water rescue boats at Sangam confluence',
        'Enforce mandatory evacuation of low-lying shanties in Sector R-3',
        'Redirect north-south traffic to elevated arterial bypass',
      ],
    };

    setSimulationResult(result);
    setSimulationRunning(false);

    // Update zones according to simulation
    setZones(prev =>
      prev.map(z => {
        if (z.id === 'zone-riverside' || z.id === 'zone-sangamwadi' || z.id === 'zone-deccan') {
          return {
            ...z,
            riskScore: Math.min(100, Math.round(z.riskScore * compositeMultiplier)),
            rainfall: params.rainfall,
            waterLevel: parseFloat((z.waterLevel * Math.min(1.5, compositeMultiplier)).toFixed(1)),
            populationAtRisk: Math.round(z.populationAtRisk * compositeMultiplier),
          };
        }
        return z;
      })
    );

    addDecisionLog('SYSTEM', `Digital Twin Simulation finished (${params.rainfall}mm/h for ${params.duration}h, ${params.drainageEfficiency} drainage)`, 'City Digital Twin');
    addWhatChanged('increase', `Simulation completed: ${result.floodedAreaSqKm} sq km flooded, ${result.populationExposed.toLocaleString()} people exposed`, 'SIMULATION');
  };

  const resetSimulationToDefault = () => {
    setZones(INITIAL_ZONES);
    setSimulationResult(null);
  };

  // Hackathon Live Demo Scenario Automation (60-90s)
  const startLiveDemo = () => {
    setDemoPlaying(true);
    setDemoStep(0);
  };

  const pauseLiveDemo = () => {
    setDemoPlaying(false);
    if (demoTimerRef.current) clearInterval(demoTimerRef.current);
  };

  const nextDemoEvent = () => {
    setDemoStep(prev => Math.min(12, prev + 1));
  };

  const resetLiveDemo = () => {
    setDemoPlaying(false);
    setDemoStep(0);
    if (demoTimerRef.current) clearInterval(demoTimerRef.current);
    setZones(INITIAL_ZONES);
    setSensors(INITIAL_SENSORS);
    setIncidents(INITIAL_INCIDENTS);
    setResources(INITIAL_RESOURCES);
    setRoutes(INITIAL_ROUTES);
    setIsFlashFloodTriggered(false);
    setIsRecalculatingRoute(false);
  };

  useEffect(() => {
    if (!demoPlaying) return;

    const interval = setInterval(() => {
      setDemoStep(current => {
        if (current >= 8) {
          setDemoPlaying(false);
          setDemoCompleted(true);
          return 8;
        }
        return current + 1;
      });
    }, 7000); // 7 seconds per phase

    demoTimerRef.current = interval;
    return () => clearInterval(interval);
  }, [demoPlaying]);

  // Execute demo actions as demoStep advances (Exact 8-step SaaS redesign flow)
  useEffect(() => {
    if (demoStep === 1) {
      // STEP 1: Normal conditions. City Risk = 34
      setZones(prev =>
        prev.map(z => ({
          ...z,
          riskScore: Math.min(45, Math.round(z.riskScore * 0.45)),
          riskLevel: 'LOW',
          rainfall: 28,
          populationAtRisk: 620,
        }))
      );
      setSituationBriefText('Urban flood conditions are being monitored across Pune basin. Catchment runoff and water levels are currently within safe operational limits.');
      setDemoSimulationToast({
        title: 'Step 1: Normal Conditions',
        subtitle: 'Telemetry nominal across all sensors. Baseline city flood index at 34/100.',
        type: 'info',
      });
    } else if (demoStep === 2) {
      // STEP 2: Rainfall increases. Small notification: Heavy rainfall detected. City Risk: 34 -> 51
      setZones(prev =>
        prev.map(z =>
          z.id === 'zone-riverside'
            ? { ...z, riskScore: 51, riskLevel: 'MODERATE', rainfall: 58, populationAtRisk: 2400 }
            : z
        )
      );
      setSituationBriefText('Precipitation rate increasing over northeastern catchment. Localized runoff entering low-lying basins.');
      setDemoSimulationToast({
        title: 'Step 2: Heavy Rainfall Detected',
        subtitle: 'Doppler radar detects 58 mm/hr surge. City risk increased: 34 → 51.',
        type: 'warning',
      });
      addWhatChanged('warning', 'Heavy rainfall detected across Pune North-East quadrant', 'RADAR');
    } else if (demoStep === 3) {
      // STEP 3: AI detects future danger. Notification: Critical flood risk predicted. Riverside Ward 51 -> 87
      setZones(prev =>
        prev.map(z =>
          z.id === 'zone-riverside'
            ? { ...z, riskScore: 87, riskLevel: 'CRITICAL', rainfall: 78, populationAtRisk: 8420, predictedFloodTimeMin: 42 }
            : z
        )
      );
      setSituationBriefText('Flooding predicted in approximately 42 minutes if current rainfall persists. Riverside Ward requires primary attention.');
      setDemoSimulationToast({
        title: 'Step 3: Critical Flood Risk Predicted',
        subtitle: 'Riverside Ward elevated: 51 → 87/100. Inundation projected in 42 minutes.',
        type: 'critical',
      });
      addWhatChanged('increase', 'Critical flood risk predicted for Riverside Ward (87/100)', 'PREDICTION');
    } else if (demoStep === 4) {
      // STEP 4: Citizen report appears & AI cross-checks
      setDemoSimulationToast({
        title: 'Step 4: Report Cross-Validation',
        subtitle: 'Citizen report received. Sensor WS-14 (+63%) & radar confirmed. 94% verified.',
        type: 'info',
      });
      verifyIncident('inc-2048');
    } else if (demoStep === 5) {
      // STEP 5: AI suggests evacuation. Route C appears
      setSelectedRoute(INITIAL_ROUTES[2]); // Route C
      setDemoSimulationToast({
        title: 'Step 5: Safe Evacuation Calculated',
        subtitle: 'Route C recommended (Deccan Flyover Bypass - 92% Safety Score).',
        type: 'info',
      });
      addWhatChanged('shelter', 'Route C recommended to Shelter S-04 with 92% safety score', 'ROUTING');
    } else if (demoStep === 6) {
      // STEP 6: Flash flood blocks Route C -> Recalculating -> Route D
      setDemoSimulationToast({
        title: 'Step 6: Route Compromised — Recalculating...',
        subtitle: 'Water surge detected on Route C underpass. Auto-diverting to Route D.',
        type: 'warning',
      });
      triggerFlashFlood();
    } else if (demoStep === 7) {
      // STEP 7: AI Response Plan appears
      setResponsePlanModalOpen(true);
      setDemoSimulationToast({
        title: 'Step 7: AI Response Plan Ready',
        subtitle: 'Recommended: Deploy 2 Rescue Teams, 1 Ambulance, Open Shelter S-04, Issue Alert.',
        type: 'info',
      });
    } else if (demoStep === 8) {
      // STEP 8: Operator approves response plan -> Resources dispatched -> Alert sent -> Response Active
      approveAllActionPlans();
      deployResource('res-ndrf-02', 'inc-2048');
      deployResource('res-amb-04', 'inc-2048');
      deployResource('res-pump-01', 'inc-2048');
      deployResource('res-boat-01', 'inc-2048');
      sendAlertNotification({
        title: 'CRITICAL FLOOD WARNING: Riverside Ward',
        severity: 'RED',
        zoneNames: ['Riverside Ward'],
        channels: ['SMS', 'PUSH', 'WHATSAPP', 'SIREN'],
        languages: {
          en: 'Severe flooding predicted in Riverside Ward within 40 min. Proceed toward Shelter S-04 via Route D.',
          hi: 'रिवरसाइड वार्ड में 40 मिनट में बाढ़ की संभावना। रूट डी से शेल्टर एस-04 जाएं।',
          mr: 'रिव्हरसाइड वॉर्डमध्ये ४० मिनिटांत पूर इशारा. रूट डी मार्गाने शेल्टर एस-०४ कडे जा.',
        },
        recipientsCount: 8420,
        isSimulated: true,
        status: 'BROADCASTED',
      });
      setDemoSimulationToast({
        title: 'Step 8: Response Plan Approved',
        subtitle: 'Response active: Prediction ✓ | Verified ✓ | Safe Route ✓ | Dispatched ✓ | Alerted ✓',
        type: 'success',
      });
      setDemoCompleted(true);
    }
  }, [demoStep]);

  // Judge mode stepper navigation
  const nextJudgeStep = () => {
    const next = Math.min(7, judgeStep + 1);
    setJudgeStep(next);
    routeJudgeTab(next);
  };

  const prevJudgeStep = () => {
    const prev = Math.max(1, judgeStep - 1);
    setJudgeStep(prev);
    routeJudgeTab(prev);
  };

  const routeJudgeTab = (step: number) => {
    switch (step) {
      case 1: // Problem
        setActiveTab('command-center');
        break;
      case 2: // Prediction
        setActiveTab('forecast');
        break;
      case 3: // Verification
        setActiveTab('incidents');
        break;
      case 4: // Dynamic Routing
        setActiveTab('evacuation');
        break;
      case 5: // Resource Optimization
        setActiveTab('resources');
        break;
      case 6: // Alert Generation
        setActiveTab('alerts');
        break;
      case 7: // Impact
        setActiveTab('analytics');
        break;
      default:
        break;
    }
  };

  // Computed metrics for executive situation bar
  const overallCityRisk = Math.round(
    zones.reduce((acc, z) => acc + z.riskScore, 0) / zones.length
  );
  const totalPopulationAtRisk = zones.reduce((acc, z) => acc + z.populationAtRisk, 0);
  const verifiedIncidentCount = incidents.filter(i => i.status === 'VERIFIED').length;
  const activeResourceCount = resources.filter(r => r.status === 'EN_ROUTE' || r.status === 'DISPATCHED' || r.status === 'ON_SCENE').length;

  return (
    <CommandContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedZone,
        setSelectedZone,
        selectedSensor,
        setSelectedSensor,
        selectedIncident,
        setSelectedIncident,
        selectedShelter,
        setSelectedShelter,
        selectedResource,
        setSelectedResource,
        selectedRoute,
        setSelectedRoute,

        zones,
        sensors,
        incidents,
        resources,
        shelters,
        routes,
        actionPlans,
        decisionLogs,
        whatChanged,
        alerts,

        isEmergencyMode,
        toggleEmergencyMode,

        timelineIndex,
        setTimelineIndex,

        mapLayers,
        toggleMapLayer,

        copilotOpen,
        setCopilotOpen,
        responsePlanModalOpen,
        setResponsePlanModalOpen,
        selectedZoneDrawerOpen,
        setSelectedZoneDrawerOpen,
        selectedIncidentDrawerOpen,
        setSelectedIncidentDrawerOpen,
        situationBriefText,
        setSituationBriefText,
        demoSimulationToast,
        demoCompleted,
        simulationModalOpen,
        setSimulationModalOpen,
        simulationRunning,
        simulationStepText,
        simulationResult,
        runSimulation,
        resetSimulationToDefault,

        explainableModalZone,
        setExplainableModalZone,

        isFlashFloodTriggered,
        triggerFlashFlood,
        resetDynamicRoute,
        isRecalculatingRoute,

        verifyIncident,
        deployResource,
        optimizeAllResources,
        approveActionPlan,
        approveAllActionPlans,
        rejectActionPlan,
        sendAlertNotification,

        demoPlaying,
        demoStep,
        startLiveDemo,
        pauseLiveDemo,
        nextDemoEvent,
        resetLiveDemo,

        judgeModeOpen,
        setJudgeModeOpen,
        judgeStep,
        setJudgeStep,
        nextJudgeStep,
        prevJudgeStep,

        overallCityRisk,
        totalPopulationAtRisk,
        verifiedIncidentCount,
        activeResourceCount,
      }}
    >
      {children}
    </CommandContext.Provider>
  );
};

export const useCommand = () => {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error('useCommand must be used within a CommandProvider');
  }
  return context;
};
