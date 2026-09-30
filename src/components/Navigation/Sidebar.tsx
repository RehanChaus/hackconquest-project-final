import React from 'react';
import { useCommand } from '../../context/CommandContext';
import { ActiveTab } from '../../types';
import {
  LayoutDashboard,
  Map,
  AlertCircle,
  Shield,
  Bell,
  BarChart2,
  Settings,
  User,
  ShieldAlert
} from 'lucide-react';

interface NavButton {
  id: ActiveTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, incidents } = useCommand();

  const activeIncidentsCount = incidents.filter(i => i.status !== 'FALSE_POSITIVE').length;

  const mainNav: NavButton[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'incidents', label: 'Incidents', icon: AlertCircle, badge: activeIncidentsCount },
    { id: 'response', label: 'Response', icon: Shield },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  ];

  const currentTab = activeTab === 'command-center' ? 'overview' 
    : activeTab === 'risk-map' ? 'map' 
    : (activeTab === 'evacuation' || activeTab === 'resources') ? 'response' 
    : activeTab;

  return (
    <aside className="w-[72px] shrink-0 bg-[#0C1726] border-r border-[rgba(255,255,255,0.06)] flex flex-col items-center justify-between py-5 z-30 select-none">
      {/* Top Logo Icon */}
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={() => setActiveTab('overview')}
          className="w-10 h-10 rounded-xl bg-[#2F9BFF]/10 border border-[#2F9BFF]/30 flex items-center justify-center text-[#2F9BFF] hover:bg-[#2F9BFF]/20 transition-colors group relative"
          title="FloodShield AI Overview"
        >
          <ShieldAlert className="w-5 h-5 text-[#2F9BFF]" />
        </button>

        {/* 6 Core Navigation Icons */}
        <nav className="flex flex-col items-center gap-2">
          {mainNav.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all relative ${
                    isActive
                      ? 'bg-[#2F9BFF] text-white shadow-md shadow-[#2F9BFF]/20 font-medium'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#162436]'
                  }`}
                  aria-label={item.label}
                >
                  <Icon className="w-5 h-5" />

                  {item.badge !== undefined && item.badge > 0 && !isActive && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EF4444]" />
                  )}
                </button>

                {/* Clean Hover Label Tooltip */}
                <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#162436] text-[#F8FAFC] text-xs font-medium rounded-md shadow-xl border border-[rgba(255,255,255,0.08)] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                  {item.label}
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Settings & Profile */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative group">
          <button
            onClick={() => setActiveTab('analytics')}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#162436] transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#162436] text-[#F8FAFC] text-xs font-medium rounded-md shadow-xl border border-[rgba(255,255,255,0.08)] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
            Settings
          </div>
        </div>

        <div className="relative group">
          <button
            className="w-10 h-10 rounded-xl bg-[#111E2E] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#2F9BFF]/40 transition-colors"
            aria-label="Operator Profile"
          >
            <User className="w-4 h-4" />
          </button>
          <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#162436] text-[#F8FAFC] text-xs font-medium rounded-md shadow-xl border border-[rgba(255,255,255,0.08)] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
            Cmdr. Deshmukh (Pune EOC)
          </div>
        </div>
      </div>
    </aside>
  );
};
