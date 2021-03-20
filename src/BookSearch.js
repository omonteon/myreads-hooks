import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import BookResults from './BookResults'; // CODE REVIEW QUESTION: Should these imports be default or named ??

class BookSearch extends Component {
  // CODE REVIEW QUESTION: Should this state be here or in App.js ??
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
  /**
   * Handler to search books and update state of the input
   * 
   * @param {Object} event DOM event
   */
  handleSearch = (event) => {
    const search = event.target.value;
    this.setState({ search });
    // CODE REVIEW QUESTION: Should I let the query return a 403 or avoid doing the query if the search is empty ?
    this.searchAPIDebounce(search);
  }
  /**
   * Search books in API and update state with the response
   * 
   * @param {string} search
   */
  searchAPI = (search) => {
    const { shelvesByBookID } = this.props; // CODE REVIEW QUESTION:  Should I pass this as a param instead ?
    if (search) {
      BooksAPI.search(search)
        .then(booksResponse => {
          if (Array.isArray(booksResponse)) {
            this.updateBooks(booksResponse, shelvesByBookID);
          } else {
            this.setState({ books: [] });
            // CODE REVIEW QUESTION: Should I do something with this error ??
            // {error: "empty query", items: Array(0)}
          }
        });
    } else {
      this.setState({ books: [] });
    }
  }
  // CODE REVIEW QUESTION: I declared the debounced version of the func as a class member, is this ok ?
  searchAPIDebounce = this.debounce(this.searchAPI, 250);
  /**
   * Syncs books in the search results with their corresponding shelves
   * 
   * @param {Object[]} books Array of book objects
   * @param {Object} shelvesByBookID Object that maps book ids as keys and shelves as values
   */
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
  /**
   * Debounce function taken from: https://www.freecodecamp.org/news/javascript-debounce-example/
   * 
   * @param {Function} func Function to be delayed
   * @param {number} timeout Delay of function execution in ms
   * @returns {Function} A function to be delayed by the specified timeout
   */
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

BookSearch.propTypes = {
  shelvesByBookID: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default BookSearch;