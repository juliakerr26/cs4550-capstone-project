import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUserThunk } from '../services/users-thunk';
import { findUserById } from '../services/users-service';
import { getBookById } from '../services/books-service';
import '../index.css';

const BookDetails = () => {
  const { currentUser } = useSelector(state => state.users);
  const [loggedInUser, setLoggedInUser] = useState();
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

  useEffect(() => {
    if (currentUser) {
      getCurrentUserObj();
    }
  }, [loggedInUser]);

  const getCurrentUserObj = async () => {
    const updatedUser = await findUserById(currentUser._id);
    setLoggedInUser(updatedUser);
  };

  const addBookmarkHandler = async () => {
    const currentBookList = [...loggedInUser.bookList, id];
    dispatch(
      updateUserThunk({
        ...loggedInUser,
        bookList: currentBookList,
      })
    );
    getCurrentUserObj();
  };

  const removeBookmarkHandler = async () => {
    dispatch(
      updateUserThunk({
        ...loggedInUser,
        bookList: loggedInUser.bookList.filter(book_id => book_id !== id),
      })
    );
    getCurrentUserObj();
  };

  return (
    <div>
      <h3 className="d-inline-block txt-dark-orange ps-2 pt-3">Book Details</h3>
      {book.id && (
        <div className="row pb-5">
          <div className="col-4 text-center">
            <div className="bg-light-green rounded">
              <img src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.medium} className="img-fluid p-3" />
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
            {book.volumeInfo.ratingsCount && (
              <div className="txt-dark-green pt-4">
                <h5>
                  {book.volumeInfo.averageRating} <i className="fa fa-regular fa-star fa-sm"></i>
                </h5>
                <h5>{book.volumeInfo.ratingsCount} Reviews</h5>
              </div>
            )}
            {!book.volumeInfo.ratingsCount && (
              <div className="txt-dark-green pt-4">
                <h5>This book has no reviews yet</h5>
              </div>
            )}
          </div>
          <div className="col-8 txt-dark-green">
            <div>
              {loggedInUser && loggedInUser.bookList.includes(book.id) && (
                <i
                  className="bi bi-bookmark-fill fa-2x float-end pe-3"
                  onClick={removeBookmarkHandler}
                  style={{ color: '#264653' }}
                ></i>
              )}
              {loggedInUser && !loggedInUser.bookList.includes(book.id) && (
                <i
                  className="bi bi-bookmark fa-2x float-end pe-3"
                  onClick={addBookmarkHandler}
                  style={{ color: '#264653' }}
                ></i>
              )}
              <h1>{book.volumeInfo.title}</h1>
            </div>
            <h3>{book.volumeInfo.subtitle}</h3>

            <div>
              <h6 className="d-inline-block">By:</h6>
              {!book.volumeInfo.authors.length && (
                <h6 className="d-inline-block p-1 txt-gray-green">Anonymous Author</h6>
              )}
              {!!book.volumeInfo.authors.length && (
                <h6 className="d-inline-block p-1 txt-gray-green">{book.volumeInfo.authors.join(', ')}</h6>
              )}
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
        </div>
      )}
    </div>
  );
};

export default BookDetails;
