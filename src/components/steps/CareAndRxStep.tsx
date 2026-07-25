import React, { useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import { Tooltip } from '../Tooltip';
import { StepAssistantTip } from '../StepAssistantTip';
import { Pill, Calendar, Plus, Trash2, HeartPulse, Baby, Brain, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const COMMON_CHRONIC_CONDITIONS = [
  'Asthma / Respiratory',
  'Diabetes (Type 1/2)',
  'Hypertension / High BP',
  'Hyperlipidemia / Cholesterol',
  'Thyroid Disorder',
  'Autoimmune Condition',
  'Depression / Anxiety'
];

const COMMON_PROCEDURES = [
  'Annual Physical / Wellness',
  'MRI / Diagnostic Imaging',
  'Physical Therapy',
  'Outpatient Surgery',
  'Colonoscopy / Preventive Screening',
  'Orthopedic / Joint Procedure'
];

export const CareAndRxStep: React.FC = () => {
  const { state, addPrescription, removePrescription, updateUpcomingCare, nextStep, prevStep } = useOnboarding();
  const { prescriptions, upcomingCare } = state;

  // New Rx form state
  const [drugName, setDrugName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Monthly');
  const [paymentMethod, setPaymentMethod] = useState<'Insurance' | 'Cash' | 'Unsure'>('Insurance');
  const [preferredPharmacy, setPreferredPharmacy] = useState('Retail Pharmacy (CVS/Walgreens)');

  const handleAddRx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!drugName.trim()) return;
    addPrescription({
      drugName,
      dosage: dosage || 'Standard',
      frequency,
      paymentMethod,
      preferredPharmacy
    });
    setDrugName('');
    setDosage('');
  };

  const toggleCondition = (cond: string) => {
    const exists = upcomingCare.chronicConditions.includes(cond);
    const updated = exists
      ? upcomingCare.chronicConditions.filter(c => c !== cond)
      : [...upcomingCare.chronicConditions, cond];
    updateUpcomingCare({ chronicConditions: updated });
  };

  const toggleProcedure = (proc: string) => {
    const exists = upcomingCare.plannedProcedures.includes(proc);
    const updated = exists
      ? upcomingCare.plannedProcedures.filter(p => p !== proc)
      : [...upcomingCare.plannedProcedures, proc];
    updateUpcomingCare({ plannedProcedures: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <StepAssistantTip
        title="Prescriptions & Upcoming Care Needs"
        description="Adding your current medications and planned care helps us cross-reference drug formulary tiers and specialist copays!"
        plainEnglishExplanation="Different plans categorize medications into Tier 1 (Generic), Tier 2 (Preferred Brand), or Tier 3. Listing your medications tells us if your plan will cover them for a cheap $10 copay or full price!"
      />

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-100">Prescriptions & Upcoming Care</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          This allows Emme to forecast your real-world out-of-pocket costs based on your actual medications and expected procedures.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-8">
        {/* Section 1: Prescriptions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center">
              <Pill className="w-4 h-4 text-emerald-400 mr-2" />
              Regular Prescriptions
              <Tooltip
                title="Prescriptions"
                explanation="Medications you or your family members take regularly."
                whyEmmeNeedsThis="Emme cross-checks your plan's formulary tier lists to calculate actual pharmacy copays vs cash discount programs."
              />
            </h3>
            <span className="text-xs font-mono text-emerald-400">{prescriptions.length} added</span>
          </div>

          {/* Existing Prescriptions List */}
          {prescriptions.length > 0 && (
            <div className="space-y-2">
              {prescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-100">{rx.drugName} <span className="text-slate-400 font-normal">({rx.dosage})</span></div>
                    <div className="text-[11px] text-slate-400">
                      {rx.frequency} • Paid via {rx.paymentMethod} • {rx.preferredPharmacy}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePrescription(rx.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Rx Input Mini Form */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold text-slate-300">Add Medication</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                placeholder="Drug Name (e.g. Lipitor, Albuterol)"
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="Dosage (e.g. 20mg)"
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
                <option value="As Needed">As Needed</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs"
              >
                <option value="Insurance">Payment: Insurance Copay</option>
                <option value="Cash">Payment: Cash / GoodRx</option>
                <option value="Unsure">Payment: Unsure</option>
              </select>

              <select
                value={preferredPharmacy}
                onChange={(e) => setPreferredPharmacy(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs"
              >
                <option value="Retail Pharmacy (CVS/Walgreens)">Retail (CVS / Walgreens)</option>
                <option value="Mail Order Pharmacy">Mail Order (3-Month Supply)</option>
                <option value="CostPlus / Discount Pharmacy">CostPlus Drugs / Mark Cuban</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleAddRx}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" /> Add Medication to List
            </button>
          </div>
        </div>

        {/* Section 2: Upcoming Care & Chronic Conditions */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center">
              <Calendar className="w-4 h-4 text-cyan-400 mr-2" />
              Planned Medical Procedures
              <Tooltip
                title="Planned Procedures"
                explanation="Surgeries, lab screenings, or therapy expected in the next 12 months."
                whyEmmeNeedsThis="Emme models out-of-pocket costs against your deductible accumulator."
              />
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {COMMON_PROCEDURES.map((proc) => {
              const selected = upcomingCare.plannedProcedures.includes(proc);
              return (
                <button
                  key={proc}
                  type="button"
                  onClick={() => toggleProcedure(proc)}
                  className={`p-2.5 rounded-xl border text-xs font-medium transition-all text-left flex items-center justify-between ${
                    selected
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{proc}</span>
                  {selected && <Check className="w-4 h-4 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Chronic Conditions & Special Care Needs */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center">
              <HeartPulse className="w-4 h-4 text-rose-400 mr-2" />
              Ongoing Health Conditions
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {COMMON_CHRONIC_CONDITIONS.map((cond) => {
              const selected = upcomingCare.chronicConditions.includes(cond);
              return (
                <button
                  key={cond}
                  type="button"
                  onClick={() => toggleCondition(cond)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    selected
                      ? 'bg-rose-500/20 text-rose-300 border-rose-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cond}
                </button>
              );
            })}
          </div>

          {/* Toggle Switches for Maternity & Behavioral Health */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <Baby className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-semibold text-slate-200">Pregnancy / Maternity</span>
              </div>
              <input
                type="checkbox"
                checked={upcomingCare.pregnancyPlanned}
                onChange={(e) => updateUpcomingCare({ pregnancyPlanned: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-slate-900 border-slate-700"
              />
            </label>

            <label className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold text-slate-200">Behavioral Health / Therapy</span>
              </div>
              <input
                type="checkbox"
                checked={upcomingCare.behavioralHealthNeeds}
                onChange={(e) => updateUpcomingCare({ behavioralHealthNeeds: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-slate-900 border-slate-700"
              />
            </label>
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
            Generate Plan Summary <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
