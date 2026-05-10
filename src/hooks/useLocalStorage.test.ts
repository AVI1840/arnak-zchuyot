import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default value when nothing stored', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('returns stored value when available', () => {
    localStorage.setItem('test-key', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('stored');
  });

  it('updates value and persists to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(JSON.parse(localStorage.getItem('test-key')!)).toBe('updated');
  });

  it('supports function updater', () => {
    const { result } = renderHook(() => useLocalStorage<number>('counter', 0));
    
    act(() => {
      result.current[1](prev => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  it('handles complex objects', () => {
    const defaultObj = { name: 'test', items: [1, 2, 3] };
    const { result } = renderHook(() => useLocalStorage('obj-key', defaultObj));
    
    expect(result.current[0]).toEqual(defaultObj);

    act(() => {
      result.current[1]({ name: 'updated', items: [4, 5] });
    });

    expect(result.current[0]).toEqual({ name: 'updated', items: [4, 5] });
  });

  it('returns default when stored value is invalid JSON', () => {
    localStorage.setItem('bad-key', 'not-json{{{');
    const { result } = renderHook(() => useLocalStorage('bad-key', 'fallback'));
    expect(result.current[0]).toBe('fallback');
  });
});
