import React from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

const SHELVES = [
  {
    index: 0,
    key: 'currentlyReading',
    title: 'Currently Reading'
  },
  {
    index: 2,
    key: 'wantToRead',
    title: 'Want to Read'
  },
  {
    index: 3,
    key: 'read',
    title: 'Read'
  }
]
function BookShelves({ books = [] }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {SHELVES.map(shelf =>
            <BookShelf
              key={shelf.key}
              title={shelf.title}
              books={books.filter(book => book.shelf === shelf.key)}
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