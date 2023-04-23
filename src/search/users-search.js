import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import { searchUserByUsernameThunk } from '../services/users-thunk';

const UsersSearch = () => {
  const { currentUser } = useSelector(state => state.users);
  const { query } = useParams();
  const [usernameSearch, setUsernameSearch] = useState(query);
  const { returnedUsers, loading } = useSelector(state => state.users);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToSearchWithQuery = () => {
    navigate(`/search/users/${usernameSearch}`);
  };

  const searchForUsernames = async () => {
    setSearchTriggered(true);
    dispatch(searchUserByUsernameThunk(usernameSearch));
  };

  useEffect(() => {
    if (query) {
      setUsernameSearch(query);
      searchForUsernames();
    }
  }, [query]);

  return (
    <>
      <h3 className="d-inline-block txt-dark-orange ps-2 pt-3">Search for Books</h3>
      <ul className="nav nav-tabs">
      <li className="nav-item">
          <a class="nav-link txt-dark-orange" href="/search">
            Search
          </a>
        </li>
        <li className="nav-item">
          <a class="nav-link active" href="/search/users">
            Users
          </a>
        </li>
      </ul>
      <div className="input-group p-2">
        <div className="col-8 align-self-center position-relative">
          <input
            type="search"
            id="search-bar"
            className="form-control"
            placeholder="Search by username"
            value={usernameSearch}
            onChange={event => setUsernameSearch(event.target.value)}
          />
        </div>
        <button type="button" className="btn p-2" onClick={navigateToSearchWithQuery}>
          <i className="fas fa-search"></i>
        </button>
      </div>
      <ul className="list-group row ps-3">
        {loading && <li className="list-group-item col-8">Loading...</li>}
        {!searchTriggered && (
          <h5 className={'m-2 fw-light fst-italic txt-dark-green'}>Enter a search to view users!</h5>
        )}
        {!!returnedUsers.length &&
          searchTriggered &&
          returnedUsers
            .filter(user => (currentUser ? currentUser._id !== user._id : true))
            .map(user => (
              <li className="list-group-item col-8 rounded mb-1 bg-light-green">
                <img width={70} className="float-start rounded me-2" src="/images/profile-img.jpg" />
                <LinkContainer to={`/profile/${user.username}`}>
                  <b className="txt-dark-orange">
                    {user.firstName} {user.lastName}
                  </b>
                </LinkContainer>
                <p className="fw-light fst-italic">{user.username}</p>
              </li>
            ))}
        {!!returnedUsers.length &&
          searchTriggered &&
          !returnedUsers.filter(user => (currentUser ? currentUser._id !== user._id : true)).length && (
            <li className="list-group-item col-8">No users match your search.</li>
          )}
      </ul>
    </>
  );
};

export default UsersSearch;
