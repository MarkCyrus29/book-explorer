import { useState, useEffect } from 'react';
import { searchBooks } from '../services/openLibraryApi';

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: string[];
  edition_count?: number;
}

export const useBookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!query.trim()) {
        setBooks([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await searchBooks(query);
        setBooks(results);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching books.');
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchBooks();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return { query, setQuery, books, isLoading, error };
};
