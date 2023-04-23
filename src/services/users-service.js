import axios from "axios";
// const API_BASE = process.env.REACT_APP_API_BASE;
const API_BASE = "https://cs4550-capstone-project-node.onrender.com/api";
const USERS_API = `${API_BASE}/users`

const api = axios.create({
  withCredentials: false,
});

export const createUser = async (user) => {
  const response = await api.post(USERS_API, user);
  return response.data;
};

export const findAllUsers = async () => {
  const response = await api.get(USERS_API);
  return response.data;
};

export const findUserById = async (id) => {
  const response = await api.get(`${USERS_API}/${id}`);
  return response.data;
};

export const findUserByUsername = async (username) => {
  const response = await api.get(`${USERS_API}/username/${username}`);
  return response.data;
};

export const searchUserByUsername = async (search) => {
  const response = await api.get(`${USERS_API}/username/search/${search}`);
  return response.data;
}

export const findUserByCredentials = async (username, password) => {
  const response = await api.get(`${USERS_API}/${username}/${password}`);
  return response.data;
}

export const updateUser = async (user) => {
  const response = await api.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`${USERS_API}/${id}`);
  return response.data;
};

export const login = async (user) => {
  console.log(`${USERS_API}/login`);
  const response = await api.post(`${USERS_API}/login`, user);
  return response.data;
};

export const logout = async () => {
  const response = await api.post(`${USERS_API}/logout`);
  return response.data;
};

export const register = async (user) => {
  const response = await api.post(`${USERS_API}/register`, user);
  return response.data;
};

export const profile = async () => {
  const response = await api.get(`${USERS_API}/profile`);
  return response.data;
};