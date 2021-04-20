import React, { useEffect, useState } from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css'
import BookShelves from './BookShelves';
import BookSearch from './BookSearch';

function BooksApp() {
  const [books, setBooks] = useState([]);
  const [booksByShelf, setBooksByShelf] = useState({});
  const [shelvesByBookID, setShelvesByBookID] = useState({});

  useEffect(() => {
    BooksAPI.getAll().then(books => {
      setBooks(books);
      setBooksByShelf(getBooksByShelf(books));
      setShelvesByBookID(getShelvesByBookID(books));
    });
  }, []);

  /**
   * This function creates and returns an object from an array of books.
   * The object is used to access books by shelf quickly.
   * 
   * @param {Object[]} books Array of book objects
   * @returns {Object} Object that maps book objects by shelf Ids
   */
  function getBooksByShelf(books = []) {
    const booksByShelf = {};
    books.forEach(book => {
      if (Array.isArray(booksByShelf[book.shelf]) && book.shelf) {
        booksByShelf[book.shelf].push(book);
      } else if (book.shelf) {
        booksByShelf[book.shelf] = [book];
      }
    });
    return booksByShelf;
  }
  /**
   * This function creates and returns an object from an array of books. 
   * The object is used to know what is the shelf of a book.
   * 
   * @param {Object[]} books Array of book objects
   * @returns {Object} Object that maps shelves by book id
   */
  function getShelvesByBookID(books = []) {
    const shelvesByBookID = {};
    books.forEach(book => {
      shelvesByBookID[book.id] = book.shelf;
    });
    return shelvesByBookID;
  }
  /**
   * Handler for when a book shelf changes.
   * Updates the API and the corresponding state.
   * 
   * @param {Object} book 
   * @param {string} shelf 
   */
  function handleShelfChange(book = {}, shelf = 'none') {
    BooksAPI.update(book, shelf).then(bookIDsByShelf => {
      // I use filter + concat to match with BooksAPI.getAll shelf order.
      // The response always puts the updated book at the end of the same shelf items of the array.
      const updatedBooks = books
        .filter(currentBook => currentBook.id !== book.id)
        .concat({ ...book, shelf });
      setBooks(updatedBooks);
      setBooksByShelf(getBooksByShelf(updatedBooks));
      setShelvesByBookID(getShelvesByBookID(updatedBooks));
    });
  }
  return (
    <div className="app">
      <Route exact path='/' render={() => (
        <BookShelves booksByShelf={booksByShelf} onShelfChange={handleShelfChange} />
      )} />
      <Route path='/search' render={() => (
        <BookSearch shelvesByBookID={shelvesByBookID} onShelfChange={handleShelfChange} />
      )} />
    </div>
  )
}

export default BooksApp;