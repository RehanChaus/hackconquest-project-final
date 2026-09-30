import React, { useState } from 'react';
import { useCommand } from '../../context/CommandContext';
import { GisCommandMap } from '../Map/GisCommandMap';
import { 
  Navigation, 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Check, 
  RotateCcw,
  Flame,
  ShieldCheck,
  Compass
} from 'lucide-react';

export const ResponsePage: React.FC = () => {
  const {
    routes,
    selectedRoute,
    setSelectedRoute,
    isFlashFloodTriggered,
    triggerFlashFlood,
    resetDynamicRoute,
    isRecalculatingRoute,
    resources,
    deployResource,
  } = useCommand();

  const [activeSubTab, setActiveSubTab] = useState<'evacuation' | 'resources'>('evacuation');
  const [deploymentApproved, setDeploymentApproved] = useState(false);
  const [evacuationStarted, setEvacuationStarted] = useState(false);

  // Grouped resources for the clean table
  const resourceSummary = [
    { type: 'Ambulances', available: 7, deployed: 5 },
    { type: 'NDRF Rescue Teams', available: 4, deployed: 4 },
    { type: 'Inflatable Boats', available: 3, deployed: 3 },
    { type: 'Heavy Dewatering Pumps', available: 6, deployed: 4 },
  ];

  const handleApproveDeployment = () => {
    deployResource('res-ndrf-02', 'inc-2048');
    deployResource('res-amb-04', 'inc-2048');
    deployResource('res-pump-01', 'inc-2048');
    deployResource('res-boat-01', 'inc-2048');
    setDeploymentApproved(true);
  };

  return (
    <div className="flex-1 p-6 bg-[#EDF3F7] overflow-y-auto space-y-6 select-none">
      {/* Top Header & Clean Tab Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#1677C8] uppercase tracking-wider">
              Tactical Response Operations
            </span>
            <span className="text-[#8A9CAA]">•</span>
            <span className="text-xs text-[#607487]">Adaptive Routing & Resource Allocation</span>
          </div>
          <h2 className="text-2xl font-bold text-[#12324A] tracking-tight">
            Evacuation Corridors & Fleet Logistics
          </h2>
          <p className="text-xs sm:text-sm text-[#607487] mt-0.5">
            Dynamic real-time rerouting around flash flood inundated underpasses and optimal staging of rescue units.
          </p>
        </div>

        {/* Tab Switcher: Evacuation | Resources */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-[#244A65]/10 shadow-2xs text-xs">
          <button
            onClick={() => setActiveSubTab('evacuation')}
            className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeSubTab === 'evacuation'
                ? 'bg-[#1677C8] text-white shadow-xs'
                : 'text-[#607487] hover:text-[#12324A]'
            }`}
          >
            Evacuation Corridors
          </button>
          <button
            onClick={() => setActiveSubTab('resources')}
            className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeSubTab === 'resources'
                ? 'bg-[#1677C8] text-white shadow-xs'
                : 'text-[#607487] hover:text-[#12324A]'
            }`}
          >
            Resource Allocation
          </button>
        </div>
      </div>

      {/* EVACUATION TAB CONTENT */}
      {activeSubTab === 'evacuation' && (
        <div className="space-y-6">
          {/* Corridor Selection & Dynamic Reroute Control */}
          <div className="p-4 rounded-2xl bg-white border border-[#244A65]/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-[#8A9CAA] block text-[11px] font-semibold uppercase">Origin Zone</span>
                <span className="font-bold text-[#12324A]">Riverside Ward (Lowland)</span>
              </div>
              <span className="text-[#8A9CAA] font-bold">→</span>
              <div>
                <span className="text-[#8A9CAA] block text-[11px] font-semibold uppercase">Destination Shelter</span>
                <span className="font-bold text-[#12324A]">Shelter S-04 (COEP Engineering Campus)</span>
              </div>
            </div>

            {/* Wow Moment Trigger: Simulate Road Flooding */}
            <div className="flex items-center gap-2">
              {!isFlashFloodTriggered ? (
                <button
                  onClick={triggerFlashFlood}
                  className="py-2.5 px-4 bg-[#DC4545]/10 hover:bg-[#DC4545]/20 border border-[#DC4545]/30 text-[#DC4545] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Simulate Road Underpass Flooding</span>
                </button>
              ) : (
                <button
                  onClick={resetDynamicRoute}
                  className="py-2.5 px-4 bg-[#EDF3F7] hover:bg-[#DCE7EF] text-[#12324A] border border-[#244A65]/12 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Dynamic Route Simulation</span>
                </button>
              )}
            </div>
          </div>

          {/* Reroute Alert Notification */}
          {isFlashFloodTriggered && (
            <div className="p-4 rounded-xl bg-white border border-[#DC4545]/30 text-xs flex items-center justify-between gap-4 shadow-xs animate-in fade-in">
              <div>
                <div className="font-bold text-[#DC4545]">
                  {isRecalculatingRoute ? 'Route C Compromised by Underpass Overflow' : 'Dynamic Safe Route Found'}
                </div>
                <div className="text-[#607487] mt-0.5">
                  {isRecalculatingRoute
                    ? 'Sensors detected 1.2m water at JM Road Underpass. Computing elevated safe detour...'
                    : 'Route D via Deccan Elevated Flyover activated. Transit: 13 min, Survivability Score: 89%.'}
                </div>
              </div>
              <span className="text-xs font-bold text-[#20A464] bg-[#20A464]/10 px-3 py-1 rounded-full border border-[#20A464]/20">
                {isRecalculatingRoute ? 'Recalculating...' : '89% Safety Verified'}
              </span>
            </div>
          )}

          {/* Main Grid: Routes Breakdown & Hero Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
            {/* Left: 3 Routes & Recommendation (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Route C (Recommended initially) */}
              <div
                onClick={() => setSelectedRoute(routes.find(r => r.id === 'route-c') || null)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedRoute?.id === 'route-c' && !isFlashFloodTriggered
                    ? 'bg-white border-[#1677C8] shadow-md ring-2 ring-[#1677C8]/20'
                    : 'bg-white border-[#244A65]/10 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#1677C8] uppercase tracking-wider">
                    Route C • Recommended Corridor
                  </span>
                  <span className="text-xs font-bold text-[#20A464]">
                    92% Safety
                  </span>
                </div>
                <div className="text-base font-bold text-[#12324A] mb-2">
                  11 min transit time
                </div>
                <div className="space-y-1.5 text-xs text-[#607487]">
                  <div className="flex items-center gap-1.5 text-[#163047]">
                    <span className="text-[#20A464] font-bold">✓</span>
                    <span>Elevated topography avoids water buildup</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#163047]">
                    <span className="text-[#20A464] font-bold">✓</span>
                    <span>Synchronized green light traffic priority</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#163047]">
                    <span className="text-[#20A464] font-bold">✓</span>
                    <span>COEP Shelter has 1,200 available beds</span>
                  </div>
                </div>
              </div>

              {/* Route A (Blocked) */}
              <div
                onClick={() => setSelectedRoute(routes.find(r => r.id === 'route-a') || null)}
                className="p-4 rounded-2xl bg-white border border-[#244A65]/10 cursor-pointer hover:border-[#DC4545]/40 transition-colors shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#DC4545]">Route A (Direct Underpass)</span>
                  <span className="text-xs text-[#DC4545] font-bold bg-[#DC4545]/10 px-2 py-0.5 rounded">BLOCKED</span>
                </div>
                <div className="text-xs text-[#607487] mt-1">
                  8 min • Flooding predicted in 12 min (Underpass depth 1.2m)
                </div>
              </div>

              {/* Route B (Moderate Risk) */}
              <div
                onClick={() => setSelectedRoute(routes.find(r => r.id === 'route-b') || null)}
                className="p-4 rounded-2xl bg-white border border-[#244A65]/10 cursor-pointer hover:border-[#E5A824]/40 transition-colors shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E5A824]">Route B (Commercial Spine)</span>
                  <span className="text-xs text-[#E5A824] font-bold bg-[#E5A824]/10 px-2 py-0.5 rounded">MODERATE</span>
                </div>
                <div className="text-xs text-[#607487] mt-1">
                  14 min • Heavy commercial traffic gridlock + curb water
                </div>
              </div>

              {/* Start Evacuation Plan CTA */}
              <button
                onClick={() => setEvacuationStarted(true)}
                className="w-full py-3.5 px-4 bg-[#1677C8] hover:bg-[#12324A] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs shadow-[#1677C8]/25 cursor-pointer"
              >
                <span>{evacuationStarted ? 'Evacuation Plan Broadcast Active' : 'Authorize Evacuation Protocol'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Large Evacuation Map (8 cols) */}
            <div className="lg:col-span-8 h-[520px]">
              <GisCommandMap />
            </div>
          </div>
        </div>
      )}

      {/* RESOURCES TAB CONTENT */}
      {activeSubTab === 'resources' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Clean Resources Table (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#244A65]/10 p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#12324A] uppercase tracking-wider">
                  Emergency Fleet Readiness
                </h3>
                <span className="text-xs font-semibold text-[#1677C8]">24 Total Units</span>
              </div>

              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#244A65]/10 text-[#607487] bg-[#F6F9FB]">
                    <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[11px]">Asset Classification</th>
                    <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[11px] text-right">Available</th>
                    <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[11px] text-right">Deployed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#244A65]/8 text-[#163047]">
                  {resourceSummary.map(r => (
                    <tr key={r.type} className="hover:bg-[#F6F9FB] transition-colors">
                      <td className="py-3.5 px-3.5 font-bold text-[#12324A]">{r.type}</td>
                      <td className="py-3.5 px-3.5 text-right text-[#20A464] font-bold">{r.available}</td>
                      <td className="py-3.5 px-3.5 text-right text-[#607487] font-medium">{r.deployed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right: Highlighted AI Recommendation Card (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-[#1677C8]/25 rounded-2xl p-6 flex flex-col justify-between shadow-xs space-y-5">
              <div className="space-y-3.5">
                <span className="text-xs font-bold text-[#1677C8] uppercase tracking-wider block flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#1677C8]" />
                  Optimization Recommendation
                </span>

                <h4 className="text-base font-bold text-[#12324A]">
                  Riverside Ward Catchment requires priority asset reinforcement.
                </h4>

                <div className="p-4 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8 text-xs text-[#163047] space-y-1.5">
                  <div className="text-[#1677C8] text-[11px] font-bold uppercase mb-1">Recommended Dispatch Staging:</div>
                  <div>• 2 NDRF Rescue Teams with Sonar Equipment</div>
                  <div>• 1 Advanced Life Support (ALS) Ambulance</div>
                  <div>• 1 High-Capacity Flood Rescue Boat</div>
                  <div>• 2 Heavy 150HP Dewatering Pumps</div>
                </div>

                <div className="text-xs text-[#607487] space-y-1 pt-1">
                  <div className="text-[#12324A] font-bold">Attribution Factors:</div>
                  <div>✓ 8,420 residents in low-lying river setback</div>
                  <div>✓ Rapid water level surge (+63% at gauge WS-14)</div>
                  <div>✓ Hospital emergency corridor preservation</div>
                </div>
              </div>

              {/* Approval Button & Success State */}
              <div>
                {deploymentApproved ? (
                  <div className="py-3 px-4 bg-[#20A464]/10 border border-[#20A464]/30 text-[#20A464] rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Assets dispatched to Bund Garden & Riverside Ward.</span>
                  </div>
                ) : (
                  <button
                    onClick={handleApproveDeployment}
                    className="w-full py-3.5 px-4 bg-[#1677C8] hover:bg-[#12324A] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs shadow-[#1677C8]/25 cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Authorize Recommended Staging</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
