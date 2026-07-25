import React, { useState } from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocs';
import { CheckCircle2, RotateCcw, Sparkles, Save, ShieldCheck } from 'lucide-react';

const STEPS = [
  { id: 0, label: 'Document Upload' },
  { id: 1, label: 'Identity' },
  { id: 2, label: 'Household' },
  { id: 3, label: 'Plan Details' },
  { id: 4, label: 'Cost-Sharing' },
  { id: 5, label: 'Care & Rx' },
  { id: 6, label: 'Plan Summary' }
];

export const Navigation: React.FC = () => {
  const { state, setStep, applySampleDocument, resetDraft, isAutoSaved } = useOnboarding();
  const [showPresetDropdown, setShowPresetDropdown] = useState(false);

  const progressPercent = Math.round((state.currentStep / (STEPS.length - 1)) * 100);

  return (
    <header className="sticky top-0 z-40 glass-panel bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep(0)}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 font-extrabold text-lg shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                e
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-100 tracking-tight text-lg group-hover:text-emerald-400 transition-colors">
                    emme
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Health Intake
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">Healthcare Cost Transparency Engine</p>
              </div>
            </button>
          </div>

          {/* Quick Demo Pre-fill Presets Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowPresetDropdown(!showPresetDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 hover:from-emerald-500/20 hover:to-cyan-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="hidden md:inline">Quick Demo:</span> Test Sample Docs
            </button>

            {showPresetDropdown && (
              <div className="absolute right-0 mt-2 w-80 p-2 rounded-2xl glass-panel bg-slate-900/95 border border-slate-700 shadow-2xl z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-800 text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>Load Sample Health Plan</span>
                  <span className="text-[10px] text-slate-500">1-click test</span>
                </div>
                <div className="py-1 space-y-1">
                  {SAMPLE_DOCUMENTS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        applySampleDocument(preset);
                        setShowPresetDropdown(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group border border-transparent hover:border-slate-700"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300">
                          {preset.carrier}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400">
                          {preset.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{preset.subtitle}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Auto-Save & Reset controls */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800">
              {isAutoSaved ? (
                <span className="flex items-center gap-1 text-emerald-400 font-medium animate-pulse">
                  <Save className="w-3 h-3" /> Saving...
                </span>
              ) : (
                <span className="flex items-center gap-1 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {state.lastSavedAt ? `Saved ${state.lastSavedAt}` : 'Draft ready'}
                </span>
              )}
            </div>

            <button
              onClick={() => {
                if (window.confirm('Clear draft and start fresh?')) {
                  resetDraft();
                }
              }}
              title="Reset Draft"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Step Indicator & Progress Bar */}
        <div className="mt-3 pt-3 border-t border-slate-800/60">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-medium text-slate-200">
              Step {state.currentStep + 1} of {STEPS.length}:{' '}
              <strong className="text-emerald-400">{STEPS[state.currentStep].label}</strong>
            </span>
            <span className="font-mono text-emerald-400 font-bold">{progressPercent}% complete</span>
          </div>

          {/* Progress Bar Line */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Step Pill Tabs for desktop */}
          <div className="hidden md:flex items-center justify-between mt-2.5">
            {STEPS.map((step) => {
              const isCompleted = state.currentStep > step.id;
              const isCurrent = state.currentStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setStep(step.id)}
                  className={`flex items-center gap-1.5 text-[11px] font-medium transition-all px-2 py-1 rounded-lg ${
                    isCurrent
                      ? 'text-emerald-400 bg-emerald-500/10 font-semibold border border-emerald-500/30'
                      : isCompleted
                      ? 'text-slate-300 hover:text-emerald-300'
                      : 'text-slate-500 hover:text-slate-400'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-emerald-400 text-slate-950'
                        : isCompleted
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : step.id + 1}
                  </span>
                  <span>{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
