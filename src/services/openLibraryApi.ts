export const searchBooks = async (query: string) => {
  if (!query.trim()) return [];
  const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  const data = await response.json();
  return data.docs;
};

export const getBookCoverUrl = (coverId: number) => {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
};
