import React, { createContext, useContext, useState, useEffect } from 'react';
import type { OnboardingState, IdentityData, HouseholdData, PlanDetailsData, CostSharingData, HsaData, Prescription, UpcomingCareData, DocumentUploadMeta } from '../types/onboarding';
import type { SampleDocPreset } from '../data/sampleDocs';



const STORAGE_KEY = 'emme_health_onboarding_draft_v1';

const defaultState: OnboardingState = {
  currentStep: 0,
  uploadSkipped: false,
  identity: {
    fullName: '',
    email: '',
    zipCode: ''
  },
  household: {
    householdSize: 1,
    incomeRange: '$75,000 - $100,000',
    filingStatus: 'Single'
  },
  planDetails: {
    carrier: '',
    planName: '',
    metalTier: 'Unsure',
    planType: 'Unsure'
  },
  costSharing: {
    deductibleIndividual: 0,
    deductibleFamily: 0,
    deductibleMetYtd: 0,
    oopMaxIndividual: 0,
    oopMaxFamily: 0,
    oopMetYtd: 0,
    copayPcp: 0,
    copaySpecialist: 0,
    copayUrgentCare: 0,
    copayEr: 0,
    coinsurancePercent: 20,
    monthlyPremium: 0
  },
  hsa: {
    hsaEligible: false,
    currentBalance: 0,
    ytdContributions: 0,
    employerContribution: 0
  },
  prescriptions: [],
  upcomingCare: {
    plannedProcedures: [],
    chronicConditions: [],
    pregnancyPlanned: false,
    behavioralHealthNeeds: false,
    notes: ''
  },
  documents: {
    extractedFromDoc: false,
    extractionConfidence: 0,
    autoFilledFields: []
  },
  lastSavedAt: null
};

interface OnboardingContextType {
  state: OnboardingState;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  skipUpload: () => void;
  updateIdentity: (data: Partial<IdentityData>) => void;
  updateHousehold: (data: Partial<HouseholdData>) => void;
  updatePlanDetails: (data: Partial<PlanDetailsData>) => void;
  updateCostSharing: (data: Partial<CostSharingData>) => void;
  updateHsa: (data: Partial<HsaData>) => void;
  addPrescription: (rx: Omit<Prescription, 'id'>) => void;
  removePrescription: (id: string) => void;
  updateUpcomingCare: (data: Partial<UpcomingCareData>) => void;
  applySampleDocument: (preset: SampleDocPreset) => void;
  resetDraft: () => void;
  isAutoSaved: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<OnboardingState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to restore draft from localStorage:', e);
    }
    return defaultState;
  });

  const [isAutoSaved, setIsAutoSaved] = useState(false);

  // Auto-save to LocalStorage whenever state changes
  useEffect(() => {
    try {
      const updatedState = {
        ...state,
        lastSavedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
      setIsAutoSaved(true);
      const timer = setTimeout(() => setIsAutoSaved(false), 2000);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  }, [state.identity, state.household, state.planDetails, state.costSharing, state.hsa, state.prescriptions, state.upcomingCare, state.documents, state.currentStep, state.uploadSkipped]);

  const setStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: Math.max(0, Math.min(6, step)) }));
  };

  const nextStep = () => {
    setState(prev => ({ ...prev, currentStep: Math.min(6, prev.currentStep + 1) }));
  };

  const prevStep = () => {
    setState(prev => ({ ...prev, currentStep: Math.max(0, prev.currentStep - 1) }));
  };

  const skipUpload = () => {
    setState(prev => ({
      ...prev,
      uploadSkipped: true,
      currentStep: 1 // Move directly to Identity step
    }));
  };

  const updateIdentity = (data: Partial<IdentityData>) => {
    setState(prev => ({ ...prev, identity: { ...prev.identity, ...data } }));
  };

  const updateHousehold = (data: Partial<HouseholdData>) => {
    setState(prev => ({ ...prev, household: { ...prev.household, ...data } }));
  };

  const updatePlanDetails = (data: Partial<PlanDetailsData>) => {
    setState(prev => ({ ...prev, planDetails: { ...prev.planDetails, ...data } }));
  };

  const updateCostSharing = (data: Partial<CostSharingData>) => {
    setState(prev => ({ ...prev, costSharing: { ...prev.costSharing, ...data } }));
  };

  const updateHsa = (data: Partial<HsaData>) => {
    setState(prev => ({ ...prev, hsa: { ...prev.hsa, ...data } }));
  };

  const addPrescription = (rx: Omit<Prescription, 'id'>) => {
    const newRx: Prescription = { ...rx, id: 'rx_' + Date.now() + Math.random().toString(36).substring(2, 5) };
    setState(prev => ({ ...prev, prescriptions: [...prev.prescriptions, newRx] }));
  };

  const removePrescription = (id: string) => {
    setState(prev => ({ ...prev, prescriptions: prev.prescriptions.filter(p => p.id !== id) }));
  };

  const updateUpcomingCare = (data: Partial<UpcomingCareData>) => {
    setState(prev => ({ ...prev, upcomingCare: { ...prev.upcomingCare, ...data } }));
  };

  const applySampleDocument = (preset: SampleDocPreset) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isEob = preset.type === 'EOB';

    const docMeta: DocumentUploadMeta = {
      sbcFileName: !isEob ? preset.fileName : state.documents.sbcFileName,
      sbcFileSize: !isEob ? preset.fileSize : state.documents.sbcFileSize,
      sbcUploadedAt: !isEob ? now : state.documents.sbcUploadedAt,
      eobFileName: isEob ? preset.fileName : state.documents.eobFileName,
      eobFileSize: isEob ? preset.fileSize : state.documents.eobFileSize,
      eobUploadedAt: isEob ? now : state.documents.eobUploadedAt,
      extractedFromDoc: true,
      extractionConfidence: preset.confidence,
      autoFilledFields: preset.extractedFieldsList
    };

    setState(prev => ({
      ...prev,
      planDetails: {
        ...prev.planDetails,
        ...(preset.extractedValues.planDetails || {})
      },
      costSharing: {
        ...prev.costSharing,
        ...(preset.extractedValues.costSharing || {})
      },
      hsa: {
        ...prev.hsa,
        ...(preset.extractedValues.hsa || {})
      },
      documents: docMeta,
      uploadSkipped: false
    }));
  };

  const resetDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultState);
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        setStep,
        nextStep,
        prevStep,
        skipUpload,
        updateIdentity,
        updateHousehold,
        updatePlanDetails,
        updateCostSharing,
        updateHsa,
        addPrescription,
        removePrescription,
        updateUpcomingCare,
        applySampleDocument,
        resetDraft,
        isAutoSaved
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return ctx;
};
