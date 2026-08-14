import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <div className="relative w-full max-w-xl group">
      <label htmlFor="book-search-input" className="sr-only">Search for books</label>
      <div
        className="relative flex items-center bg-[var(--paper)] rounded-xl px-4 py-3
          border border-[var(--border-hairline)]
          focus-within:border-[var(--accent)] focus-within:shadow-[0_1px_0_0_var(--accent)]
          transition-all duration-150"
      >
        <Search
          className="h-[18px] w-[18px] mr-3.5 shrink-0 text-[var(--ink-tertiary)] group-focus-within:text-[var(--accent)] transition-colors duration-150"
          aria-hidden="true"
        />
        <input
          id="book-search-input"
          type="text"
          role="searchbox"
          aria-label="Search for books"
          className="flex-1 bg-transparent text-[16px] font-medium text-[var(--ink)]
            placeholder:text-[var(--ink-tertiary)] placeholder:font-normal
            focus:outline-none leading-none"
          placeholder="Search by title, author, or subject…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          spellCheck="false"
        />
        {query.length > 0 && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery('')}
            className="ml-3 shrink-0 w-5 h-5 rounded-full bg-[var(--ink-tertiary)] hover:bg-[var(--ink-secondary)]
              flex items-center justify-center transition-colors duration-150
              focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
              <path d="M1 1l6 6M7 1L1 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
