import type { IdentityData, HouseholdData, PlanDetailsData, CostSharingData, HsaData, Prescription, UpcomingCareData } from '../types/onboarding';

export interface AgentMessage {
  id: string;
  sender: 'website_agent' | 'user_agent' | 'system';
  senderName: string;
  content: string;
  payloadSnippet?: Record<string, unknown>;
  timestamp: string;
  status?: 'handshake' | 'negotiating' | 'verified' | 'complete';
}

export interface AgentPreset {
  id: string;
  agentName: string;
  userAvatarName: string;
  userEmail: string;
  carrier: string;
  planName: string;
  messages: Omit<AgentMessage, 'timestamp'>[];
  onboardingData: {
    identity: IdentityData;
    household: HouseholdData;
    planDetails: PlanDetailsData;
    costSharing: CostSharingData;
    hsa: HsaData;
    prescriptions: Omit<Prescription, 'id'>[];
    upcomingCare: UpcomingCareData;
    autoFilledFields: string[];
  };
}

export const AGENT_PRESETS: AgentPreset[] = [
  {
    id: 'emmas_ai',
    agentName: "Emma's Health Assistant v2.4",
    userAvatarName: 'Emma Svensson',
    userEmail: 'emma.svensson@example.com',
    carrier: 'Blue Cross Blue Shield of Massachusetts',
    planName: 'Blue Care Elect Preferred Gold PPO',
    messages: [
      {
        id: 'msg_1',
        sender: 'system',
        senderName: 'A2A Protocol Engine',
        content: 'Initiating mTLS cryptographically signed A2A session between Website Agent (Emme Concierge) and User Agent (Emma Health AI)...',
        status: 'handshake'
      },
      {
        id: 'msg_2',
        sender: 'website_agent',
        senderName: 'Emme Web Concierge AI',
        content: 'Hello! I am Emme Health Intake Assistant. Requesting verified member profile and health plan credentials for fast onboarding.',
        status: 'handshake'
      },
      {
        id: 'msg_3',
        sender: 'user_agent',
        senderName: "Emma's Health AI",
        content: 'Greeting confirmed. Identity verified via OAuth JWT. Transmitting member identity (Emma Svensson, zip: 02115, Household size: 2).',
        payloadSnippet: { fullName: 'Emma Svensson', email: 'emma.svensson@example.com', zipCode: '02115' },
        status: 'negotiating'
      },
      {
        id: 'msg_4',
        sender: 'website_agent',
        senderName: 'Emme Web Concierge AI',
        content: 'Identity accepted. Please provide SBC (Summary of Benefits) & current year-to-date deductible/OOP metrics.',
        status: 'negotiating'
      },
      {
        id: 'msg_5',
        sender: 'user_agent',
        senderName: "Emma's Health AI",
        content: 'Transmitting BCBS MA Gold PPO contract structure. Individual Deductible: $1,500 ($1,120 met YTD). Out-of-pocket max: $4,500 ($2,100 met YTD). PCP copay: $25, Specialist: $45.',
        payloadSnippet: { carrier: 'BCBS MA', planName: 'Gold PPO', deductibleIndividual: 1500, oopMaxIndividual: 4500 },
        status: 'negotiating'
      },
      {
        id: 'msg_6',
        sender: 'website_agent',
        senderName: 'Emme Web Concierge AI',
        content: 'Verification check passed against carrier clearinghouse. Do you have active prescriptions or scheduled procedures to cross-check in-network tiering?',
        status: 'negotiating'
      },
      {
        id: 'msg_7',
        sender: 'user_agent',
        senderName: "Emma's Health AI",
        content: 'Transmitting active maintenance Rx: Atorvastatin 20mg (CVSP harmacy preferred) & Albuterol Inhaler. Planned care: Physical Therapy (6 sessions remaining). HSA balance: $2,450.',
        payloadSnippet: { activeRxCount: 2, hsaBalance: 2450, plannedCare: 'Physical Therapy' },
        status: 'verified'
      },
      {
        id: 'msg_8',
        sender: 'website_agent',
        senderName: 'Emme Web Concierge AI',
        content: 'All data reconciled! Zero manual form fields required. Entire 6-step health intake generated and ready for user signature.',
        status: 'complete'
      }
    ],
    onboardingData: {
      identity: {
        fullName: 'Emma Svensson',
        email: 'emma.svensson@example.com',
        zipCode: '02115'
      },
      household: {
        householdSize: 2,
        incomeRange: '$100,000 - $150,000',
        filingStatus: 'Married Filing Jointly'
      },
      planDetails: {
        carrier: 'Blue Cross Blue Shield of Massachusetts',
        planName: 'Blue Care Elect Preferred Gold PPO',
        metalTier: 'Gold',
        planType: 'PPO'
      },
      costSharing: {
        deductibleIndividual: 1500,
        deductibleFamily: 3000,
        deductibleMetYtd: 1120,
        oopMaxIndividual: 4500,
        oopMaxFamily: 9000,
        oopMetYtd: 2100,
        copayPcp: 25,
        copaySpecialist: 45,
        copayUrgentCare: 60,
        copayEr: 250,
        coinsurancePercent: 20,
        monthlyPremium: 420
      },
      hsa: {
        hsaEligible: true,
        currentBalance: 2450,
        ytdContributions: 1200,
        employerContribution: 500
      },
      prescriptions: [
        {
          drugName: 'Atorvastatin',
          dosage: '20 mg tablet',
          frequency: 'Once daily',
          paymentMethod: 'Insurance',
          preferredPharmacy: 'CVS Pharmacy #02115'
        },
        {
          drugName: 'Albuterol Sulfate HFA',
          dosage: '90 mcg/actuation',
          frequency: 'As needed for asthma',
          paymentMethod: 'Insurance',
          preferredPharmacy: 'CVS Pharmacy #02115'
        }
      ],
      upcomingCare: {
        plannedProcedures: ['Outpatient Physical Therapy (6 sessions)', 'Annual Wellness Exam'],
        chronicConditions: ['Mild Asthma', 'Hyperlipidemia'],
        pregnancyPlanned: false,
        behavioralHealthNeeds: false,
        notes: 'A2A Agent verified in-network PT provider tiering.'
      },
      autoFilledFields: [
        'Full Name', 'Email', 'Zip Code', 'Carrier', 'Plan Name', 'Metal Tier',
        'Individual Deductible', 'YTD Deductible Met', 'OOP Max', 'Copays',
        'Prescriptions', 'HSA Balance', 'Upcoming Care'
      ]
    }
  },
  {
    id: 'max_care_ai',
    agentName: 'Max Family Health Companion v4.1',
    userAvatarName: 'Max Miller',
    userEmail: 'max.miller@healthmail.org',
    carrier: 'Harvard Pilgrim Health Care',
    planName: 'HPHC Best Buy HMO 2000',
    messages: [
      {
        id: 'msg_1',
        sender: 'system',
        senderName: 'A2A Protocol Engine',
        content: 'Securing Agent-to-Agent channel for Max Miller (Harvard Pilgrim HMO profile)...',
        status: 'handshake'
      },
      {
        id: 'msg_2',
        sender: 'website_agent',
        senderName: 'Emme Web Concierge AI',
        content: 'A2A handshake established. Requesting HMO plan benefits & family deductible metrics.',
        status: 'handshake'
      },
      {
        id: 'msg_3',
        sender: 'user_agent',
        senderName: 'Max Family Health Companion',
        content: 'Transmitting family identity (Household size: 4). Carrier: Harvard Pilgrim Health Care. HMO metal tier: Silver.',
        payloadSnippet: { fullName: 'Max Miller', householdSize: 4, metalTier: 'Silver' },
        status: 'negotiating'
      },
      {
        id: 'msg_4',
        sender: 'user_agent',
        senderName: 'Max Family Health Companion',
        content: 'Cost-sharing parameters: Deductible $2,000 Ind / $4,000 Fam ($850 YTD met). OOP Max $6,850 Ind / $13,700 Fam. Copay PCP $30, ER $350.',
        payloadSnippet: { deductibleInd: 2000, oopMaxInd: 6850, copayPcp: 30 },
        status: 'verified'
      },
      {
        id: 'msg_5',
        sender: 'website_agent',
        senderName: 'Emme Web Concierge AI',
        content: 'Data validated. All 4 family member profiles mapped. Prepared 100% automated form submission.',
        status: 'complete'
      }
    ],
    onboardingData: {
      identity: {
        fullName: 'Max Miller',
        email: 'max.miller@healthmail.org',
        zipCode: '02138'
      },
      household: {
        householdSize: 4,
        incomeRange: '$150,000 - $200,000',
        filingStatus: 'Married Filing Jointly'
      },
      planDetails: {
        carrier: 'Harvard Pilgrim Health Care',
        planName: 'HPHC Best Buy HMO 2000',
        metalTier: 'Silver',
        planType: 'HMO'
      },
      costSharing: {
        deductibleIndividual: 2000,
        deductibleFamily: 4000,
        deductibleMetYtd: 850,
        oopMaxIndividual: 6850,
        oopMaxFamily: 13700,
        oopMetYtd: 1420,
        copayPcp: 30,
        copaySpecialist: 55,
        copayUrgentCare: 75,
        copayEr: 350,
        coinsurancePercent: 25,
        monthlyPremium: 580
      },
      hsa: {
        hsaEligible: true,
        currentBalance: 1800,
        ytdContributions: 900,
        employerContribution: 400
      },
      prescriptions: [
        {
          drugName: 'Lisopril',
          dosage: '10 mg tablet',
          frequency: 'Daily',
          paymentMethod: 'Insurance',
          preferredPharmacy: 'Walgreens Pharmacy #02138'
        }
      ],
      upcomingCare: {
        plannedProcedures: ['Routine Pediatric Eye Exam'],
        chronicConditions: ['Hypertension'],
        pregnancyPlanned: false,
        behavioralHealthNeeds: true,
        notes: 'A2A Agent synced pediatric care history & behavioral health coverage benefits.'
      },
      autoFilledFields: [
        'Full Name', 'Email', 'Household Size', 'Carrier', 'Plan Name',
        'Deductible', 'OOP Max', 'Copays', 'Prescriptions', 'HSA Status'
      ]
    }
  }
];
