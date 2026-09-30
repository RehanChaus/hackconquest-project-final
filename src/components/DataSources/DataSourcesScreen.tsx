import React from 'react';
import { 
  Database, 
  CheckCircle, 
  CloudRain, 
  Radio, 
  Navigation, 
  Smartphone, 
  Truck, 
  Globe, 
  Cpu, 
  RefreshCw,
  Server
} from 'lucide-react';

interface DataSourceItem {
  id: string;
  name: string;
  provider: string;
  type: string;
  status: 'LIVE' | 'CONNECTED' | 'SYNCED' | 'STANDBY';
  latencyMs: number;
  lastSync: string;
  recordsCount: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const DataSourcesScreen: React.FC = () => {
  const sources: DataSourceItem[] = [
    {
      id: 'src-weather',
      name: 'Doppler Radar & Precipitation Feed',
      provider: 'India Meteorological Dept (IMD) / OpenWeather Pro',
      type: 'METEOROLOGY',
      status: 'LIVE',
      latencyMs: 142,
      lastSync: '12s ago',
      recordsCount: '12,480 radar sweeps/hr',
      icon: CloudRain,
      description: 'Continuous X-band dual-polarization precipitation radar detecting localized cloudburst cells.',
    },
    {
      id: 'src-iot',
      name: 'River & Sump Telemetry Mesh',
      provider: 'Central Water Commission (CWC) & PMC IoT Gateway',
      type: 'HYDROLOGY',
      status: 'LIVE',
      latencyMs: 48,
      lastSync: '8s ago',
      recordsCount: '48 active telemetry nodes',
      icon: Radio,
      description: 'Ultrasonic water depth sensors, culvert pressure transducers, and automated acoustic flowmeters.',
    },
    {
      id: 'src-gis',
      name: 'Urban Digital Elevation & Cadastral GIS',
      provider: 'Municipal GIS / Survey of India / OpenStreetMap',
      type: 'GEOSPATIAL',
      status: 'CONNECTED',
      latencyMs: 86,
      lastSync: '1m ago',
      recordsCount: '1:500 scale vector contours',
      icon: Globe,
      description: 'High-resolution digital elevation model (DEM) with 0.5m contour interval and building footprints.',
    },
    {
      id: 'src-traffic',
      name: 'Arterial Traffic & Road Sensor Grid',
      provider: 'Traffic Police Command & City Surveillance CCTV',
      type: 'MOBILITY',
      status: 'CONNECTED',
      latencyMs: 120,
      lastSync: '30s ago',
      recordsCount: '240 camera AI feeds',
      icon: Navigation,
      description: 'Computer-vision based detection of waterlogged underpasses, stalled vehicles, and congestion speeds.',
    },
    {
      id: 'src-citizen',
      name: 'Citizen Incident Reports & Geotagged Media',
      provider: 'FloodShield Citizen Mobile App & Social Signals',
      type: 'CROWDSOURCED',
      status: 'LIVE',
      latencyMs: 95,
      lastSync: '15s ago',
      recordsCount: '412 reports in last 24h',
      icon: Smartphone,
      description: 'Spatiotemporally deduplicated citizen submissions with photo verification and NLP parsing.',
    },
    {
      id: 'src-satellite',
      name: 'Synthetic Aperture Radar (SAR) Inundation Imagery',
      provider: 'Copernicus Sentinel-1 & NASA Earthdata',
      type: 'EARTH_OBSERVATION',
      status: 'SYNCED',
      latencyMs: 310,
      lastSync: '4m ago',
      recordsCount: '10m spatial resolution',
      icon: Database,
      description: 'All-weather cloud-penetrating radar satellite imagery mapping flood extent perimeters.',
    },
    {
      id: 'src-resources',
      name: 'Emergency Services CAD / AVL Dispatch',
      provider: '112 Unified Emergency Response Cadre (NDRF / Fire)',
      type: 'LOGISTICS',
      status: 'CONNECTED',
      latencyMs: 64,
      lastSync: '5s ago',
      recordsCount: '34 tracked GPS assets',
      icon: Truck,
      description: 'Automated Vehicle Location (AVL) GPS transponders transmitting real-time speed, heading, and crew readiness.',
    },
  ];

  return (
    <div className="flex-1 p-4 bg-[#040814] overflow-y-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-slate-950/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-1">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>FUSED INGESTION PIPELINES</span>
          </div>
          <h2 className="text-xl font-bold font-hud text-slate-100">
            CONNECTED DATA SOURCES & SENSORS
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Real-time multi-modal streaming feeds powering the flood prediction neural engine.
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Ingestion Hub: 7/7 Feeds Active</span>
        </div>
      </div>

      {/* Grid of Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map(src => {
          const Icon = src.icon;
          return (
            <div
              key={src.id}
              className="bg-slate-950/80 border border-slate-850 hover:border-slate-700 rounded-2xl p-4 shadow-xl flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    {src.status}
                  </span>
                </div>

                <h3 className="font-semibold text-slate-100 text-sm mb-0.5">{src.name}</h3>
                <div className="text-[11px] font-mono text-cyan-400 mb-2">{src.provider}</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed mb-3">
                  {src.description}
                </p>
              </div>

              <div className="border-t border-slate-850 pt-2.5 grid grid-cols-3 gap-1 text-[10px] font-mono text-slate-400 bg-slate-900/60 p-2 rounded-xl">
                <div>
                  <span className="text-slate-500 block">Latency</span>
                  <span className="font-bold text-slate-200">{src.latencyMs} ms</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Last Sync</span>
                  <span className="font-bold text-slate-200">{src.lastSync}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Rate</span>
                  <span className="font-bold text-cyan-300 truncate block">Active</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-center text-xs font-mono text-slate-500">
        Demo Notice: In production environments, data pipelines connect to official municipal IoT gateways & CWC APIs. High-fidelity synthetic fallback feeds are active for hackathon reliability.
      </div>
    </div>
  );
};
