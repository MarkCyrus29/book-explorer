export const BOOKS_PER_PAGE = 20;

export interface SearchResult {
  docs: any[];
  numFound: number;
}

export const searchBooks = async (
  query: string,
  page: number = 1
): Promise<SearchResult> => {
  if (!query.trim()) return { docs: [], numFound: 0 };

  const offset = (page - 1) * BOOKS_PER_PAGE;
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${BOOKS_PER_PAGE}&offset=${offset}&fields=key,title,author_name,first_publish_year,cover_i,subject,edition_count`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  const data = await response.json();
  return { docs: data.docs ?? [], numFound: data.numFound ?? 0 };
};

export const getBookCoverUrl = (coverId: number) => {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
};
