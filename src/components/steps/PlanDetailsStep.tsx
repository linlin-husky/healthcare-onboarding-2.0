import React from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import { Tooltip } from '../Tooltip';
import { StepAssistantTip } from '../StepAssistantTip';
import { Shield, Sparkles, ArrowRight, ArrowLeft, Award, Layers } from 'lucide-react';

const CARRIERS = [
  'Blue Cross Blue Shield',
  'UnitedHealthcare',
  'Aetna',
  'Cigna',
  'Kaiser Permanente',
  'Humana',
  'Oscar Health',
  'Molina Healthcare',
  'Other / Regional Provider'
];

const METAL_TIERS: Array<'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Catastrophic'> = [
  'Bronze',
  'Silver',
  'Gold',
  'Platinum',
  'Catastrophic'
];

const PLAN_TYPES: Array<{ type: 'HMO' | 'PPO' | 'EPO' | 'HDHP'; label: string; desc: string }> = [
  { type: 'PPO', label: 'PPO (Preferred Provider)', desc: 'Flexible in & out-of-network coverage, no referrals needed.' },
  { type: 'HMO', label: 'HMO (Health Maintenance)', desc: 'Lower costs, requires PCP primary doctor & specialist referrals.' },
  { type: 'EPO', label: 'EPO (Exclusive Provider)', desc: 'In-network coverage only, no referrals required.' },
  { type: 'HDHP', label: 'HDHP (High Deductible)', desc: 'Lower monthly premium, high deductible, HSA eligible.' }
];

export const PlanDetailsStep: React.FC = () => {
  const { state, updatePlanDetails, nextStep, prevStep } = useOnboarding();
  const { carrier, planName, metalTier, planType } = state.planDetails;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Step Assistant Tip */}
      <StepAssistantTip
        title="Selecting Your Plan Carrier & Structure"
        description="Selecting your insurance carrier (like BCBS, UHC, or Kaiser) and plan type (PPO, HMO, EPO, or HDHP) unlocks exact in-network copay rules!"
        plainEnglishExplanation="PPO plans give you freedom to see any specialist without a doctor's note. HMO plans cost less per month but require a primary doctor referral. HDHP plans let you save tax-free money in an HSA!"
      />

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-100">Health Plan Specifications</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Identify your insurance carrier and structure.
        </p>
      </div>

      {/* Auto-filled Notification Banner if extracted */}
      {state.documents.extractedFromDoc && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Values pre-populated from your uploaded document. You can modify any field below.</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6">
        {/* Insurance Carrier */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center">
            <Shield className="w-4 h-4 text-emerald-400 mr-1" />
            Insurance Carrier
            <Tooltip
              title="Insurance Carrier"
              explanation="The insurance company that pays your healthcare claims."
              whyEmmeNeedsThis="Allows Emme to fetch exact carrier-specific copay tiers and formulary rules."
            />
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CARRIERS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => updatePlanDetails({ carrier: c })}
                className={`p-2.5 rounded-xl text-xs font-semibold transition-all border text-left truncate ${
                  carrier === c
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Plan Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center">
            Specific Plan Name
            <Tooltip
              title="Plan Name"
              explanation="The exact plan title printed on your card or SBC cover page."
              whyEmmeNeedsThis="Ensures precise match against carrier network registries."
            />
          </label>
          <input
            type="text"
            value={planName}
            onChange={(e) => updatePlanDetails({ planName: e.target.value })}
            placeholder="e.g. Blue Access Gold PPO 1500 or Choice Plus Silver"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-500"
          />
        </div>

        {/* Metal Tier */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center">
            <Award className="w-4 h-4 text-cyan-400 mr-1" />
            Metal Tier
            <Tooltip
              title="Metal Tier"
              explanation="Standard ACA tiers indicating how costs are split between you and your plan."
              whyEmmeNeedsThis="Establishes actuarial value benchmark (Bronze: ~60% paid by plan, Gold: ~80%)."
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {METAL_TIERS.map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => updatePlanDetails({ metalTier: tier })}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  metalTier === tier
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Plan Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center">
            <Layers className="w-4 h-4 text-teal-400 mr-1" />
            Plan Type Network Structure
            <Tooltip
              title="Plan Type"
              explanation="HMO, PPO, EPO, or HDHP determine referral rules and out-of-network coverage."
              whyEmmeNeedsThis="Essential for calculating out-of-network penalty multipliers."
            />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PLAN_TYPES.map((pt) => (
              <button
                key={pt.type}
                type="button"
                onClick={() => updatePlanDetails({ planType: pt.type })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  planType === pt.type
                    ? 'bg-emerald-950/40 border-emerald-400 text-slate-100 shadow-md'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-200">{pt.label}</span>
                  {planType === pt.type && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{pt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            Next: Cost-Sharing & HSA <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
