import React, { useState } from 'react';
import type { CostSharingData } from '../types/onboarding';
import { Calculator, CheckCircle2 } from 'lucide-react';

interface LiveCostEstimatorWidgetProps {
  costSharing: CostSharingData;
}

export const LiveCostEstimatorWidget: React.FC<LiveCostEstimatorWidgetProps> = ({ costSharing }) => {
  const [selectedScenario, setSelectedScenario] = useState<'pcp' | 'specialist' | 'procedure' | 'er'>('pcp');

  const SCENARIOS = [
    { id: 'pcp', label: 'PCP Doctor Visit', billed: 200, icon: '🩺', copay: costSharing.copayPcp },
    { id: 'specialist', label: 'Specialist Visit', billed: 450, icon: '👨‍⚕️', copay: costSharing.copaySpecialist },
    { id: 'procedure', label: 'MRI / Outpatient Procedure', billed: 2500, icon: '🏥', copay: 0 },
    { id: 'er', label: 'Emergency Room Visit', billed: 5000, icon: '🚑', copay: costSharing.copayEr }
  ];

  const current = SCENARIOS.find(s => s.id === selectedScenario) || SCENARIOS[0];

  // Calculation Math
  const remainingDeductible = Math.max(0, costSharing.deductibleIndividual - costSharing.deductibleMetYtd);
  const remainingOopMax = Math.max(0, costSharing.oopMaxIndividual - costSharing.oopMetYtd);

  let calculatedOop = 0;
  let breakdownExplanation = '';

  if (current.copay > 0) {
    calculatedOop = Math.min(current.copay, remainingOopMax);
    breakdownExplanation = `Covered by a flat $${current.copay} copay. Insurance pays the rest!`;
  } else {
    // Subject to deductible & coinsurance
    const amountSubjectToDeductible = Math.min(current.billed, remainingDeductible);
    const amountAfterDeductible = Math.max(0, current.billed - amountSubjectToDeductible);
    const coinsuranceAmount = amountAfterDeductible * (costSharing.coinsurancePercent / 100);

    calculatedOop = Math.min(amountSubjectToDeductible + coinsuranceAmount, remainingOopMax);
    
    if (amountSubjectToDeductible > 0) {
      breakdownExplanation = `$${amountSubjectToDeductible} applied to remaining deductible + ${costSharing.coinsurancePercent}% coinsurance ($${coinsuranceAmount.toFixed(0)}) on balance.`;
    } else {
      breakdownExplanation = `Deductible met! You only pay ${costSharing.coinsurancePercent}% coinsurance ($${coinsuranceAmount.toFixed(0)}).`;
    }
  }

  const insurancePays = Math.max(0, current.billed - calculatedOop);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">Live "What Will I Pay?" Simulator</h4>
            <p className="text-[11px] text-slate-400">See your exact out-of-pocket price for sample medical visits</p>
          </div>
        </div>
        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Instant Math
        </span>
      </div>

      {/* Scenario Selection Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {SCENARIOS.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelectedScenario(s.id as any)}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedScenario === s.id
                ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-md shadow-emerald-500/10'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-base mb-0.5">{s.icon}</div>
            <div className="text-xs font-bold text-slate-200 truncate">{s.label}</div>
            <div className="text-[10px] text-slate-400 font-mono">${s.billed} billed</div>
          </button>
        ))}
      </div>

      {/* Real-time Calculation Result Box */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 justify-center sm:justify-start">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Estimated Out-of-Pocket Cost:</span>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            ${calculatedOop.toFixed(0)} <span className="text-xs font-normal text-slate-400">/ ${current.billed} billed</span>
          </div>
          <p className="text-xs text-slate-300 font-medium">{breakdownExplanation}</p>
        </div>

        <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-center shrink-0">
          <div className="text-[10px] uppercase font-bold text-slate-500">Plan Insurance Pays</div>
          <div className="text-lg font-bold text-cyan-400 font-mono">${insurancePays.toFixed(0)}</div>
        </div>
      </div>
    </div>
  );
};
