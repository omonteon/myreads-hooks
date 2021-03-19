import React from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';

function BookResults({ books = [], onShelfChange }) {
  return (
    <div className="search-books-results">
      <BooksGrid books={books} onShelfChange={onShelfChange} />
    </div>
  )
}

BookResults.propTypes = {
  books: PropTypes.array,
  onShelfChange: PropTypes.func.isRequired
}

export default BookResults;