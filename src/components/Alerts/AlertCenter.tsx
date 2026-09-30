import React, { useState } from 'react';
import { useCommand } from '../../context/CommandContext';
import { AlertSeverity } from '../../types';
import { 
  Bell, 
  Sparkles, 
  Send, 
  Check, 
  Globe,
  Radio,
  Smartphone,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const AlertCenter: React.FC = () => {
  const { zones, sendAlertNotification } = useCommand();

  const [selectedZoneName, setSelectedZoneName] = useState<string>('Riverside Ward');
  const [severity, setSeverity] = useState<AlertSeverity>('RED');
  const [audience, setAudience] = useState<string>('Residents of Sectors R3 & R4');
  const [language, setLanguage] = useState<'en' | 'mr' | 'hi'>('en');
  const [sentNotice, setSentNotice] = useState(false);

  const previews = {
    en: `CRITICAL FLOOD WARNING\n\nSevere flooding is predicted in ${selectedZoneName} within approximately 40 minutes.\n\nResidents in Sectors R3 and R4 should proceed toward Shelter S-04 using the recommended evacuation corridor.\n\nAvoid Riverside Underpass.`,
    mr: `गंभीर पूर इशारा\n\n${selectedZoneName} मध्ये पुढील ४० मिनिटांत पूरस्थिती उद्भवण्याचा अंदाज आहे.\n\nसेक्टर R3 आणि R4 मधील नागरिकांनी सुरक्षित स्थलांतरित व्हावे.\n\nरिव्हरसाइड अंडरपास टाळा.`,
    hi: `गंभीर बाढ़ चेतावनी\n\n${selectedZoneName} में लगभग 40 मिनट के भीतर भारी जलभराव की संभावना है।\n\nसेक्टर R3 और R4 के नागरिक सुरक्षित आश्रय स्थल की ओर प्रस्थान करें।\n\nरिवरसाइड अंडरपास से बचें।`,
  };

  const [customText, setCustomText] = useState(previews.en);

  const handleLanguageChange = (lang: 'en' | 'mr' | 'hi') => {
    setLanguage(lang);
    setCustomText(previews[lang]);
  };

  const handleGenerateAI = () => {
    setCustomText(
      `CRITICAL FLOOD WARNING (AI REFINED)\n\nFlooding predicted in ${selectedZoneName} in 38 minutes due to rainfall rate of 78 mm/hr.\n\nImmediate evacuation recommended via Route C (Deccan Flyover) to Shelter S-04.\n\nRiverside Underpass is barricaded.`
    );
  };

  const handleSend = () => {
    sendAlertNotification({
      title: `${severity} FLOOD WARNING: ${selectedZoneName}`,
      severity,
      zoneNames: [selectedZoneName],
      channels: ['SMS', 'PUSH', 'WHATSAPP', 'SIREN'],
      languages: {
        en: customText,
        hi: previews.hi,
        mr: previews.mr,
      },
      recipientsCount: 8420,
      isSimulated: true,
      status: 'BROADCASTED',
    });
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 3000);
  };

  return (
    <div className="flex-1 p-6 bg-[#EDF3F7] overflow-y-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#1677C8] uppercase tracking-wider">
              Community Warning Broadcast
            </span>
            <span className="text-[#8A9CAA]">•</span>
            <span className="text-xs text-[#607487]">Multilingual Multi-Channel Alert Gateway</span>
          </div>
          <h2 className="text-2xl font-bold text-[#12324A] tracking-tight">
            Severity-Based Public Alerts
          </h2>
          <p className="text-xs sm:text-sm text-[#607487] mt-0.5">
            Automated English, Marathi, and Hindi cell-broadcast notifications triggered by hydraulic sensor thresholds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Configuration Controls (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#244A65]/10 p-6 space-y-5 shadow-xs">
          <h3 className="text-sm font-bold text-[#12324A] uppercase tracking-wider">
            Broadcast Target & Severity
          </h3>

          {/* Zone Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#607487]">Target Municipal Sector</label>
            <select
              value={selectedZoneName}
              onChange={(e) => setSelectedZoneName(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#F6F9FB] border border-[#244A65]/10 text-xs text-[#12324A] font-medium outline-none focus:border-[#1677C8]"
            >
              {zones.map(z => (
                <option key={z.id} value={z.name}>{z.name} ({z.code})</option>
              ))}
            </select>
          </div>

          {/* Severity Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#607487]">Alert Severity Level</label>
            <div className="grid grid-cols-4 gap-2">
              {(['GREEN', 'YELLOW', 'ORANGE', 'RED'] as AlertSeverity[]).map(sev => (
                <button
                  key={sev}
                  onClick={() => setSeverity(sev)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    severity === sev
                      ? sev === 'RED'
                        ? 'bg-[#DC4545] text-white shadow-xs'
                        : sev === 'ORANGE'
                        ? 'bg-[#ED7A2C] text-white shadow-xs'
                        : sev === 'YELLOW'
                        ? 'bg-[#E5A824] text-white shadow-xs'
                        : 'bg-[#20A464] text-white shadow-xs'
                      : 'bg-[#F6F9FB] text-[#607487] border border-[#244A65]/10 hover:text-[#12324A]'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Audience Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#607487]">Target Demographic Filter</label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#F6F9FB] border border-[#244A65]/10 text-xs text-[#12324A] outline-none focus:border-[#1677C8]"
            />
          </div>

          {/* Broadcast Channels */}
          <div className="space-y-2 pt-2 border-t border-[#244A65]/10">
            <label className="text-xs font-semibold text-[#607487] block">Active Dissemination Channels</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8 flex items-center justify-between text-[#12324A]">
                <span>SMS Cell Broadcast</span>
                <span className="text-[#20A464] font-bold">ACTIVE</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8 flex items-center justify-between text-[#12324A]">
                <span>Citizen Mobile App Push</span>
                <span className="text-[#20A464] font-bold">ACTIVE</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8 flex items-center justify-between text-[#12324A]">
                <span>Civil Defense Sirens</span>
                <span className="text-[#20A464] font-bold">STANDBY</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F6F9FB] border border-[#244A65]/8 flex items-center justify-between text-[#12324A]">
                <span>Emergency Radio FM</span>
                <span className="text-[#20A464] font-bold">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Multilingual Preview & Dispatch (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#244A65]/10 p-6 space-y-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#12324A] uppercase tracking-wider">
                Multilingual Message Editor
              </h3>
              {/* Language Pills */}
              <div className="flex items-center gap-1 bg-[#EDF3F7] p-1 rounded-xl border border-[#244A65]/10 text-xs">
                {(['en', 'mr', 'hi'] as ('en' | 'mr' | 'hi')[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      language === lang
                        ? 'bg-[#1677C8] text-white shadow-2xs'
                        : 'text-[#607487] hover:text-[#12324A]'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Refine Button */}
            <div className="flex justify-end">
              <button
                onClick={handleGenerateAI}
                className="py-1.5 px-3 bg-[#F6F9FB] hover:bg-[#EDF3F7] text-[#1677C8] border border-[#244A65]/12 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Refine with Live Coordinates</span>
              </button>
            </div>

            {/* Custom Textarea */}
            <textarea
              rows={8}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#F6F9FB] border border-[#244A65]/10 text-xs text-[#12324A] leading-relaxed font-sans outline-none focus:border-[#1677C8]"
            />
          </div>

          {/* Broadcast Trigger */}
          <div className="space-y-2 pt-4 border-t border-[#244A65]/10">
            {sentNotice ? (
              <div className="py-3.5 px-4 bg-[#20A464]/10 border border-[#20A464]/30 text-[#20A464] rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>Alert broadcasted to 8,420 citizens in {selectedZoneName}.</span>
              </div>
            ) : (
              <button
                onClick={handleSend}
                className="w-full py-3.5 px-4 bg-[#1677C8] hover:bg-[#12324A] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs shadow-[#1677C8]/25 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Broadcast Emergency Cell Alert</span>
              </button>
            )}
            <p className="text-center text-[11px] text-[#8A9CAA]">
              Estimated reach: 8,420 registered devices within sector polygon boundary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
