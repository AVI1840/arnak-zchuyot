import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBookmarks } from './useBookmarks';

describe('useBookmarks', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty bookmarks', () => {
    const { result } = renderHook(() => useBookmarks());
    expect(result.current.bookmarks).toEqual([]);
  });

  it('toggleBookmark adds a bookmark', () => {
    const { result } = renderHook(() => useBookmarks());
    
    act(() => {
      result.current.toggleBookmark('right-1');
    });

    expect(result.current.bookmarks).toContain('right-1');
    expect(result.current.isBookmarked('right-1')).toBe(true);
  });

  it('toggleBookmark removes an existing bookmark', () => {
    const { result } = renderHook(() => useBookmarks());
    
    act(() => {
      result.current.toggleBookmark('right-1');
    });
    act(() => {
      result.current.toggleBookmark('right-1');
    });

    expect(result.current.bookmarks).not.toContain('right-1');
    expect(result.current.isBookmarked('right-1')).toBe(false);
  });

  it('isBookmarked returns false for non-bookmarked items', () => {
    const { result } = renderHook(() => useBookmarks());
    expect(result.current.isBookmarked('nonexistent')).toBe(false);
  });

  it('supports multiple bookmarks', () => {
    const { result } = renderHook(() => useBookmarks());
    
    act(() => {
      result.current.toggleBookmark('right-1');
    });
    act(() => {
      result.current.toggleBookmark('right-2');
    });
    act(() => {
      result.current.toggleBookmark('right-3');
    });

    expect(result.current.bookmarks).toHaveLength(3);
    expect(result.current.isBookmarked('right-1')).toBe(true);
    expect(result.current.isBookmarked('right-2')).toBe(true);
    expect(result.current.isBookmarked('right-3')).toBe(true);
  });

  it('persists bookmarks to localStorage', () => {
    const { result } = renderHook(() => useBookmarks());
    
    act(() => {
      result.current.toggleBookmark('right-1');
    });

    const stored = JSON.parse(localStorage.getItem('arnak-bookmarks')!);
    expect(stored).toContain('right-1');
  });
});
