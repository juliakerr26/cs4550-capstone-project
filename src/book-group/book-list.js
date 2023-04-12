import React, { useState, useEffect } from 'react';
import { getBookById } from '../services/books-service';

const BookList = (
  bookClub = {
    admin: '',
    bookList: [],
    users: [],
  }
) => {
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    const booksSoFar = books;
    for (bookId in bookClubs.bookList) {
      const bookObject = await getBookById(bookId);
      booksSoFar.push(bookObject.volumeInfo);
    }
    setBooks(booksSoFar);
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>Use shared book list component here?</div>
  );
};

export default BookList;
