import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findBookClubByIdThunk } from '../services/book-club-thunk';
import BookListItem from './book-list-item';

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
      {bookClubs.bookList && (
        <div>
          <h3 className="txt-dark-orange ps-2 pt-3 d-inline-block">{bookClubs.name}</h3>
          <h3 className="txt-dark-orange ps-2 pt-3 d-inline-block">Reading List</h3>
          <ul className="list-group">
            {loading && <li className="list-group-item">Loading...</li>}
            {!bookClubs.bookList.length ? (
              <h5 className="txt-dark-green ps-2 pt-3">There are no books in this Reading List yet!</h5>
            ) : (
              bookClubs.bookList.map(book_id => (
                <BookListItem key={book_id} {...{ bookClub: bookClubs, book_id: book_id }} />
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookList;
