import React, { useState } from 'react';
import { MEDICAL_RECORDS_DATA, type MedicalRecordItem } from '../../data/medicalRecordsData';
import { useOnboarding } from '../../context/OnboardingContext';
import { Search, Stethoscope, Sparkles, Check, Copy, ArrowRight, AlertTriangle, ShieldCheck, UserCheck, BookOpen, Layers } from 'lucide-react';

export const MedicalRecordExplainerStep: React.FC = () => {
  const { setStep } = useOnboarding();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Track active explanation tier per test item ('basic' | 'advanced' | 'md')
  const [activeTiers, setActiveTiers] = useState<Record<string, 'basic' | 'advanced' | 'md'>>(() => {
    const initial: Record<string, 'basic' | 'advanced' | 'md'> = {};
    MEDICAL_RECORDS_DATA.forEach(item => {
      initial[item.id] = 'basic';
    });
    return initial;
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Glycemic Control', 'Lipid Panel', 'Renal & Kidney', 'Thyroid Function', 'Electrolytes', 'Liver Function'];

  const filteredRecords = MEDICAL_RECORDS_DATA.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.exactValue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTierChange = (id: string, tier: 'basic' | 'advanced' | 'md') => {
    setActiveTiers(prev => ({ ...prev, [id]: tier }));
  };

  const handleCopyExplanation = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: MedicalRecordItem['status']) => {
    switch (status) {
      case 'Normal':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Elevated':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Attention Required':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-12">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Multi-Tiered Clinical Explainer AI
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Medical Record & Lab Results Hub
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Explore your exact diagnostic lab values with 3 tailored levels of explanation: <strong className="text-emerald-400">Basic</strong>, <strong className="text-cyan-400">Advanced</strong>, and <strong className="text-purple-400">MD Clinical Guidance</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="font-semibold text-slate-100">HIPAA Compliant</div>
              <div className="text-[11px] text-slate-400">Verified lab feed from Quest / LabCorp</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search test name, value (e.g. 6.8, HbA1c, LDL)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Medical Records Card List */}
      <div className="space-y-6">
        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 rounded-xl border border-slate-800">
            <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-slate-300 font-medium text-sm">No medical test records match your filter criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 text-xs text-emerald-400 underline hover:text-emerald-300"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredRecords.map(item => {
            const activeTier = activeTiers[item.id] || 'basic';
            const activeExplanationText = item.explanations[activeTier];

            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition-all space-y-6"
              >
                {/* Header & Exact Value */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-500">• Tested {item.dateTested}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-100">{item.testName}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Ordered by: {item.orderingProvider}</p>
                  </div>

                  {/* Prominent Exact Value Box */}
                  <div className="flex items-center gap-4 bg-slate-950 px-5 py-3 rounded-xl border border-slate-800 shadow-inner">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Exact Lab Value</div>
                      <div className="text-2xl font-black text-white font-mono tracking-tight">
                        {item.exactValue} <span className="text-sm font-normal text-slate-400">{item.unit}</span>
                      </div>
                    </div>
                    <div className="h-8 w-px bg-slate-800" />
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Reference Range */}
                <div className="bg-slate-950/60 px-4 py-2.5 rounded-lg border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                  <span className="text-slate-400 font-medium">Standard Reference Range:</span>
                  <span className="font-mono text-slate-300 font-semibold">{item.referenceRange}</span>
                </div>

                {/* Explanation Tier Buttons (Basic, Advanced, MD) */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-400" /> Choose Explanation Depth:
                    </span>

                    {/* Tier Selection Button Bar */}
                    <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                      {/* Basic Button */}
                      <button
                        onClick={() => handleTierChange(item.id, 'basic')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          activeTier === 'basic'
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Basic</span>
                      </button>

                      {/* Advanced Button */}
                      <button
                        onClick={() => handleTierChange(item.id, 'advanced')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          activeTier === 'advanced'
                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Advanced</span>
                      </button>

                      {/* MD Explanation Button */}
                      <button
                        onClick={() => handleTierChange(item.id, 'md')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          activeTier === 'md'
                            ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Stethoscope className="w-3.5 h-3.5" />
                        <span>MD Explanation</span>
                      </button>
                    </div>
                  </div>

                  {/* Active Explanation Content Card */}
                  <div
                    className={`p-5 rounded-xl border transition-all ${
                      activeTier === 'basic'
                        ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-100'
                        : activeTier === 'advanced'
                        ? 'bg-cyan-950/20 border-cyan-800/40 text-cyan-100'
                        : 'bg-purple-950/20 border-purple-800/40 text-purple-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        {activeTier === 'basic' && <span className="text-emerald-400">🟢 Basic Explanation (Patient Plain-Language)</span>}
                        {activeTier === 'advanced' && <span className="text-cyan-400">🔵 Advanced Explanation (Biochemical & Mechanism)</span>}
                        {activeTier === 'md' && <span className="text-purple-400">🟣 MD / Physician Level (ICD Assessment & Action Plan)</span>}
                      </span>

                      <button
                        onClick={() => handleCopyExplanation(item.id, activeExplanationText)}
                        className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-slate-900/80 hover:bg-slate-800 text-slate-300 rounded-md border border-slate-700/60 transition-colors"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" /> Copy
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed font-sans font-medium text-slate-200">
                      {activeExplanationText}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
        <button
          onClick={() => setStep(5)}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all border border-slate-700"
        >
          ← Back to Care & Rx
        </button>

        <button
          onClick={() => setStep(6)}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
        >
          <span>Continue to Final Summary</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
