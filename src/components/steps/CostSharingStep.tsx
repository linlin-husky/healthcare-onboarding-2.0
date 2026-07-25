import React, { useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import { Tooltip } from '../Tooltip';
import { DocumentLocatorModal } from '../DocumentLocatorModal';
import { StepAssistantTip } from '../StepAssistantTip';
import { LiveCostEstimatorWidget } from '../LiveCostEstimatorWidget';
import { PiggyBank, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';

export const CostSharingStep: React.FC = () => {
  const { state, updateCostSharing, updateHsa, nextStep, prevStep } = useOnboarding();
  const [locatorOpen, setLocatorOpen] = useState(false);
  const [activeLocatorField, setActiveLocatorField] = useState('Deductible');

  const {
    deductibleIndividual,
    deductibleFamily,
    deductibleMetYtd,
    oopMaxIndividual,
    oopMaxFamily,
    oopMetYtd,
    copayPcp,
    copaySpecialist,
    copayUrgentCare,
    copayEr,
    coinsurancePercent,
    monthlyPremium
  } = state.costSharing;

  const { hsaEligible, currentBalance, ytdContributions, employerContribution } = state.hsa;

  const openLocator = (field: string) => {
    setActiveLocatorField(field);
    setLocatorOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Friendly Step Guidance Tip */}
      <StepAssistantTip
        title="Understanding Cost-Sharing: Deductibles, Copays & Out-of-Pocket Limits"
        description="Don't worry if these terms look confusing! Entering your deductibles and copays helps us calculate your exact cost for doctor visits, emergency care, and medications."
        plainEnglishExplanation="Your Deductible is what you pay first out-of-pocket before insurance helps. A Copay is a fixed dollar fee (like $25 for a doctor visit). Once you hit your Out-of-Pocket Max, your insurance pays 100% of everything else!"
      />

      {/* Interactive Live Cost Estimator Widget */}
      <LiveCostEstimatorWidget costSharing={state.costSharing} />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Cost-Sharing & HSA Accumulators</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Tell us how costs are split between you and your insurer.
          </p>
        </div>

        {/* Visual Document Guide Button */}
        <button
          type="button"
          onClick={() => openLocator('Deductible & EOB')}
          className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
        >
          <BookOpen className="w-4 h-4 text-cyan-400" />
          Where to find on EOB / SBC
        </button>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-8">
        {/* Section 1: Deductibles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center">
              1. Deductibles (Individual & Family)
              <Tooltip
                title="Deductible"
                explanation="The amount you must pay out-of-pocket for covered medical services before your insurance begins paying coinsurance."
                whyEmmeNeedsThis="Emme calculates when your plan shifts from 100% member responsibility to coinsurance cost-sharing."
                eobLocation="Listed on EOB Statement under 'Annual Deductible Status'."
                onOpenLocator={() => openLocator('Deductible')}
              />
            </h3>
            <span className="text-[11px] text-slate-400">Step 1 of 3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Individual Deductible
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  value={deductibleIndividual || ''}
                  onChange={(e) => updateCostSharing({ deductibleIndividual: Number(e.target.value) })}
                  placeholder="1500"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Family Deductible
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  value={deductibleFamily || ''}
                  onChange={(e) => updateCostSharing({ deductibleFamily: Number(e.target.value) })}
                  placeholder="3000"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-400 mb-1 flex items-center">
                YTD Deductible Met
                <Tooltip
                  title="YTD Deductible Met"
                  explanation="How much money you have already paid towards your annual deductible so far this year."
                  whyEmmeNeedsThis="Ensures Emme accurately reflects your current remaining deductible balance for upcoming care."
                  eobLocation="Found on your latest EOB accumulator box."
                  onOpenLocator={() => openLocator('YTD Deductible Met')}
                />
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-emerald-400 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  value={deductibleMetYtd || ''}
                  onChange={(e) => updateCostSharing({ deductibleMetYtd: Number(e.target.value) })}
                  placeholder="850"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-900 border border-emerald-500/50 text-emerald-300 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Out of Pocket Maximums */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center">
              2. Out-of-Pocket Maximum (OOP Max)
              <Tooltip
                title="Out-of-Pocket Maximum"
                explanation="The absolute most you will have to pay for covered care in a plan year. Once reached, your insurance pays 100% of covered services."
                whyEmmeNeedsThis="Sets your maximum annual financial risk ceiling in worst-case medical scenarios."
                eobLocation="Listed on SBC Page 1 or EOB Accumulator section."
                onOpenLocator={() => openLocator('Out-of-Pocket Maximum')}
              />
            </h3>
            <span className="text-[11px] text-slate-400">Step 2 of 3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Individual OOP Max
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  value={oopMaxIndividual || ''}
                  onChange={(e) => updateCostSharing({ oopMaxIndividual: Number(e.target.value) })}
                  placeholder="4500"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Family OOP Max
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  value={oopMaxFamily || ''}
                  onChange={(e) => updateCostSharing({ oopMaxFamily: Number(e.target.value) })}
                  placeholder="9000"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-cyan-400 mb-1 flex items-center">
                YTD OOP Met
                <Tooltip
                  title="YTD OOP Met"
                  explanation="Total amount paid towards your annual Out-of-Pocket Maximum so far this year."
                  whyEmmeNeedsThis="Tells Emme how close you are to 100% free care for the remainder of the plan year."
                  eobLocation="Found on your latest EOB statement."
                  onOpenLocator={() => openLocator('YTD OOP Met')}
                />
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-cyan-400 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  value={oopMetYtd || ''}
                  onChange={(e) => updateCostSharing({ oopMetYtd: Number(e.target.value) })}
                  placeholder="1200"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/50 text-cyan-300 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Copays, Coinsurance & Premium */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center">
              3. Service Copays, Coinsurance & Monthly Premium
              <Tooltip
                title="Copays & Coinsurance"
                explanation="Copay is a fixed dollar fee per visit (e.g. $25). Coinsurance is a percentage split (e.g. 20% member, 80% plan) paid after deductible."
                whyEmmeNeedsThis="Calculates precise fee estimates for future doctor, urgent care, or ER visits."
              />
            </h3>
            <span className="text-[11px] text-slate-400">Step 3 of 3</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                PCP Visit Copay
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">$</span>
                <input
                  type="number"
                  min="0"
                  value={copayPcp || ''}
                  onChange={(e) => updateCostSharing({ copayPcp: Number(e.target.value) })}
                  placeholder="25"
                  className="w-full pl-6 pr-2 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Specialist Copay
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">$</span>
                <input
                  type="number"
                  min="0"
                  value={copaySpecialist || ''}
                  onChange={(e) => updateCostSharing({ copaySpecialist: Number(e.target.value) })}
                  placeholder="45"
                  className="w-full pl-6 pr-2 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Urgent Care Copay
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">$</span>
                <input
                  type="number"
                  min="0"
                  value={copayUrgentCare || ''}
                  onChange={(e) => updateCostSharing({ copayUrgentCare: Number(e.target.value) })}
                  placeholder="60"
                  className="w-full pl-6 pr-2 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                ER Visit Copay
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">$</span>
                <input
                  type="number"
                  min="0"
                  value={copayEr || ''}
                  onChange={(e) => updateCostSharing({ copayEr: Number(e.target.value) })}
                  placeholder="350"
                  className="w-full pl-6 pr-2 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center">
                Coinsurance Percentage (%)
                <Tooltip
                  title="Coinsurance"
                  explanation="Your percentage share of costs after reaching your deductible (e.g., 20% means you pay 20%, insurer pays 80%)."
                  whyEmmeNeedsThis="Calculates cost split for surgeries, lab work, and imaging procedures."
                />
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={coinsurancePercent || ''}
                  onChange={(e) => updateCostSharing({ coinsurancePercent: Number(e.target.value) })}
                  placeholder="20"
                  className="w-full pl-4 pr-8 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm font-mono"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 text-sm">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center">
                Monthly Premium Paid
                <Tooltip
                  title="Monthly Premium"
                  explanation="The fixed amount paid each month to maintain your health insurance active."
                  whyEmmeNeedsThis="Used to calculate your Total Annual Healthcare Cost (Premium + Expected Out of Pocket)."
                />
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  value={monthlyPremium || ''}
                  onChange={(e) => updateCostSharing({ monthlyPremium: Number(e.target.value) })}
                  placeholder="420"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: HSA Module */}
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-emerald-400" />
              <h4 className="text-sm font-bold text-slate-100">Health Savings Account (HSA) Status</h4>
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={hsaEligible}
                onChange={(e) => updateHsa({ hsaEligible: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-slate-900 border-slate-700"
              />
              <span className="font-semibold text-emerald-400">HSA Eligible Plan</span>
            </label>
          </div>

          {hsaEligible && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 animate-in fade-in">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Current HSA Balance
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">$</span>
                  <input
                    type="number"
                    min="0"
                    value={currentBalance || ''}
                    onChange={(e) => updateHsa({ currentBalance: Number(e.target.value) })}
                    placeholder="1250"
                    className="w-full pl-6 pr-2 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  YTD Member Contributions
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">$</span>
                  <input
                    type="number"
                    min="0"
                    value={ytdContributions || ''}
                    onChange={(e) => updateHsa({ ytdContributions: Number(e.target.value) })}
                    placeholder="600"
                    className="w-full pl-6 pr-2 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Employer Match Contribution
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">$</span>
                  <input
                    type="number"
                    min="0"
                    value={employerContribution || ''}
                    onChange={(e) => updateHsa({ employerContribution: Number(e.target.value) })}
                    placeholder="300"
                    className="w-full pl-6 pr-2 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          )}
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
            Next: Care & Prescriptions <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Interactive Visual Guide Modal */}
      <DocumentLocatorModal
        isOpen={locatorOpen}
        onClose={() => setLocatorOpen(false)}
        activeField={activeLocatorField}
      />
    </div>
  );
};
