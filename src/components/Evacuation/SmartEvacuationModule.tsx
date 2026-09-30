import React from 'react';
import { useCommand } from '../../context/CommandContext';
import { 
  Navigation, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap, 
  RotateCcw, 
  Flame, 
  Compass,
  ArrowRight,
  ShieldAlert,
  Building
} from 'lucide-react';

export const SmartEvacuationModule: React.FC = () => {
  const {
    routes,
    selectedRoute,
    setSelectedRoute,
    isFlashFloodTriggered,
    triggerFlashFlood,
    resetDynamicRoute,
    isRecalculatingRoute,
    shelters,
    zones,
  } = useCommand();

  return (
    <div className="flex-1 p-4 bg-[#040814] overflow-y-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-slate-950/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-1">
            <Navigation className="w-4 h-4 text-cyan-400" />
            <span>AI DYNAMIC EVACUATION DISPATCH & ROUTING ENGINE</span>
          </div>
          <h2 className="text-xl font-bold font-hud text-slate-100">
            PREDICTIVE FLOOD-AWARE SAFE EVACUATION CORRIDORS
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Routes calculated with dynamic A* considering hydrodynamic water level forecasts, bridge stress telemetry, and road bottlenecks.
          </p>
        </div>

        {/* Dynamic Reroute Trigger Button (Wow Moment) */}
        <div className="flex items-center gap-2">
          {!isFlashFloodTriggered ? (
            <button
              onClick={triggerFlashFlood}
              className="py-2.5 px-4 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-950/50 animate-pulse"
            >
              <Flame className="w-4 h-4" />
              <span>SIMULATE FLASH FLOOD (TRIGGER REROUTE)</span>
            </button>
          ) : (
            <button
              onClick={resetDynamicRoute}
              className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET ROUTE SIMULATION</span>
            </button>
          )}
        </div>
      </div>

      {/* Reroute Alert Banner if triggered */}
      {isFlashFloodTriggered && (
        <div className="p-4 bg-red-950/70 border-2 border-red-500 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-7 h-7 text-red-400 animate-bounce shrink-0" />
            <div>
              <div className="font-hud font-bold text-red-300 text-base">
                {isRecalculatingRoute ? '⚠ ROUTE COMPROMISED — RECALCULATING ALTERNATE CORRIDOR...' : '✓ RECALCULATION COMPLETE: ROUTE D ACTIVATED'}
              </div>
              <div className="text-xs text-red-300/80 font-mono mt-0.5">
                Sudden surge breached Riverside Underpass. Dynamic Dijkstra bypassed low-lying sump in 1.8 seconds.
              </div>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/40 rounded-lg">
            ZERO CASUALTY PROTOCOL ACTIVE
          </span>
        </div>
      )}

      {/* Main Grid: Route Options & Detailed Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 5 Cols: Routes List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            CALCULATED EVACUATION PATHS
          </div>

          <div className="space-y-2.5">
            {routes.map(r => {
              const isSelected = selectedRoute?.id === r.id;
              const isBlocked = r.status === 'BLOCKED';
              const isSafe = r.status === 'SAFE';

              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRoute(r)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-950/60'
                      : 'bg-slate-950/70 border-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="font-hud font-bold text-slate-100 text-sm">{r.name}</span>
                      <div className="text-xs font-mono text-slate-400 mt-0.5">
                        {r.sourceZone} → {r.destinationShelter}
                      </div>
                    </div>

                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg ${
                        isSafe
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : isBlocked || r.status === 'UNSAFE'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 text-[10px] block">ETA</span>
                      <span className="font-bold text-slate-200 text-sm">{r.durationMin} minutes</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Safety Rating</span>
                      <span
                        className={`font-bold text-sm ${
                          r.safetyScore >= 80 ? 'text-emerald-400' : r.safetyScore >= 50 ? 'text-amber-400' : 'text-red-400'
                        }`}
                      >
                        {r.safetyScore}%
                      </span>
                    </div>
                  </div>

                  {/* Warning snippet if unsafe */}
                  {r.riskFactors && r.riskFactors.length > 0 && (
                    <div className="mt-2 text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                      <span className={r.status === 'SAFE' ? 'text-emerald-400' : 'text-red-400'}>
                        {r.status === 'SAFE' ? '✓' : '⚠'}
                      </span>
                      <span className="truncate">{r.riskFactors[0]}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 7 Cols: "Why Route C?" / "Why Route D?" Explainability Dossier */}
        <div className="lg:col-span-7 bg-slate-950/90 border border-cyan-500/30 rounded-2xl p-5 shadow-2xl space-y-4">
          {selectedRoute ? (
            <>
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      SELECTED CORRIDOR ANALYSIS
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      SAFETY SCORE: {selectedRoute.safetyScore}%
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100">{selectedRoute.name}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Estimated Transit Time: {selectedRoute.durationMin} minutes • Destination: {selectedRoute.destinationShelter}
                  </p>
                </div>
              </div>

              {/* Explainable Reasons */}
              {selectedRoute.whyRecommended && selectedRoute.whyRecommended.length > 0 && (
                <div className="p-4 bg-cyan-950/20 border border-cyan-500/40 rounded-xl space-y-2">
                  <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wide flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    WHY THIS ROUTE IS AI-RECOMMENDED
                  </h4>
                  <div className="space-y-1.5 text-xs text-slate-300 font-sans">
                    {selectedRoute.whyRecommended.map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold mt-0.5">✓</span>
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Risk Factors / Hazards */}
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  KNOWN RISKS & BOTTLENECK AUDIT
                </h4>
                <div className="space-y-1.5 text-xs font-mono text-slate-400">
                  {selectedRoute.riskFactors.map((risk, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold mt-0.5">⚠</span>
                      <span>{risk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Shelter Capacity & Preparedness */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-teal-400" />
                    TARGET SHELTER STATUS: {selectedRoute.destinationShelter}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">
                    ONLINE & READY
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono text-slate-300">
                  <div className="bg-slate-950 p-2 rounded border border-slate-850">
                    <span className="text-slate-500 text-[10px] block">Available Beds</span>
                    <span className="font-bold text-teal-300">762 vacant</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-850">
                    <span className="text-slate-500 text-[10px] block">Medical Bay</span>
                    <span className="font-bold text-teal-300">Doctor on site</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-850">
                    <span className="text-slate-500 text-[10px] block">Backup Power</span>
                    <span className="font-bold text-teal-300">Dual Diesel Genset</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-slate-500 text-xs font-mono">
              Select an evacuation corridor on the left to inspect hydro-telemetry and safety decomposition.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
