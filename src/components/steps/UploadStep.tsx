import React, { useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import { SAMPLE_DOCUMENTS } from '../../data/sampleDocs';
import type { SampleDocPreset } from '../../data/sampleDocs';
import { FileUp, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, FileText, AlertCircle, FileCheck2 } from 'lucide-react';

export const UploadStep: React.FC = () => {
  const { state, applySampleDocument, nextStep, skipUpload } = useOnboarding();
  const [isScanning, setIsScanning] = useState(false);

  const handleSimulatedFileUpload = (preset: SampleDocPreset) => {
    setIsScanning(true);
    setTimeout(() => {
      applySampleDocument(preset);
      setIsScanning(false);
    }, 1600);
  };


  const handleCustomDrop = (e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // Use first sample preset to simulate custom uploaded file parsing
    handleSimulatedFileUpload(SAMPLE_DOCUMENTS[0]);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Hero Welcome Card */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Welcome! 3-Minute Friendly Health Intake
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Health insurance clarity, <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">made human & easy</span> ✨
        </h1>
        <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
          Upload your SBC or EOB statement to auto-fill your profile in seconds — or walk through step-by-step with zero guesswork. We’ll calculate your <strong className="text-emerald-300">exact out-of-pocket costs</strong> in plain English!
        </p>
      </div>

      {/* Main Dual-Path Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upload Dropzone */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileUp className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-slate-100">Upload Health Plan Document</h3>
              </div>
              <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">PDF, PNG, JPG</span>
            </div>

            {/* Dropzone Container */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleCustomDrop}
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                isScanning
                  ? 'border-cyan-400 bg-cyan-950/20'
                  : state.documents.extractedFromDoc
                  ? 'border-emerald-500/60 bg-emerald-950/20'
                  : 'border-slate-700 hover:border-emerald-400/80 bg-slate-900/60 hover:bg-slate-900'
              }`}
            >
              {/* Laser Scanning Animation */}
              {isScanning && <div className="animate-laser" />}

              {isScanning ? (
                <div className="py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto animate-spin">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-cyan-300">Extracting Cost-Sharing & Plan Data...</h4>
                  <p className="text-xs text-slate-400 font-mono">Parsing SBC table grids and deductible accumulators</p>
                </div>
              ) : state.documents.extractedFromDoc ? (
                <div className="py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-300">
                      Document Parsed Successfully ({state.documents.extractionConfidence}% confidence)
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {state.documents.sbcFileName || state.documents.eobFileName}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs border border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {state.documents.autoFilledFields.length} key fields pre-populated
                  </div>
                </div>
              ) : (
                <div className="py-4 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                    <FileText className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      Drag & drop your <strong className="text-emerald-400">SBC</strong> or <strong className="text-cyan-400">EOB</strong> here
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Or browse your files from device
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs cursor-pointer transition-colors border border-slate-700">
                    <FileUp className="w-4 h-4 text-emerald-400" />
                    Select File to Upload
                    <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleCustomDrop} className="hidden" />
                  </label>
                </div>
              )}
            </div>

            {/* Quick Demo Pre-load sample buttons */}
            <div className="mt-6 pt-5 border-t border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Don't have a file handy? Try a sample document:
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {SAMPLE_DOCUMENTS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSimulatedFileUpload(preset)}
                    disabled={isScanning}
                    className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/50 text-left transition-all group disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-300">
                        {preset.carrier}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400">
                        {preset.type}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">{preset.subtitle}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Path Decision & Skip to Manual */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-2xl space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Simultaneous Entry Paths
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Emme supports both document auto-extraction and direct manual input. You can edit any auto-filled value or skip document upload anytime.
              </p>
            </div>

            {/* Extracted Fields Badge Checklist if loaded */}
            {state.documents.extractedFromDoc && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 space-y-2">
                <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Pre-Populated Data Ready
                </h4>
                <ul className="text-xs text-slate-300 space-y-1 pl-1">
                  {state.documents.autoFilledFields.slice(0, 5).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Primary Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={nextStep}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 group"
              >
                {state.documents.extractedFromDoc ? 'Review & Confirm Extracted Data' : 'Continue to Member Details'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={skipUpload}
                className="w-full py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-slate-100 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                Skip Document Upload & Enter Manually
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Your privacy is protected. Files are processed locally for demonstration purposes.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
