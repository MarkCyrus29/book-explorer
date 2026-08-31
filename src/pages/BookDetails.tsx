import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { getBookCoverUrl } from '../services/openLibraryApi';

export const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bookDetails, setBookDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBookDetails(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--paper)]" aria-busy="true" aria-label="Loading book details">
        <div className="px-8 sm:px-12 pt-8 max-w-[960px] mx-auto">
          <div className="skeleton h-4 w-32 rounded-full" />
        </div>
        <div className="px-8 sm:px-12 pt-10 pb-24 max-w-[960px] mx-auto">
          <div className="flex flex-col md:grid md:grid-cols-[320px_1fr] gap-10 md:gap-16 items-start">
            <div className="w-full max-w-[280px] mx-auto md:max-w-none">
              <div className="skeleton rounded-2xl" style={{ aspectRatio: '2 / 3' }} />
            </div>
            <div className="flex flex-col gap-5 pt-2 w-full">
              <div className="skeleton h-10 w-5/6 max-w-md rounded-xl" />
              <div className="skeleton h-6 w-2/5 rounded-lg opacity-70" />
              <div className="mt-4 space-y-3 w-full">
                <div className="skeleton h-3 w-full max-w-lg rounded-full opacity-60" />
                <div className="skeleton h-3 w-11/12 max-w-lg rounded-full opacity-55" />
                <div className="skeleton h-3 w-4/5 max-w-lg rounded-full opacity-50" />
                <div className="skeleton h-3 w-3/4 max-w-lg rounded-full opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !bookDetails) {
    return (
      <div className="min-h-screen bg-[var(--paper)] px-8 sm:px-12 flex flex-col items-center text-center">
        <div className="max-w-[760px] mx-auto pt-20 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[var(--surface)] flex items-center justify-center mb-6">
            <BookOpen className="h-7 w-7 text-[var(--ink-tertiary)]" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <p className="text-[20px] font-bold text-[var(--ink)] mb-2">
            {error || 'Book not found'}
          </p>
          <p className="text-[15px] text-[var(--ink-secondary)] mb-8">
            We couldn't load this book. Please try again.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--accent)]
              hover:text-[var(--accent-hover)] transition-colors duration-150"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const coverId = bookDetails.covers?.[0];
  const coverUrl = coverId ? getBookCoverUrl(coverId) : null;
  const description =
    typeof bookDetails.description === 'string'
      ? bookDetails.description
      : bookDetails.description?.value || null;

  return (
    <div className="min-h-screen bg-[var(--paper)]">

      <div className="px-8 sm:px-12 pt-8 max-w-[960px] mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-secondary)]
            hover:text-[var(--accent)] transition-colors duration-150 group"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-150 group-hover:-translate-x-0.5 motion-reduce:transform-none"
            aria-hidden="true"
          />
          Search
        </Link>
      </div>

      <main className="px-8 sm:px-12 pt-10 pb-28 max-w-[960px] mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-[320px_1fr] gap-10 md:gap-16 items-start">

          <div className="w-full max-w-[280px] mx-auto md:max-w-none md:sticky md:top-10 shrink-0">
            {coverUrl ? (
              <img
                src={coverUrl.replace('-M.jpg', '-L.jpg')}
                alt={`Cover for ${bookDetails.title}`}
                className="w-full h-auto rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              />
            ) : (
              <div
                className="bg-[var(--surface)] rounded-xl flex flex-col items-center justify-center gap-3 text-[var(--ink-tertiary)]"
                style={{ aspectRatio: '2 / 3' }}
              >
                <BookOpen className="h-12 w-12" strokeWidth={1} aria-hidden="true" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">No Cover</span>
              </div>
            )}
          </div>

          <div className="flex flex-col min-w-0 w-full text-left">

            <h1
              className="text-[36px] sm:text-[44px] font-bold text-[var(--ink)]
                leading-[1.1] mb-4"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {bookDetails.title}
            </h1>

            {bookDetails.first_publish_date && (
              <p className="text-[14px] text-[var(--ink-secondary)] font-medium mb-10 tabular-nums">
                First published {bookDetails.first_publish_date}
              </p>
            )}

            {description && (
              <div className="mb-12">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-tertiary)] mb-4">
                  About
                </p>
                <p className="text-[16px] text-(--ink) leading-[1.8] whitespace-pre-line">
                  {description}
                </p>
              </div>
            )}

            {(description || bookDetails.first_publish_date) && bookDetails.subjects && (
              <div className="w-full border-t border-(--border-hairline) mb-6" />
            )}

            {bookDetails.subjects && (
              <div className="mb-10 w-full">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-(--ink-tertiary) mb-4">
                  Subjects
                </p>
                <div className="flex flex-wrap justify-start gap-2">
                  {bookDetails.subjects.slice(0, 14).map((subject: string, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1.5 rounded-full
                        text-[12px] font-medium
                        bg-[var(--surface)] text-[var(--ink)]
                        transition-colors duration-150 cursor-default
                        select-none"
                    >
                      {subject}
                    </span>
                  ))}
                  {bookDetails.subjects.length > 14 && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full
                      text-[12px] font-medium text-[var(--ink-tertiary)] select-none">
                      +{bookDetails.subjects.length - 14} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {bookDetails.edition_count !== undefined && (
              <>
                <div className="w-full border-t border-[var(--border-hairline)] mb-8" />
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-tertiary)] mb-2">
                    Editions
                  </p>
                  <p className="text-[15px] text-[var(--ink)] font-medium tabular-nums">
                    {bookDetails.edition_count.toLocaleString()} edition{bookDetails.edition_count !== 1 ? 's' : ''}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
