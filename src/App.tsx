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
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
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
  );
};

export default function App() {
  return (
    <OnboardingProvider>
      <AppContent />
    </OnboardingProvider>
  );
}
