import React from 'react';
import { useCommand } from '../../context/CommandContext';
import { 
  AlertTriangle, 
  Users, 
  ShieldCheck, 
  Truck, 
  Home, 
  Brain, 
  CloudRain,
  TrendingUp,
  Activity
} from 'lucide-react';

export const ExecutiveSituationBar: React.FC = () => {
  const {
    zones,
    incidents,
    resources,
    shelters,
    timelineIndex,
  } = useCommand();

  const criticalZone = zones.find(z => z.riskLevel === 'CRITICAL') || zones[0];
  const maxRiskScore = Math.max(...zones.map(z => z.riskScore));
  const totalPopAtRisk = zones.reduce((acc, z) => acc + z.populationAtRisk, 0);
  const verifiedIncidents = incidents.filter(i => i.status === 'VERIFIED').length;
  const activeResourcesCount = resources.filter(r => r.status === 'EN_ROUTE' || r.status === 'DISPATCHED' || r.status === 'ON_SCENE').length;
  const totalSheltersAvailable = shelters.filter(s => s.status === 'OPEN').length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 p-3 bg-[#060a16] border-b border-cyan-950/60 select-none">
      {/* KPI 1: City Flood Risk */}
      <div className="bg-slate-950/80 border border-red-500/40 rounded-xl p-2.5 relative overflow-hidden shadow-lg shadow-red-950/20">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
          <span className="flex items-center gap-1 font-semibold text-red-400">
            <AlertTriangle className="w-3.5 h-3.5" />
            CITY FLOOD RISK
          </span>
          <span className="text-[10px] px-1 py-0.2 bg-red-500/20 text-red-300 rounded font-bold">
            LIVE
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-hud font-bold text-red-400 tracking-tight">
            {maxRiskScore}
          </span>
          <span className="text-xs font-mono text-slate-400">/ 100</span>
          <span className="text-[11px] font-mono font-bold text-red-400 ml-auto animate-pulse">
            CRITICAL
          </span>
        </div>
        <div className="mt-1 h-1 w-full bg-slate-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
            style={{ width: `${maxRiskScore}%` }}
          />
        </div>
      </div>

      {/* KPI 2: Population At Risk */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 relative overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
          <span className="flex items-center gap-1 font-semibold text-rose-400">
            <Users className="w-3.5 h-3.5" />
            POPULATION AT RISK
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-hud font-bold text-slate-100 tracking-tight">
            {totalPopAtRisk.toLocaleString()}
          </span>
        </div>
        <div className="text-[10px] font-mono text-slate-400 mt-1 flex items-center gap-1">
          <span className="text-red-400 font-semibold">↑ +14%</span> vs prior hour
        </div>
      </div>

      {/* KPI 3: Verified Incidents */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 relative overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
          <span className="flex items-center gap-1 font-semibold text-amber-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            VERIFIED INCIDENTS
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-hud font-bold text-amber-300 tracking-tight">
            {verifiedIncidents}
          </span>
          <span className="text-xs font-mono text-slate-500">/ {incidents.length} queue</span>
        </div>
        <div className="text-[10px] font-mono text-emerald-400 mt-1">
          94% avg confidence
        </div>
      </div>

      {/* KPI 4: Active Resources */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 relative overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
          <span className="flex items-center gap-1 font-semibold text-cyan-400">
            <Truck className="w-3.5 h-3.5" />
            ACTIVE RESOURCES
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-hud font-bold text-cyan-300 tracking-tight">
            {activeResourcesCount}
          </span>
          <span className="text-xs font-mono text-slate-500">/ {resources.length} units</span>
        </div>
        <div className="text-[10px] font-mono text-cyan-400 mt-1">
          {resources.filter(r => r.status === 'AVAILABLE').length} on immediate standby
        </div>
      </div>

      {/* KPI 5: Safe Shelters */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 relative overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
          <span className="flex items-center gap-1 font-semibold text-teal-400">
            <Home className="w-3.5 h-3.5" />
            SAFE SHELTERS
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-hud font-bold text-teal-300 tracking-tight">
            {totalSheltersAvailable}
          </span>
          <span className="text-xs font-mono text-slate-500">/ {shelters.length} ready</span>
        </div>
        <div className="text-[10px] font-mono text-teal-400 mt-1">
          4,472 berths vacant
        </div>
      </div>

      {/* KPI 6: AI Model Confidence */}
      <div className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-2.5 relative overflow-hidden shadow-sm shadow-cyan-950">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
          <span className="flex items-center gap-1 font-semibold text-cyan-400">
            <Brain className="w-3.5 h-3.5" />
            AI CONFIDENCE
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-hud font-bold text-cyan-300 tracking-tight">
            {criticalZone?.confidence || 91}%
          </span>
          <span className="text-[10px] font-mono text-emerald-400 ml-auto">HIGH</span>
        </div>
        <div className="text-[10px] font-mono text-slate-400 mt-1">
          Fused 7 multi-modal feeds
        </div>
      </div>

      {/* KPI 7: 72H Forecast */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 relative overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
          <span className="flex items-center gap-1 font-semibold text-blue-400">
            <CloudRain className="w-3.5 h-3.5" />
            72H FORECAST
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-hud font-bold text-blue-300 tracking-tight">
            {timelineIndex >= 5 ? 'EASING' : 'SEVERE'}
          </span>
        </div>
        <div className="text-[10px] font-mono text-slate-400 mt-1">
          Peak rainfall next 3h
        </div>
      </div>
    </div>
  );
};
