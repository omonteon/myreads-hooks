import React from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';

function BookShelf({ title = '', books = [], onShelfChange }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <BooksGrid books={books} onShelfChange={onShelfChange} />
    </div>
  )
}

BookShelf.propTypes = {
  title: PropTypes.string,
  books: PropTypes.array,
  onShelfChange: PropTypes.func.isRequired
}

export default BookShelf;