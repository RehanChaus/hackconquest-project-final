import React, { useState } from 'react';
import { useCommand } from '../../context/CommandContext';
import { 
  TrendingUp, 
  CloudRain, 
  Droplets, 
  AlertTriangle, 
  Activity, 
  Brain, 
  CheckCircle,
  Calendar,
  Layers,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const AIForecastPanel: React.FC = () => {
  const { zones, setExplainableModalZone, timelineIndex, setTimelineIndex } = useCommand();
  const [selectedForecastZoneId, setSelectedForecastZoneId] = useState<string>('zone-riverside');

  const selectedZone = zones.find(z => z.id === selectedForecastZoneId) || zones[0];

  // 72-hour forecast projection datapoints
  const hydroPoints = [
    { time: 'NOW', rain: 78, water: 4.3, prob: 87 },
    { time: '+3H', rain: 92, water: 4.7, prob: 94 },
    { time: '+6H', rain: 85, water: 4.9, prob: 96 },
    { time: '+12H', rain: 60, water: 4.6, prob: 82 },
    { time: '+24H', rain: 42, water: 3.9, prob: 64 },
    { time: '+48H', rain: 28, water: 3.1, prob: 38 },
    { time: '+72H', rain: 15, water: 2.4, prob: 20 },
  ];

  return (
    <div className="flex-1 p-6 bg-[#EDF3F7] overflow-y-auto space-y-6 select-none">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white border border-[#244A65]/10 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#1677C8] text-xs font-bold uppercase tracking-wider mb-1">
            <Brain className="w-4 h-4 text-[#1677C8]" />
            <span>Neural Hydro-Meteorological Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-[#12324A] tracking-tight">
            AI Flood Risk Forecast — Next 72 Hours
          </h2>
          <p className="text-xs sm:text-sm text-[#607487] mt-1">
            Predictive multi-layer simulation fusing Doppler radar, river bathymetry, catchment soil moisture, and drainage networks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#F6F9FB] border border-[#244A65]/10 rounded-xl px-4 py-2 text-right">
            <span className="text-[10px] text-[#8A9CAA] block font-semibold uppercase">Overall Probability</span>
            <span className="text-base sm:text-lg font-bold text-[#DC4545]">89% Critical</span>
          </div>
          <div className="bg-[#F6F9FB] border border-[#244A65]/10 rounded-xl px-4 py-2 text-right">
            <span className="text-[10px] text-[#8A9CAA] block font-semibold uppercase">Model Confidence</span>
            <span className="text-base sm:text-lg font-bold text-[#1677C8]">94%</span>
          </div>
        </div>
      </div>

      {/* 72H Hydrograph & Rainfall Forecast Chart */}
      <div className="p-6 bg-white border border-[#244A65]/10 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-[#12324A] uppercase tracking-wide flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#1677C8]" />
            72-Hour Hydrograph: Predicted Water Level & Precipitation Surge
          </h3>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-[#1677C8]">
              <span className="w-3 h-1 bg-[#1677C8] rounded-full" />
              <span className="font-medium">Rainfall (mm/h)</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#DC4545]">
              <span className="w-3 h-1 bg-[#DC4545] rounded-full" />
              <span className="font-medium">Water Level (m)</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#E5A824]">
              <span className="w-3 h-1 bg-[#E5A824] rounded-full" />
              <span className="font-medium">Flood Prob (%)</span>
            </div>
          </div>
        </div>

        {/* Visual SVG Hydrograph */}
        <div className="w-full h-52 bg-[#F6F9FB] rounded-xl p-4 relative border border-[#244A65]/8">
          <svg viewBox="0 0 700 160" className="w-full h-full overflow-visible">
            {/* Grid lines */}
            <line x1="40" y1="20" x2="680" y2="20" stroke="rgba(36, 74, 101, 0.08)" strokeDasharray="3,3" />
            <line x1="40" y1="60" x2="680" y2="60" stroke="rgba(36, 74, 101, 0.08)" strokeDasharray="3,3" />
            <line x1="40" y1="100" x2="680" y2="100" stroke="rgba(36, 74, 101, 0.08)" strokeDasharray="3,3" />
            <line x1="40" y1="140" x2="680" y2="140" stroke="rgba(36, 74, 101, 0.2)" />

            {/* Threshold Line (Flood Danger Level 4.0m) */}
            <line x1="40" y1="52" x2="680" y2="52" stroke="#DC4545" strokeWidth="1.5" strokeDasharray="4,4" />
            <text x="680" y="48" fill="#DC4545" fontSize="8.5" fontFamily="Inter, sans-serif" textAnchor="end" fontWeight="bold">
              FLOOD DANGER LEVEL (4.0m)
            </text>

            {/* Bars: Rainfall */}
            {hydroPoints.map((pt, i) => {
              const x = 70 + i * 95;
              const barH = (pt.rain / 100) * 110;
              return (
                <g key={pt.time}>
                  <rect
                    x={x - 14}
                    y={140 - barH}
                    width="28"
                    height={barH}
                    rx="4"
                    fill="#1677C8"
                    fillOpacity="0.22"
                    stroke="#1677C8"
                    strokeWidth="1"
                  />
                  <text x={x} y={135 - barH} fill="#1677C8" fontSize="8.5" fontWeight="600" textAnchor="middle">
                    {pt.rain}
                  </text>
                  <text x={x} y="154" fill="#607487" fontSize="9" fontWeight="500" textAnchor="middle">
                    {pt.time}
                  </text>
                </g>
              );
            })}

            {/* Line: Water Level (m) */}
            <path
              d={`M 70,${140 - (4.3 / 6) * 120} Q 165,${140 - (4.7 / 6) * 120} 260,${140 - (4.9 / 6) * 120} T 450,${140 - (3.9 / 6) * 120} T 640,${140 - (2.4 / 6) * 120}`}
              fill="none"
              stroke="#DC4545"
              strokeWidth="2.5"
            />
            {hydroPoints.map((pt, i) => {
              const x = 70 + i * 95;
              const y = 140 - (pt.water / 6) * 120;
              return (
                <circle key={i} cx={x} cy={y} r="4" fill="#DC4545" stroke="#FFFFFF" strokeWidth="1.5" />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Zone-by-Zone Risk Matrix with Hazard x Exposure x Vulnerability */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Zone Selection List */}
        <div className="bg-white border border-[#244A65]/10 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="text-xs font-bold text-[#12324A] uppercase tracking-wider mb-1">
            Catchment Risk Matrix
          </div>
          <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
            {zones.map(z => {
              const isSelected = selectedZone.id === z.id;
              return (
                <button
                  key={z.id}
                  onClick={() => setSelectedForecastZoneId(z.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#EDF3F7] border-[#1677C8] shadow-xs'
                      : 'bg-[#F6F9FB] border-[#244A65]/8 hover:border-[#1677C8]/40'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-[#12324A]">{z.name}</div>
                    <div className="text-[10px] text-[#607487] mt-0.5">
                      Onset: ~{z.predictedFloodTimeMin}m • Rain: {z.rainfall} mm/h
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      z.riskLevel === 'CRITICAL'
                        ? 'bg-[#DC4545]/10 text-[#DC4545] border border-[#DC4545]/20'
                        : z.riskLevel === 'HIGH'
                        ? 'bg-[#ED7A2C]/10 text-[#ED7A2C] border border-[#ED7A2C]/20'
                        : 'bg-[#20A464]/10 text-[#20A464] border border-[#20A464]/20'
                    }`}
                  >
                    {z.riskScore}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 2 cols: In-Depth Predictive Intelligence for Selected Zone */}
        <div className="lg:col-span-2 bg-white border border-[#244A65]/10 rounded-2xl p-5 shadow-xs space-y-5">
          <div className="flex items-start justify-between border-b border-[#244A65]/10 pb-4">
            <div>
              <span className="text-xs font-bold text-[#1677C8] uppercase tracking-wider">
                {selectedZone.code} • Detailed Hydro Profile
              </span>
              <h3 className="text-xl font-bold text-[#12324A] mt-0.5">{selectedZone.name}</h3>
            </div>
            <button
              onClick={() => setExplainableModalZone(selectedZone)}
              className="py-2 px-3.5 bg-[#1677C8] hover:bg-[#12324A] text-white rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Explainable AI Risk Factors</span>
            </button>
          </div>

          {/* Hazard x Exposure x Vulnerability Formula Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-[#F6F9FB] border border-[#244A65]/8 rounded-xl">
              <span className="text-[10px] text-[#607487] font-semibold uppercase block">Hazard Component</span>
              <div className="text-base font-bold text-[#12324A] mt-1">
                {selectedZone.rainfall} mm/h Rain
              </div>
              <div className="text-[11px] text-[#607487] mt-1">
                Water Level: {selectedZone.waterLevel}m (Threshold: {selectedZone.thresholdWaterLevel}m)
              </div>
            </div>

            <div className="p-3.5 bg-[#F6F9FB] border border-[#244A65]/8 rounded-xl">
              <span className="text-[10px] text-[#607487] font-semibold uppercase block">Exposure Component</span>
              <div className="text-base font-bold text-[#DC4545] mt-1">
                {selectedZone.populationAtRisk.toLocaleString()} Exposed
              </div>
              <div className="text-[11px] text-[#607487] mt-1">
                Total Pop: {selectedZone.population.toLocaleString()} ({Math.round((selectedZone.populationAtRisk / selectedZone.population) * 100)}% density)
              </div>
            </div>

            <div className="p-3.5 bg-[#F6F9FB] border border-[#244A65]/8 rounded-xl">
              <span className="text-[10px] text-[#607487] font-semibold uppercase block">Vulnerability Component</span>
              <div className="text-base font-bold text-[#ED7A2C] mt-1">
                {selectedZone.humanImpactScore}/100 Human Impact
              </div>
              <div className="text-[11px] text-[#607487] mt-1">
                {selectedZone.vulnerability.elderlyCount + selectedZone.vulnerability.childrenCount} vulnerable residents
              </div>
            </div>
          </div>

          {/* Explainable Factors preview */}
          <div>
            <div className="text-xs font-bold text-[#12324A] mb-3">
              Dominant Risk Attribution Factors:
            </div>
            <div className="space-y-3">
              {selectedZone.explainableFactors.map((factor, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#163047]">{factor.factor}</span>
                    <span className="font-bold text-[#1677C8]">{factor.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#EDF3F7] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1677C8] to-[#3B9CE2] rounded-full"
                      style={{ width: `${factor.percentage}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-[#607487]">{factor.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
