import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../reducers/users-reducer';
import booksReducer from '../reducers/books-reducer';
import bookClubReducer from '../reducers/book-club-reducer';

const store = configureStore({
  reducer: {
    booksData: booksReducer,
    bookClubs: bookClubReducer,
    users: usersReducer,
  },
});

export default store;
