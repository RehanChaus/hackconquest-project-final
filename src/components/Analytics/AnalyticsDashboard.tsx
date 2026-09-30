import React from 'react';
import { useCommand } from '../../context/CommandContext';
import { 
  BarChart2, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ShieldCheck, 
  Zap,
  ArrowRight
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { zones } = useCommand();

  return (
    <div className="flex-1 p-6 bg-[#EDF3F7] overflow-y-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#1677C8] uppercase tracking-wider">
              Operational Benchmarks
            </span>
            <span className="text-[#8A9CAA]">•</span>
            <span className="text-xs text-[#607487]">Impact Assessment & Latency Compression</span>
          </div>
          <h2 className="text-2xl font-bold text-[#12324A] tracking-tight">
            Emergency Performance Analytics
          </h2>
          <p className="text-xs sm:text-sm text-[#607487] mt-0.5">
            Quantifiable time compression in detection, multi-sensor verification, and safe corridor routing.
          </p>
        </div>
        <div className="text-xs px-3 py-1 rounded-full bg-white text-[#1677C8] border border-[#244A65]/10 font-semibold shadow-2xs self-start sm:self-auto">
          ● Validated Scenario Metrics
        </div>
      </div>

      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#244A65]/10 shadow-xs">
          <span className="text-xs font-bold text-[#607487] uppercase tracking-wider block mb-1">
            Prediction Lead Time
          </span>
          <div className="text-3xl font-extrabold text-[#1677C8]">
            +47 min
          </div>
          <p className="text-xs text-[#607487] mt-2 font-medium">
            Advance warning before localized water crest
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#244A65]/10 shadow-xs">
          <span className="text-xs font-bold text-[#607487] uppercase tracking-wider block mb-1">
            Incident Verification
          </span>
          <div className="text-3xl font-extrabold text-[#20A464]">
            1.4 sec
          </div>
          <p className="text-xs text-[#607487] mt-2 font-medium">
            vs 45 min manual field telephone cross-check
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#244A65]/10 shadow-xs">
          <span className="text-xs font-bold text-[#607487] uppercase tracking-wider block mb-1">
            Mean Dispatch Time
          </span>
          <div className="text-3xl font-extrabold text-[#12324A]">
            3.2 min
          </div>
          <p className="text-xs text-[#607487] mt-2 font-medium">
            Automated nearest asset matching & dispatch
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#244A65]/10 shadow-xs">
          <span className="text-xs font-bold text-[#607487] uppercase tracking-wider block mb-1">
            Lives Protected Exposure
          </span>
          <div className="text-3xl font-extrabold text-[#1677C8]">
            284,500
          </div>
          <p className="text-xs text-[#607487] mt-2 font-medium">
            Citizens covered by precision micro-zoning
          </p>
        </div>
      </div>

      {/* Comparison: Traditional Municipal Workflow vs FloodShield AI */}
      <div className="bg-white rounded-2xl border border-[#244A65]/10 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#12324A] uppercase tracking-wider">
            Operational Protocol Comparison
          </h3>
          <span className="text-xs font-semibold text-[#20A464]">88% Average Latency Reduction</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Traditional Manual Approach */}
          <div className="p-5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/10 space-y-3">
            <span className="text-xs font-bold text-[#DC4545] uppercase tracking-wider">
              Traditional Emergency Response
            </span>
            <div className="space-y-2 text-xs text-[#607487]">
              <div className="flex items-start gap-2">
                <span className="text-[#DC4545] font-bold">✕</span>
                <span>Reactive detection after citizen phone calls flood the 112 switchboard</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#DC4545] font-bold">✕</span>
                <span>Manual dispatching via paper manifests and police radio frequencies</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#DC4545] font-bold">✕</span>
                <span>Static evacuation routes without real-time underpass water monitoring</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#DC4545] font-bold">✕</span>
                <span>Delayed mass SMS warnings with broad non-localized boundaries</span>
              </div>
            </div>
          </div>

          {/* FloodShield AI Approach */}
          <div className="p-5 rounded-xl bg-[#EDF3F7] border border-[#1677C8]/25 space-y-3">
            <span className="text-xs font-bold text-[#1677C8] uppercase tracking-wider">
              FloodShield AI Autonomous Coordination
            </span>
            <div className="space-y-2 text-xs text-[#12324A]">
              <div className="flex items-start gap-2">
                <span className="text-[#20A464] font-bold">✓</span>
                <span>47-minute advance predictive lead time using Doppler radar & neural hydrography</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#20A464] font-bold">✓</span>
                <span>1.4-second multi-sensor verification fusing IoT gauges and traffic CCTV cameras</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#20A464] font-bold">✓</span>
                <span>Dynamic real-time rerouting around flash flood inundated bottlenecks</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#20A464] font-bold">✓</span>
                <span>Multilingual targeted cell broadcasts reaching only citizens inside sector polygons</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
