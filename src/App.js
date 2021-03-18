import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css'
import BookShelves from './BookShelves';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  state = {
    books: [],
    shelvesByBookID: {}
  }
  componentDidMount() {
    // TODO: How should errors from the API calls be handled ?
    // TODO: Add a loading state
    BooksAPI.getAll().then(books => this.setState({ books, shelvesByBookID: this.getshelvesByBookID(books) }));
  }
  getshelvesByBookID(books) {
    const shelvesByBookID = {};
    books.forEach(book => {
      shelvesByBookID[book.id] = book.shelf;
    });
    return shelvesByBookID;
  }
  handleShelfChange = (book = {}, shelf = '') => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState(currentState => {
        const updatedBooks = currentState.books
          .filter(currentBook => currentBook.id !== book.id)
          .concat({ ...book, shelf });
        return {
          books: updatedBooks,
          shelvesByBookID: this.getshelvesByBookID(updatedBooks),
        }
      });
    });
  }
  render() {
    const { books, shelvesByBookID } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelves books={books} onShelfChange={this.handleShelfChange} />
        )} />
        <Route path='/search' render={() => (
          <BookSearch shelvesByBookID={shelvesByBookID} onShelfChange={this.handleShelfChange} />
        )} />
      </div>
    )
  }
}

export default BooksApp
