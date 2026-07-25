import React, { useEffect, useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import confetti from 'canvas-confetti';
import { CheckCircle2, Download, Copy, Edit3, Sparkles, Code2, Activity, ArrowRight } from 'lucide-react';

export const ConfirmationSummary: React.FC = () => {
  const { state, setStep } = useOnboarding();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'VISUAL' | 'JSON'>('VISUAL');

  useEffect(() => {
    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback silent
    }
  }, []);

  const {
    identity,
    household,
    planDetails,
    costSharing,
    hsa,
    prescriptions,
    upcomingCare,
    documents
  } = state;

  // Synthesize clean structured JSON payload ready for backend cost calculation logic
  const jsonExportPayload = {
    metadata: {
      onboardingVersion: '2026.1.0',
      timestamp: new Date().toISOString(),
      sourcePath: documents.extractedFromDoc ? 'DocumentUpload' : 'ManualGuidedIntake',
      documentExtractionConfidence: documents.extractionConfidence || null
    },
    member: {
      fullName: identity.fullName || 'Anonymous Member',
      email: identity.email,
      zipCode: identity.zipCode
    },
    household: {
      size: household.householdSize,
      incomeRange: household.incomeRange,
      filingStatus: household.filingStatus
    },
    plan: {
      carrier: planDetails.carrier || 'Unspecified Carrier',
      planName: planDetails.planName || 'Standard Plan',
      metalTier: planDetails.metalTier,
      planType: planDetails.planType
    },
    costSharing: {
      deductibles: {
        individual: costSharing.deductibleIndividual,
        family: costSharing.deductibleFamily,
        ytdMet: costSharing.deductibleMetYtd,
        remainingIndividual: Math.max(0, costSharing.deductibleIndividual - costSharing.deductibleMetYtd)
      },
      outOfPocketMax: {
        individual: costSharing.oopMaxIndividual,
        family: costSharing.oopMaxFamily,
        ytdMet: costSharing.oopMetYtd,
        remainingIndividual: Math.max(0, costSharing.oopMaxIndividual - costSharing.oopMetYtd)
      },
      copays: {
        primaryCare: costSharing.copayPcp,
        specialist: costSharing.copaySpecialist,
        urgentCare: costSharing.copayUrgentCare,
        emergencyRoom: costSharing.copayEr
      },
      coinsurancePercentage: costSharing.coinsurancePercent,
      monthlyPremium: costSharing.monthlyPremium
    },
    hsa: {
      isEligible: hsa.hsaEligible,
      currentBalance: hsa.currentBalance,
      ytdContributions: hsa.ytdContributions,
      employerContribution: hsa.employerContribution
    },
    careProfile: {
      prescriptions: prescriptions.map(p => ({
        name: p.drugName,
        dosage: p.dosage,
        frequency: p.frequency,
        paymentMethod: p.paymentMethod,
        preferredPharmacy: p.preferredPharmacy
      })),
      upcomingProcedures: upcomingCare.plannedProcedures,
      chronicConditions: upcomingCare.chronicConditions,
      pregnancyPlanned: upcomingCare.pregnancyPlanned,
      behavioralHealthNeeds: upcomingCare.behavioralHealthNeeds
    }
  };

  const jsonString = JSON.stringify(jsonExportPayload, null, 2);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emme_health_plan_${identity.fullName.replace(/\s+/g, '_') || 'onboarding'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Calculations for Visual Bar Meters
  const dedPercent = costSharing.deductibleIndividual > 0
    ? Math.min(100, Math.round((costSharing.deductibleMetYtd / costSharing.deductibleIndividual) * 100))
    : 0;

  const oopPercent = costSharing.oopMaxIndividual > 0
    ? Math.min(100, Math.round((costSharing.oopMetYtd / costSharing.oopMaxIndividual) * 100))
    : 0;

  // Estimated annual spending math
  const annualPremiumTotal = (costSharing.monthlyPremium || 0) * 12;
  const estimatedCareOutofPocket = Math.min(
    costSharing.oopMaxIndividual || 5000,
    (costSharing.deductibleIndividual - costSharing.deductibleMetYtd) + (prescriptions.length * 120)
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Here’s what we know about your plan
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Welcome to Emme, {identity.fullName || 'Member'}!
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          We’ve compiled your plan parameters and accumulators into a structured cost model.
        </p>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex justify-center border-b border-slate-800 pb-1 gap-4">
        <button
          onClick={() => setActiveTab('VISUAL')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
            activeTab === 'VISUAL'
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400 shadow-md'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          Plan Cost Dashboard
        </button>

        <button
          onClick={() => setActiveTab('JSON')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
            activeTab === 'JSON'
              ? 'bg-cyan-500/15 text-cyan-300 border-cyan-400 shadow-md'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
          }`}
        >
          <Code2 className="w-4 h-4 text-cyan-400" />
          Structured JSON Export
        </button>
      </div>

      {/* Tab 1: Visual Cost Dashboard */}
      {activeTab === 'VISUAL' && (
        <div className="space-y-6">
          {/* Card 1: Key Plan Specifications */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                  {planDetails.carrier ? planDetails.carrier.charAt(0) : 'P'}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    {planDetails.carrier || 'Health Insurance Plan'}
                  </h3>
                  <p className="text-xs text-slate-400">{planDetails.planName || 'Custom Plan'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-semibold text-xs border border-cyan-500/20">
                  {planDetails.metalTier} Tier
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 font-semibold text-xs border border-emerald-500/20">
                  {planDetails.planType} Network
                </span>
                <button
                  onClick={() => setStep(3)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-slate-800 transition-colors ml-2"
                  title="Edit Plan Details"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium block">Monthly Premium</span>
                <span className="text-lg font-bold text-slate-100 font-mono">${costSharing.monthlyPremium}/mo</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium block">Coinsurance Split</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">{costSharing.coinsurancePercent}% member</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium block">Doctor Copay</span>
                <span className="text-lg font-bold text-slate-100 font-mono">${costSharing.copayPcp} PCP / ${costSharing.copaySpecialist} Spec</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium block">HSA Balance</span>
                <span className="text-lg font-bold text-cyan-300 font-mono">
                  {hsa.hsaEligible ? `$${hsa.currentBalance}` : 'Ineligible'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Accumulator Gauges */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                2026 Financial Accumulator Progress
              </h3>
              <button
                onClick={() => setStep(4)}
                className="text-xs text-emerald-400 hover:underline font-semibold flex items-center gap-1"
              >
                Edit Accumulators <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Deductible Meter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">
                  Individual Deductible Progress (${costSharing.deductibleMetYtd} of ${costSharing.deductibleIndividual})
                </span>
                <span className="font-mono font-bold text-emerald-400">{dedPercent}% Met</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${dedPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Remaining deductible before plan coinsurance kicks in:{' '}
                <strong className="text-emerald-300">${Math.max(0, costSharing.deductibleIndividual - costSharing.deductibleMetYtd)}</strong>
              </p>
            </div>

            {/* OOP Max Meter */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">
                  Out-of-Pocket Maximum Progress (${costSharing.oopMetYtd} of ${costSharing.oopMaxIndividual})
                </span>
                <span className="font-mono font-bold text-cyan-400">{oopPercent}% Met</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${oopPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Max remaining financial exposure this year:{' '}
                <strong className="text-cyan-300">${Math.max(0, costSharing.oopMaxIndividual - costSharing.oopMetYtd)}</strong>
              </p>
            </div>
          </div>

          {/* Card 3: Emme Projected Annual Spend Summary */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                <h3 className="text-base font-bold text-slate-100">Emme Estimated Total Annual Exposure</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                Calculated Model
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Fixed Premiums (12 mo)</span>
                <span className="text-xl font-extrabold text-slate-200 font-mono">${annualPremiumTotal}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Est. Care Out-of-Pocket</span>
                <span className="text-xl font-extrabold text-emerald-400 font-mono">${estimatedCareOutofPocket}</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40">
                <span className="text-xs text-emerald-300 block mb-1 font-semibold">Total Projected Spend</span>
                <span className="text-2xl font-black text-emerald-300 font-mono">${annualPremiumTotal + estimatedCareOutofPocket}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Structured JSON Exporter */}
      {activeTab === 'JSON' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-400" />
                Engine-Ready JSON Payload
              </h3>
              <p className="text-xs text-slate-400">Standardized schema export for cost-calculation engine API</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyJson}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                {copied ? 'Copied to Clipboard!' : 'Copy JSON'}
              </button>
              <button
                onClick={handleDownloadJson}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                Download JSON File
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto max-h-[500px] leading-relaxed shadow-inner">
            <code>{jsonString}</code>
          </pre>
        </div>
      )}

      {/* Next Steps / Re-edit navigation footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 glass-panel rounded-3xl border border-slate-800">
        <div className="text-xs text-slate-400 text-center sm:text-left">
          Need to adjust your inputs? Click any step tab in the navbar above to edit.
        </div>
        <button
          onClick={handleDownloadJson}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          Export & Save Profile <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
