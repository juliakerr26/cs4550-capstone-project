import axios from 'axios';
//const API_BASE = process.env.REACT_APP_API_BASE;
const API_BASE = "https://cs4550-capstone-project-node.onrender.com/api";
const GROUPS_API = `${API_BASE}/bookclubs`

export const createBookClub = async club => {
  const response = await axios.post(GROUPS_API, club);
  return response.data;
}

export const findBookClubs = async () => {
  const response = await axios.get(GROUPS_API);
  const clubs = response.data;
  return clubs;
}

export const findBookClubById = async (id) => {
  const response = await axios.get(`${GROUPS_API}/${id}`);
  const club = response.data;
  return club;
}

export const updateBookClub = async club => {
  const response = await axios.put(`${GROUPS_API}/${club._id}`, club);
  return club;
}

export const deleteBookClub = async id => {
  const response = await axios.delete(`${GROUPS_API}/${id}`);
  return response.data;
}