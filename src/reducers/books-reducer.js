import { createSlice } from '@reduxjs/toolkit';
import { getBookByIdThunk, getBooksBySearchThunk } from '../services/books-thunks';

const initialState = {
  books: [],
  loading: false,
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  extraReducers: {
    [getBookByIdThunk.pending]: state => {
      state.loading = true;
      state.books = [];
    },
    [getBookByIdThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.books = payload;
    },
    [getBookByIdThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getBooksBySearchThunk.pending]: state => {
      state.loading = true;
      state.books = [];
    },
    [getBooksBySearchThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.books = payload;
    },
    [getBooksBySearchThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  },
});

export default booksSlice.reducer;