import React from 'react';
import { Link } from 'react-router-dom';
import type { Book } from '../hooks/useBookSearch';
import { getBookCoverUrl } from '../services/openLibraryApi';
import { BookOpen } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const coverUrl = book.cover_i ? getBookCoverUrl(book.cover_i) : null;
  const bookId = book.key.replace('/works/', '');

  return (
    <Link
      to={`/book/${bookId}`}
      className="group flex flex-col focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-4 rounded-xl"
      aria-label={`${book.title}${book.author_name ? ` by ${book.author_name[0]}` : ''}`}
    >
      <div
        className="relative w-full overflow-hidden rounded-xl bg-[var(--surface)]
          group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)]
          group-hover:-translate-y-1
          transition-[transform,box-shadow] duration-250 ease-out
          motion-reduce:transform-none motion-reduce:transition-none"
        style={{ aspectRatio: '2 / 3' }}
      >
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[var(--surface)] flex flex-col items-center justify-center gap-2 text-[var(--ink-tertiary)]">
            <BookOpen className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em]">No Cover</span>
          </div>
        )}
      </div>

      <div className="mt-3 px-0.5 text-center">
        <h3
          className="text-[15px] font-semibold leading-snug line-clamp-2 text-[var(--ink)]
            transition-colors duration-150"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          title={book.title}
        >
          {book.title}
        </h3>
        <p className="text-[12px] text-[var(--ink-secondary)] mt-1.5 line-clamp-1 font-normal">
          {book.author_name ? book.author_name[0] : 'Unknown Author'}
        </p>
        {book.first_publish_year && (
          <p className="text-[11px] text-[var(--ink-tertiary)] mt-0.5 font-normal tabular-nums">
            {book.first_publish_year}
          </p>
        )}
      </div>
    </Link>
  );
};
