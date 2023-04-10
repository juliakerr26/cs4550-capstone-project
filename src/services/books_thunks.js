import { createAsyncThunk } from '@reduxjs/toolkit';
import * as service from './books-service';

export const getBookByIdThunk = createAsyncThunk('/book-details', async book_id => {
  await service.getBookById(book_id);
})

export const getBooksBySearchThunk = createAsyncThunk('/search', async query => {
  await service.getBooksBySearch(query);
})