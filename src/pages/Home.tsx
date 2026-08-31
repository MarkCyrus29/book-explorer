import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { BookList } from '../components/BookList';
import { Loader } from '../components/Loader';
import { EmptyState } from '../components/EmptyState';
import { useBookSearch } from '../hooks/useBookSearch';

export const Home: React.FC = () => {
  const { query, setQuery, books, isLoading, error, page, setPage, totalResults, totalPages } =
    useBookSearch();

  return (
    <div className="min-h-screen bg-[var(--paper)]">


      <header className="px-8 sm:px-12 pt-20 pb-16">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">


          <div className="max-w-2xl mb-6">
            <h1
              className="text-[42px] sm:text-[56px] text-[var(--ink)] leading-[1.1] mb-5"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Find your next great read.
            </h1>
          </div>


          <SearchBar query={query} setQuery={setQuery} />
        </div>
      </header>


      <main className="px-8 sm:px-12 pb-24 max-w-[1400px] mx-auto">
        {error && (
          <p role="alert" className="text-[13px] text-red-500 mb-6">
            {error}
          </p>
        )}

        {isLoading ? (
          <Loader />
        ) : books.length > 0 ? (
          <BookList
            books={books}
            totalResults={totalResults}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        ) : (
          <EmptyState hasQuery={query.trim().length > 0} />
        )}
      </main>
    </div>
  );
};

