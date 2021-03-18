import React from 'react';
import BooksGrid from './BooksGrid';

function BookResults({ books = [], onShelfChange }) {
  return (
    <div className="search-books-results">
      <BooksGrid books={books} onShelfChange={onShelfChange} />
    </div>
  )
}

export default BookResults;