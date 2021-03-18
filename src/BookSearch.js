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
    const { shelvesByBookID } = this.props; // Should I pass this as a param instead ??
    // TODO: Implement Debounce
    this.setState({ search });
    if (search) {
      BooksAPI.search(search)
        .then(booksResponse => {          
          if (Array.isArray(booksResponse)) {
            this.updateBooks(booksResponse, shelvesByBookID);
          } else {
            this.setState({ books: [] });
            // response.error What should I do with this error ??
          }
          
        }); 
    } else {
      this.setState({ books: [] });
    }
  }
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