import React from 'react';
import { useCommand } from '../../context/CommandContext';
import { 
  Activity, 
  X, 
  Brain, 
  Users, 
  Droplets, 
  ShieldAlert, 
  Heart, 
  Building,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export const ExplainableAiModal: React.FC = () => {
  const { explainableModalZone, setExplainableModalZone } = useCommand();

  if (!explainableModalZone) return null;

  const zone = explainableModalZone;

  return (
    <div className="fixed inset-0 z-50 bg-[#12324A]/40 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-2xl bg-white border border-[#244A65]/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 bg-[#F6F9FB] border-b border-[#244A65]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1677C8]/10 text-[#1677C8] border border-[#1677C8]/20">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-[#1677C8] font-bold uppercase tracking-wider block">
                Explainable AI Reasoning (XAI)
              </span>
              <h3 className="font-bold text-[#12324A] text-lg">
                Why is {zone.name} at {zone.riskLevel} Risk?
              </h3>
            </div>
          </div>

          <button
            onClick={() => setExplainableModalZone(null)}
            className="p-2 rounded-xl text-[#607487] hover:text-[#12324A] hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 bg-white">
          {/* Risk Summary Badge */}
          <div className="p-4 rounded-2xl bg-[#F6F9FB] border border-[#DC4545]/30 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#DC4545]">
                NEURAL RISK ASSESSMENT: {zone.riskLevel}
              </div>
              <div className="text-2xl font-extrabold text-[#12324A] mt-0.5">
                {zone.riskScore} <span className="text-sm font-normal text-[#607487]">/ 100 Risk Score</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#607487] block font-medium">Model Certainty</span>
              <span className="text-sm font-bold text-[#20A464]">{zone.confidence}% calibrated</span>
            </div>
          </div>

          {/* Explainable Factor Breakdown */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#12324A] uppercase tracking-wider block">
              Multi-Factor Neural Attribution Breakdown
            </span>
            <div className="space-y-3">
              {zone.explainableFactors.map((factor, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#12324A]">{factor.factor}</span>
                    <span className="font-bold text-[#1677C8]">{factor.percentage}% Impact</span>
                  </div>
                  <div className="h-2 w-full bg-[#EDF3F7] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1677C8] to-[#3B9CE2] rounded-full"
                      style={{ width: `${factor.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-[#607487] leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Demographic & Infrastructure Footprint */}
          <div className="p-4 rounded-2xl bg-[#EDF3F7] border border-[#244A65]/10 space-y-2 text-xs">
            <span className="font-bold text-[#12324A] block">
              Demographic & Social Vulnerability Summary
            </span>
            <p className="text-[#607487] leading-relaxed">
              Sector contains {zone.vulnerability.elderlyCount + zone.vulnerability.childrenCount} elderly and pediatric residents with elevated assistance requirements during evacuation maneuvers. {zone.vulnerability.hospitalsNearby.length} medical facilities are situated within the 500-meter flood setback zone.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-[#F6F9FB] border-t border-[#244A65]/10 flex justify-end">
          <button
            onClick={() => setExplainableModalZone(null)}
            className="py-2.5 px-6 bg-[#1677C8] hover:bg-[#12324A] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Dismiss Reasoning
          </button>
        </div>
      </div>
    </div>
  );
};
