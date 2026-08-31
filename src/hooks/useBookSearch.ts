import { useState, useEffect } from 'react';
import { searchBooks, BOOKS_PER_PAGE } from '../services/openLibraryApi';

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
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Debounce the query
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1); // reset to page 1 on new query
    }, 500);
    return () => clearTimeout(id);
  }, [query]);

  // Fetch whenever debouncedQuery or page changes
  useEffect(() => {
    const fetchBooks = async () => {
      if (!debouncedQuery.trim()) {
        setBooks([]);
        setTotalResults(0);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await searchBooks(debouncedQuery, page);
        setBooks(result.docs);
        setTotalResults(result.numFound);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching books.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedQuery, page]);

  const totalPages = Math.ceil(totalResults / BOOKS_PER_PAGE);

  return {
    query,
    setQuery,
    books,
    isLoading,
    error,
    page,
    setPage,
    totalResults,
    totalPages,
  };
};

