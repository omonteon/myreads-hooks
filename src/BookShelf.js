import React from 'react';

function BookShelf({ title = '', books = [] }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      {/* TODO: New component: BooksGrid */}
    </div>
  )
}

export default BookShelf;