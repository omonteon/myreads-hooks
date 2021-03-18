import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookResults from './BookResults'; // Should these imports be default or named ??

class BookSearch extends Component {
  // Should this state be here or in App.js ??
  state = {
    books: [],
    search: ''
  }
  handleSearch = (event) => {
    // TODO: Implement Debounce
    const search = event.target.value;
    this.setState({ search });
    if (search) {
      BooksAPI.search(search).then(books => this.setState({ books })); 
    } else {
      this.setState({ books: [] });
    }
  }
  render() {
    const { onShelfChange } = this.props;
    const { books, search } = this.state;
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
              onChange={this.handleSearch}
               />
            <BookResults books={books} onShelfChange={onShelfChange} />
          </div>
        </div>
        
      </div>
    )
  }
}

export default BookSearch;