import React from 'react';
import { useCommand } from '../../context/CommandContext';
import { X, ArrowRight, Activity, ShieldCheck, Droplets, Users, Compass, AlertTriangle } from 'lucide-react';

export const ZoneDrawer: React.FC = () => {
  const {
    selectedZone,
    selectedZoneDrawerOpen,
    setSelectedZoneDrawerOpen,
    setResponsePlanModalOpen,
    setExplainableModalZone,
  } = useCommand();

  if (!selectedZoneDrawerOpen || !selectedZone) return null;

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-[#DC4545] bg-[#DC4545]/10 border-[#DC4545]/25';
      case 'HIGH':
        return 'text-[#ED7A2C] bg-[#ED7A2C]/10 border-[#ED7A2C]/25';
      case 'MODERATE':
        return 'text-[#E5A824] bg-[#E5A824]/10 border-[#E5A824]/25';
      default:
        return 'text-[#20A464] bg-[#20A464]/10 border-[#20A464]/25';
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-[#244A65]/12 shadow-2xl flex flex-col justify-between select-none animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-6 border-b border-[#244A65]/10 flex items-start justify-between bg-[#F6F9FB]">
        <div>
          <span className="text-xs font-bold text-[#1677C8] uppercase tracking-wider block mb-1">
            {selectedZone.code} • Catchment Intelligence
          </span>
          <h2 className="text-xl font-bold text-[#12324A]">
            {selectedZone.name}
          </h2>
          <div className="mt-2.5 inline-flex items-center gap-2">
            <span
              className={`text-xs px-2.5 py-1 rounded-lg border font-bold ${getRiskBadge(
                selectedZone.riskLevel
              )}`}
            >
              {selectedZone.riskLevel} Risk • {selectedZone.riskScore} / 100
            </span>
          </div>
        </div>

        <button
          onClick={() => setSelectedZoneDrawerOpen(false)}
          className="p-2 rounded-xl text-[#607487] hover:text-[#12324A] hover:bg-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm bg-white">
        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8">
            <span className="text-xs text-[#607487] block mb-1 font-medium">Flooding Inundation</span>
            <span className="text-lg font-bold text-[#12324A]">
              ~{selectedZone.predictedFloodTimeMin} minutes
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8">
            <span className="text-xs text-[#607487] block mb-1 font-medium">Population Exposed</span>
            <span className="text-lg font-bold text-[#DC4545]">
              {selectedZone.populationAtRisk.toLocaleString()}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8">
            <span className="text-xs text-[#607487] block mb-1 font-medium">Precipitation Rate</span>
            <span className="text-lg font-bold text-[#1677C8]">
              {selectedZone.rainfall} mm/hr
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8">
            <span className="text-xs text-[#607487] block mb-1 font-medium">Drainage Saturation</span>
            <span className="text-lg font-bold text-[#12324A]">
              {selectedZone.drainageCapacity}% capacity
            </span>
          </div>
        </div>

        {/* Explainable AI Attribution Preview */}
        <div className="space-y-3 p-4 rounded-2xl bg-[#F6F9FB] border border-[#244A65]/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#12324A] uppercase tracking-wider">
              Primary Threat Drivers
            </span>
            <button
              onClick={() => setExplainableModalZone(selectedZone)}
              className="text-xs text-[#1677C8] hover:underline font-semibold cursor-pointer"
            >
              Deep Analysis →
            </button>
          </div>

          <div className="space-y-2">
            {selectedZone.explainableFactors.map((factor, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#163047] font-medium">{factor.factor}</span>
                  <span className="text-[#1677C8] font-bold">{factor.percentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#EDF3F7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1677C8] rounded-full"
                    style={{ width: `${factor.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Infrastructure in Zone */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#12324A] uppercase tracking-wider block">
            Critical Assets in Sector
          </span>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8 flex items-center justify-between">
              <span className="text-[#163047] font-medium">Hospitals & Clinics</span>
              <span className="text-[#607487] font-semibold">{selectedZone.vulnerability.hospitalsNearby.join(', ')}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8 flex items-center justify-between">
              <span className="text-[#163047] font-medium">Schools / Evacuation Sites</span>
              <span className="text-[#607487] font-semibold">{selectedZone.vulnerability.schoolsNearby.join(', ')}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8 flex items-center justify-between">
              <span className="text-[#163047] font-medium">Vulnerable Residents</span>
              <span className="text-[#DC4545] font-semibold">
                {selectedZone.vulnerability.elderlyCount + selectedZone.vulnerability.childrenCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Footer Actions */}
      <div className="p-6 border-t border-[#244A65]/10 bg-[#F6F9FB] space-y-2.5">
        <button
          onClick={() => {
            setSelectedZoneDrawerOpen(false);
            setResponsePlanModalOpen(true);
          }}
          className="w-full py-3 px-4 bg-[#1677C8] hover:bg-[#12324A] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs shadow-[#1677C8]/20 cursor-pointer"
        >
          <span>Initiate Emergency Plan for {selectedZone.code}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => setSelectedZoneDrawerOpen(false)}
          className="w-full py-2.5 px-4 bg-white hover:bg-[#EDF3F7] text-[#607487] hover:text-[#12324A] border border-[#244A65]/10 rounded-xl text-xs font-medium transition-colors cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
