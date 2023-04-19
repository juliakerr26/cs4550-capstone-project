import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getBookById } from '../services/books-service';
import { updateBookClubThunk } from '../services/book-club-thunk';

const BookListItem = ({ bookClub, book_id }) => {
  const { currentUser } = useSelector(state => state.users);
  const [book, setBook] = useState({});
  const dispatch = useDispatch();
  //const isAdmin = currentUser && currentUser.isAdmin;
  const isAdmin = true;

  const fetchBook = async () => {
    const bookObject = await getBookById(book_id);
    setBook(bookObject);
  };
  useEffect(() => {
    fetchBook();
  }, []);

  const deleteBookFromClubHandler = book_id => {
    dispatch(
      updateBookClubThunk({
        ...bookClub,
        bookList: bookClub.bookList.filter(b_id => b_id !== book_id),
      })
    );
  };

  return (
    <li className="list-group-item bg-light-green rounded m-1 p-2">
      {book.id && (
        <div className="row">
          <div className="col-2">
            <img className="img-fluid" src={book.volumeInfo.imageLinks.medium}></img>
          </div>
          <div className="col-8">
            <LinkContainer to={`/book-details/${book_id}`}>
              <div className="row fw-bold txt-dark-orange">{book.volumeInfo.title}</div>
            </LinkContainer>
            <div className="row fw-light fst-italic">
              {book.volumeInfo.authors} - {book.volumeInfo.publisher}
            </div>
            {/* the "replace all" will only work for <b> for now, can be changed at some point*/}
            <div className="row">
              {book.volumeInfo.description
                .substring(0, 350)
                .replaceAll('<b>', '')
                .replaceAll('</b>', '')
                .replaceAll('<br>', ' ')}{' '}
              ...
            </div>
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center">
            {isAdmin && (
              <i
                className="fa fa-solid fa-trash fa-2xl float-end"
                onClick={() => deleteBookFromClubHandler(book_id)}
                style={{ color: '#e32400' }}
              ></i>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default BookListItem;
