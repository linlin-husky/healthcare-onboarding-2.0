import React, { useState } from 'react';
import { X, FileText, Search, ExternalLink } from 'lucide-react';

interface DocumentLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeField?: string;
}

export const DocumentLocatorModal: React.FC<DocumentLocatorModalProps> = ({
  isOpen,
  onClose,
  activeField = 'Deductible'
}) => {
  const [docType, setDocType] = useState<'EOB' | 'SBC' | 'ID_CARD'>('EOB');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl glass-panel bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Document Visual Guide</h3>
              <p className="text-xs text-slate-400">Where to find <span className="text-emerald-400 font-semibold">{activeField}</span> on your health documents</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Type Selector Tabs */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-950/50 gap-2 pt-3">
          <button
            onClick={() => setDocType('EOB')}
            className={`pb-3 px-4 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
              docType === 'EOB'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Explanation of Benefits (EOB)
          </button>
          <button
            onClick={() => setDocType('SBC')}
            className={`pb-3 px-4 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
              docType === 'SBC'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Summary of Benefits & Coverage (SBC)
          </button>
          <button
            onClick={() => setDocType('ID_CARD')}
            className={`pb-3 px-4 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
              docType === 'ID_CARD'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Member ID Card
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {docType === 'EOB' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
                <div className="flex items-start gap-3">
                  <Search className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">How to read your EOB Statement</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Your EOB is sent by your insurance provider after a doctor or lab visit. It details what the doctor billed, what insurance paid, and your remaining deductible accumulator.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual EOB Mock Document Breakdown */}
              <div className="border border-slate-700 rounded-xl p-5 bg-slate-950 font-mono text-xs space-y-4 shadow-inner">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div>
                    <div className="text-emerald-400 font-bold text-sm">HEALTHCARE PLAN EXPLANATION OF BENEFITS</div>
                    <div className="text-slate-400 text-[11px]">Member ID: W12948201 • Group: 99420</div>
                  </div>
                  <div className="text-right text-[11px] text-slate-500">Statement Date: 05/14/2026</div>
                </div>

                {/* Highlight Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg border-2 border-emerald-500/80 bg-emerald-950/20 relative">
                    <span className="absolute -top-2.5 left-3 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      LOCATOR A: Deductible & YTD
                    </span>
                    <div className="text-slate-300 font-semibold mb-1">Deductible Status (YTD Accumulator)</div>
                    <div className="text-[11px] text-slate-400">Annual Individual Deductible: <span className="text-emerald-300 font-bold">$1,500.00</span></div>
                    <div className="text-[11px] text-slate-400">Amount Met to Date: <span className="text-emerald-300 font-bold">$850.00</span></div>
                  </div>

                  <div className="p-3 rounded-lg border-2 border-cyan-500/80 bg-cyan-950/20 relative">
                    <span className="absolute -top-2.5 left-3 bg-cyan-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      LOCATOR B: OOP Maximum
                    </span>
                    <div className="text-slate-300 font-semibold mb-1">Out-of-Pocket Maximum Status</div>
                    <div className="text-[11px] text-slate-400">Annual OOP Limit: <span className="text-cyan-300 font-bold">$4,500.00</span></div>
                    <div className="text-[11px] text-slate-400">Amount Applied YTD: <span className="text-cyan-300 font-bold">$1,200.00</span></div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                  <div className="text-slate-300 font-semibold mb-1">Claim Line Details (Service Date 05/01/2026)</div>
                  <div className="grid grid-cols-4 gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    <div>Billed: $450</div>
                    <div>Plan Paid: $310</div>
                    <div>Coinsurance (20%): $55</div>
                    <div className="text-emerald-400 font-semibold">Member Responsibility: $85</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {docType === 'SBC' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
                <p className="text-xs text-slate-300">
                  The <strong className="text-emerald-400">Summary of Benefits and Coverage (SBC)</strong> is a standardized 4-page grid required by law for every health plan in the US. Look at Page 1 under "Important Questions".
                </p>
              </div>

              <div className="border border-slate-700 rounded-xl p-4 bg-slate-950 text-xs space-y-3 font-sans">
                <div className="bg-slate-800 text-slate-200 font-bold p-2.5 rounded text-sm flex justify-between">
                  <span>Important Questions</span>
                  <span>Answers</span>
                </div>
                <div className="border-b border-slate-800 pb-2 flex justify-between">
                  <span className="font-semibold text-slate-300">What is the overall deductible?</span>
                  <span className="text-emerald-400 font-bold">$1,500 Individual / $3,000 Family</span>
                </div>
                <div className="border-b border-slate-800 pb-2 flex justify-between">
                  <span className="font-semibold text-slate-300">What is the out-of-pocket limit?</span>
                  <span className="text-cyan-400 font-bold">$4,500 Individual / $9,000 Family</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-300">Will you pay less if you use a network provider?</span>
                  <span className="text-slate-400">Yes. See provider directory. Coinsurance is 20%.</span>
                </div>
              </div>
            </div>
          )}

          {docType === 'ID_CARD' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
                <p className="text-xs text-slate-300">
                  Your insurance card usually lists Copay amounts, Plan Type (PPO/HMO), Carrier Name, and Member ID numbers on the front face.
                </p>
              </div>

              <div className="max-w-md mx-auto p-5 rounded-2xl bg-gradient-to-br from-blue-900 via-slate-900 to-emerald-950 border border-slate-600 shadow-xl space-y-3">
                <div className="flex justify-between items-center border-b border-slate-700/60 pb-3">
                  <div className="font-extrabold text-slate-100 tracking-wider">BLUE CROSS BLUE SHIELD</div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">GOLD PPO</span>
                </div>
                <div className="text-xs space-y-1">
                  <div className="text-slate-400">Member Name: <span className="text-slate-200 font-semibold">JANE DOE</span></div>
                  <div className="text-slate-400">Member ID: <span className="text-slate-200 font-mono">XYZ98402910</span></div>
                  <div className="text-slate-400">RxBIN: <span className="text-slate-200 font-mono">004336</span> • RxPCN: <span className="text-slate-200 font-mono">ADV</span></div>
                </div>
                <div className="pt-2 border-t border-slate-700/60 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-950/60 p-2 rounded border border-emerald-500/30 text-emerald-300 font-medium">
                    Office Visit Copay: $25
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded border border-cyan-500/30 text-cyan-300 font-medium">
                    Specialist Copay: $45
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex justify-between items-center">
          <a
            href="https://www.kentcountymi.gov/DocumentCenter/View/1459/BCBS-Understanding-Your-Explanation-of-Benefits-EOB-Statement-PDF"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
          >
            Official EOB Reference Guide PDF <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
          >
            Got it, return to intake
          </button>
        </div>
      </div>
    </div>
  );
};
