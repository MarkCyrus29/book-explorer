import React from 'react';
import { BookOpen, Search } from 'lucide-react';

interface EmptyStateProps {
  hasQuery: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasQuery }) => {
  if (!hasQuery) {
    return (
      <div className="flex flex-col py-12 px-4 select-none items-center text-center">
        <div className="max-w-sm flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[var(--surface)] flex items-center justify-center mb-6">
            <BookOpen className="h-6 w-6 text-[var(--ink-tertiary)]" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <h2 className="text-[26px] font-bold text-[var(--ink)] leading-snug tracking-[-0.02em] mb-3" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            What would you<br />like to read?
          </h2>
          <p className="text-[15px] text-[var(--ink-secondary)] leading-relaxed">
            Search millions of books by title,<br />author, or subject.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col py-24 px-4 select-none items-center text-center">
      <div className="max-w-sm flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-[var(--surface)] flex items-center justify-center mb-6">
          <Search className="h-6 w-6 text-[var(--ink-tertiary)]" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <h2 className="text-[26px] font-bold text-[var(--ink)] leading-snug tracking-[-0.02em] mb-3" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
          No results found
        </h2>
        <p className="text-[15px] text-[var(--ink-secondary)] leading-relaxed">
          Try a different title, author name,<br />or check for typos.
        </p>
      </div>
    </div>
  );
};
