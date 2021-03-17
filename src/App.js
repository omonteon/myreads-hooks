import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom';
import './App.css'
import BookShelves from './BookShelves';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

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
