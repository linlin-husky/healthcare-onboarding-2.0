import React from 'react';
import { OnboardingProvider, useOnboarding } from './context/OnboardingContext';
import { Navigation } from './components/Navigation';
import { UploadStep } from './components/steps/UploadStep';
import { IdentityStep } from './components/steps/IdentityStep';
import { HouseholdStep } from './components/steps/HouseholdStep';
import { PlanDetailsStep } from './components/steps/PlanDetailsStep';
import { CostSharingStep } from './components/steps/CostSharingStep';
import { CareAndRxStep } from './components/steps/CareAndRxStep';
import { MedicalRecordExplainerStep } from './components/steps/MedicalRecordExplainerStep';
import { ConfirmationSummary } from './components/steps/ConfirmationSummary';
import { ShieldCheck } from 'lucide-react';

const StepRouter: React.FC = () => {
  const { state } = useOnboarding();

  switch (state.currentStep) {
    case 0:
      return <UploadStep />;
    case 1:
      return <IdentityStep />;
    case 2:
      return <HouseholdStep />;
    case 3:
      return <PlanDetailsStep />;
    case 4:
      return <CostSharingStep />;
    case 5:
      return <CareAndRxStep />;
    case 6:
      return <MedicalRecordExplainerStep />;
    case 7:
      return <ConfirmationSummary />;
    default:
      return <UploadStep />;
  }
};

export const AppContent: React.FC = () => {
  const { themeMode } = useOnboarding();

  return (
    <div className={`relative min-h-screen text-slate-100 flex flex-col font-sans selection:bg-emerald-400 selection:text-slate-950 overflow-x-hidden ${
      themeMode === 'vivid' ? 'bg-slate-950' : 'bg-slate-900 border-t-2 border-cyan-500'
    }`}>
      {/* Friendly Vivid Floating Ambient Gradient Mesh Background (Active in Vivid Mode) */}
      {themeMode === 'vivid' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] animate-blob-1" />
          <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-cyan-500/15 rounded-full blur-[130px] animate-blob-2" />
          <div className="absolute -bottom-40 left-1/4 w-[32rem] h-[32rem] bg-purple-500/12 rounded-full blur-[140px] animate-blob-3" />
          <div className="absolute top-1/2 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] animate-blob-1" />
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
          <StepRouter />
        </main>

      <footer className="border-t border-slate-800/60 py-6 glass-panel bg-slate-950/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Emme Health Intake Demo • Zero helpless forms, instant cost clarity.</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.uhc.com/understanding-health-insurance/how-does-health-insurance-work/explanation-of-benefits"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              What is an EOB?
            </a>
            <span>•</span>
            <a
              href="https://www.kentcountymi.gov/DocumentCenter/View/1459/BCBS-Understanding-Your-Explanation-of-Benefits-EOB-Statement-PDF"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              Sample BCBS EOB Guide
            </a>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <OnboardingProvider>
      <AppContent />
    </OnboardingProvider>
  );
}
