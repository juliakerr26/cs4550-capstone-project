import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { findBookClubs } from '../services/book-club-service';
import BookList from './book-list';
import '../index.css';

const BookGroup = () => {
  const { currentUser } = useSelector((state) => state.users);
  const [bookClubs, setBookClubs] = useState([]);
  const fetchBookClubs = async () => {
    const result = await findBookClubs();
    result.filter(bookClub => bookClub.users.includes(currentUser._id));
    setBookClubs(result);
  };
  useEffect(() => {
    fetchBookClubs()
  }, []);

  return (
    <div>
      <b1>Book Group Tabs</b1>
      <BookList/>
    </div>
  );
};

export default BookGroup;