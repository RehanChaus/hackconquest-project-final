import React, { useState } from 'react';
import { useCommand } from '../../context/CommandContext';
import { Incident } from '../../types';
import { 
  AlertCircle, 
  CheckCircle, 
  Smartphone, 
  Radio, 
  Video, 
  PhoneCall, 
  Search,
  Filter,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const IncidentIntelligenceCenter: React.FC = () => {
  const { incidents, setSelectedIncident, setSelectedIncidentDrawerOpen } = useCommand();
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const getSourceLabel = (src: Incident['source']) => {
    switch (src) {
      case 'CITIZEN_APP':
        return 'Citizen Report';
      case 'SOCIAL_MEDIA':
        return 'Social Signal';
      case 'IOT_SENSOR':
        return 'IoT Sensor Alert';
      case 'EMERGENCY_CALL':
        return 'Emergency Call';
      case 'CCTV':
        return 'CCTV AI Vision';
      default:
        return 'Field Responder';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-[#DC4545]/10 text-[#DC4545] border-[#DC4545]/25';
      case 'HIGH':
        return 'bg-[#ED7A2C]/10 text-[#ED7A2C] border-[#ED7A2C]/25';
      case 'MODERATE':
        return 'bg-[#E5A824]/10 text-[#E5A824] border-[#E5A824]/25';
      default:
        return 'bg-[#20A464]/10 text-[#20A464] border-[#20A464]/25';
    }
  };

  const filteredIncidents = incidents.filter(i => {
    if (filterSeverity !== 'ALL' && i.severity !== filterSeverity) return false;
    if (searchQuery && !i.title.toLowerCase().includes(searchQuery.toLowerCase()) && !i.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleRowClick = (inc: Incident) => {
    setSelectedIncident(inc);
    setSelectedIncidentDrawerOpen(true);
  };

  return (
    <div className="flex-1 p-6 bg-[#EDF3F7] overflow-y-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#1677C8] uppercase tracking-wider">
              Verification Engine
            </span>
            <span className="text-[#8A9CAA]">•</span>
            <span className="text-xs text-[#607487]">Real-Time Cross-Source Triangulation</span>
          </div>
          <h2 className="text-2xl font-bold text-[#12324A] tracking-tight">
            Incident Intelligence & Verification
          </h2>
          <p className="text-xs sm:text-sm text-[#607487] mt-0.5">
            Cross-verifying civic reports, IoT river gauges, and smart city traffic cameras to eliminate false alarms.
          </p>
        </div>

        {/* Severity Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#244A65]/10 shadow-2xs text-xs">
          {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-lg transition-all font-semibold cursor-pointer ${
                filterSeverity === sev
                  ? 'bg-[#1677C8] text-white shadow-2xs'
                  : 'text-[#607487] hover:text-[#12324A] hover:bg-[#F6F9FB]'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Clean Table */}
      <div className="bg-white rounded-2xl border border-[#244A65]/10 overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#244A65]/10 text-[#607487] bg-[#F6F9FB]">
              <th className="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">Incident</th>
              <th className="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">Sector Location</th>
              <th className="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">Telemetry Source</th>
              <th className="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">Severity</th>
              <th className="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">AI Confidence</th>
              <th className="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">State</th>
              <th className="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px] text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#244A65]/8 text-[#163047]">
            {filteredIncidents.map(inc => {
              const isVerified = inc.status === 'VERIFIED';
              return (
                <tr
                  key={inc.id}
                  onClick={() => handleRowClick(inc)}
                  className="hover:bg-[#F6F9FB] transition-colors cursor-pointer"
                >
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#12324A]">{inc.code}</div>
                    <div className="text-[11px] text-[#607487] max-w-xs truncate mt-0.5 font-medium">
                      {inc.title}
                    </div>
                  </td>
                  <td className="py-4 px-5 text-[#607487] font-medium">{inc.location}</td>
                  <td className="py-4 px-5 text-[#607487]">{getSourceLabel(inc.source)}</td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md border text-[11px] font-bold ${getSeverityBadge(
                        inc.severity
                      )}`}
                    >
                      {inc.severity}
                    </span>
                  </td>
                  <td className="py-4 px-5 font-bold text-[#12324A]">
                    {inc.verificationScore}%
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center gap-1.5 font-bold text-[11px] ${
                        isVerified ? 'text-[#20A464]' : 'text-[#E5A824]'
                      }`}
                    >
                      {isVerified && <CheckCircle className="w-3.5 h-3.5 text-[#20A464]" />}
                      <span>{inc.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right text-[#8A9CAA] font-medium text-[11px]">
                    {inc.timestamp}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
