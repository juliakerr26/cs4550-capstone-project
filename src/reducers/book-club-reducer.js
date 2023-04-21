import { createSlice } from '@reduxjs/toolkit';
import { createBookClubThunk, findBookClubsThunk, findBookClubByIdThunk, updateBookClubThunk, deleteBookClubThunk } from '../services/book-club-thunk';

const initialState = {
  bookClubs: [],
  loading: false,
}

const templateBookClub = {
  name: "",
  admin: "",
  bookList: [],
  users: [],
}

const bookClubsSlice = createSlice({
  name: 'bookClubs',
  initialState,
  extraReducers: {
    [findBookClubsThunk.pending]: state => {
      state.loading = true;
      state.bookClubs = [];
    },
    [findBookClubsThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log(payload)
      state.bookClubs = payload;
    },
    [findBookClubsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [findBookClubByIdThunk.pending]: state => {
      state.loading = true;
      state.bookClubs = [];
    },
    [findBookClubByIdThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.bookClubs = payload;
    },
    [findBookClubByIdThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [createBookClubThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.bookClubs.push(payload);
    },
    [updateBookClubThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const tuitNdx = state.bookClubs.findIndex(c => c._id === payload._id);
      state.bookClubs[tuitNdx] = {
        ...state.bookClubs[tuitNdx],
        ...payload,
      };
    },
    [deleteBookClubThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.bookClubs = state.bookClubs.filter(c => c._id !== payload);
    },
  },
  reducers: {
    createBookClub(state, action) {
      state.unshift({
        ...action.payload,
        ...templateBookClub,
      });
    },
    deleteBookClub(state, action) {
      const index = state.findIndex(bookClub => bookClub._id === action.payload);
      state.splice(index, 1);
    }
  }
});

export const { createBookClub, deleteBookClub } = bookClubsSlice.actions;
export default bookClubsSlice.reducer;