import React from 'react';
import { ShieldAlert, ArrowRight } from 'lucide-react';

interface LandingGatewayProps {
  onEnter: () => void;
}

export const LandingGateway: React.FC<LandingGatewayProps> = ({ onEnter }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#07111F] text-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none">
      {/* Subtle Background Rain & Dark Map Contour Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="landingGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#landingGrid)" />
          <path d="M 0,200 Q 400,240 800,180 T 1600,220" fill="none" stroke="rgba(47,155,255,0.2)" strokeWidth="12" />
        </svg>

        {/* Minimal falling rain particles */}
        <div className="rain-drop absolute top-10 left-[20%] w-px h-16 bg-[#2F9BFF]" />
        <div className="rain-drop absolute top-32 left-[45%] w-px h-20 bg-[#2F9BFF]" />
        <div className="rain-drop absolute top-16 left-[70%] w-px h-24 bg-[#2F9BFF]" />
        <div className="rain-drop absolute top-40 left-[85%] w-px h-16 bg-[#2F9BFF]" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 p-8 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2F9BFF]/10 border border-[#2F9BFF]/30 flex items-center justify-center text-[#2F9BFF]">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-[#F8FAFC]">
            FloodShield AI
          </span>
        </div>
      </header>

      {/* Center Hero Block */}
      <main className="relative z-10 max-w-xl mx-auto px-6 text-center space-y-8 my-auto">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#F8FAFC]">
            FloodShield AI
          </h1>

          <div className="text-sm font-medium text-[#2F9BFF] uppercase tracking-wider">
            Urban Flood Intelligence & Emergency Response
          </div>

          <p className="text-base text-[#94A3B8] font-normal leading-relaxed pt-2">
            Predict Earlier. Respond Smarter. Save Lives.
          </p>
        </div>

        {/* Exactly One Primary Action Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={onEnter}
            className="py-3.5 px-8 rounded-xl bg-[#2F9BFF] hover:bg-[#2F9BFF]/90 text-white font-medium text-sm flex items-center justify-center gap-2.5 transition-colors shadow-xl shadow-[#2F9BFF]/20"
          >
            <span>Enter Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Clean Bottom Footer */}
      <footer className="relative z-10 p-8 max-w-6xl mx-auto w-full text-center text-xs text-[#94A3B8] opacity-60">
        Enterprise Emergency Operations Protocol • Municipal Command Console
      </footer>
    </div>
  );
};
