import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as service from "../services/books-service"
import { findUserByUsernameThunk } from '../services/users-thunk';
import UsernameItem from './username-item';
import BookItem from './book-item';

import users from '../data/users.json';

const CreateBookClub = () => {
  //const { currentUser } = useSelector(state => state.users);
  const currentUser = users[0];
  const [usernameSearch, setUsernameSearch] = useState();
  const [usernameResults, setUsernameResults] = useState([]);

  const [bookSearch, setBookSearch] = useState();
  const [bookResults, setbookResults] = useState([]);

  const [bookClubName, setBookClubName] = useState();
  const [bookClubMembers, setBookClubMembers] = useState([]);
  const [bookClubBookList, setBookClubBookList] = useState([]);

  const searchForUsernames = async () => {
    const searchResults = await findUserByUsernameThunk(usernameSearch);
    console.log(searchResults);
    setUsernameResults(searchResults);
  };
  const searchForBooks = async () => {
    const searchResults = await service.getBooksBySearch(bookSearch);
    setbookResults(searchResults.items);
  }
  
  useEffect(() => {
    if (usernameSearch) {
      searchForUsernames();
    }
    if (bookSearch) {
      searchForBooks();
    }
  }, [bookClubMembers, bookClubBookList]);

  return (
    <div>
      <h3 className="d-inline-block txt-dark-orange ps-2 pt-3">Create Book Club</h3>
      <div className="p-3 mb-3 border rounded">
        <h6 className="txt-dark-orange">Book Club Name:</h6>
        <input
          type="search"
          className="form-control"
          placeholder="Book Club Name"
          value={bookClubName}
          onChange={event => setBookClubName(event.target.value)}
        />
      </div>
      <div className="row">
        <div className="col-6">
          <ul className="list-group">
            <li className="list-group-item">
              <h6 className="txt-dark-orange">Add Members</h6>
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search by Username"
                  value={usernameSearch}
                  onChange={event => setUsernameSearch(event.target.value)}
                />
                <button onClick={searchForUsernames} className="btn">
                  Search
                </button>
              </div>
            </li>
            {usernameResults
              .filter(user => !bookClubMembers.includes(user._id))
              .map(user => (
                <UsernameItem key={user._id} user={user} added={false} />
              ))}
          </ul>
        </div>
        <div className="col-6">
          <ul className="list-group">
            <li className="list-group-item">
              <h6 className="txt-dark-orange">Book Club Members</h6>
            </li>
            {bookClubMembers.map(user => (
              <UsernameItem key={user._id} user={user} added={true} />
            ))}
          </ul>
        </div>
        <div className="row mt-3">
          <div className="col-6">
          <ul className="list-group">
            <li className="list-group-item">
              <h6 className="txt-dark-orange">Add Books</h6>
              <div className="input-group">
                <input
                  type="search"
                  className="form-control flex-fill"
                  placeholder="Search for Books"
                  value={bookSearch}
                  onChange={event => setBookSearch(event.target.value)}
                />
                <button onClick={searchForBooks} className="btn">
                  Search
                </button>
              </div>
            </li>
            {bookResults
              .filter(book => !bookClubBookList.includes(book.id))
              .map(book => (
                <BookItem key={book.id} book={book} added={false}/>
              ))}
          </ul>
          </div>
          <div className="col-6">
          <ul className="list-group">
            <li className="list-group-item">
              <h6 className="txt-dark-orange">Book List</h6>
            </li>
            {bookClubBookList.map(book => <BookItem key={book.id} book={book} added={true}/>)}
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBookClub;
