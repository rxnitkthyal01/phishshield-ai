import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, ShieldCheck, History, Settings, ExternalLink, AlertTriangle } from 'lucide-react';

const Popup = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, we'd fetch the latest report from the background/storage
    setTimeout(() => {
      setReport({
        totalScore: 12,
        threatLevel: 'Safe',
        domain: window.location.hostname || 'current-site.com',
        breakdown: {
          url: 5,
          form: 0,
          ssl: 0,
          ai: 7
        }
      });
      setLoading(false);
    }, 800);
  }, []);

  const getStatusColor = (score) => {
    if (score >= 85) return 'text-red-600 bg-red-50 border-red-200';
    if (score >= 60) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (score >= 30) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  if (loading) {
    return (
      <div className="w-80 p-6 flex items-center justify-center bg-white h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-slate-50 text-slate-900 font-sans shadow-xl border border-slate-200">
      {/* Header */}
      <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="text-blue-600" size={20} />
          <h1 className="text-lg font-extrabold tracking-tight">PhishShield AI</h1>
        </div>
        <Settings size={18} className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" />
      </div>

      {/* Main Status */}
      <div className="p-4">
        <div className={`rounded-xl border p-4 mb-4 transition-all ${getStatusColor(report.totalScore)}`}>
          <div className="flex items-center gap-3 mb-2">
            {report.totalScore < 30 ? <ShieldCheck size={28} /> : <AlertTriangle size={28} />}
            <div>
              <p className="text-sm font-bold uppercase tracking-wider">{report.threatLevel} Risk</p>
              <p className="text-xs opacity-80">{report.domain}</p>
            </div>
          </div>
          <div className="w-full bg-black/5 rounded-full h-1.5 mt-3">
            <div 
              className="bg-current h-1.5 rounded-full transition-all duration-1000" 
              style={{ width: `${report.totalScore}%` }}
            ></div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 mb-4 shadow-sm">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Threat Breakdown</h2>
          <div className="space-y-3">
            {[
              { label: 'URL Intelligence', score: report.breakdown.url },
              { label: 'Form Security', score: report.breakdown.form },
              { label: 'SSL Integrity', score: report.breakdown.ssl },
              { label: 'AI Brand Check', score: report.breakdown.ai },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-xs text-slate-600">{item.label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-slate-100 h-1 rounded-full">
                    <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${item.score}%` }}></div>
                  </div>
                  <span className="text-[10px] font-mono font-bold w-4 text-right">{item.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            <History size={14} /> History
          </button>
          <button className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            <ShieldAlert size={14} /> Report
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 bg-slate-100/50 border-t border-slate-200 text-center">
        <a href="#" className="text-[10px] text-blue-600 font-bold hover:underline flex items-center justify-center gap-1 uppercase tracking-tighter">
          Full Threat Report <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
};

export default Popup;
