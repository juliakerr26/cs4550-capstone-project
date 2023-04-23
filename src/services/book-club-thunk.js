import { createAsyncThunk } from '@reduxjs/toolkit';
import * as service from './book-club-service';

export const createBookClubThunk = createAsyncThunk('/bookClubs/createClub', async club => {
  const newClub = await service.createBookClub(club);
  return newClub;
});

export const findBookClubsThunk = createAsyncThunk('/bookClubs/findClubs', async () => await service.findBookClubs());

export const findBookClubByIdThunk = createAsyncThunk(
  '/bookClubs/findClubById',
  async id => await service.findBookClubById(id)
);

export const updateBookClubThunk = createAsyncThunk(
  '/bookClubs/updateClub',
  async club => await service.updateBookClub(club)
);

export const deleteBookClubThunk = createAsyncThunk('/bookClubs/deleteClub', async clubId => {
  await service.deleteBookClub(clubId);
  return clubId;
});
