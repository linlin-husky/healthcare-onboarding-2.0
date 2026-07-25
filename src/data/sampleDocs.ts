import type { OnboardingState } from '../types/onboarding';

export interface SampleDocPreset {
  id: string;
  title: string;
  subtitle: string;
  type: 'SBC' | 'EOB';
  carrier: string;
  fileName: string;
  fileSize: string;
  confidence: number;
  extractedValues: Partial<OnboardingState>;
  extractedFieldsList: string[];
}

export const SAMPLE_DOCUMENTS: SampleDocPreset[] = [
  {
    id: 'bcbs-eob-2026',
    title: 'Blue Cross Blue Shield Gold PPO (EOB Statement)',
    subtitle: 'Recent Explanation of Benefits with deductible accumulator & copays',
    type: 'EOB',
    carrier: 'Blue Cross Blue Shield',
    fileName: 'BCBS_EOB_Statement_Q2_2026.pdf',
    fileSize: '1.4 MB',
    confidence: 96,
    extractedFieldsList: [
      'Carrier Name: Blue Cross Blue Shield',
      'Plan Tier: Gold PPO',
      'Individual Deductible: $1,500',
      'YTD Deductible Met: $850',
      'Individual OOP Max: $4,500',
      'YTD OOP Met: $1,200',
      'Coinsurance: 20%',
      'Copays: $25 PCP / $45 Specialist',
      'HSA Status: Eligible ($1,250 balance detected)'
    ],
    extractedValues: {
      planDetails: {
        carrier: 'Blue Cross Blue Shield',
        planName: 'Blue Access Gold PPO 1500',
        metalTier: 'Gold',
        planType: 'PPO'
      },
      costSharing: {
        deductibleIndividual: 1500,
        deductibleFamily: 3000,
        deductibleMetYtd: 850,
        oopMaxIndividual: 4500,
        oopMaxFamily: 9000,
        oopMetYtd: 1200,
        copayPcp: 25,
        copaySpecialist: 45,
        copayUrgentCare: 60,
        copayEr: 350,
        coinsurancePercent: 20,
        monthlyPremium: 420
      },
      hsa: {
        hsaEligible: true,
        currentBalance: 1250,
        ytdContributions: 600,
        employerContribution: 300
      }
    }
  },
  {
    id: 'uhc-sbc-2026',
    title: 'UnitedHealthcare Choice Plus (SBC Summary)',
    subtitle: 'Summary of Benefits & Coverage document detailing silver tier cost-sharing',
    type: 'SBC',
    carrier: 'UnitedHealthcare',
    fileName: 'UHC_ChoicePlus_SBC_2026.pdf',
    fileSize: '2.1 MB',
    confidence: 94,
    extractedFieldsList: [
      'Carrier Name: UnitedHealthcare',
      'Plan Tier: Silver EPO',
      'Individual Deductible: $2,800',
      'Family Deductible: $5,600',
      'Individual OOP Max: $6,500',
      'Coinsurance: 30%',
      'Copays: $35 PCP / $70 Specialist / $75 Urgent',
      'Monthly Premium: $310'
    ],
    extractedValues: {
      planDetails: {
        carrier: 'UnitedHealthcare',
        planName: 'Choice Plus Silver 2800',
        metalTier: 'Silver',
        planType: 'EPO'
      },
      costSharing: {
        deductibleIndividual: 2800,
        deductibleFamily: 5600,
        deductibleMetYtd: 450,
        oopMaxIndividual: 6500,
        oopMaxFamily: 13000,
        oopMetYtd: 720,
        copayPcp: 35,
        copaySpecialist: 70,
        copayUrgentCare: 75,
        copayEr: 450,
        coinsurancePercent: 30,
        monthlyPremium: 310
      },
      hsa: {
        hsaEligible: false,
        currentBalance: 0,
        ytdContributions: 0,
        employerContribution: 0
      }
    }
  },
  {
    id: 'kaiser-hdhp-2026',
    title: 'Kaiser Permanente High Deductible (HSA-Qualified)',
    subtitle: 'Bronze HDHP with high HSA eligibility and 0% coinsurance after deductible',
    type: 'SBC',
    carrier: 'Kaiser Permanente',
    fileName: 'Kaiser_Bronze_HDHP_SBC.pdf',
    fileSize: '1.8 MB',
    confidence: 98,
    extractedFieldsList: [
      'Carrier Name: Kaiser Permanente',
      'Plan Tier: Bronze HDHP',
      'Individual Deductible: $3,500',
      'YTD Deductible Met: $1,900',
      'Individual OOP Max: $7,000',
      'Coinsurance: 15%',
      'HSA Status: Fully Eligible ($2,400 active balance)'
    ],
    extractedValues: {
      planDetails: {
        carrier: 'Kaiser Permanente',
        planName: 'Bronze 3500 HDHP',
        metalTier: 'Bronze',
        planType: 'HDHP'
      },
      costSharing: {
        deductibleIndividual: 3500,
        deductibleFamily: 7000,
        deductibleMetYtd: 1900,
        oopMaxIndividual: 7000,
        oopMaxFamily: 14000,
        oopMetYtd: 2100,
        copayPcp: 15,
        copaySpecialist: 40,
        copayUrgentCare: 50,
        copayEr: 300,
        coinsurancePercent: 15,
        monthlyPremium: 260
      },
      hsa: {
        hsaEligible: true,
        currentBalance: 2400,
        ytdContributions: 1200,
        employerContribution: 500
      }
    }
  }
];
