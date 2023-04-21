import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  findAllUsersThunk,
  findUserByIdThunk,
  findUserByUsernameThunk,
  searchUserByUsernameThunk,
  loginThunk,
  profileThunk,
  registerThunk,
  logoutThunk,
} from "../services/users-thunk";
const initialState = {
  currentUser: null,
  returnedUsers: [],
  loading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [findAllUsersThunk.pending]: (state, action) => {
      state.loading = true;
      state.returnedUsers = []
    },
    [findAllUsersThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.returnedUsers = payload;
    },
    [findAllUsersThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [findUserByIdThunk.pending]: (state, action) => {
      state.loading = true;
      state.returnedUsers = []
    },
    [findUserByIdThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.returnedUsers = payload;
    },
    [findUserByIdThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [findUserByUsernameThunk.pending]: (state, action) => {
      state.loading = true;
      state.returnedUsers = []
    },
    [findUserByUsernameThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.returnedUsers = payload;
    },
    [findUserByUsernameThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [searchUserByUsernameThunk.pending]: (state, action) => {
      state.loading = true;
      state.returnedUsers = []
    },
    [searchUserByUsernameThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.returnedUsers = payload;
    },
    [searchUserByUsernameThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [logoutThunk.fulfilled]: (state, action) => {
      state.currentUser = null;
    },
    [registerThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [profileThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export default usersSlice.reducer;