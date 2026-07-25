export interface ExplanationTiers {
  basic: string;
  advanced: string;
  md: string;
}

export interface MedicalRecordItem {
  id: string;
  testName: string;
  category: 'Glycemic Control' | 'Lipid Panel' | 'Renal & Kidney' | 'Thyroid Function' | 'Electrolytes' | 'Liver Function';
  exactValue: string;
  unit: string;
  referenceRange: string;
  status: 'Normal' | 'Elevated' | 'Low' | 'Attention Required';
  dateTested: string;
  orderingProvider: string;
  explanations: ExplanationTiers;
}

export const MEDICAL_RECORDS_DATA: MedicalRecordItem[] = [
  {
    id: 'rec_hba1c',
    testName: 'Hemoglobin A1c (HbA1c)',
    category: 'Glycemic Control',
    exactValue: '6.8',
    unit: '%',
    referenceRange: '< 5.7% (Normal), 5.7 - 6.4% (Prediabetes), ≥ 6.5% (Diabetes)',
    status: 'Elevated',
    dateTested: 'July 14, 2026',
    orderingProvider: 'Dr. Sarah Jenkins, MD (Endocrinology)',
    explanations: {
      basic: "HbA1c shows your average blood sugar levels over the past 3 months. A score of 6.8% means your blood sugar has been slightly higher than usual. Imagine sugar molecules slowly sticking to your red blood cells—6.8% tells us there's moderate sugar build-up. Making adjustments to diet, exercising daily, or taking mild medication can easily help bring this back down.",
      advanced: "HbA1c measures the percentage of glycated hemoglobin in circulating erythrocytes, reflecting average glycemia over the 120-day lifespan of red blood cells. A value of 6.8% corresponds to an Estimated Average Glucose (eAG) of approximately 149 mg/dL. Elevated glycation increases systemic microvascular stress and end-stage arterial stiffness over long horizons.",
      md: "DIAGNOSTIC ASSESSMENT: Type 2 Diabetes Mellitus (E11.9), suboptimal glycemic control. Patient exhibits eAG 149 mg/dL. CLINICAL RECOMMENDATION: Initate/titrate Metformin 500mg BID with meals or evaluate GLP-1 receptor agonist therapy if BMI > 27. Schedule repeat HbA1c in 90 days. Goal target HbA1c < 6.5% to minimize diabetic retinopathy and nephropathy progression."
    }
  },
  {
    id: 'rec_ldl',
    testName: 'LDL Cholesterol (Calculated)',
    category: 'Lipid Panel',
    exactValue: '142',
    unit: 'mg/dL',
    referenceRange: '< 100 mg/dL (Optimal), 100 - 129 mg/dL (Near Optimal), ≥ 130 mg/dL (Borderline High)',
    status: 'Elevated',
    dateTested: 'July 14, 2026',
    orderingProvider: 'Dr. Michael Chang, MD (Cardiology)',
    explanations: {
      basic: "LDL is often called the 'bad' cholesterol because it carries fat particles around your body that can build up inside your arteries like rust inside water pipes. Your level of 142 mg/dL is moderately elevated. Eating more soluble fiber (like oats and beans), reducing saturated fats, and staying active will help clear up your arteries.",
      advanced: "Low-Density Lipoprotein (LDL) particles transport hydrophobic cholesterol esters through blood plasma. At 142 mg/dL, elevated atherogenic ApoB-containing lipoproteins increase trans-endothelial migration into arterial intima, predisposing macropage foam cell formation and early atherosclerotic plaque deposition.",
      md: "DIAGNOSTIC ASSESSMENT: Primary Hyperlipidemia (E78.00), moderate ASCVD 10-year risk profile. Atherogenic lipoprotein burden elevated at 142 mg/dL. CLINICAL ACTION PLAN: Recommend 12-week therapeutic lifestyle changes (TLC diet <7% sat fat). If 10-yr ASCVD risk score > 7.5%, initiate low-to-moderate intensity statin (Atorvastatin 10mg qhs). Recheck lipid panel in 12 weeks."
    }
  },
  {
    id: 'rec_egfr',
    testName: 'Estimated GFR (eGFR CKD-EPI)',
    category: 'Renal & Kidney',
    exactValue: '54',
    unit: 'mL/min/1.73m²',
    referenceRange: '≥ 90 mL/min (Normal), 60 - 89 mL/min (Mild reduction), 30 - 59 mL/min (Moderate reduction)',
    status: 'Attention Required',
    dateTested: 'July 14, 2026',
    orderingProvider: 'Dr. Sarah Jenkins, MD (Internal Medicine)',
    explanations: {
      basic: "eGFR measures how efficiently your kidneys filter waste out of your blood. A healthy score is 90 or above. Your score of 54 means your kidneys are working at a reduced pace. Drinking plenty of water, limiting salt, and avoiding over-the-counter pain meds like ibuprofen can help protect your kidneys.",
      advanced: "Estimated Glomerular Filtration Rate calculated via the 2021 CKD-EPI serum creatinine equation without race variables. An eGFR of 54 mL/min/1.73m² indicates Stage 3a Chronic Kidney Disease (CKD) when sustained >3 months. Decreased ultrafiltration efficacy alters renal excretion clearance of nitrogenous wastes.",
      md: "DIAGNOSTIC ASSESSMENT: Chronic Kidney Disease Stage 3a (N18.31), moderate reduction in GFR. CLINICAL IMPLICATIONS: Avoid nephrotoxic agents (NSAIDs, aminoglycosides, IV iodinated contrast). Order Urine Albumin-to-Creatinine Ratio (UACR) to assess proteinuria. Dose-adjust renally cleared medications. Monitor BMP & serum potassium q6 months."
    }
  },
  {
    id: 'rec_tsh',
    testName: 'Thyroid Stimulating Hormone (TSH)',
    category: 'Thyroid Function',
    exactValue: '4.80',
    unit: 'mIU/L',
    referenceRange: '0.45 - 4.50 mIU/L (Normal)',
    status: 'Elevated',
    dateTested: 'June 28, 2026',
    orderingProvider: 'Dr. Elena Rostova, MD (Endocrinology)',
    explanations: {
      basic: "TSH is a signal from your brain telling your thyroid gland to wake up and produce energy hormones. When TSH is high (yours is 4.80 mIU/L, just above the top normal limit of 4.50), it means your thyroid is acting a little sluggish. You might feel slightly tired or cold at times.",
      advanced: "Pituitary thyrotropes release TSH via negative feedback loops sensitive to unbound peripheral Free T4 and Free T3. Mild elevation to 4.80 mIU/L with normal Free T4 indicates Subclinical Hypothyroidism. Compensatory anterior pituitary TSH hypersecretion maintains euthyroid tissue homeostasis.",
      md: "DIAGNOSTIC ASSESSMENT: Subclinical Hypothyroidism (E03.8). TSH slightly above upper reference limit (4.80 mIU/L). CLINICAL STRATEGY: Order anti-TPO antibodies to evaluate Hashimoto's thyroiditis auto-immunity. If asymptomatic and Free T4 normal, hold Levothyroxine initiation; re-test serum TSH and Free T4 in 3 months."
    }
  },
  {
    id: 'rec_sodium',
    testName: 'Serum Sodium (Na+)',
    category: 'Electrolytes',
    exactValue: '138',
    unit: 'mEq/L',
    referenceRange: '135 - 145 mEq/L (Normal)',
    status: 'Normal',
    dateTested: 'July 14, 2026',
    orderingProvider: 'Dr. Sarah Jenkins, MD (Internal Medicine)',
    explanations: {
      basic: "Sodium is an essential mineral that balances fluid levels in your body and keeps your nerves and muscles working smoothly. Your level of 138 mEq/L is right in the ideal healthy sweet spot!",
      advanced: "Serum sodium concentration reflects extracellular fluid osmolality governed by hypothalamic vasopressin (ADH) release and renal aquaporin-2 channel expression. 138 mEq/L demonstrates balanced tonicity without hyponatremic or hypernatremic fluid shifts.",
      md: "CLINICAL EVALUATION: Eunatremia (Normonatremia). Intravascular volume status normal, extracellular osmolality intact (~285-295 mOsm/kg). No electrolyte replacement or fluid restriction indicated."
    }
  },
  {
    id: 'rec_alt',
    testName: 'Alanine Aminotransferase (ALT/SGPT)',
    category: 'Liver Function',
    exactValue: '28',
    unit: 'U/L',
    referenceRange: '7 - 56 U/L (Normal)',
    status: 'Normal',
    dateTested: 'July 14, 2026',
    orderingProvider: 'Dr. Sarah Jenkins, MD (Internal Medicine)',
    explanations: {
      basic: "ALT is an enzyme found inside your liver cells. When liver cells are healthy, very little ALT leaks into your blood. Your level of 28 U/L is completely normal, showing your liver is filtering happily.",
      advanced: "Alanine aminotransferase catalyzes the reversible transamination between L-alanine and 2-oxoglutarate. Cytosolic hepatic localization makes ALT a sensitive biomarker for hepatocellular integrity. 28 U/L confirms absence of acute hepatocyte necrosis or viral hepatitis inflammation.",
      md: "CLINICAL EVALUATION: Hepatic transaminase panel normal. No hepatocellular injury detected. Continue monitoring routine LFTs annually."
    }
  }
];
