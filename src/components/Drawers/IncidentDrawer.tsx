import React, { useState } from 'react';
import { useCommand } from '../../context/CommandContext';
import { X, CheckCircle, Sparkles, AlertTriangle, ArrowRight, ShieldCheck, MapPin, Camera } from 'lucide-react';

export const IncidentDrawer: React.FC = () => {
  const {
    selectedIncident,
    selectedIncidentDrawerOpen,
    setSelectedIncidentDrawerOpen,
    verifyIncident,
    deployResource,
  } = useCommand();

  const [verifying, setVerifying] = useState(false);

  if (!selectedIncidentDrawerOpen || !selectedIncident) return null;

  const handleVerify = async () => {
    setVerifying(true);
    await verifyIncident(selectedIncident.id);
    setVerifying(false);
  };

  const isVerified = selectedIncident.status === 'VERIFIED';

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-[#244A65]/12 shadow-2xl flex flex-col justify-between select-none animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-6 border-b border-[#244A65]/10 flex items-start justify-between bg-[#F6F9FB]">
        <div>
          <span className="text-xs font-bold text-[#1677C8] uppercase tracking-wider block mb-1">
            Report #{selectedIncident.code} • {selectedIncident.source.replace('_', ' ')}
          </span>
          <h2 className="text-lg font-bold text-[#12324A]">
            {selectedIncident.title}
          </h2>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`text-xs px-2.5 py-0.5 rounded-md font-bold border ${
                selectedIncident.severity === 'CRITICAL'
                  ? 'bg-[#DC4545]/10 text-[#DC4545] border-[#DC4545]/25'
                  : 'bg-[#ED7A2C]/10 text-[#ED7A2C] border-[#ED7A2C]/25'
              }`}
            >
              {selectedIncident.severity}
            </span>
            <span className="text-xs text-[#607487]">• {selectedIncident.timestamp}</span>
          </div>
        </div>

        <button
          onClick={() => setSelectedIncidentDrawerOpen(false)}
          className="p-2 rounded-xl text-[#607487] hover:text-[#12324A] hover:bg-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-white text-xs">
        {/* Verification Status Card */}
        <div className="p-4 rounded-xl bg-[#F6F9FB] border border-[#244A65]/10 flex items-center justify-between">
          <div>
            <span className="text-[#607487] block font-medium">Cross-Verification State</span>
            <span className="text-sm font-bold text-[#12324A] mt-0.5 block">
              {isVerified ? 'Verified by Multi-Sensor Fusion' : 'Awaiting Operator Confirmation'}
            </span>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
              isVerified
                ? 'bg-[#20A464]/10 text-[#20A464] border border-[#20A464]/25'
                : 'bg-[#E5A824]/10 text-[#E5A824] border border-[#E5A824]/25'
            }`}
          >
            {isVerified ? 'CONFIRMED' : 'UNVERIFIED'}
          </span>
        </div>

        {/* Incident Description */}
        <div className="space-y-1.5">
          <span className="font-bold text-[#12324A] uppercase tracking-wider block">
            Situational Details
          </span>
          <p className="text-xs text-[#163047] leading-relaxed p-3.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8">
            {selectedIncident.notes || selectedIncident.title}
          </p>
        </div>

        {/* Verification Evidence */}
        <div className="space-y-2">
          <span className="font-bold text-[#12324A] uppercase tracking-wider block">
            Cross-Verification Evidence
          </span>
          <div className="space-y-1.5">
            <div className="p-2.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8 flex items-center justify-between text-xs">
              <span className="text-[#163047] font-medium">IoT Sensor Match</span>
              <span className="text-[#1677C8] font-bold">{selectedIncident.evidence.iotSensorMatch}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8 flex items-center justify-between text-xs">
              <span className="text-[#163047] font-medium">Citizen Reports Triangulated</span>
              <span className="text-[#12324A] font-bold">{selectedIncident.evidence.matchingCitizenReports} reports</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8 flex items-center justify-between text-xs">
              <span className="text-[#163047] font-medium">Location Confidence</span>
              <span className="text-[#20A464] font-bold">{selectedIncident.evidence.locationConfidencePercent}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8 flex items-center justify-between text-xs">
              <span className="text-[#163047] font-medium">CCTV AI Vision Verification</span>
              <span className={`font-bold ${selectedIncident.evidence.cctvVerified ? 'text-[#20A464]' : 'text-[#8A9CAA]'}`}>
                {selectedIncident.evidence.cctvVerified ? 'CONFIRMED' : 'PENDING'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-[#244A65]/10 bg-[#F6F9FB] space-y-2.5">
        {!isVerified && (
          <button
            onClick={handleVerify}
            disabled={verifying}
            className="w-full py-3 px-4 bg-[#1677C8] hover:bg-[#12324A] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xs shadow-[#1677C8]/20 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{verifying ? 'Verifying with Sensors...' : 'Verify Incident'}</span>
          </button>
        )}

        <button
          onClick={() => {
            deployResource('res-ndrf-01', selectedIncident.id);
            setSelectedIncidentDrawerOpen(false);
          }}
          className="w-full py-3 px-4 bg-white hover:bg-[#EDF3F7] text-[#12324A] border border-[#244A65]/12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span>Dispatch Nearest Response Unit</span>
          <ArrowRight className="w-4 h-4 text-[#1677C8]" />
        </button>
      </div>
    </div>
  );
};
