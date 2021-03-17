import React from 'react';
import BooksGrid from './BooksGrid';

function BookShelf({ title = '', books = [], onShelfChange }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <BooksGrid books={books} onShelfChange={onShelfChange} />
    </div>
  )
}

export default BookShelf;