import React from 'react';
import PropTypes from 'prop-types';

function Book({ book = {}, onShelfChange = () => { } }) {
  const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : '';
  const authors = Array.isArray(book.authors) ? book.authors : [];
  return (
    <div className="book">
      <div className="book-top">
        {/* I did an experiment getting the width/height by loading an Image obj 
            but the UI looks ugly with book thumbnails of different sizes */}
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${thumbnail})`
        }}>
        </div>
        <div className="book-shelf-changer">
          <select value={book.shelf || 'none'} onChange={(e) => onShelfChange(book, e.target.value)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{authors.join(', ')}</div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default Book;