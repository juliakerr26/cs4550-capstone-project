import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUserThunk } from '../services/users-thunk';
import { getBookById } from '../services/books-service';
import '../index.css';

import testingBook from '../data/books.json';

const BookDetails = () => {
  const { currentUser } = useSelector(state => state.users);
  const { id } = useParams();
  const [book, setBook] = useState({});
  const dispatch = useDispatch();
  const fetchBook = async () => {
    const bookObject = await getBookById(id);
    setBook(bookObject);
  };
  useEffect(() => {
    fetchBook();
  }, []);
  const addBookmarkHandler = book_id => {
    dispatch(
      updateUserThunk({
        ...currentUser,
        bookList: currentUser.bookList.push(book_id)
      })
    );
  };
  const removeBookmarkHandler = book_id => {
    dispatch(
      updateUserThunk({
        ...currentUser,
        bookList: currentUser.bookList.filter(id => id !== book_id)
      })
    );
  };

  return (
    <div>
      {book.id && (<div className="row pt-5 pb-5">
        <div className="col-4 text-center">
          <div className="bg-light-green rounded">
            <img src={book.volumeInfo.imageLinks.medium} className="img-fluid p-3" />
          </div>
          <div className="d-none d-lg-block">
            <a className="btn btn-lg rounded-pill align-middle mt-3" href={book.volumeInfo.infoLink}>
              Open in Google Books
            </a>
          </div>
          <div className="d-lg-none">
            <a className="btn rounded-pill align-middle mt-3" href={book.volumeInfo.infoLink}>
              Open in Google Books
            </a>
          </div>
          <div className="txt-dark-green pt-4">
            <h5>
              {book.volumeInfo.averageRating} <i className="fa fa-regular fa-star fa-sm"></i>
            </h5>
            <h5>{book.volumeInfo.ratingsCount} Reviews</h5>
          </div>
        </div>
        <div className="col-8 txt-dark-green">
          <div>
            {currentUser && currentUser.bookList.includes(book.id) &&
            (<i className="fa fa-solid fa-bookmark fa-lg float-end p-3" onClick={removeBookmarkHandler(book.id)} style={{ color: '#264653' }}></i>)}
            {currentUser && !currentUser.bookList.includes(book.id) &&
            (<i className="fa fa-regular fa-bookmark fa-lg float-end p-3" onClick={addBookmarkHandler(book.id)} style={{ color: '#264653' }}></i>)}
            <h1>{book.volumeInfo.title}</h1>
          </div>
          <h3>{book.volumeInfo.subtitle}</h3>

          <div>
            <h6 className="d-inline-block">By:</h6>
            <h6 className="d-inline-block p-1 txt-gray-green">{book.volumeInfo.authors.join(', ')}</h6>
          </div>

          <div>
            <div className="d-inline-block">
              <h6 className="d-inline-block">Publisher:</h6>
              <h6 className="d-inline-block p-1 txt-gray-green">{book.volumeInfo.publisher}</h6>
            </div>
            <div className="d-inline-block">
              <h6 className="d-inline-block">Publish Date:</h6>
              <h6 className="d-inline-block p-1 txt-gray-green">{book.volumeInfo.publishedDate}</h6>
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }} />
        </div>
      </div>)}
    </div>
  );
};

export default BookDetails;
