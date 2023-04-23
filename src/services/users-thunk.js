import * as userService from './users-service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginThunk = createAsyncThunk('users/login', async (user, thunkAPI) => await userService.login(user));

export const logoutThunk = createAsyncThunk('users/logout', async (user, thunkAPI) => await userService.logout());

export const registerThunk = createAsyncThunk(
  'users/register',
  async (user, thunkAPI) => await userService.register(user)
);

export const profileThunk = createAsyncThunk('users/profile', async (user, thunkAPI) => await userService.profile());

export const findAllUsersThunk = createAsyncThunk('users/findAll', async () => await userService.findAllUsers());

export const findUserByIdThunk = createAsyncThunk('users/findById', async id => await userService.findUserById(id));

export const findUserByUsernameThunk = createAsyncThunk(
  'users/findUserByUsername',
  async username => await userService.findUserByUsername(username)
);

export const searchUserByUsernameThunk = createAsyncThunk('users/searchUserByUsername', async search =>
  userService.searchUserByUsername(search)
);

export const findUserByCredentialsThunk = createAsyncThunk(
  'users/findByCredentials',
  async (username, password) => await userService.findUserByCredentials(username, password)
);

export const updateUserThunk = createAsyncThunk('users/updateUser', async user => await userService.updateUser(user));
