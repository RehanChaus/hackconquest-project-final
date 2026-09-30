import React from 'react';
import { useCommand } from '../../context/CommandContext';
import { EmergencyResource } from '../../types';
import { 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  X, 
  Sliders, 
  Navigation, 
  Users, 
  Droplets,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export const ResourceOptimizer: React.FC = () => {
  const {
    resources,
    deployResource,
    optimizeAllResources,
    setActiveTab,
    selectedResource,
    setSelectedResource,
  } = useCommand();

  const total = resources.length;
  const available = resources.filter(r => r.status === 'AVAILABLE').length;
  const dispatched = resources.filter(r => r.status === 'DISPATCHED').length;
  const enRoute = resources.filter(r => r.status === 'EN_ROUTE').length;
  const onScene = resources.filter(r => r.status === 'ON_SCENE').length;

  const ambulances = resources.filter(r => r.type === 'AMBULANCE');
  const rescueTeams = resources.filter(r => r.type === 'NDRF_TEAM');
  const boats = resources.filter(r => r.type === 'RESCUE_BOAT');
  const pumps = resources.filter(r => r.type === 'WATER_PUMP');

  return (
    <div className="flex-1 p-4 bg-[#040814] overflow-y-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-slate-950/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-1">
            <Truck className="w-4 h-4 text-cyan-400" />
            <span>AI EMERGENCY RESOURCE COMMAND & DISPATCH</span>
          </div>
          <h2 className="text-xl font-bold font-hud text-slate-100">
            INTELLIGENT RESOURCE ALLOCATION & FLEET OPTIMIZER
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Optimizes rescue boats, high-volume pumps, NDRF platoons, and trauma ambulances by severity, population exposure, and ingress time.
          </p>
        </div>

        {/* Optimize All Resources Button */}
        <button
          onClick={optimizeAllResources}
          className="py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-cyan-950"
        >
          <Sparkles className="w-4 h-4" />
          <span>OPTIMIZE ALL RESOURCES (AI BATCH)</span>
        </button>
      </div>

      {/* KPI Counters Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] font-mono text-slate-500 block uppercase">Total Fleet</span>
          <span className="text-2xl font-hud font-bold text-slate-100">{total}</span>
        </div>
        <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-3">
          <span className="text-[10px] font-mono text-emerald-400 block uppercase">Available</span>
          <span className="text-2xl font-hud font-bold text-emerald-300">{available}</span>
        </div>
        <div className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-3">
          <span className="text-[10px] font-mono text-cyan-400 block uppercase">En Route</span>
          <span className="text-2xl font-hud font-bold text-cyan-300">{enRoute}</span>
        </div>
        <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-3">
          <span className="text-[10px] font-mono text-amber-400 block uppercase">Dispatched</span>
          <span className="text-2xl font-hud font-bold text-amber-300">{dispatched}</span>
        </div>
        <div className="bg-slate-950/80 border border-blue-500/30 rounded-xl p-3">
          <span className="text-[10px] font-mono text-blue-400 block uppercase">On Scene</span>
          <span className="text-2xl font-hud font-bold text-blue-300">{onScene}</span>
        </div>
      </div>

      {/* AI Recommended Deployment Card */}
      <div className="p-4 bg-gradient-to-r from-cyan-950/40 via-slate-950 to-slate-950 border border-cyan-500/40 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              AI RECOMMENDED TARGET DISPATCH: RIVERSIDE WARD (CRITICAL)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/40">
              PRIORITY SCORE: 94/100
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">
              2 Rescue Teams (NDRF)
            </span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">
              1 Trauma Ambulance (A-04)
            </span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">
              2 Dewatering Pumps (MP-01, MP-02)
            </span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">
              1 Swift Inflatable Boat (B-01)
            </span>
          </div>

          <div className="text-xs text-slate-400 font-sans">
            Reason: 8,420 people exposed • Rapidly rising water (+63%) • Jeevan Raksha hospital access route threatened • Ingress time deteriorating.
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              deployResource('res-ndrf-02', 'inc-2048');
              deployResource('res-amb-04', 'inc-2048');
              deployResource('res-pump-01', 'inc-2048');
              deployResource('res-boat-01', 'inc-2048');
            }}
            className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-mono text-xs font-bold transition-all shadow-lg shadow-emerald-950"
          >
            APPROVE DEPLOYMENT (ANIMATE UNITS)
          </button>
        </div>
      </div>

      {/* Fleet Resource Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {resources.map(res => {
          const isSelected = selectedResource?.id === res.id;
          const isAvailable = res.status === 'AVAILABLE';

          return (
            <div
              key={res.id}
              onClick={() => setSelectedResource(res)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-950/60'
                  : 'bg-slate-950/80 border-slate-850 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-semibold text-slate-100 text-sm">{res.callsign}</h4>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    Base: {res.baseStation}
                  </div>
                </div>

                <span
                  className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                    isAvailable
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : res.status === 'EN_ROUTE'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  }`}
                >
                  {res.status}
                </span>
              </div>

              <div className="text-xs font-mono text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span>Capacity / Spec:</span>
                  <span className="text-slate-200">{res.capacityOrPower}</span>
                </div>
                <div className="flex justify-between">
                  <span>Crew:</span>
                  <span className="text-slate-200">{res.crewCount} personnel</span>
                </div>
                {res.etaMinutes && (
                  <div className="flex justify-between text-cyan-400">
                    <span>ETA to Target:</span>
                    <span className="font-bold">{res.etaMinutes} min</span>
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-850">
                {isAvailable ? (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      deployResource(res.id, 'inc-2048');
                    }}
                    className="w-full py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>DISPATCH TO RIVERSIDE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-[11px] font-mono text-slate-500">
                    Active mission in progress • Live telemetry tracking
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
