import React, { useState } from 'react';
import { useCommand } from '../../context/CommandContext';
import { 
  ShieldAlert, 
  Search, 
  Bell, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles,
  CheckCircle2,
  X,
  MapPin,
  AlertTriangle
} from 'lucide-react';
import { ActiveTab } from '../../types';

export const TopBar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    demoPlaying,
    demoStep,
    startLiveDemo,
    pauseLiveDemo,
    resetLiveDemo,
    setCopilotOpen,
    copilotOpen,
    alerts,
    demoSimulationToast,
    zones,
    setSelectedZone,
    setSelectedZoneDrawerOpen
  } = useCommand();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'intelligence', label: 'Intelligence' },
    { id: 'incidents', label: 'Incidents' },
    { id: 'response', label: 'Response' },
    { id: 'analytics', label: 'Analytics' },
  ];

  const isItemActive = (id: ActiveTab) => {
    if (id === 'overview') return activeTab === 'overview' || activeTab === 'command-center';
    if (id === 'intelligence') return activeTab === 'intelligence' || activeTab === 'forecast';
    if (id === 'incidents') return activeTab === 'incidents';
    if (id === 'response') return activeTab === 'response' || activeTab === 'evacuation' || activeTab === 'resources';
    if (id === 'analytics') return activeTab === 'analytics';
    return activeTab === id;
  };

  const filteredZones = searchQuery.trim()
    ? zones.filter(z => z.name.toLowerCase().includes(searchQuery.toLowerCase()) || z.code.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <header className="h-[70px] bg-[#E8EFF5]/90 backdrop-blur-md border-b border-[#244A65]/10 px-6 flex items-center justify-between z-30 select-none transition-all">
      {/* LEFT: Logo & Subtitle */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          {/* Logo Icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1677C8] to-[#12324A] flex items-center justify-center text-white shadow-sm shadow-[#1677C8]/20 group-hover:scale-105 transition-transform">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold tracking-tight text-[#12324A]">
                FLOODSHIELD
              </span>
              <span className="text-xs font-bold text-[#1677C8] tracking-widest px-1.5 py-0.5 rounded bg-[#1677C8]/10 border border-[#1677C8]/20">
                AI
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#607487] tracking-tight -mt-0.5">
              Urban Resilience Intelligence
            </p>
          </div>
        </button>
      </div>

      {/* CENTER: Horizontal Navigation Bar */}
      <nav className="hidden md:flex items-center gap-1 bg-[#DCE7EF]/70 p-1.5 rounded-full border border-[#244A65]/10">
        {navItems.map((item) => {
          const active = isItemActive(item.id);
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                active
                  ? 'bg-white text-[#1677C8] font-semibold shadow-xs border border-[#1677C8]/15'
                  : 'text-[#607487] hover:text-[#163047] hover:bg-white/50'
              }`}
            >
              {item.label}
              {active && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#1677C8] rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* RIGHT: Operational Status, Search, Simulation, Notifications, Avatar */}
      <div className="flex items-center gap-3">
        {/* Systems Operational Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-white/80 rounded-full border border-[#20A464]/25 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#20A464] animate-pulse" />
          <span className="text-xs font-medium text-[#163047]">Systems Operational</span>
        </div>

        {/* Live Simulation Control */}
        <div className="flex items-center bg-white/80 border border-[#244A65]/10 rounded-xl p-0.5 shadow-2xs">
          <button
            onClick={demoPlaying ? pauseLiveDemo : startLiveDemo}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              demoPlaying
                ? 'bg-[#E5A824] text-white font-semibold'
                : 'text-[#163047] hover:bg-[#EDF3F7]'
            }`}
            title="Run 8-Step Emergency Simulation"
          >
            {demoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Sim: {demoStep}/8</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-[#1677C8] text-[#1677C8]" />
                <span className="hidden sm:inline">Simulation</span>
              </>
            )}
          </button>
          {demoStep > 0 && (
            <button
              onClick={resetLiveDemo}
              className="p-1 text-[#607487] hover:text-[#163047] rounded transition-colors"
              title="Reset Simulation"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* AI Copilot Button */}
        <button
          onClick={() => setCopilotOpen(!copilotOpen)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer ${
            copilotOpen
              ? 'bg-[#1677C8] text-white border-[#1677C8]'
              : 'bg-white/80 border-[#244A65]/12 text-[#1677C8] hover:border-[#1677C8]/40 hover:bg-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">AI Copilot</span>
        </button>

        {/* Search Icon & Popover */}
        <div className="relative">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-xl text-[#607487] hover:text-[#163047] bg-white/60 hover:bg-white border border-[#244A65]/10 transition-colors shadow-2xs cursor-pointer"
            aria-label="Search"
            title="Quick Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {searchOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#244A65]/15 p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2 pb-2 border-b border-[#244A65]/10">
                <Search className="w-4 h-4 text-[#607487]" />
                <input
                  type="text"
                  placeholder="Search zone, ward, or sensor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs text-[#163047] placeholder:text-[#8A9CAA] outline-none"
                  autoFocus
                />
                <button 
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="text-[#8A9CAA] hover:text-[#163047]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-2 max-h-48 overflow-y-auto space-y-1">
                {searchQuery.trim() === '' ? (
                  <p className="text-[11px] text-[#8A9CAA] p-2 text-center">Type zone name (e.g., Riverside, Deccan)</p>
                ) : filteredZones.length === 0 ? (
                  <p className="text-[11px] text-[#8A9CAA] p-2 text-center">No zones found</p>
                ) : (
                  filteredZones.map(z => (
                    <button
                      key={z.id}
                      onClick={() => {
                        setSelectedZone(z);
                        setSelectedZoneDrawerOpen(true);
                        setSearchOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#EDF3F7] text-left text-xs text-[#163047] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#1677C8]" />
                        <span>{z.name}</span>
                      </div>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        z.riskLevel === 'CRITICAL' ? 'bg-[#DC4545]/10 text-[#DC4545]' :
                        z.riskLevel === 'HIGH' ? 'bg-[#ED7A2C]/10 text-[#ED7A2C]' :
                        z.riskLevel === 'MODERATE' ? 'bg-[#E5A824]/10 text-[#E5A824]' :
                        'bg-[#20A464]/10 text-[#20A464]'
                      }`}>
                        {z.riskScore}/100
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Icon & Popover */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-xl text-[#607487] hover:text-[#163047] bg-white/60 hover:bg-white border border-[#244A65]/10 transition-colors shadow-2xs cursor-pointer"
            aria-label="Notifications"
            title="Alert Notifications"
          >
            <Bell className="w-4 h-4" />
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC4545] ring-2 ring-white" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#244A65]/15 p-3.5 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#244A65]/10">
                <span className="text-xs font-bold text-[#12324A] uppercase tracking-wider">
                  Live Notifications ({alerts.length})
                </span>
                <button 
                  onClick={() => setNotificationsOpen(false)}
                  className="text-[#8A9CAA] hover:text-[#163047]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="mt-2 max-h-60 overflow-y-auto space-y-2">
                {alerts.slice(0, 4).map(alert => (
                  <div key={alert.id} className="p-2.5 rounded-lg bg-[#F6F9FB] border border-[#244A65]/10 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#DC4545] flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-[#DC4545]" />
                        {alert.title}
                      </span>
                      <span className="text-[10px] text-[#8A9CAA]">{alert.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-[#607487] leading-relaxed">{alert.languages?.en || alert.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Operator Avatar */}
        <div className="flex items-center gap-2 pl-1 border-l border-[#244A65]/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#12324A] to-[#1677C8] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
            OP
          </div>
          <div className="hidden 2xl:block text-left">
            <div className="text-xs font-semibold text-[#163047] leading-tight">Chief Officer</div>
            <div className="text-[10px] text-[#8A9CAA] leading-tight">Pune EOC Command</div>
          </div>
        </div>
      </div>
    </header>
  );
};
