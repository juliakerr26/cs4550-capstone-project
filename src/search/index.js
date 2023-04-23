import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import * as service from '../services/books-service';
import { useParams } from 'react-router-dom';
import BookPreview from '../shared/book-preview';

const Search = () => {
  const { query } = useParams();
  const [queryTerm, setQuery] = useState(query);
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const navigateToSearchWithQuery = () => {
    navigate(`/search/${queryTerm}`);
  }

  const searchForBooks = async () => {
    const searchResults = await service.getBooksBySearch(queryTerm);
    setResults(searchResults);
  };

  useEffect(() => {
    if (query) {
      setQuery(query);
      searchForBooks();
    }
  }, [query]);

  return (
    <>
      <h3 className="d-inline-block txt-dark-orange ps-2 pt-3">Search for Books</h3>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <LinkContainer to="/search">
            <NavLink className="nav-link active">Books</NavLink>
          </LinkContainer>
        </li>
        <li className="nav-item">
        <LinkContainer to="/search/users">
            <NavLink className="nav-link">Users</NavLink>
          </LinkContainer>
        </li>
      </ul>
      <div className="input-group p-2">
        <div className="col-8 align-self-center position-relative">
          <input
            type="search"
            id="search-bar"
            className="form-control"
            placeholder="Search"
            value={queryTerm}
            onChange={event => setQuery(event.target.value)}
          />
        </div>
        <button type="button" className="btn p-2" onClick={navigateToSearchWithQuery}>
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className="ps-3">
        {(results.items && results.items.map(result => <BookPreview book={result} />)) || (
          <h5 className={'m-2 fw-light fst-italic txt-dark-green'}>Enter a search to view books!</h5>
        )}
      </div>
    </>
  );
};

export default Search;
