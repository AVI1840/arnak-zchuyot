import { useLocalStorage } from './useLocalStorage';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('arnak-bookmarks', []);

  const toggleBookmark = (rightId: string) => {
    setBookmarks(prev => prev.includes(rightId)
      ? prev.filter(id => id !== rightId)
      : [...prev, rightId]);
  };

  const isBookmarked = (rightId: string) => bookmarks.includes(rightId);

  return { bookmarks, toggleBookmark, isBookmarked };
}
