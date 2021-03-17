import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom';
import './App.css'
import BookShelves from './BookShelves';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <Route exact path='/' render={() => (
            <BookShelves />
          )} />
          <Route path='/search' render={({ history }) => (
            <BookSearch />
          )} />
          <div className="open-search">
            <Link
              to='/search'>
              <button>Add a book</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BooksApp
