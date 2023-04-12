import React from "react";
import NavBar from "./shared/nav-bar.js";
import booksReducer from './reducers/books-reducer.js';
import bookClubReducer from './reducers/book-club-reducer.js';
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux";
const store = configureStore({ reducer: { booksData: booksReducer, bookClubs: bookClubReducer }});

function BookClub() {
  return (
    <Provider store={store}>
      <NavBar/>
      <h1>Main</h1>
    </Provider>
  );
}

export default BookClub