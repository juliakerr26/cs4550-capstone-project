import React, { useState, useEffect, componentWillMount, componendDidMount } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as service from '../services/books-service';
import { searchUserByUsernameThunk, findUserByIdThunk } from '../services/users-thunk';
import { createBookClubThunk, updateBookClubThunk, findBookClubByIdThunk } from '../services/book-club-thunk';
import { getBookById } from '../services/books-service';

import testUsers from '../data/users.json';
import { findUserById } from '../services/users-service';

const CreateBookClub = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const { currentUser } = useSelector(state => state.users);
  const currentUser = testUsers[0];
  const [usernameSearch, setUsernameSearch] = useState();
  const { returnedUsers, loading } = useSelector(state => state.users);

  const [bookSearch, setBookSearch] = useState();
  const [bookResults, setbookResults] = useState([]);

  const { id } = useParams();
  const { bookClubs: existingClub } = useSelector(state => state.bookClubs);

  const [bookClubName, setBookClubName] = useState();
  const [bookClubMembers, setBookClubMembers] = useState([]);
  const [bookClubBookList, setBookClubBookList] = useState([]);

  const [nameAlert, setNameAlert] = useState(false);
  const [membersAlert, setMembersAlert] = useState(false);
  const [bookListAlert, setBookListAlert] = useState(false);

  const searchForUsernames = async () => {
    dispatch(searchUserByUsernameThunk(usernameSearch));
  };

  const searchForBooks = async () => {
    const searchResults = await service.getBooksBySearch(bookSearch);
    setbookResults(searchResults.items);
  };

  const createBookClub = () => {
    if (!!bookClubName && !!bookClubMembers.length && !!bookClubBookList.length) {
      const newBookClub = {
        name: bookClubName,
        admin: currentUser._id,
        members: bookClubMembers.map(user => user._id),
        bookList: bookClubBookList.map(book => book.id),
      };
      dispatch(createBookClubThunk(newBookClub));
      navigate('/book-clubs');
    } else {
      setNameAlert(!bookClubName);
      setMembersAlert(!bookClubMembers.length);
      setBookListAlert(!bookClubBookList.length);
    }
  };

  const updateBookClub = () => {
    if (!!bookClubName && !!bookClubMembers.length && !!bookClubBookList.length) {
      const updatedBookClub = {
        _id: existingClub._id,
        name: bookClubName,
        members: bookClubMembers.map(user => user._id),
        bookList: bookClubBookList.map(book => book.id),
      };
      dispatch(updateBookClubThunk(updatedBookClub));
      navigate('/book-clubs');
    } else {
      setNameAlert(!bookClubName);
      setMembersAlert(!bookClubMembers.length);
      setBookListAlert(!bookClubBookList.length);
    }
  };

  useEffect(() => {
    if (usernameSearch) {
      searchForUsernames();
    }
    if (bookSearch) {
      searchForBooks();
    }
  }, [bookClubMembers, bookClubBookList, nameAlert, membersAlert, bookListAlert]);

  useEffect(() => {
    if (id) {
      dispatch(findBookClubByIdThunk(id));
    }
  }, []);

  useEffect(() => {
    if (id && existingClub.name) {
      setBookClubName(existingClub.name);

      const memberObjects = [];
      existingClub.members.map(id => {
        fetchMembers(id, memberObjects);
      })

      const bookListObjects = [];
      existingClub.bookList.map(id => {
        fetchBook(id, bookListObjects)
      })
    }
  }, [existingClub]);

  const fetchBook = async (book_id, bookListObjects) => {
    const returnedBook = await getBookById(book_id);
    bookListObjects.push(returnedBook);
    setBookClubBookList(bookListObjects);
  };

  const fetchMembers = async (user_id, memberObjects) => {
    const returnedUser = await findUserById(user_id);
    memberObjects.push(returnedUser);
    setBookClubMembers(memberObjects);
  };

  return (
    <div>
      {id ? (
        <h3 className="d-inline-block txt-dark-orange ps-2 pt-3">Update Book Club</h3>
      ) : (
        <h3 className="d-inline-block txt-dark-orange ps-2 pt-3">Create Book Club</h3>
      )}
      {id ? (
        <button className="btn btn-lg rounded-pill float-end mt-1" onClick={() => updateBookClub()}>
          Update
        </button>
      ) : (
        <button className="btn btn-lg rounded-pill float-end mt-1" onClick={() => createBookClub()}>
          Create
        </button>
      )}
      {nameAlert && (
        <div className="alert alert-danger" role="alert">
          Please enter a name!
        </div>
      )}
      {membersAlert && (
        <div className="alert alert-danger" role="alert">
          Please add members!
        </div>
      )}
      {bookListAlert && (
        <div className="alert alert-danger" role="alert">
          Please add books to the reading list!
        </div>
      )}
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
            {!loading && !!returnedUsers.length &&
              returnedUsers
                .filter(
                  user => !bookClubMembers.some(member => member._id === user._id) && user._id !== currentUser._id
                )
                .map(user => {
                  return (
                    <li className="list-group-item">
                      <button
                        className="btn float-end rounded-pill justify-content-center"
                        onClick={() => setBookClubMembers([...bookClubMembers, user])}
                      >
                        Add
                      </button>
                      <b>
                        {user.firstName} {user.lastName}
                      </b>
                      <p className="fw-light fst-italic">{user.username}</p>
                    </li>
                  );
                })}
          </ul>
        </div>
        <div className="col-6">
          <ul className="list-group">
            <li className="list-group-item">
              <h6 className="txt-dark-orange">Book Club Members</h6>
            </li>
            {bookClubMembers.map(user => {
              return (
                <li className="list-group-item">
                  <button
                    className="btn float-end rounded-pill justify-content-center"
                    onClick={() => setBookClubMembers(bookClubMembers.filter(member => member._id !== user._id))}
                  >
                    Remove
                  </button>
                  <b>
                    {user.firstName} {user.lastName}
                  </b>
                  <p className="fw-light fst-italic">{user.username}</p>
                </li>
              );
            })}
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
              {!loading &&
                bookResults
                  .filter(book => !bookClubBookList.some(bookInLst => bookInLst.id === book.id))
                  .map(book => {
                    const bookInfo = book.volumeInfo;
                    return (
                      <li className="list-group-item lh-2 p-2 mb-1">
                        <div className="row">
                          <div className="col-2">
                            <img
                              className="img-fluid"
                              src={
                                (bookInfo.imageLinks && bookInfo.imageLinks.smallThumbnail) || './default-book-img.jpg'
                              }
                              alt="book preview image"
                            ></img>
                          </div>
                          <div className="col-8">
                            <div className="row fw-bold">{bookInfo.title}</div>
                            <div className="row fw-light fst-italic">
                              {bookInfo.authors} - {bookInfo.publisher}
                            </div>
                            <div className="row">
                              {bookInfo.description &&
                                bookInfo.description
                                  .substring(0, 350)
                                  .replaceAll('<b>', '')
                                  .replaceAll('</b>', '')
                                  .replaceAll('<br>', ' ')}{' '}
                              ...
                            </div>
                          </div>
                          <div className="col-2 align-self-center p-2">
                            <button
                              className="btn float-end rounded-pill justify-content-center"
                              onClick={() => setBookClubBookList([...bookClubBookList, book])}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
            </ul>
          </div>
          <div className="col-6">
            <ul className="list-group">
              <li className="list-group-item">
                <h6 className="txt-dark-orange">Book List</h6>
              </li>
              {bookClubBookList.map(book => {
                const bookInfo = book.volumeInfo;
                return (
                  <li className="list-group-item lh-2 p-2 mb-1">
                    <div className="row">
                      <div className="col-2">
                        <img
                          className="img-fluid"
                          src={(bookInfo.imageLinks && bookInfo.imageLinks.smallThumbnail) || './default-book-img.jpg'}
                          alt="book preview image"
                        ></img>
                      </div>
                      <div className="col-8">
                        <div className="row fw-bold">{bookInfo.title}</div>
                        <div className="row fw-light fst-italic">
                          {bookInfo.authors} - {bookInfo.publisher}
                        </div>
                        <div className="row">
                          {bookInfo.description &&
                            bookInfo.description
                              .substring(0, 350)
                              .replaceAll('<b>', '')
                              .replaceAll('</b>', '')
                              .replaceAll('<br>', ' ')}{' '}
                          ...
                        </div>
                      </div>
                      <div className="col-2 align-self-center p-2">
                        <button
                          className="btn float-end rounded-pill justify-content-center"
                          onClick={() =>
                            setBookClubBookList(bookClubBookList.filter(bookInLst => bookInLst.id !== book.id))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBookClub;
