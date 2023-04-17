import React, { useState, useEffect } from 'react';
import { getBookById } from '../services/books-service';
import { getBookByIdThunk} from '../services/books-thunks';

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
    for (bookId in bookClub.bookList) {
      const bookObject = await getBookByIdThunk(bookId);
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
