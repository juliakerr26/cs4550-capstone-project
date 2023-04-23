import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getBookById } from '../services/books-service';
import { updateBookClubThunk } from '../services/book-club-thunk';

const BookListItem = ({ book_id }) => {
  const { currentUser } = useSelector(state => state.users);
  const [book, setBook] = useState({});

  let descriptionWithoutTags = "";
  if (book.id) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = book.volumeInfo.description;
    descriptionWithoutTags = tempElement.textContent || tempElement.innerText || '';
  }

  const fetchBook = async () => {
    const bookObject = await getBookById(book_id);
    setBook(bookObject);
  };
  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <li className="list-group-item bg-light-green rounded m-1 p-2">
      {book.id && (
        <div className="row">
          <div className="col-2">
            <img className="img-fluid" src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.medium}></img>
          </div>
          <div className="col-10">
            <LinkContainer to={`/book-details/${book_id}`}>
              <div className="row fw-bold txt-dark-orange">{book.volumeInfo.title}</div>
            </LinkContainer>
            <div className="row fw-light fst-italic txt-dark-green">
              {book.volumeInfo.authors} - {book.volumeInfo.publisher}
            </div>
            <div className="row txt-dark-green pe-4">
              {descriptionWithoutTags}
              ...
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default BookListItem;
