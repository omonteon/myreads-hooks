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
    // TODO: How should errors from the API calls be handled ?
    BooksAPI.getAll().then(books => this.setState({
      books,
      booksByShelf: this.getBooksByShelf(books),
      shelvesByBookID: this.getshelvesByBookID(books)
    }));
  }
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
  getshelvesByBookID(books = []) {
    const shelvesByBookID = {};
    books.forEach(book => {
      shelvesByBookID[book.id] = book.shelf;
    });
    return shelvesByBookID;
  }
  handleShelfChange = (book = {}, shelf = 'none') => {
    // How could I use this response (arrays of ids of books by shelf) ??
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
          shelvesByBookID: this.getshelvesByBookID(updatedBooks),
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
