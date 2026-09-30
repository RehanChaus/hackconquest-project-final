import React from 'react';
import { 
  HeartPulse, 
  CheckCircle, 
  Cpu, 
  Radio, 
  ShieldCheck, 
  Globe, 
  Layers, 
  Server, 
  Activity,
  ArrowRight
} from 'lucide-react';

export const SystemHealthScreen: React.FC = () => {
  return (
    <div className="flex-1 p-4 bg-[#040814] overflow-y-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-slate-950/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-1">
            <HeartPulse className="w-4 h-4 text-cyan-400" />
            <span>INFRASTRUCTURE TELEMETRY & RESILIENCE</span>
          </div>
          <h2 className="text-xl font-bold font-hud text-slate-100">
            SYSTEM HEALTH & SCALABILITY ARCHITECTURE
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Real-time microservice status, neural inference latencies, sensor node uptimes, and multi-tier deployment topology.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-emerald-950/40 border border-emerald-500/40 px-3 py-1.5 rounded-xl text-emerald-300 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>ALL CLUSTERS OPERATIONAL • 99.98% UPTIME</span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { name: 'AI Hydro Engine', status: 'ONLINE', latency: '42ms', desc: 'Neural runoff model', icon: Cpu },
          { name: 'Routing Microservice', status: 'ONLINE', latency: '18ms', desc: 'Dynamic A* bypass engine', icon: Activity },
          { name: 'GIS Spatial Server', status: 'ONLINE', latency: '24ms', desc: 'Vector bathymetry tile service', icon: Globe },
          { name: 'IoT Telemetry Mesh', status: '96% HEALTHY', latency: '8ms', desc: '48/50 sensor nodes online', icon: Radio },
          { name: 'IMD Doppler Gateway', status: 'LIVE', latency: '110ms', desc: 'Precipitation radar sync', icon: Server },
          { name: 'Emergency SMS Mesh', status: 'ONLINE', latency: '65ms', desc: 'Cell broadcast carrier queue', icon: ShieldCheck },
          { name: 'Citizen Signal Queue', status: 'ONLINE', latency: '32ms', desc: 'NLP deduplication pipeline', icon: Layers },
          { name: 'Gemini Copilot Service', status: 'CONNECTED', latency: '280ms', desc: 'EOC Incident Commander AI', icon: Cpu },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  {item.status}
                </span>
              </div>
              <h4 className="font-semibold text-slate-100 text-xs">{item.name}</h4>
              <div className="text-[11px] text-slate-400 font-sans mt-0.5">{item.desc}</div>
              <div className="text-[10px] font-mono text-cyan-400 mt-2">Latency: {item.latency}</div>
            </div>
          );
        })}
      </div>

      {/* Scalability Architecture Diagram */}
      <div className="p-5 bg-slate-950/90 border border-cyan-500/30 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-sm font-hud font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            MULTI-TIER SCALABILITY ARCHITECTURE: WARD TO NATIONAL GRID
          </h3>
          <span className="text-[10px] font-mono text-cyan-400">EDGE-TO-CLOUD FEDERATION</span>
        </div>

        <p className="text-xs text-slate-400 font-sans">
          FloodShield AI is designed as a distributed, federated platform that scales hierarchically from individual municipal storm sumps to state and national disaster command authorities.
        </p>

        {/* Visual Architecture Hierarchy Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {[
            {
              tier: 'TIER 1',
              title: 'WARD LEVEL',
              desc: 'Sub-catchment sumps, low-lying underpasses, local culvert sensors, and volunteer ward wardens.',
              metric: '100m² resolution',
            },
            {
              tier: 'TIER 2',
              title: 'CITY EOC',
              desc: 'Municipal Disaster Center, police traffic control, fire department, and city hospital beds.',
              metric: 'Unified City Twin',
            },
            {
              tier: 'TIER 3',
              title: 'MULTI-CITY BASIN',
              desc: 'Upstream dams (Khadakwasla, Panshet), interstate river basins, and mutual-aid resource sharing.',
              metric: 'Basin Hydrology',
            },
            {
              tier: 'TIER 4',
              title: 'STATE SDMA',
              desc: 'State Disaster Management Authority (Maharashtra), NDRF battalions, state-wide radar grid.',
              metric: 'Regional Command',
            },
            {
              tier: 'TIER 5',
              title: 'NATIONAL NDMA',
              desc: 'National Disaster Management Grid, IMD national weather forecasting, inter-state military airlift.',
              metric: 'National Network',
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl relative flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 block mb-1">
                  {step.tier}
                </span>
                <h4 className="font-hud font-bold text-slate-200 text-sm mb-1">{step.title}</h4>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{step.desc}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-850 text-[10px] font-mono text-emerald-400 font-semibold">
                {step.metric}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
