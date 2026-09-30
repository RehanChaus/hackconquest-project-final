import React, { useState, useRef, useEffect } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { useCommand } from '../../context/CommandContext';
import { GoogleMapLayers } from './GoogleMapLayers';
import { FloatingForecastTimeline } from './FloatingForecastTimeline';
import { PUNE_MAP_CENTER, PUNE_DEFAULT_ZOOM, PUNE_ZONES_GEOMETRY, LatLng } from '../../data/puneGisData';
import { 
  Layers, 
  Sparkles, 
  TrendingUp, 
  MapPin, 
  Activity, 
  ShieldCheck, 
  Compass, 
  Maximize2, 
  Minimize2, 
  Search, 
  X, 
  Crosshair, 
  Play, 
  Pause, 
  Sliders, 
  Radio, 
  AlertTriangle, 
  Droplets, 
  SplitSquareVertical, 
  ChevronRight,
  Eye,
  Check
} from 'lucide-react';

// Controller component to smoothly pan/zoom camera
const MapCameraController: React.FC<{
  targetLocation: LatLng | null;
  targetZoom?: number;
  tilt?: number;
  heading?: number;
  mapType: 'hybrid' | 'roadmap' | 'terrain';
}> = ({ targetLocation, targetZoom = 14, tilt = 0, heading = 0, mapType }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.setMapTypeId(mapType);
  }, [map, mapType]);

  useEffect(() => {
    if (!map) return;
    if (tilt !== undefined) map.setTilt(tilt);
    if (heading !== undefined) map.setHeading(heading);
  }, [map, tilt, heading]);

  useEffect(() => {
    if (!map || !targetLocation) return;
    map.panTo(targetLocation);
    if (targetZoom) map.setZoom(targetZoom);
  }, [map, targetLocation, targetZoom]);

  return null;
};

