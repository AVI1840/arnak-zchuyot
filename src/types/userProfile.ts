import { BenefitType } from '@/data/rightsDatabase';

export interface UserMetrics {
  medical_disability_pct: number;
  incapacity_pct: number;
  mobility_pct: number;
  special_services_rate: number;
  nursing_level: number;
  is_income_support: boolean;
  owns_apartment: boolean;
  uses_wheelchair: boolean;
}

export interface UserProfile {
  benefits: BenefitType[];
  metrics: UserMetrics;
  isRefined: boolean; // Flag to track if user went through refinement wizard
}

export const DEFAULT_METRICS: UserMetrics = {
  medical_disability_pct: 0,
  incapacity_pct: 0,
  mobility_pct: 0,
  special_services_rate: 0,
  nursing_level: 0,
  is_income_support: false,
  owns_apartment: false,
  uses_wheelchair: false,
};

export const DEFAULT_USER_PROFILE: UserProfile = {
  benefits: [],
  metrics: { ...DEFAULT_METRICS },
  isRefined: false,
};
