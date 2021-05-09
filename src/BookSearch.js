import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import BookResults from './BookResults'; // CODE REVIEW QUESTION: Should these imports be default or named ??
import useDebounce from './useDebounce';

function BookSearch({ shelvesByBookID, onShelfChange }) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const searchAPIDebounce = useDebounce(searchAPI, 300);

  /**
   * Handler to search books and update state of the input
   * 
   * @param {Object} event DOM event
   */
  function handleSearch(event) {
    const search = event.target.value;    
    
    setSearch(search);
    searchAPIDebounce(search);
  }
  /**
   * Search books in API and update state with the response
   * 
   * @param {string} search
   */
  function searchAPI(search) {
    if (search) {
      BooksAPI.search(search)
        .then(booksResponse => {
          if (Array.isArray(booksResponse)) {
            updateBooks(booksResponse, shelvesByBookID);
          } else {
            setBooks([]);
          }
        });
    } else {
      setBooks([]);
    }
  }
  /**
   * Syncs books in the search results with their corresponding shelves
   * 
   * @param {Object[]} books Array of book objects
   * @param {Object} shelvesByBookID Object that maps book ids as keys and shelves as values
   */
  function updateBooks(books = [], shelvesByBookID = {}) {
    const updatedBooks = books.map(book => {
      const shelf = shelvesByBookID[book.id] || '';
      return {
        ...book,
        shelf
      }
    });
    setBooks(updatedBooks)
  }
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          to='/'>
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
      <BookResults books={books} onShelfChange={onShelfChange} />
    </div>
  )
}

BookSearch.propTypes = {
  shelvesByBookID: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default BookSearch;