import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findBookClubByIdThunk } from '../services/book-club-thunk';
import BookListItem from './book-list-item';

import testBookClubs from '../data/book-clubs.json'

const BookList = () => {
  const { currentUser } = useSelector(state => state.users);
  const { id } = useParams();
  const { bookClubs, loading } = useSelector(state => state.bookClubs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findBookClubByIdThunk(id));
  }, []);

  return (
    <div>
      <h3 className="txt-dark-orange ps-3 pt-3">Reading List</h3>
      <ul className="list-group">
        {loading && <li className="list-group-item">Loading...</li>}
        {testBookClubs[0].bookList.map(book_id => (
          <BookListItem key={book_id} {...{bookClub: testBookClubs[0], book_id: book_id}} />
        ))}
      </ul>
    </div>
  );
};

export default BookList;
