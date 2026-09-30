import React, { useState } from 'react';
import { CommandProvider, useCommand } from './context/CommandContext';
import { TopBar } from './components/Navigation/TopBar';
import { CommandCenterHero } from './components/CommandCenter/CommandCenterHero';
import { GisCommandMap } from './components/Map/GisCommandMap';
import { AIForecastPanel } from './components/Forecast/AIForecastPanel';
import { IncidentIntelligenceCenter } from './components/Incidents/IncidentIntelligenceCenter';
import { ResponsePage } from './components/Response/ResponsePage';
import { AlertCenter } from './components/Alerts/AlertCenter';
import { AnalyticsDashboard } from './components/Analytics/AnalyticsDashboard';
import { ZoneDrawer } from './components/Drawers/ZoneDrawer';
import { ResponsePlanDrawer } from './components/Drawers/ResponsePlanDrawer';
import { IncidentDrawer } from './components/Drawers/IncidentDrawer';
import { CopilotDrawer } from './components/Modals/CopilotDrawer';
import { DigitalTwinModal } from './components/Modals/DigitalTwinModal';
import { ExplainableAiModal } from './components/Modals/ExplainableAiModal';

const MainCommandApp: React.FC = () => {
  const { activeTab } = useCommand();

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'overview':
      case 'command-center':
        return <CommandCenterHero />;
      case 'intelligence':
      case 'forecast':
        return <AIForecastPanel />;
      case 'map':
      case 'risk-map':
        return (
          <div className="flex-1 p-6 h-full bg-[#EDF3F7]">
            <GisCommandMap />
          </div>
        );
      case 'incidents':
        return <IncidentIntelligenceCenter />;
      case 'response':
      case 'evacuation':
      case 'resources':
        return <ResponsePage />;
      case 'alerts':
        return <AlertCenter />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return <CommandCenterHero />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#EDF3F7] text-[#163047] overflow-hidden font-sans">
      {/* Clean Top Header with Horizontal Navigation */}
      <TopBar />

      {/* Main Expansive Workspace */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {renderActiveTabContent()}
      </main>

      {/* Progressive Disclosure Drawers & Modals */}
      <ZoneDrawer />
      <ResponsePlanDrawer />
      <IncidentDrawer />
      <CopilotDrawer />
      <DigitalTwinModal />
      <ExplainableAiModal />
    </div>
  );
};

export function App() {
  return (
    <CommandProvider>
      <MainCommandApp />
    </CommandProvider>
  );
}

export default App;
