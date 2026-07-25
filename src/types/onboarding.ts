export interface IdentityData {
  fullName: string;
  email: string;
  zipCode: string;
}

export interface HouseholdData {
  householdSize: number;
  incomeRange: string;
  filingStatus: string;
}

export interface PlanDetailsData {
  carrier: string;
  planName: string;
  metalTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Catastrophic' | 'Unsure';
  planType: 'HMO' | 'PPO' | 'EPO' | 'HDHP' | 'Unsure';
}

export interface CostSharingData {
  deductibleIndividual: number;
  deductibleFamily: number;
  deductibleMetYtd: number;
  oopMaxIndividual: number;
  oopMaxFamily: number;
  oopMetYtd: number;
  copayPcp: number;
  copaySpecialist: number;
  copayUrgentCare: number;
  copayEr: number;
  coinsurancePercent: number; // e.g. 20 for 20%
  monthlyPremium: number;
}

export interface HsaData {
  hsaEligible: boolean;
  currentBalance: number;
  ytdContributions: number;
  employerContribution: number;
}

export interface Prescription {
  id: string;
  drugName: string;
  dosage: string;
  frequency: string;
  paymentMethod: 'Insurance' | 'Cash' | 'Unsure';
  preferredPharmacy: string;
}

export interface UpcomingCareData {
  plannedProcedures: string[];
  chronicConditions: string[];
  pregnancyPlanned: boolean;
  behavioralHealthNeeds: boolean;
  notes: string;
}

export interface DocumentUploadMeta {
  sbcFileName?: string;
  sbcFileSize?: string;
  sbcUploadedAt?: string;
  eobFileName?: string;
  eobFileSize?: string;
  eobUploadedAt?: string;
  extractedFromDoc: boolean;
  extractionConfidence: number; // e.g., 95
  autoFilledFields: string[];
}

export interface OnboardingState {
  currentStep: number; // 0: Upload landing, 1: Identity, 2: Household, 3: Plan, 4: Cost & HSA, 5: Care & Rx, 6: Summary
  uploadSkipped: boolean;
  identity: IdentityData;
  household: HouseholdData;
  planDetails: PlanDetailsData;
  costSharing: CostSharingData;
  hsa: HsaData;
  prescriptions: Prescription[];
  upcomingCare: UpcomingCareData;
  documents: DocumentUploadMeta;
  lastSavedAt: string | null;
}
