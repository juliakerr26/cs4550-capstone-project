import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findBookClubsThunk } from '../services/book-club-thunk';
import BookClubItem from './book-club-item';
import '../index.css';

import TestingBookClub from '../data/book-clubs.json';

const BookGroup = () => {
  const { currentUser } = useSelector(state => state.users);
  const { bookClubs, loading } = useSelector(state => state.bookClubs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findBookClubsThunk());
  }, []);

  const isAdmin = !!currentUser && currentUser.isAdmin;

  return (
    <div>
      <h3 className="txt-dark-orange ps-3 pt-3">Book Clubs</h3>
      <ul className="list-group">
        {loading && <li className="list-group-item">Loading...</li>}
        {isAdmin && TestingBookClub
          //.filter(club => club.admin === currentUser._id)
          .map(club => (
            <BookClubItem key={club._id} club={club} isAdmin={isAdmin} />
          ))}
        {!isAdmin && TestingBookClub
          //.filter(club => club.members.includes(currentUser._id))
          .map(club => (
            <BookClubItem key={club._id} club={club} isAdmin={isAdmin} />
          ))}
      </ul>
    </div>
  );
};

export default BookGroup;
