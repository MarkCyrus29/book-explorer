import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const WINDOW = 5;
  const half = Math.floor(WINDOW / 2);
  const start = Math.max(1, Math.min(page - half, totalPages - WINDOW + 1));
  const end = Math.min(totalPages, start + WINDOW - 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const handleChange = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 mt-16 mb-4 select-none"
    >
      <button
        onClick={() => handleChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="
          flex items-center gap-1.5 px-3 h-9 rounded-lg text-[13px] font-medium
          text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--surface)]
          disabled:opacity-30 disabled:pointer-events-none
          transition-colors duration-150
        "
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        Prev
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => handleChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
            className={`
              w-9 h-9 rounded-lg text-[13px] font-medium
              transition-colors duration-150
              ${
                p === page
                  ? 'bg-[var(--ink)] text-[var(--paper)] cursor-default'
                  : 'text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--surface)]'
              }
            `}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => handleChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="
          flex items-center gap-1.5 px-3 h-9 rounded-lg text-[13px] font-medium
          text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--surface)]
          disabled:opacity-30 disabled:pointer-events-none
          transition-colors duration-150
        "
      >
        Next
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </button>
    </nav>
  );
};
