import React from 'react';
import type { Book } from '../hooks/useBookSearch';
import { BookCard } from './BookCard';
import { Pagination } from './Pagination';
import { BOOKS_PER_PAGE } from '../services/openLibraryApi';

interface BookListProps {
  books: Book[];
  totalResults: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  totalResults,
  page,
  totalPages,
  onPageChange,
}) => {
  const from = (page - 1) * BOOKS_PER_PAGE + 1;
  const to = Math.min(page * BOOKS_PER_PAGE, totalResults);

  return (
    <section aria-label="Search results">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-tertiary)] mb-8 select-none text-center">
        Showing {from}–{to} of {totalResults.toLocaleString()} {totalResults === 1 ? 'result' : 'results'}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-10">
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </section>
  );
};

