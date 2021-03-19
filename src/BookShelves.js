import React from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

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

export default BookShelves;