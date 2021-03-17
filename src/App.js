import React from 'react'
import * as BooksAPI from './BooksAPI'
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
    this.setState(currentState => ({
      books: currentState.books.map(currentBook =>
        currentBook.id === book.id ? { ...book, shelf } : currentBook
      )
    }));
  }
  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelves books={books} onShelfChange={this.handleShelfChange} />
        )} />
        <Route path='/search' component={BookSearch} />
      </div>
    )
  }
}

export default BooksApp
