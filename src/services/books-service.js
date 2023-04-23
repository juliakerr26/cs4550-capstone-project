import axios from 'axios';
const BOOKS_API = process.env.REACT_APP_GOOGLE_BOOKS_API || 'https://www.googleapis.com/books/v1/volumes';

export const getBookById = async book_id => {
  const response = await axios.get(`${BOOKS_API}/${book_id}`);
  return response.data;
};

export const getBooksBySearch = async query => {
  query.replace(/\s/g, '+');
  const response = await axios.get(`${BOOKS_API}?q=${query}`);
  return response.data;
};
