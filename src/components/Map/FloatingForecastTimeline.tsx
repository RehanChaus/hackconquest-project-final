import React, { useState, useEffect, useRef } from 'react';
import { useCommand } from '../../context/CommandContext';
import { TIMELINE_STEPS } from '../../data/mockData';
import { Clock, Play, Pause, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

export const FloatingForecastTimeline: React.FC = () => {
  const { timelineIndex, setTimelineIndex } = useCommand();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timelineIndexRef = useRef(timelineIndex);
  timelineIndexRef.current = timelineIndex;

  // Take the required 6 steps: NOW, +1H, +3H, +6H, +12H, +24H
  const steps = TIMELINE_STEPS.slice(0, 6);

  // Auto-play through time steps if play is toggled
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const nextIdx = (timelineIndexRef.current + 1) % steps.length;
      setTimelineIndex(nextIdx);
    }, 2400);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length, setTimelineIndex]);

  const activeStep = steps[timelineIndex] || steps[0];

  return (
    <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-auto select-none">
      <div className="bg-white/95 backdrop-blur-md rounded-full border border-[#244A65]/15 ring-1 ring-white/90 shadow-[0_8px_30px_rgba(18,50,74,0.12)] p-1.5 flex items-center gap-1.5 transition-all">
        {/* Left: Lead Label & Telemetry Status */}
        <div className="flex items-center gap-1.5 pl-3 pr-2.5 py-1 border-r border-[#244A65]/12 text-[#12324A]">
          <Clock className="w-3.5 h-3.5 text-[#1677C8]" />
          <span className="text-[11px] font-bold tracking-tight uppercase">
            Forecast
          </span>
          <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-[#1677C8] animate-pulse" />
        </div>

        {/* Step Buttons: 'NOW', '+1H', '+3H', '+6H', '+12H', '+24H' */}
        <div className="flex items-center gap-1">
          {steps.map((step, idx) => {
            const isSelected = timelineIndex === idx;
            return (
              <button
                key={step.label}
                onClick={() => {
                  setTimelineIndex(idx);
                  if (isPlaying) setIsPlaying(false);
                }}
                className={`relative px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1677C8] text-white shadow-xs shadow-[#1677C8]/30 scale-102 ring-1 ring-[#1677C8]/40'
                    : 'text-[#607487] hover:text-[#12324A] hover:bg-[#EDF3F7]/80'
                }`}
                title={`Advance to ${step.label} (${step.offsetHours}h offset)`}
                aria-label={`Forecast timeline ${step.label}`}
              >
                <span>{step.label}</span>
                {isSelected && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Play / Step Controls */}
        <div className="flex items-center pl-1 pr-1 border-l border-[#244A65]/12">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-1.5 rounded-full text-[#607487] hover:text-[#12324A] transition-colors cursor-pointer ${
              isPlaying ? 'bg-[#EDF3F7] text-[#1677C8]' : 'hover:bg-[#EDF3F7]'
            }`}
            title={isPlaying ? 'Pause timeline progression' : 'Play simulated storm timeline progression'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current text-[#1677C8]" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current text-[#607487] hover:text-[#1677C8]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
