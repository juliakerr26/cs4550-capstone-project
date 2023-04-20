import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { findBookClubsThunk } from '../services/book-club-thunk';
import BookClubItem from './book-club-item';
import '../index.css';

import TestingBookClub from '../data/book-clubs.json';
import users from '../data/users.json';

const BookGroup = () => {
  //const { currentUser } = useSelector(state => state.users);
  const currentUser = users[0];
  const { bookClubs, loading } = useSelector(state => state.bookClubs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findBookClubsThunk());
  }, []);
  console.log(bookClubs);

  const isAdmin = !!currentUser && currentUser.isAdmin;
  const clubsToRender = [];
  isAdmin
    ? clubsToRender.push(...TestingBookClub.filter(club => club.admin === currentUser._id))
    : clubsToRender.push(...TestingBookClub.filter(club => club.members.includes(currentUser._id)));

  return (
    <div>
      <h3 className="d-inline-block txt-dark-orange ps-2 pt-3">Book Clubs</h3>
      {isAdmin && (
        <LinkContainer to={`/book-clubs/create`}>
          <a className="d-inline-block btn rounded-pill align-middle float-end ms-3 mt-3">Create Book Club</a>
        </LinkContainer>
      )}
      <ul className="list-group">
        {loading && <li className="list-group-item">Loading...</li>}
        {!clubsToRender.length ? (
          isAdmin ? (
            <h5 className="txt-dark-green ps-2 pt-3">You have not created any Book Clubs!</h5>
          ) : (
            <h5 className="txt-dark-green ps-2 pt-3">You are not a member of any Book Clubs!</h5>
          )
        ) : (
          clubsToRender.map(club => <BookClubItem key={club._id} {...{ club: club, isAdmin: isAdmin }} />)
        )}
      </ul>
    </div>
  );
};

export default BookGroup;
