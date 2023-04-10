import axios from 'axios';
// const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
const API_KEY = "AIzaSyCaF6m7nfw6e0d-BnuQhPTUGYLSpD07-vo"
//const BOOKS_API = process.env.REACT_APP_GOOGLE_BOOKS_API;
const BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

export const getBookById = async book_id => {
  const response = await axios.get(`${BOOKS_API}/${book_id}&key=${API_KEY}`);
  return response.data;
}

export const getBooksBySearch = async query => {
  query.replace(/\s/g, '+')
  const response = await axios.get(`${BOOKS_API}?q=${query}&key=${API_KEY}`);
  return response.data
}