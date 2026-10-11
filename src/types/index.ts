export interface GrowthHack {
  id: string;
  dimensionId: 'seo' | 'social' | 'conversion' | 'leads' | 'trust';
  dimensionTitle: string;
  code: string;
  title: string;
  subtitle: string;
  badge: string;
  painPoint: string;
  solution: string;
  mechanism: string[];
  metrics: {
    label: string;
    value: string;
  };
  demoKey?: 'badge' | 'pinterest' | 'tiktok' | 'maps' | 'ar';
}

export interface Dimension {
  id: 'seo' | 'social' | 'conversion' | 'leads' | 'trust';
  title: string;
  enTitle: string;
  summary: string;
  hacksCount: number;
  highlightMetric: string;
}

export interface CalculatorInputs {
  monthlyGmv: number;
  adSpendPercent: number;
  conversionRate: number;
  businessType: 'dtc' | 'factory' | 'b2b_local' | 'amazon_to_dtc';
}

export interface CalculationResult {
  currentAdSpend: number;
  projectedAdSaving: number;
  projectedAdSpend: number;
  currentConversions: number;
  projectedConversionRate: number;
  projectedConversions: number;
  monthlyProfitIncrease: number;
  annualProfitIncrease: number;
  roiPercentage: number;
}

export interface LeadSubmission {
  name: string;
  email: string;
  contact: string; // WhatsApp or WeChat
  websiteUrl: string;
  businessCategory: string;
  monthlyRevenueTier: string;
  primaryPainPoint: string;
  notes?: string;
}

export interface CaseStudy {
  id: string;
  clientType: string;
  industry: string;
  location: string;
  headline: string;
  description: string;
  appliedHacks: string[];
  metrics: {
    label: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface SocialProofNotification {
  id: string;
  timeAgo: string;
  merchant: string;
  city: string;
  action: string;
  result: string;
}
