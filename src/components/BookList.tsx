import React from 'react';
import type { Book } from '../hooks/useBookSearch';
import { BookCard } from './BookCard';

interface BookListProps {
  books: Book[];
}

export const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <section aria-label="Search results">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-tertiary)] mb-8 select-none text-center">
        {books.length} {books.length === 1 ? 'result' : 'results'}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-10">
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </section>
  );
};
