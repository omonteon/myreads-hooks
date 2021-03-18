import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css'
import BookShelves from './BookShelves';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    // TODO: How should errors from the API calls be handled ?
    // TODO: Add a loading state
    BooksAPI.getAll().then(books => this.setState({ books }));
  }
  handleShelfChange = (book = {}, shelf = '') => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState(currentState => ({
        books: currentState.books
          .filter(currentBook => currentBook.id !== book.id)
          .concat({ ...book, shelf })
      }));
    });
  }
  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelves books={books} onShelfChange={this.handleShelfChange} />
        )} />
        <Route path='/search' render={() => (
          <BookSearch onShelfChange={this.handleShelfChange} />
        )} />
      </div>
    )
  }
}

export default BooksApp
