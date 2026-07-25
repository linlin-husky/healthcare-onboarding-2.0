import React from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import { Tooltip } from '../Tooltip';
import { User, Mail, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

export const IdentityStep: React.FC = () => {
  const { state, updateIdentity, nextStep, prevStep } = useOnboarding();
  const { fullName, email, zipCode } = state.identity;

  const isValid = fullName.trim().length > 0 && email.includes('@') && zipCode.trim().length >= 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      nextStep();
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-100">Let’s start with basic contact info</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          This helps us associate your health plan calculations with your profile and local area.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => updateIdentity({ fullName: e.target.value })}
              placeholder="e.g. Jane Doe"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center">
            Email Address
            <Tooltip
              title="Email Address"
              explanation="We use your email address to send your personalized healthcare cost breakdown summary and save your plan calculations."
              whyEmmeNeedsThis="Ensures your plan analysis is securely accessible to you at any time."
            />
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => updateIdentity({ email: e.target.value })}
              placeholder="jane.doe@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Zip Code */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center">
            Zip Code
            <Tooltip
              title="Zip Code"
              explanation="Healthcare rates, in-network hospital availability, and local specialist copay structures are heavily dependent on geographic zip codes."
              whyEmmeNeedsThis="Allows Emme to fetch exact local provider contracts and cost benchmarks for your city."
            />
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              maxLength={5}
              value={zipCode}
              onChange={(e) => updateIdentity({ zipCode: e.target.value.replace(/\D/g, '') })}
              placeholder="e.g. 90210"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-500 font-mono"
            />
          </div>
        </div>

        {/* Action Buttons */}
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
            disabled={!isValid}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            Next: Household <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
