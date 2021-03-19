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
    if (search) {
      this.searchAPIDebounce(search);
    } else {
      this.setState({ books: [] });
    }
  }
  searchAPI = (search) => {
    const { shelvesByBookID } = this.props; // Should I pass this as a param instead ??
    BooksAPI.search(search)
      .then(booksResponse => {
        if (Array.isArray(booksResponse)) {
          this.updateBooks(booksResponse, shelvesByBookID);
        } else {
          this.setState({ books: [] });
          // response.error What should I do with this error ??
        }

      });
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
  debounce(func, timeout = 300){
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
            <BookResults books={books} onShelfChange={onShelfChange} />
          </div>
        </div>

      </div>
    )
  }
}

export default BookSearch;