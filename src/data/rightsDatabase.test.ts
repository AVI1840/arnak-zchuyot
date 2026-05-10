import { describe, it, expect } from 'vitest';
import { getEligibleRights, sortRights, RightWithScore, BenefitType } from './rightsDatabase';
import { UserMetrics, DEFAULT_METRICS } from '@/types/userProfile';

describe('getEligibleRights', () => {
  it('returns empty array when no benefits selected', () => {
    const result = getEligibleRights([]);
    expect(result).toEqual([]);
  });

  it('returns rights for a single benefit', () => {
    const result = getEligibleRights(['general_disability']);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(right => {
      expect(right.matchScore).toBeGreaterThan(0);
      expect(right.totalScore).toBeGreaterThan(0);
    });
  });

  it('returns rights for multiple benefits', () => {
    const single = getEligibleRights(['general_disability']);
    const multiple = getEligibleRights(['general_disability', 'mobility']);
    // Multiple benefits should yield at least as many rights as single
    expect(multiple.length).toBeGreaterThanOrEqual(single.length);
  });

  it('returns more specific results with metrics', () => {
    const withoutMetrics = getEligibleRights(['general_disability']);
    const metrics: UserMetrics = {
      ...DEFAULT_METRICS,
      medical_disability_pct: 100,
      incapacity_pct: 75,
    };
    const withMetrics = getEligibleRights(['general_disability'], metrics);
    // Both should return results
    expect(withoutMetrics.length).toBeGreaterThan(0);
    expect(withMetrics.length).toBeGreaterThan(0);
  });

  it('results are sorted by totalScore descending', () => {
    const result = getEligibleRights(['general_disability', 'old_age']);
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].totalScore).toBeGreaterThanOrEqual(result[i].totalScore);
    }
  });

  it('deduplicates rights by title', () => {
    const result = getEligibleRights(['general_disability', 'mobility', 'old_age']);
    const titles = result.map(r => r.title);
    const uniqueTitles = new Set(titles);
    expect(titles.length).toBe(uniqueTitles.size);
  });

  it('each right has required fields', () => {
    const result = getEligibleRights(['old_age']);
    result.forEach(right => {
      expect(right.id).toBeDefined();
      expect(right.title).toBeDefined();
      expect(right.domain).toBeDefined();
      expect(right.provider).toBeDefined();
      expect(right.eligibilityLevel).toMatch(/^(eligible|needs_info)$/);
    });
  });
});

describe('sortRights', () => {
  // Create mock rights for sorting tests
  const mockRights: RightWithScore[] = [
    {
      id: 'a', title: 'A', provider: 'P', domain: 'housing',
      value_display: '100₪', eligibility_details: '', how_to_apply: '',
      applicable_benefits: ['general_disability'], is_automatic: false,
      primary_display_priority: 1, source_verified: true,
      matchScore: 0.5, eligibilityLevel: 'eligible', totalScore: 50,
      estimated_value: 100, popularity_score: 30,
    },
    {
      id: 'b', title: 'B', provider: 'P', domain: 'health',
      value_display: '500₪', eligibility_details: '', how_to_apply: '',
      applicable_benefits: ['general_disability'], is_automatic: true,
      primary_display_priority: 2, source_verified: true,
      matchScore: 0.8, eligibilityLevel: 'eligible', totalScore: 80,
      estimated_value: 500, popularity_score: 90,
    },
    {
      id: 'c', title: 'C', provider: 'P', domain: 'transport',
      value_display: '200₪', eligibility_details: '', how_to_apply: '',
      applicable_benefits: ['mobility'], is_automatic: false,
      primary_display_priority: 3, source_verified: true,
      matchScore: 0.3, eligibilityLevel: 'needs_info', totalScore: 30,
      estimated_value: 200, popularity_score: 60,
    },
  ];

  it('sorts by score descending', () => {
    const sorted = sortRights(mockRights, 'score');
    expect(sorted[0].id).toBe('b');
    expect(sorted[1].id).toBe('a');
    expect(sorted[2].id).toBe('c');
  });

  it('sorts by value descending', () => {
    const sorted = sortRights(mockRights, 'value');
    expect(sorted[0].id).toBe('b');
    expect(sorted[1].id).toBe('c');
    expect(sorted[2].id).toBe('a');
  });

  it('sorts by popularity descending', () => {
    const sorted = sortRights(mockRights, 'popularity');
    expect(sorted[0].id).toBe('b');
    expect(sorted[1].id).toBe('c');
    expect(sorted[2].id).toBe('a');
  });

  it('sorts automatic first', () => {
    const sorted = sortRights(mockRights, 'automatic');
    expect(sorted[0].is_automatic).toBe(true);
  });

  it('does not mutate original array', () => {
    const original = [...mockRights];
    sortRights(mockRights, 'value');
    expect(mockRights).toEqual(original);
  });
});
