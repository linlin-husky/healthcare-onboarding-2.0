import React from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import { Tooltip } from '../Tooltip';
import { Users, DollarSign, FileCheck, ArrowRight, ArrowLeft } from 'lucide-react';

const INCOME_RANGES = [
  'Under $35,000',
  '$35,000 - $50,000',
  '$50,000 - $75,000',
  '$75,000 - $100,000',
  '$100,000 - $150,000',
  'Over $150,000'
];

const FILING_STATUSES = [
  'Single',
  'Married Filing Jointly',
  'Married Filing Separately',
  'Head of Household'
];

export const HouseholdStep: React.FC = () => {
  const { state, updateHousehold, nextStep, prevStep } = useOnboarding();
  const { householdSize, incomeRange, filingStatus } = state.household;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-100">Household & Income Profile</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          This helps calculate federal affordability thresholds, ACA tax credit subsidies, and family accumulator caps.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6">
        {/* Household Size */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-emerald-400" />
              Household Size (Tax Dependents)
              <Tooltip
                title="Household Size"
                explanation="The total number of people on your tax return (you, your spouse, and qualifying dependent children)."
                whyEmmeNeedsThis="Determines whether individual vs. family deductible and out-of-pocket maximum caps apply to your plan."
              />
            </span>
            <span className="text-emerald-400 font-bold font-mono text-sm">{householdSize} person{householdSize > 1 ? 's' : ''}</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => updateHousehold({ householdSize: num })}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  householdSize === num
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                {num === 6 ? '6+' : num}
              </button>
            ))}
          </div>
        </div>

        {/* Income Range */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center">
            <DollarSign className="w-4 h-4 text-cyan-400 mr-1" />
            Estimated Annual Household Income
            <Tooltip
              title="Household Income"
              explanation="Your Modified Adjusted Gross Income (MAGI) for the household."
              whyEmmeNeedsThis="Calculates potential cost-sharing reductions (CSR) and premium tax credits under the ACA."
            />
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {INCOME_RANGES.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => updateHousehold({ incomeRange: range })}
                className={`p-2.5 rounded-xl text-xs font-semibold transition-all border text-center ${
                  incomeRange === range
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-sm'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Filing Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center">
            <FileCheck className="w-4 h-4 text-teal-400 mr-1" />
            Tax Filing Status
            <Tooltip
              title="Tax Filing Status"
              explanation="How you file federal taxes."
              whyEmmeNeedsThis="Impacts subsidy qualification rules for Marketplace and employer coverage."
            />
          </label>
          <div className="grid grid-cols-2 gap-2">
            {FILING_STATUSES.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => updateHousehold({ filingStatus: status })}
                className={`p-2.5 rounded-xl text-xs font-medium transition-all border text-left flex items-center justify-between ${
                  filingStatus === status
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                }`}
              >
                <span>{status}</span>
                {filingStatus === status && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
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
            Next: Plan Details <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
