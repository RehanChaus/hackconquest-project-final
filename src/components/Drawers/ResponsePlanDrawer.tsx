import React, { useState } from 'react';
import { useCommand } from '../../context/CommandContext';
import { X, CheckCircle, Clock, Sparkles, Check, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

export const ResponsePlanDrawer: React.FC = () => {
  const {
    responsePlanModalOpen,
    setResponsePlanModalOpen,
    approveAllActionPlans,
    deployResource,
    sendAlertNotification,
  } = useCommand();

  const [approved, setApproved] = useState(false);

  if (!responsePlanModalOpen) return null;

  const handleApproveAll = () => {
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
    setApproved(true);
    setTimeout(() => {
      setResponsePlanModalOpen(false);
      setApproved(false);
    }, 1800);
  };

  const timelineItems = [
    {
      time: 'NOW',
      action: 'Close Riverside Underpass & Bund Weir Traffic',
      reason: 'Water sensor WS-14 at +63% rate of rise; predicted road submergence in 12m',
      status: 'Ready for authorization',
    },
    {
      time: '+5 MIN',
      action: 'Deploy NDRF Rescue Teams 2 & 5 with Inflatable Boats',
      reason: '42 vulnerable elderly residents requiring boat-assisted evacuation',
      status: 'Units staged',
    },
    {
      time: '+10 MIN',
      action: 'Open Shelter S-04 (COEP Engineering Campus)',
      reason: 'Capacity 1,200 beds ready; high-ground relief corridor verified safe',
      status: 'Keyholder notified',
    },
    {
      time: '+15 MIN',
      action: 'Broadcast Trilingual Cell-Broadcast Alert',
      reason: 'English, Hindi, Marathi geo-targeted push to 8,420 registered devices in Riverside sector',
      status: 'Draft queued',
    },
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white border-l border-[#244A65]/12 shadow-2xl flex flex-col justify-between select-none animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-6 border-b border-[#244A65]/10 flex items-start justify-between bg-[#F6F9FB]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#1677C8]/10 text-[#1677C8] border border-[#1677C8]/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#1677C8] uppercase tracking-wider block">
              Multi-Agency Orchestration
            </span>
            <h2 className="text-lg font-bold text-[#12324A]">
              AI Emergency Response Plan
            </h2>
          </div>
        </div>

        <button
          onClick={() => setResponsePlanModalOpen(false)}
          className="p-2 rounded-xl text-[#607487] hover:text-[#12324A] hover:bg-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body: Action Timeline */}
      <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-white">
        <div className="p-3.5 rounded-xl bg-[#EDF3F7] border border-[#244A65]/10 text-xs text-[#163047] leading-relaxed">
          <span className="font-bold text-[#1677C8]">Adaptive Mitigation Sequence:</span> Generated from hydrologic catchment forecasts, road vulnerability metrics, and available civic assets.
        </div>

        <div className="space-y-4">
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8 hover:border-[#1677C8]/30 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1677C8] bg-white px-2.5 py-0.5 rounded-md border border-[#244A65]/10">
                  {item.time}
                </span>
                <span className="text-[11px] font-medium text-[#607487]">
                  {item.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-[#12324A]">
                {item.action}
              </h4>

              <p className="text-xs text-[#607487] leading-relaxed">
                {item.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer: Approve Button */}
      <div className="p-6 border-t border-[#244A65]/10 bg-[#F6F9FB] space-y-3">
        <button
          onClick={handleApproveAll}
          disabled={approved}
          className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            approved
              ? 'bg-[#20A464] text-white'
              : 'bg-[#1677C8] hover:bg-[#12324A] text-white shadow-xs shadow-[#1677C8]/25'
          }`}
        >
          {approved ? (
            <>
              <Check className="w-4 h-4" />
              <span>All 4 Incident Actions Authorized & Dispatched</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Authorize & Execute All 4 Response Protocols</span>
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-[#8A9CAA]">
          Instant dispatch triggers sirens, traffic signals, SMS gateway, and NDRF fleet tablets.
        </p>
      </div>
    </div>
  );
};
