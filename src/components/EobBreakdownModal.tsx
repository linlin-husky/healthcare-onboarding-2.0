import React from 'react';
import { X, FileText, User, Building2, Calendar, ShieldCheck, HelpCircle, PhoneCall, ExternalLink, CheckCircle2, Calculator, PieChart, Lock } from 'lucide-react';

interface EobBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EobBreakdownModal: React.FC<EobBreakdownModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const GLOSSARY_ITEMS = [
    { term: 'EOB (Explanation of Benefits)', def: 'A statement sent by your health insurance company showing what medical services were provided, what was billed, what your insurance paid, and what you owe.' },
    { term: 'Allowed Amount', def: 'The maximum amount on which payment is based for covered health care services. This is agreed upon between your insurance network and in-network providers.' },
    { term: 'Deductible', def: 'The amount you must pay out-of-pocket for covered health care services before your health insurance begins to pay.' },
    { term: 'Coinsurance', def: 'Your share of the costs of a covered health care service, calculated as a percentage (e.g. 20%) after your deductible is met.' },
    { term: 'Copayment (Copay)', def: 'A fixed amount (e.g. $25) you pay for a covered health care service at the time of care.' },
    { term: 'HRA (Health Reimbursement Arrangement)', def: 'An employer-funded health account that helps pay for out-of-pocket medical expenses.' },
    { term: 'Patient Responsibility (What You Owe)', def: 'The final total amount you must pay directly to your doctor or facility after insurance discounts and payments.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">Explanation of Benefits (EOB) Interactive Guide</h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  12 Key Fields Covered
                </span>
              </div>
              <p className="text-xs text-slate-400">Understand every line of your medical statement with clear cost transparency.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable EOB Statement Document View */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-950/60 text-sm">
          
          {/* EOB Top Banner Header with Items #1, #2, #3, #4 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Official Insurance Document</span>
                <h2 className="text-xl font-extrabold text-white">Explanation of Benefits Statement</h2>
                <p className="text-xs text-slate-400 mt-0.5">THIS IS NOT A BILL • Keep for your records</p>
              </div>

              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-right">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">4. Claim Number & Status</div>
                <div className="text-sm font-mono font-bold text-cyan-400">CLM-2026-99381</div>
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Status: Processed & Paid
                </div>
              </div>
            </div>

            {/* Grid of Key Info: Member, Plan, Provider */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Item 1: Member Name */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-400" /> 1. Member Name
                </div>
                <div className="text-base font-bold text-white">Emma Svensson</div>
                <div className="text-xs text-slate-400">Relationship: Self</div>
              </div>

              {/* Item 2: Plan Info & Member ID */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> 2. Plan Info & Member ID
                </div>
                <div className="text-base font-bold text-white">Blue Access Gold PPO</div>
                <div className="text-xs text-slate-300 font-mono">Member ID: W9482019401</div>
                <div className="text-[11px] text-slate-400 font-mono">Group #: BCBS-88392</div>
              </div>

              {/* Item 3: Provider & Facility */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-purple-400" /> 3. Healthcare Provider
                </div>
                <div className="text-base font-bold text-white">Mass General Brigham</div>
                <div className="text-xs text-slate-300">Dr. Robert Vance, MD (Orthopedics)</div>
                <div className="text-[11px] text-emerald-400">In-Network Facility</div>
              </div>

            </div>
          </div>

          {/* Item 5: Service Description & Date */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" /> 5. Service Description & Date Provided
              </h3>
              <span className="text-xs font-mono text-slate-400">Date of Service: June 12, 2026</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <th className="py-2.5 px-3">Service Provided</th>
                    <th className="py-2.5 px-3">CPT Code</th>
                    <th className="py-2.5 px-3 text-right">Billed Charge</th>
                    <th className="py-2.5 px-3 text-right">Allowed Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-100">Outpatient Specialist Consultation</td>
                    <td className="py-3 px-3 font-mono text-slate-400">99214</td>
                    <td className="py-3 px-3 text-right font-mono">$450.00</td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-400">$300.00</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-100">MRI Lumbar Spine without Contrast</td>
                    <td className="py-3 px-3 font-mono text-slate-400">72148</td>
                    <td className="py-3 px-3 text-right font-mono">$2,000.00</td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-400">$1,400.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Breakdown Table: Items #6, #7, #8, #9, #10 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4 text-cyan-400" /> Cost Breakdown & What You Owe
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Item 6: Total Cost */}
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="text-[10px] text-slate-500 uppercase font-bold">6. Total Billed Cost</div>
                <div className="text-lg font-black text-slate-200 font-mono">$2,450.00</div>
                <div className="text-[10px] text-slate-500">Provider total charge</div>
              </div>

              {/* Item 7: Health Insurance Paid */}
              <div className="p-3.5 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-1">
                <div className="text-[10px] text-emerald-400 uppercase font-bold">7. Paid by Insurance</div>
                <div className="text-lg font-black text-emerald-400 font-mono">-$1,300.00</div>
                <div className="text-[10px] text-emerald-500/80">Network discount: -$750</div>
              </div>

              {/* Item 8: Uncovered Costs */}
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="text-[10px] text-slate-500 uppercase font-bold">8. Uncovered Costs</div>
                <div className="text-lg font-black text-slate-400 font-mono">$0.00</div>
                <div className="text-[10px] text-slate-500">Exclusions: None</div>
              </div>

              {/* Item 9: HRA / HSA Paid Amount */}
              <div className="p-3.5 bg-cyan-950/30 border border-cyan-800/40 rounded-xl space-y-1">
                <div className="text-[10px] text-cyan-400 uppercase font-bold">9. Paid from HRA/HSA</div>
                <div className="text-lg font-black text-cyan-400 font-mono">-$100.00</div>
                <div className="text-[10px] text-cyan-500/80">Auto-applied HRA benefit</div>
              </div>

              {/* Item 10: What You Owe (Patient Responsibility) */}
              <div className="p-3.5 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/50 rounded-xl space-y-1 shadow-lg">
                <div className="text-[10px] text-emerald-300 uppercase font-extrabold">10. WHAT YOU OWE</div>
                <div className="text-xl font-black text-emerald-300 font-mono">$300.00</div>
                <div className="text-[10px] text-emerald-400 font-semibold">Patient Responsibility</div>
              </div>
            </div>
          </div>

          {/* Item 12: Deductible & Out-of-Pocket Expenses Accumulator */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-400" /> 12. Expenses Applied to Deductible & Out-of-Pocket Max
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Individual Deductible Progress */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Annual Individual Deductible</span>
                  <span className="font-mono text-emerald-400 font-bold">$850.00 / $1,500.00 met</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '56.6%' }} />
                </div>
                <p className="text-[11px] text-slate-400">
                  <strong className="text-emerald-400">+$300.00</strong> from this claim was added to your annual deductible tracker.
                </p>
              </div>

              {/* Out-of-Pocket Max Progress */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Annual Out-of-Pocket Maximum</span>
                  <span className="font-mono text-cyan-400 font-bold">$1,200.00 / $4,500.00 met</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '26.6%' }} />
                </div>
                <p className="text-[11px] text-slate-400">
                  Once you reach $4,500.00, your insurance covers 100% of eligible in-network care.
                </p>
              </div>
            </div>
          </div>

          {/* Item 11: Additional Information, Glossary & Customer Service */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400" /> 11. Additional Information, Glossary & Member Support
            </h3>

            {/* Medical Glossary Section */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-300">Medical Terms Glossary:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {GLOSSARY_ITEMS.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <div className="text-xs font-bold text-emerald-400">{item.term}</div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.def}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Online Portal & Phone Support Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">Access EOB Online</div>
                  <a href="https://www.bluecrossma.org" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:underline">
                    my.emmehealth.org/eob-portal
                  </a>
                </div>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
                <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">Questions about your EOB?</div>
                  <div className="text-xs font-mono text-cyan-400 font-semibold">1-800-555-EMME (3663)</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" /> All 12 standard EOB requirements verified
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20"
          >
            Close EOB Guide
          </button>
        </div>

      </div>
    </div>
  );
};
