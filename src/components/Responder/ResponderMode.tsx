import React, { useState } from 'react';
import { useCommand } from '../../context/CommandContext';
import { 
  Smartphone, 
  Navigation, 
  AlertTriangle, 
  CheckCircle, 
  PhoneCall, 
  Radio, 
  MapPin, 
  ShieldAlert, 
  Users, 
  Check
} from 'lucide-react';

export const ResponderMode: React.FC = () => {
  const { resources, incidents, selectedZone } = useCommand();
  const [responderStatus, setResponderStatus] = useState<'EN_ROUTE' | 'ON_SCENE' | 'COMPLETED'>('EN_ROUTE');
  const [commSent, setCommSent] = useState<boolean>(false);

  const myUnit = resources.find(r => r.type === 'NDRF_TEAM') || resources[0];
  const assignedIncident = incidents.find(i => i.id === 'inc-2048') || incidents[0];

  const handleStatusChange = (status: 'EN_ROUTE' | 'ON_SCENE' | 'COMPLETED') => {
    setResponderStatus(status);
  };

  const handleQuickRadio = () => {
    setCommSent(true);
    setTimeout(() => setCommSent(false), 3000);
  };

  return (
    <div className="flex-1 p-4 bg-[#040814] overflow-y-auto flex justify-center">
      <div className="w-full max-w-xl space-y-4">
        {/* Device frame banner */}
        <div className="flex items-center justify-between p-3.5 bg-slate-950/90 border border-emerald-500/40 rounded-2xl shadow-xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                FIELD RESPONDER TERMINAL
              </span>
              <h3 className="font-hud font-bold text-slate-100 text-sm">{myUnit.callsign}</h3>
            </div>
          </div>

          <span
            className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg ${
              responderStatus === 'EN_ROUTE'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse'
                : responderStatus === 'ON_SCENE'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}
          >
            {responderStatus}
          </span>
        </div>

        {commSent && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500 rounded-xl text-emerald-300 text-xs font-mono flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Telemetry & status beacon transmitted to EOC Commander console.</span>
          </div>
        )}

        {/* Current Mission Card */}
        <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-2xl shadow-xl space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider block">
                ACTIVE ASSIGNMENT #{assignedIncident.code}
              </span>
              <h4 className="font-bold text-slate-100 text-base">{assignedIncident.title}</h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                📍 {assignedIncident.location}
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
              {assignedIncident.severity}
            </span>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Target ETA:</span>
              <span className="font-bold text-cyan-300">4 minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Flood Depth at Scene:</span>
              <span className="font-bold text-red-400">1.2m (Rising)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Evacuees Target:</span>
              <span className="font-bold text-slate-100">42 Elderly & Disabled</span>
            </div>
          </div>

          {/* Turn-by-Turn Safe Corridor Directives */}
          <div className="p-3 bg-cyan-950/30 border border-cyan-500/40 rounded-xl space-y-1.5">
            <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase block flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5" />
              TURN-BY-TURN TACTICAL NAVIGATION (ROUTE C - ELEVATED)
            </span>
            <div className="text-xs text-slate-200 font-sans space-y-1">
              <div>1. Proceed on Deccan Flyover bypass ramp (Dry deck, speed 50 km/h).</div>
              <div>2. ⚠ Avoid Riverside Underpass (Submerged 1.3m, completely barricaded).</div>
              <div>3. Launch Z-Boat 1 at Bund Garden Bridge landing pad.</div>
            </div>
          </div>
        </div>

        {/* Status Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleStatusChange('EN_ROUTE')}
            className={`py-3 rounded-xl font-mono text-xs font-bold transition-all border ${
              responderStatus === 'EN_ROUTE'
                ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-950'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            EN ROUTE
          </button>
          <button
            onClick={() => handleStatusChange('ON_SCENE')}
            className={`py-3 rounded-xl font-mono text-xs font-bold transition-all border ${
              responderStatus === 'ON_SCENE'
                ? 'bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-950'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            ON SCENE
          </button>
          <button
            onClick={() => handleStatusChange('COMPLETED')}
            className={`py-3 rounded-xl font-mono text-xs font-bold transition-all border ${
              responderStatus === 'COMPLETED'
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-950'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            COMPLETED
          </button>
        </div>

        {/* Emergency Communication Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleQuickRadio}
            className="py-3 px-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-2"
          >
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>TRANSMIT BEACON</span>
          </button>
          <button
            onClick={handleQuickRadio}
            className="py-3 px-4 bg-red-950/40 hover:bg-red-950/60 border border-red-500/40 text-red-300 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>MAYDAY / BACKUP</span>
          </button>
        </div>
      </div>
    </div>
  );
};
