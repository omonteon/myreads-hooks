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
  componentDidUpdate(prevProps) {
    const { shelvesByBookID } = this.props;
    if (prevProps.shelvesByBookID !== shelvesByBookID) {
      const { books } = this.state;
      this.updateBooks(books, shelvesByBookID);
    }
  }
  handleSearch = (event) => {
    const search = event.target.value;
    this.setState({ search });
    // Should I let the query return a 403 or avoid doing the query if the search is empty ??
    this.searchAPIDebounce(search);
  }
  searchAPI = (search) => {
    const { shelvesByBookID } = this.props; // Should I pass this as a param instead ??
    if (search) {
      BooksAPI.search(search)
        .then(booksResponse => {
          console.log(booksResponse);
          if (Array.isArray(booksResponse)) {
            this.updateBooks(booksResponse, shelvesByBookID);
          } else {
            this.setState({ books: [] });
            // Should I do something with this error ??
            // {error: "empty query", items: Array(0)}
          }
        });
    } else {
      this.setState({ books: [] });
    }
  }
  searchAPIDebounce = this.debounce(this.searchAPI, 250);
  updateBooks(books = [], shelvesByBookID = {}) {
    this.setState({
      books: books.map(book => {
        const shelf = shelvesByBookID[book.id] || '';
        return {
          ...book,
          shelf
        }
      })
    });
  }
  // Debounce function taken from: https://www.freecodecamp.org/news/javascript-debounce-example/
  debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
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
          </div>
        </div>
        <BookResults books={books} onShelfChange={onShelfChange} />
      </div>
    )
  }
}

export default BookSearch;