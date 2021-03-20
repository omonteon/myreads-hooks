import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

// CODE REVIEW QUESTION: Is this a recommended practice ?
// I thought about it sort of like an Enum from Java or C#
const SHELVES_TITLES = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to read',
  read: 'Read'
}
function BookShelves({ booksByShelf = {}, onShelfChange }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(SHELVES_TITLES).map(shelf =>
            <BookShelf
              key={shelf}
              title={SHELVES_TITLES[shelf]}
              books={booksByShelf[shelf]}
              onShelfChange={onShelfChange}
            />
          )}
        </div>
      </div>
      <div className="open-search">
        <Link
          to='/search'>
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
}

BookShelves.propTypes = {
  booksByShelf: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default BookShelves;