export const GoogleSatelliteMap: React.FC = () => {
  const {
    zones,
    sensors,
    incidents,
    resources,
    shelters,
    selectedZone,
    setSelectedZone,
    setSelectedZoneDrawerOpen,
    mapLayers,
    toggleMapLayer,
    timelineIndex,
    isFlashFloodTriggered,
    isRecalculatingRoute,
  } = useCommand();

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDooNg2JsxePJ3nXeYxvQhDXQN18Ob4bGA';

  // Map state
  const [mapType, setMapType] = useState<'hybrid' | 'roadmap' | 'terrain'>('hybrid');
  const [is3D, setIs3D] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [layersMenuOpen, setLayersMenuOpen] = useState<boolean>(false);
  const [depthLayerActive, setDepthLayerActive] = useState<boolean>(false);
  const [radarActive, setRadarActive] = useState<boolean>(false);
  const [radarPlaying, setRadarPlaying] = useState<boolean>(false);
  const [radarStep, setRadarStep] = useState<number>(0);
  const [compareActive, setCompareActive] = useState<boolean>(false);
  const [compareDividerPct, setCompareDividerPct] = useState<number>(50);

  // Search & Navigation
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResultsOpen, setSearchResultsOpen] = useState<boolean>(false);
  const [cameraTarget, setCameraTarget] = useState<LatLng | null>(null);
  const [cameraZoom, setCameraZoom] = useState<number>(PUNE_DEFAULT_ZOOM);

  // Popovers
  const [activeSensor, setActiveSensor] = useState<any>(null);
  const [activeRoad, setActiveRoad] = useState<any>(null);
  const [activeHospital, setActiveHospital] = useState<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Radar Animation Loop
  useEffect(() => {
    if (!radarActive || !radarPlaying) return;
    const interval = setInterval(() => {
      setRadarStep(prev => (prev + 1) % 6);
    }, 1800);
    return () => clearInterval(interval);
  }, [radarActive, radarPlaying]);

  // Handle Locate Highest Risk
  const handleLocateHighestRisk = () => {
    const criticalGeo = PUNE_ZONES_GEOMETRY.find(z => z.id === 'zone-riverside') || PUNE_ZONES_GEOMETRY[0];
    const liveCriticalZone = zones.find(z => z.id === criticalGeo.id) || zones[0];
    setCameraTarget({ ...criticalGeo.center });
    setCameraZoom(15);
    setSelectedZone(liveCriticalZone);
    setSelectedZoneDrawerOpen(true);
  };

  // Fullscreen toggle handler
  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Search options
  const searchItems = [
    { label: 'Riverside Ward (Bund Garden)', category: 'Zone (Critical)', target: { lat: 18.5365, lng: 73.8791 }, zoom: 15 },
    { label: 'Sangamwadi Confluence Axis', category: 'Zone (Critical)', target: { lat: 18.5284, lng: 73.8642 }, zoom: 15 },
    { label: 'Deccan Gymkhana & Pulachi Wadi', category: 'Zone (High)', target: { lat: 18.5165, lng: 73.8415 }, zoom: 15 },
    { label: 'Incident #INC-2048 (Underpass Flood)', category: 'Incident', target: { lat: 18.537, lng: 73.878 }, zoom: 16 },
    { label: 'Sensor WS-14 (Bund Garden Weir)', category: 'Sensor', target: { lat: 18.537, lng: 73.881 }, zoom: 16 },
    { label: 'Shelter S-04 (Central Community Hall)', category: 'Shelter', target: { lat: 18.529, lng: 73.851 }, zoom: 16 },
    { label: 'Ambulance A-04 (Quick Response)', category: 'Resource', target: { lat: 18.532, lng: 73.862 }, zoom: 16 },
  ];

  const filteredSearch = searchItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full bg-slate-900 rounded-2xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(18,50,74,0.12)] border border-[#244A65]/15 select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      {/* ============================================================== */}
      {/* TOP FLOATING OVERLAYS: STYLE SWITCHER, SEARCH, TOOLS */}
      {/* ============================================================== */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left Side: Map Identity & Style Switcher Segmented Control */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Brand/City Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-[#244A65]/12 shadow-sm text-xs">
            <Compass className="w-3.5 h-3.5 text-[#1677C8]" />
            <span className="font-bold text-[#12324A]">Pune Basin GIS</span>
            <span className="text-[#8A9CAA]">|</span>
            <span className="text-[11px] text-[#20A464] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#20A464] animate-pulse" />
              Satellite Active
            </span>
          </div>

          {/* Premium Segmented Map Style Switcher (Satellite | Map | Terrain) */}
          <div className="flex items-center bg-white/95 backdrop-blur-md p-1 rounded-full border border-[#244A65]/15 shadow-sm text-xs font-semibold text-[#607487]">
            <button
              onClick={() => setMapType('hybrid')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                mapType === 'hybrid'
                  ? 'bg-[#1677C8] text-white shadow-xs font-bold'
                  : 'hover:text-[#12324A] hover:bg-[#EDF3F7]'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapType('roadmap')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                mapType === 'roadmap'
                  ? 'bg-[#1677C8] text-white shadow-xs font-bold'
                  : 'hover:text-[#12324A] hover:bg-[#EDF3F7]'
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setMapType('terrain')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                mapType === 'terrain'
                  ? 'bg-[#1677C8] text-white shadow-xs font-bold'
                  : 'hover:text-[#12324A] hover:bg-[#EDF3F7]'
              }`}
            >
              Terrain
            </button>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="pointer-events-auto relative w-56 sm:w-72">
          <div className="flex items-center bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#244A65]/15 shadow-sm text-xs">
            <Search className="w-3.5 h-3.5 text-[#8A9CAA] mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search location, sensor, incident..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchResultsOpen(true);
              }}
              onFocus={() => setSearchResultsOpen(true)}
              className="w-full bg-transparent text-xs text-[#12324A] font-medium outline-none placeholder:text-[#8A9CAA]"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResultsOpen(false);
                }}
                className="text-[#8A9CAA] hover:text-[#12324A] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Results Popover */}
          {searchResultsOpen && searchQuery && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#244A65]/15 rounded-2xl p-2 shadow-xl z-30 max-h-60 overflow-y-auto text-xs space-y-1">
              {filteredSearch.length > 0 ? (
                filteredSearch.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCameraTarget(item.target);
                      setCameraZoom(item.zoom);
                      setSearchResultsOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-[#EDF3F7] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold text-[#12324A]">{item.label}</div>
                      <div className="text-[10px] text-[#607487]">{item.category}</div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8A9CAA]" />
                  </button>
                ))
              ) : (
                <div className="p-3 text-center text-[#8A9CAA] text-xs">No matching locations found</div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Tools (Locate Highest Risk, Compare, 3D, Layers, Fullscreen) */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Locate Highest Risk Button */}
          <button
            onClick={handleLocateHighestRisk}
            className="px-3.5 py-1.5 bg-white/95 hover:bg-[#F6F9FB] text-[#DC4545] border border-[#DC4545]/25 rounded-full text-xs font-bold flex items-center gap-1.5 backdrop-blur-md shadow-sm transition-all cursor-pointer"
            title="Fly camera to Riverside Ward (Highest Risk)"
          >
            <Crosshair className="w-3.5 h-3.5 text-[#DC4545] animate-spin" />
            <span className="hidden sm:inline">Locate Highest Risk</span>
          </button>

          {/* Before vs After Compare Button */}
          <button
            onClick={() => setCompareActive(!compareActive)}
            className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all shadow-sm cursor-pointer ${
              compareActive
                ? 'bg-[#1677C8] text-white border-[#1677C8]'
                : 'bg-white/95 text-[#12324A] border-[#244A65]/12 hover:border-[#1677C8]/40'
            }`}
            title="Toggle Split-Screen Compare Mode"
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Compare</span>
          </button>

          {/* 3D Perspective Tilt Button */}
          <button
            onClick={() => setIs3D(!is3D)}
            className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all shadow-sm cursor-pointer ${
              is3D
                ? 'bg-[#1677C8] text-white border-[#1677C8]'
                : 'bg-white/95 text-[#12324A] border-[#244A65]/12 hover:border-[#1677C8]/40'
            }`}
            title="Toggle 3D High-Angle Tilt"
          >
            <span className="font-mono text-[11px] font-bold">3D</span>
          </button>

          {/* Layers Toggle Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLayersMenuOpen(!layersMenuOpen)}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all shadow-sm cursor-pointer ${
                layersMenuOpen
                  ? 'bg-[#1677C8] text-white border-[#1677C8]'
                  : 'bg-white/95 text-[#12324A] border-[#244A65]/12 hover:border-[#1677C8]/40'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#1677C8]" />
              <span>Layers</span>
            </button>

            {layersMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-68 bg-white border border-[#244A65]/15 rounded-2xl p-4 shadow-2xl z-30 text-xs space-y-3 animate-in fade-in zoom-in-95 duration-150">
                {/* Section 1: BASE MAP */}
                <div>
                  <div className="text-[11px] font-bold text-[#8A9CAA] uppercase tracking-wider mb-2">
                    Base Map
                  </div>
                  <div className="grid grid-cols-3 gap-1 bg-[#EDF3F7] p-1 rounded-xl">
                    {(['hybrid', 'roadmap', 'terrain'] as const).map(mode => (
                      <button
                        key={mode}
                        onClick={() => setMapType(mode)}
                        className={`py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          mapType === mode ? 'bg-white text-[#1677C8] shadow-2xs' : 'text-[#607487]'
                        }`}
                      >
                        {mode === 'hybrid' ? 'Satellite' : mode === 'roadmap' ? 'Map' : 'Terrain'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 2: INTELLIGENCE */}
                <div>
                  <div className="text-[11px] font-bold text-[#8A9CAA] uppercase tracking-wider mb-2">
                    Flood Intelligence
                  </div>
                  <div className="space-y-1">
                    <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#EDF3F7] cursor-pointer">
                      <span className="font-medium text-[#12324A]">Flood Risk Polygons</span>
                      <input
                        type="checkbox"
                        checked={mapLayers.floodRisk}
                        onChange={() => toggleMapLayer('floodRisk')}
                        className="rounded border-[#244A65]/20 text-[#1677C8] focus:ring-0 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#EDF3F7] cursor-pointer">
                      <span className="font-medium text-[#12324A]">Predicted Flood Depth</span>
                      <input
                        type="checkbox"
                        checked={depthLayerActive}
                        onChange={() => setDepthLayerActive(!depthLayerActive)}
                        className="rounded border-[#244A65]/20 text-[#1677C8] focus:ring-0 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#EDF3F7] cursor-pointer">
                      <span className="font-medium text-[#12324A]">Weather Radar (Doppler)</span>
                      <input
                        type="checkbox"
                        checked={radarActive}
                        onChange={() => {
                          setRadarActive(!radarActive);
                          if (!radarActive) setRadarPlaying(true);
                        }}
                        className="rounded border-[#244A65]/20 text-[#1677C8] focus:ring-0 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#EDF3F7] cursor-pointer">
                      <span className="font-medium text-[#12324A]">River Water Sensors</span>
                      <input
                        type="checkbox"
                        checked={mapLayers.waterLevel}
                        onChange={() => toggleMapLayer('waterLevel')}
                        className="rounded border-[#244A65]/20 text-[#1677C8] focus:ring-0 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#EDF3F7] cursor-pointer">
                      <span className="font-medium text-[#12324A]">Active Incidents</span>
                      <input
                        type="checkbox"
                        checked={mapLayers.incidents}
                        onChange={() => toggleMapLayer('incidents')}
                        className="rounded border-[#244A65]/20 text-[#1677C8] focus:ring-0 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                {/* Section 3: RESPONSE */}
                <div className="pt-2 border-t border-[#244A65]/10">
                  <div className="text-[11px] font-bold text-[#8A9CAA] uppercase tracking-wider mb-2">
                    Emergency Response
                  </div>
                  <div className="space-y-1">
                    <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#EDF3F7] cursor-pointer">
                      <span className="font-medium text-[#12324A]">Emergency Fleet & Units</span>
                      <input
                        type="checkbox"
                        checked={mapLayers.resources}
                        onChange={() => toggleMapLayer('resources')}
                        className="rounded border-[#244A65]/20 text-[#1677C8] focus:ring-0 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#EDF3F7] cursor-pointer">
                      <span className="font-medium text-[#12324A]">Shelters & Relief Centers</span>
                      <input
                        type="checkbox"
                        checked={mapLayers.shelters}
                        onChange={() => toggleMapLayer('shelters')}
                        className="rounded border-[#244A65]/20 text-[#1677C8] focus:ring-0 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={handleToggleFullscreen}
            className="p-2 bg-white/95 hover:bg-[#F6F9FB] text-[#12324A] border border-[#244A65]/15 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm transition-all cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen GIS'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Reroute Alert Notification Banner */}
      {isFlashFloodTriggered && (
        <div className="absolute top-16 left-4 z-20 bg-white/95 border border-[#DC4545]/30 text-[#163047] px-4 py-2.5 rounded-2xl backdrop-blur-md shadow-lg flex items-center gap-3 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-[#DC4545] animate-ping" />
          <div className="text-xs">
            <span className="font-bold text-[#DC4545]">
              {isRecalculatingRoute ? 'Route C Compromised (Flooding Ahead)' : 'Dynamic Route D Active'}
            </span>
            <span className="text-[#607487] ml-2 text-[11px]">
              {isRecalculatingRoute ? 'Recalculating safe evacuation corridor...' : 'Diverted via Deccan Elevated Flyover (96% Safety Score)'}
            </span>
          </div>
        </div>
      )}

      {/* Floating Radar Controller if Weather Radar is active */}
      {radarActive && (
        <div className="absolute top-16 right-4 z-20 bg-white/95 backdrop-blur-md border border-[#244A65]/15 rounded-2xl p-3 shadow-lg flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-[#12324A] font-bold">
            <Radio className="w-3.5 h-3.5 text-[#1677C8] animate-pulse" />
            <span>Doppler Radar</span>
          </div>
          <button
            onClick={() => setRadarPlaying(!radarPlaying)}
            className="py-1 px-2.5 bg-[#1677C8] text-white rounded-lg font-bold flex items-center gap-1 cursor-pointer"
          >
            {radarPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{radarPlaying ? 'Pause' : 'Animate'}</span>
          </button>
          <div className="flex items-center gap-1 text-[10px] text-[#607487]">
            <span className="w-2 h-2 rounded-full bg-[#70BFFF]" title="Light" />
            <span className="w-2 h-2 rounded-full bg-[#3B9CE2]" title="Moderate" />
            <span className="w-2 h-2 rounded-full bg-[#E5A824]" title="Heavy" />
            <span className="w-2 h-2 rounded-full bg-[#DC4545]" title="Extreme" />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* GOOGLE MAPS API CANVAS */}
      {/* ============================================================== */}
      <div className="w-full h-full relative">
        <APIProvider apiKey={apiKey} solutionChannel="GMP_visgl_reactgooglemaps_v1_default">
          <Map
            defaultCenter={PUNE_MAP_CENTER}
            defaultZoom={PUNE_DEFAULT_ZOOM}
            mapId="DEMO_MAP_ID"
            mapTypeId={mapType}
            gestureHandling="greedy"
            disableDefaultUI={true}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            className="w-full h-full"
          >
            {/* Map Camera Controller for programmatic pans & style updates */}
            <MapCameraController
              targetLocation={cameraTarget}
              targetZoom={cameraZoom}
              tilt={is3D ? 45 : 0}
              heading={is3D ? 35 : 0}
              mapType={mapType}
            />

            {/* Comprehensive Geospatial Layers (Polygons, Depth, Roads, Routes, Markers) */}
            <GoogleMapLayers
              mapType={mapType}
              radarActive={radarActive}
              radarStep={radarStep}
              compareActive={compareActive}
              compareDividerPct={compareDividerPct}
              depthLayerActive={depthLayerActive}
              vulnerabilityActive={false}
              onSelectSensor={setActiveSensor}
              onSelectRoad={setActiveRoad}
              onSelectHospital={setActiveHospital}
            />
          </Map>
        </APIProvider>

        {/* ============================================================== */}
        {/* BEFORE → FUTURE VIEW (COMPARE SLIDER OVERLAY) */}
        {/* ============================================================== */}
        {compareActive && (
          <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
            {/* Split Divider Handle */}
            <div
              className="absolute top-0 bottom-0 pointer-events-auto cursor-ew-resize flex items-center justify-center"
              style={{ left: `${compareDividerPct}%`, width: '4px' }}
            >
              <div className="w-1 h-full bg-white shadow-md" />
              <div className="absolute top-1/2 -translate-y-1/2 bg-white text-[#12324A] font-bold text-[10px] px-2 py-1 rounded-full border border-[#244A65]/20 shadow-lg flex items-center gap-1 select-none">
                <span>◀ CURRENT</span>
                <span>•</span>
                <span>+3H PREDICTION ▶</span>
              </div>
            </div>

            {/* Slider Range Input */}
            <input
              type="range"
              min="10"
              max="90"
              value={compareDividerPct}
              onChange={(e) => setCompareDividerPct(Number(e.target.value))}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 pointer-events-auto opacity-80"
            />
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* SENSOR DETAIL POPOVER */}
      {/* ============================================================== */}
      {activeSensor && (
        <div className="absolute top-20 left-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-[#244A65]/15 p-4 shadow-xl w-72 text-xs space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-[#244A65]/10 pb-2">
            <div>
              <span className="font-bold text-[#12324A] block">{activeSensor.name}</span>
              <span className="text-[10px] text-[#1677C8] font-mono font-bold">SENSOR {activeSensor.code}</span>
            </div>
            <button onClick={() => setActiveSensor(null)} className="text-[#8A9CAA] hover:text-[#12324A] cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 bg-[#F6F9FB] rounded-xl border border-[#244A65]/8">
              <span className="text-[#607487] block text-[10px]">Water Level</span>
              <span className="font-extrabold text-sm text-[#DC4545]">{activeSensor.value}m</span>
              <span className="text-[9px] text-[#DC4545] font-semibold">Threshold: {activeSensor.threshold}m</span>
            </div>
            <div className="p-2 bg-[#F6F9FB] rounded-xl border border-[#244A65]/8">
              <span className="text-[#607487] block text-[10px]">Rate of Rise</span>
              <span className="font-extrabold text-xs text-[#DC4545] mt-1 block">↑ 0.42m / 15m</span>
              <span className="text-[9px] text-[#607487]">Battery: {activeSensor.battery}%</span>
            </div>
          </div>

          {/* Mini Sparkline Water Level Graph */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#8A9CAA] uppercase">Recent 2-Hour Hydrograph</span>
            <div className="h-10 bg-[#EDF3F7] rounded-lg p-1 flex items-end justify-between gap-1">
              {[2.4, 2.7, 3.1, 3.5, 3.8, 4.1, 4.3].map((val, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#1677C8] rounded-t transition-all"
                  style={{ height: `${(val / 4.8) * 100}%` }}
                  title={`${val}m`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ROAD CORRIDOR DETAIL POPOVER */}
      {/* ============================================================== */}
      {activeRoad && (
        <div className="absolute top-20 left-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-[#244A65]/15 p-4 shadow-xl w-72 text-xs space-y-2.5 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-[#244A65]/10 pb-2">
            <div>
              <span className="font-bold text-[#12324A] block">{activeRoad.name}</span>
              <span className="text-[10px] text-[#607487]">Road Telemetry Segment</span>
            </div>
            <button onClick={() => setActiveRoad(null)} className="text-[#8A9CAA] hover:text-[#12324A] cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#607487]">Passability Status:</span>
            <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
              activeRoad.status === 'UNSAFE' || activeRoad.status === 'CLOSED'
                ? 'bg-[#DC4545]/10 text-[#DC4545]'
                : activeRoad.status === 'CAUTION'
                ? 'bg-[#E5A824]/10 text-[#E5A824]'
                : 'bg-[#20A464]/10 text-[#20A464]'
            }`}>
              {activeRoad.status}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#607487]">Predicted Water Depth:</span>
            <span className="font-bold text-[#12324A]">{activeRoad.depthMeters} m</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#607487]">Closure Recommended:</span>
            <span className="font-bold text-[#DC4545]">
              {activeRoad.closureRecommended ? 'YES (BARRICADE ACTIVE)' : 'NO'}
            </span>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FLOATING FORECAST TIMELINE AT BOTTOM-CENTER (NOW TO +24H) */}
      {/* ============================================================== */}
      <FloatingForecastTimeline />

      {/* Floating Bottom Left: Flood Risk Legend */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-auto hidden md:flex items-center gap-3 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-[#244A65]/12 shadow-sm text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#20A464]" />
          <span className="text-[10px] font-semibold text-[#163047]">Low (25%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#E5A824]" />
          <span className="text-[10px] font-semibold text-[#163047]">Moderate (30%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ED7A2C]" />
          <span className="text-[10px] font-semibold text-[#163047]">High (35%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#DC4545] animate-pulse" />
          <span className="text-[10px] font-bold text-[#DC4545]">Critical (42%)</span>
        </div>
      </div>
    </div>
  );
};
