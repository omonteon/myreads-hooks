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
    BooksAPI.getAll().then(books => this.setState({ books }));
  }
  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelves books={books} />
        )} />
        <Route path='/search' component={BookSearch} />
      </div>
    )
  }
}

export default BooksApp
