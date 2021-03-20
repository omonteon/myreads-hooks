import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css'
import BookShelves from './BookShelves';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  state = {
    books: [],
    booksByShelf: {},
    shelvesByBookID: {}
  }
  componentDidMount() {
    // CODE REVIEW QUESTION: How should errors from the API calls be handled ?
    BooksAPI.getAll().then(books => this.setState({
      books,
      booksByShelf: this.getBooksByShelf(books),
      shelvesByBookID: this.getShelvesByBookID(books)
    }));
  }
  /**
   * This function creates and returns an object from an array of books.
   * The object is used to access books by shelf quickly.
   * 
   * @param {Object[]} books Array of book objects
   * @returns {Object} Object that maps book objects by shelf Ids
   */
  getBooksByShelf(books = []) {
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
  getShelvesByBookID(books = []) {
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
  handleShelfChange = (book = {}, shelf = 'none') => {    
    // CODE REVIEW QUESTION: How could I use the response from this API call help ? (I couldn't find how to use it)
    BooksAPI.update(book, shelf).then(bookIDsByShelf => {
      this.setState(currentState => {
        // I use filter + concat to match with BooksAPI.getAll shelf order.
        // The response always puts the updated book at the end of the same shelf items of the array.
        const updatedBooks = currentState.books
          .filter(currentBook => currentBook.id !== book.id)
          .concat({ ...book, shelf });
        return {
          books: updatedBooks,
          booksByShelf: this.getBooksByShelf(updatedBooks),
          shelvesByBookID: this.getShelvesByBookID(updatedBooks),
        }
      });
    });
  }
  render() {
    const { booksByShelf, shelvesByBookID } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelves booksByShelf={booksByShelf} onShelfChange={this.handleShelfChange} />
        )} />
        <Route path='/search' render={() => (
          <BookSearch shelvesByBookID={shelvesByBookID} onShelfChange={this.handleShelfChange} />
        )} />
      </div>
    )
  }
}

export default BooksApp
