import React, { useState } from 'react';
import { useCommand } from '../../context/CommandContext';
import { SimulationParams } from '../../types';
import { 
  Sliders, 
  X, 
  Play, 
  Sparkles, 
  Droplets, 
  Activity, 
  Clock, 
  Layers, 
  CheckCircle,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const DigitalTwinModal: React.FC = () => {
  const {
    simulationModalOpen,
    setSimulationModalOpen,
    simulationRunning,
    simulationStepText,
    simulationResult,
    runSimulation,
    resetSimulationToDefault,
  } = useCommand();

  const [params, setParams] = useState<SimulationParams>({
    rainfall: 75,
    duration: 3,
    drainageEfficiency: 'Reduced',
    riverCondition: 'High',
    traffic: 'Heavy',
  });

  if (!simulationModalOpen) return null;

  const handleRun = () => {
    runSimulation(params);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#12324A]/40 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-3xl bg-white border border-[#244A65]/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-5 bg-[#F6F9FB] border-b border-[#244A65]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1677C8]/10 text-[#1677C8] border border-[#1677C8]/20">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-[#1677C8] font-bold uppercase tracking-wider block">
                Digital Twin Simulator
              </span>
              <h3 className="font-bold text-[#12324A] text-lg">
                Urban Flood Hydraulic Simulation Mode
              </h3>
            </div>
          </div>

          <button
            onClick={() => setSimulationModalOpen(false)}
            className="p-2 rounded-xl text-[#607487] hover:text-[#12324A] hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-white">
          <p className="text-xs text-[#607487] leading-relaxed">
            Adjust meteorological, hydrological, and infrastructural stress parameters to simulate localized urban water accumulation, road closures, and demographic impact across the Pune metropolitan basin.
          </p>

          {/* Parameter Sliders & Option Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rainfall Intensity */}
            <div className="p-4 bg-[#F6F9FB] border border-[#244A65]/8 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#12324A] font-bold">Precipitation Rate</span>
                <span className="text-[#1677C8] font-bold">{params.rainfall} mm/hr</span>
              </div>
              <div className="flex gap-1.5">
                {[25, 50, 75, 100, 150].map(val => (
                  <button
                    key={val}
                    onClick={() => setParams(prev => ({ ...prev, rainfall: val as any }))}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      params.rainfall === val
                        ? 'bg-[#1677C8] text-white font-bold shadow-xs'
                        : 'bg-white text-[#607487] border border-[#244A65]/10 hover:text-[#12324A]'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="p-4 bg-[#F6F9FB] border border-[#244A65]/8 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#12324A] font-bold">Storm Duration</span>
                <span className="text-[#1677C8] font-bold">{params.duration} hours</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 3, 6, 12].map(val => (
                  <button
                    key={val}
                    onClick={() => setParams(prev => ({ ...prev, duration: val as any }))}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      params.duration === val
                        ? 'bg-[#1677C8] text-white font-bold shadow-xs'
                        : 'bg-white text-[#607487] border border-[#244A65]/10 hover:text-[#12324A]'
                    }`}
                  >
                    {val}h
                  </button>
                ))}
              </div>
            </div>

            {/* Drainage Efficiency */}
            <div className="p-4 bg-[#F6F9FB] border border-[#244A65]/8 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#12324A] font-bold">Drainage System Efficiency</span>
                <span className="text-[#E5A824] font-bold">{params.drainageEfficiency}</span>
              </div>
              <div className="flex gap-1.5">
                {['Normal', 'Reduced', 'Failed'].map(val => (
                  <button
                    key={val}
                    onClick={() => setParams(prev => ({ ...prev, drainageEfficiency: val as any }))}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      params.drainageEfficiency === val
                        ? 'bg-[#E5A824] text-white font-bold shadow-xs'
                        : 'bg-white text-[#607487] border border-[#244A65]/10 hover:text-[#12324A]'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* River Inflow Condition */}
            <div className="p-4 bg-[#F6F9FB] border border-[#244A65]/8 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#12324A] font-bold">Mutha River Basin State</span>
                <span className="text-[#DC4545] font-bold">{params.riverCondition}</span>
              </div>
              <div className="flex gap-1.5">
                {['Normal', 'High', 'Overflow'].map(val => (
                  <button
                    key={val}
                    onClick={() => setParams(prev => ({ ...prev, riverCondition: val as any }))}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      params.riverCondition === val
                        ? 'bg-[#DC4545] text-white font-bold shadow-xs'
                        : 'bg-white text-[#607487] border border-[#244A65]/10 hover:text-[#12324A]'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Simulation Progress State */}
          {simulationRunning && (
            <div className="p-4 rounded-2xl bg-[#EDF3F7] border border-[#1677C8]/30 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#1677C8] animate-ping" />
              <div className="text-xs font-medium text-[#12324A]">{simulationStepText}</div>
            </div>
          )}

          {/* Results Summary if Calculated */}
          {simulationResult && !simulationRunning && (
            <div className="p-5 rounded-2xl bg-[#F6F9FB] border border-[#244A65]/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1677C8] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#20A464]" />
                  Simulated Scenario Inundation Footprint
                </span>
                <button
                  onClick={resetSimulationToDefault}
                  className="text-xs text-[#607487] hover:text-[#12324A] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-white rounded-xl border border-[#244A65]/8">
                  <span className="text-[10px] text-[#607487] block font-medium">Inundated Area</span>
                  <span className="text-base font-bold text-[#12324A]">
                    {simulationResult.floodedAreaSqKm} km²
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#244A65]/8">
                  <span className="text-[10px] text-[#607487] block font-medium">Max Depth</span>
                  <span className="text-base font-bold text-[#DC4545]">
                    {simulationResult.maxWaterDepthM} m
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#244A65]/8">
                  <span className="text-[10px] text-[#607487] block font-medium">Residents Exposed</span>
                  <span className="text-base font-bold text-[#ED7A2C]">
                    {simulationResult.populationExposed.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#244A65]/8">
                  <span className="text-[10px] text-[#607487] block font-medium">Roads Submerged</span>
                  <span className="text-base font-bold text-[#12324A]">
                    {simulationResult.roadsAffectedCount} corridors
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-[#F6F9FB] border-t border-[#244A65]/10 flex items-center justify-between">
          <button
            onClick={() => setSimulationModalOpen(false)}
            className="py-2.5 px-4 bg-white hover:bg-[#EDF3F7] text-[#607487] hover:text-[#12324A] border border-[#244A65]/10 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={handleRun}
            disabled={simulationRunning}
            className="py-2.5 px-6 bg-[#1677C8] hover:bg-[#12324A] text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs shadow-[#1677C8]/25 cursor-pointer disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{simulationRunning ? 'Simulating Runoff...' : 'Execute Digital Twin Hydro-Run'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
