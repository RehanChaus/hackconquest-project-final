import React from 'react';
import { useCommand } from '../../context/CommandContext';
import { GisCommandMap } from '../Map/GisCommandMap';
import { 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  Users, 
  Truck, 
  CheckCircle, 
  Clock, 
  Activity, 
  Layers, 
  Sliders, 
  ShieldAlert, 
  ChevronRight, 
  TrendingUp, 
  Droplets,
  Radio,
  Compass
} from 'lucide-react';

export const CommandCenterHero: React.FC = () => {
  const {
    zones,
    incidents,
    resources,
    setSelectedZone,
    setSelectedZoneDrawerOpen,
    setResponsePlanModalOpen,
    setSimulationModalOpen,
    situationBriefText,
    demoCompleted,
    whatChanged
  } = useCommand();

  const criticalZone = zones.find(z => z.riskLevel === 'CRITICAL') || zones[0];
  const maxRisk = Math.max(...zones.map(z => z.riskScore));
  const totalPopAtRisk = zones.reduce((acc, z) => acc + z.populationAtRisk, 0);
  const activeIncidentsCount = incidents.filter(i => i.status !== 'FALSE_POSITIVE').length;
  const verifiedIncidentsCount = incidents.filter(i => i.status === 'VERIFIED').length;
  const availableResourcesCount = resources.filter(r => r.status === 'AVAILABLE').length;

  const topRiskZones = [...zones].sort((a, b) => b.riskScore - a.riskScore).slice(0, 3);

  const getRiskLabel = (score: number) => {
    if (score >= 80) return 'Critical';
    if (score >= 60) return 'High';
    if (score >= 40) return 'Moderate';
    return 'Low';
  };

  const getRiskColorHex = (score: number) => {
    if (score >= 80) return '#DC4545';
    if (score >= 60) return '#ED7A2C';
    if (score >= 40) return '#E5A824';
    return '#20A464';
  };

  const getRiskBadge = (score: number) => {
    if (score >= 80) return 'bg-[#DC4545]/10 text-[#DC4545] border-[#DC4545]/20';
    if (score >= 60) return 'bg-[#ED7A2C]/10 text-[#ED7A2C] border-[#ED7A2C]/20';
    if (score >= 40) return 'bg-[#E5A824]/10 text-[#E5A824] border-[#E5A824]/20';
    return 'bg-[#20A464]/10 text-[#20A464] border-[#20A464]/20';
  };

  // Radial Gauge calculations for 240-degree arc
  // Radius = 60, circumference = 2 * PI * 60 ≈ 377
  // Arc length = (240 / 360) * 377 ≈ 251.3
  const totalArc = 251.3;
  const progressArc = (Math.min(100, Math.max(0, maxRisk)) / 100) * totalArc;

  return (
    <div className="flex-1 p-6 bg-[#EDF3F7] overflow-y-auto space-y-6 select-none font-sans">
      {/* Top Greeting & Operational State */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#1677C8] uppercase tracking-wider">
              City Intelligence Overview
            </span>
            <span className="text-[#8A9CAA]">•</span>
            <span className="text-xs text-[#607487] font-medium">Pune Municipal Basin Operations Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#12324A] tracking-tight">
            Urban Flood Risk Operations
          </h2>
          <p className="text-xs sm:text-sm text-[#607487] mt-0.5">
            Real-time neural hydro-meteorological forecasting calibrated with Doppler radar and IoT river gauges.
          </p>
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Digital Twin Flood Simulation */}
          <button
            onClick={() => setSimulationModalOpen(true)}
            className="py-2.5 px-3.5 bg-white hover:bg-[#F6F9FB] text-[#163047] border border-[#244A65]/15 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#1677C8]" />
            <span>Digital Twin Simulation</span>
          </button>

          {/* AI Response Plan */}
          <button
            onClick={() => setResponsePlanModalOpen(true)}
            className="py-2.5 px-4 bg-[#1677C8] hover:bg-[#12324A] text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-xs shadow-[#1677C8]/25 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Response Protocol</span>
          </button>
        </div>
      </div>

      {/* Completion Banner if simulation completed */}
      {demoCompleted && (
        <div className="p-4 rounded-xl bg-white border border-[#20A464]/30 text-[#12324A] text-xs flex items-center justify-between gap-4 shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-[#20A464] shrink-0" />
            <div>
              <span className="font-bold text-[#20A464]">EMERGENCY PROTOCOL ACTIVE</span>
              <span className="text-[#607487] ml-2">
                Hydrologic Prediction ✓ | Incident Verified ✓ | Safe Evacuation Corridor Active ✓ | 6 Units Deployed ✓ | Multilingual Alert Issued ✓
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#20A464] bg-[#20A464]/10 px-2.5 py-1 rounded-md border border-[#20A464]/20 shrink-0">
            ALL PROTOCOLS SYNCHRONIZED
          </span>
        </div>
      )}

      {/* ============================================================== */}
      {/* PROMINENT ASYMMETRIC GRID: AI BRIEFING (LEFT) & RADIAL GAUGE (RIGHT) */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT COLUMN (~67% / 8 cols): AI Situation Briefing */}
        <div className="lg:col-span-8 bg-white border border-[#244A65]/10 rounded-2xl p-6 flex flex-col justify-between shadow-[0_4px_24px_-4px_rgba(18,50,74,0.06)] space-y-4">
          <div className="space-y-3.5">
            {/* Header with Live Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#1677C8]/10 text-[#1677C8] border border-[#1677C8]/20">
                  <Sparkles className="w-4 h-4 text-[#1677C8]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#12324A] uppercase tracking-wider">
                    AI Situation Synthesis
                  </h3>
                  <span className="text-[11px] text-[#607487] font-medium">
                    Continuous multi-source synthesis of radar, sensors, and civic reports
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#20A464] animate-pulse" />
                <span className="text-[11px] font-bold text-[#1677C8] bg-[#EDF3F7] px-2.5 py-1 rounded-full border border-[#244A65]/10">
                  REAL-TIME INTELLIGENCE
                </span>
              </div>
            </div>

            {/* Natural Language Briefing Card */}
            <div className="p-4 rounded-xl bg-[#F6F9FB] border border-[#244A65]/10 text-xs text-[#163047] leading-relaxed">
              <p className="font-medium text-[13px] text-[#12324A] leading-relaxed">
                {situationBriefText}
              </p>
            </div>

            {/* 4 Structured Telemetry Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3 bg-[#F6F9FB] rounded-xl border border-[#244A65]/8">
                <span className="text-[10px] font-bold text-[#607487] uppercase block">Critical Sector</span>
                <span className="text-xs font-bold text-[#DC4545] mt-0.5 block truncate">
                  {criticalZone.name.split('(')[0].trim()} ({criticalZone.riskScore}/100)
                </span>
              </div>

              <div className="p-3 bg-[#F6F9FB] rounded-xl border border-[#244A65]/8">
                <span className="text-[10px] font-bold text-[#607487] uppercase block">Inundation Onset</span>
                <span className="text-xs font-bold text-[#12324A] mt-0.5 block">
                  ~{criticalZone.predictedFloodTimeMin} min to crest
                </span>
              </div>

              <div className="p-3 bg-[#F6F9FB] rounded-xl border border-[#244A65]/8">
                <span className="text-[10px] font-bold text-[#607487] uppercase block">Exposed Citizens</span>
                <span className="text-xs font-bold text-[#12324A] mt-0.5 block">
                  {criticalZone.populationAtRisk.toLocaleString()} residents
                </span>
              </div>

              <div className="p-3 bg-[#F6F9FB] rounded-xl border border-[#244A65]/8">
                <span className="text-[10px] font-bold text-[#607487] uppercase block">Model Certainty</span>
                <span className="text-xs font-bold text-[#20A464] mt-0.5 block">
                  {criticalZone.confidence}% neural verified
                </span>
              </div>
            </div>
          </div>

          {/* Action Trigger Banner */}
          <div className="pt-3 border-t border-[#244A65]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-[#607487]">
              <span className="font-bold text-[#12324A]">Active Recommendation:</span> Stage 2 Cell-Broadcast & deployment of 2 high-flow pumps to Bund Garden Weir.
            </div>
            <button
              onClick={() => setResponsePlanModalOpen(true)}
              className="py-2.5 px-4 bg-[#12324A] hover:bg-[#1677C8] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs shrink-0 cursor-pointer"
            >
              <span>View Action Protocol</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#3B9CE2]" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN (~33% / 4 cols): Prominent 'City Risk' Radial Gauge */}
        <div className="lg:col-span-4 bg-white border border-[#244A65]/10 rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-[0_4px_24px_-4px_rgba(18,50,74,0.06)] relative overflow-hidden">
          {/* Header */}
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-bold text-[#12324A] uppercase tracking-wider">
              City Risk Assessment
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getRiskBadge(maxRisk)}`}>
              {getRiskLabel(maxRisk)}
            </span>
          </div>

          {/* Radial Gauge SVG */}
          <div className="relative my-2 flex items-center justify-center">
            <svg viewBox="0 0 160 145" className="w-48 h-40 overflow-visible">
              <defs>
                <linearGradient id="cityRiskGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DC4545" />
                  <stop offset="100%" stopColor="#ED7A2C" />
                </linearGradient>
              </defs>

              {/* Background Track Arc (240 degrees, rotated 150 deg to start at bottom-left) */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke="#E2EBF2"
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray="251.3 377"
                transform="rotate(150 80 80)"
              />

              {/* Active Progress Arc */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke={getRiskColorHex(maxRisk)}
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray={`${progressArc} 377`}
                transform="rotate(150 80 80)"
                className="transition-all duration-1000 ease-out"
              />

              {/* Gauge Inner Numeric Display */}
              <text
                x="80"
                y="74"
                textAnchor="middle"
                className="font-extrabold fill-[#12324A]"
                style={{ fontSize: '38px', fontWeight: 800 }}
              >
                {maxRisk}
              </text>
              <text
                x="80"
                y="94"
                textAnchor="middle"
                className="font-bold fill-[#8A9CAA]"
                style={{ fontSize: '11px', letterSpacing: '0.05em' }}
              >
                OUT OF 100
              </text>
            </svg>
          </div>

          {/* Gauge Summary Telemetry */}
          <div className="w-full pt-3 border-t border-[#244A65]/10 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-[#607487]">
              <span>Threat Level:</span>
              <span className="font-bold text-[#DC4545]">{getRiskLabel(maxRisk)} Threat</span>
            </div>
            <div className="flex items-center justify-between text-[#607487]">
              <span>Catchment Trend:</span>
              <span className="font-bold text-[#DC4545] flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +14% (Last 2h)
              </span>
            </div>
            <div className="flex items-center justify-between text-[#607487]">
              <span>Weir Status:</span>
              <span className="font-bold text-[#12324A]">Bund Garden at 94% Capacity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Operational Telemetry Row (3 Supporting KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Population At Risk */}
        <div className="p-4 rounded-2xl bg-white border border-[#244A65]/10 shadow-[0_2px_12px_-2px_rgba(18,50,74,0.06)] hover:border-[#1677C8]/30 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-[#607487] uppercase tracking-wider">
              Population at Risk
            </span>
            <Users className="w-4 h-4 text-[#1677C8]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#12324A] tracking-tight">
            {totalPopAtRisk.toLocaleString()}
          </div>
          <div className="text-xs text-[#607487] mt-1.5">
            Across 4 low-lying river setback catchments
          </div>
        </div>

        {/* Card 2: Active Incidents */}
        <div className="p-4 rounded-2xl bg-white border border-[#244A65]/10 shadow-[0_2px_12px_-2px_rgba(18,50,74,0.06)] hover:border-[#1677C8]/30 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-[#607487] uppercase tracking-wider">
              Active Incidents
            </span>
            <AlertTriangle className="w-4 h-4 text-[#ED7A2C]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#12324A] tracking-tight">
              {activeIncidentsCount}
            </span>
            <span className="text-xs text-[#607487]">reported</span>
          </div>
          <div className="text-xs text-[#607487] mt-1.5">
            <span className="font-semibold text-[#1677C8]">{verifiedIncidentsCount} verified</span> by IoT & camera cross-check
          </div>
        </div>

        {/* Card 3: Response Fleet Availability */}
        <div className="p-4 rounded-2xl bg-white border border-[#244A65]/10 shadow-[0_2px_12px_-2px_rgba(18,50,74,0.06)] hover:border-[#1677C8]/30 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-[#607487] uppercase tracking-wider">
              Available Units
            </span>
            <Truck className="w-4 h-4 text-[#20A464]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#20A464] tracking-tight">
              {availableResourcesCount}
            </span>
            <span className="text-xs text-[#607487]">/ {resources.length} units</span>
          </div>
          <div className="text-xs text-[#607487] mt-1.5">
            {resources.length - availableResourcesCount} deployed • 75% fleet readiness
          </div>
        </div>
      </div>

      {/* Main Geospatial Command Console: Map (8 cols) + Tactical Feed (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[560px]">
        {/* Left: GIS Map View (8 cols / ~67%) with floating timeline at bottom-center */}
        <div className="lg:col-span-8 h-[560px] min-h-[500px]">
          <GisCommandMap />
        </div>

        {/* Right: Tactical Intelligence Panel (4 cols / ~33%) */}
        <div className="lg:col-span-4 bg-white border border-[#244A65]/10 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_24px_-4px_rgba(18,50,74,0.08)] space-y-4">
          <div className="space-y-4">
            {/* Priority Risk Catchments Triage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#12324A] uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#1677C8]" />
                  Priority Catchments
                </span>
                <span className="text-[10px] font-semibold text-[#1677C8] bg-[#EDF3F7] px-2 py-0.5 rounded-full">
                  LIVE RANKED
                </span>
              </div>
              <div className="space-y-2">
                {topRiskZones.map(zone => (
                  <button
                    key={zone.id}
                    onClick={() => {
                      setSelectedZone(zone);
                      setSelectedZoneDrawerOpen(true);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#F6F9FB] hover:bg-[#EDF3F7] border border-[#244A65]/8 text-left transition-all group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#163047] group-hover:text-[#1677C8] flex items-center gap-1.5">
                        <span>{zone.name.split('(')[0].trim()}</span>
                        <span className="text-[10px] text-[#8A9CAA] font-medium">({zone.code})</span>
                      </div>
                      <div className="text-[11px] text-[#607487] mt-0.5">
                        Onset in {zone.predictedFloodTimeMin}m • {zone.populationAtRisk.toLocaleString()} residents
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${getRiskBadge(zone.riskScore)}`}>
                        {zone.riskScore}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#8A9CAA] group-hover:text-[#1677C8] transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* What Changed in Last 5 Minutes Feed */}
            <div className="pt-2 border-t border-[#244A65]/10">
              <div className="text-xs font-bold text-[#12324A] uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Recent Situational Events</span>
                <span className="text-[10px] font-normal text-[#8A9CAA]">Last 5 min</span>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {whatChanged.slice(0, 4).map(item => (
                  <div key={item.id} className="text-xs p-2.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/6 flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#1677C8] mt-1 shrink-0" />
                    <div className="flex-1 text-[11px] text-[#163047] leading-snug">
                      <span className="font-medium">{item.message}</span>
                      <span className="text-[10px] text-[#8A9CAA] ml-1.5 font-semibold">({item.timeAgo})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-3 border-t border-[#244A65]/10">
            <button
              onClick={() => setResponsePlanModalOpen(true)}
              className="w-full py-3 px-4 bg-[#F6F9FB] hover:bg-[#EDF3F7] text-[#12324A] hover:text-[#1677C8] border border-[#244A65]/12 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer"
            >
              <span>View Recommended Emergency Actions</span>
              <ArrowRight className="w-4 h-4 text-[#1677C8]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
