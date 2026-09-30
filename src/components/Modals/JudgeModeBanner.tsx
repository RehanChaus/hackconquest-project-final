import React from 'react';
import { useCommand } from '../../context/CommandContext';
import { Sparkles, ChevronLeft, ChevronRight, X, CheckCircle, ShieldAlert } from 'lucide-react';

export const JudgeModeBanner: React.FC = () => {
  const {
    judgeModeOpen,
    setJudgeModeOpen,
    judgeStep,
    nextJudgeStep,
    prevJudgeStep,
    setJudgeStep,
  } = useCommand();

  if (!judgeModeOpen) return null;

  const steps = [
    {
      num: 1,
      title: 'Problem & Fragmented Data',
      pitch: 'Cities react too late because weather, GIS, drainage, traffic, and citizen reports live in silos.',
      highlight: 'Notice the top telemetry bar fusing 7 live data sources into one unified command center.',
    },
    {
      num: 2,
      title: 'Predictive Neural Hydrology',
      pitch: 'FloodShield AI calculates risk (Hazard × Exposure × Vulnerability) 47 minutes before flooding happens.',
      highlight: 'Click "WHY THIS AREA IS HIGH RISK?" to demonstrate transparent Explainable AI reasoning.',
    },
    {
      num: 3,
      title: 'Incident Cross-Validation',
      pitch: 'Citizen reports and social posts are cross-verified with nearby IoT telemetry and weather radars.',
      highlight: 'See Report #INC-2048 verified with 94% confidence in 1.4 seconds.',
    },
    {
      num: 4,
      title: 'Dynamic Safe Evacuation Routing',
      pitch: 'Calculates dynamic flood-aware routes to high-ground shelters with guaranteed vacancy.',
      highlight: 'Click "SIMULATE FLASH FLOOD" to trigger the WOW-moment dynamic rerouting to Route D!',
    },
    {
      num: 5,
      title: 'AI Resource Optimization',
      pitch: 'Assigns rescue boats, dewatering pumps, and trauma ambulances by severity, distance, and population.',
      highlight: 'Click "APPROVE DEPLOYMENT" to watch resources move toward the scene on the live GIS map.',
    },
    {
      num: 6,
      title: 'Severity-Based Geotargeted Alerts',
      pitch: 'Dispatches instant multilingual warnings (English, Hindi, Marathi) via SMS, Push, WhatsApp & Sirens.',
      highlight: 'Notice the one-click simulated broadcast reaching 8,420 exposed residents.',
    },
    {
      num: 7,
      title: 'Measurable Operational Impact',
      pitch: 'Transforms reactive disaster response into a coordinated, predictive emergency platform.',
      highlight: 'Review the Traditional vs AI benchmark matrix demonstrating 47 min lead-time gain.',
    },
  ];

  const current = steps[judgeStep - 1] || steps[0];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 select-none">
      <div className="bg-slate-950/95 backdrop-blur-2xl border-2 border-amber-500/60 rounded-2xl p-4 shadow-2xl shadow-black/80 space-y-3">
        {/* Top Header of Judge Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-500/20 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-hud font-bold text-amber-400 text-xs uppercase tracking-wider">
              JUDGE PRESENTATION MODE • STEP {judgeStep} OF 7
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Step Indicators */}
            <div className="flex items-center gap-1">
              {steps.map(s => (
                <button
                  key={s.num}
                  onClick={() => setJudgeStep(s.num)}
                  className={`w-6 h-6 rounded-md font-mono text-[10px] font-bold transition-all ${
                    judgeStep === s.num
                      ? 'bg-amber-500 text-slate-950'
                      : judgeStep > s.num
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-slate-900 text-slate-500'
                  }`}
                >
                  {s.num}
                </button>
              ))}
            </div>

            <button
              onClick={() => setJudgeModeOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-200"
              title="Close Judge Mode"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Step Content */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <div>
            <h4 className="font-hud font-bold text-slate-100 text-sm">
              {current.num}. {current.title}
            </h4>
            <p className="text-xs text-slate-300 font-sans mt-0.5">{current.pitch}</p>
            <div className="text-[11px] font-mono text-cyan-300 mt-1 flex items-center gap-1.5">
              <span className="text-amber-400 font-bold">👉 Action for Judges:</span>
              <span>{current.highlight}</span>
            </div>
          </div>

          {/* Stepper controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prevJudgeStep}
              disabled={judgeStep === 1}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-mono font-semibold flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={nextJudgeStep}
              disabled={judgeStep === 7}
              className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1 transition-colors"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
