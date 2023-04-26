import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { findUserById } from '../services/users-service';
import { updateUserThunk } from '../services/users-thunk';

const BookReducedPreview = ({ book }) => {
  const { currentUser, loading } = useSelector(state => state.users);
  const [user, setUser] = useState();
  const bookInfo = book.volumeInfo;

  const dispatch = useDispatch();

  const getCurrentUserObj = async () => {
    const updatedUser = await findUserById(currentUser._id);
    setUser(updatedUser);
  }

  const addBookmarkHandler = async () => {
    const currentBookList = [...user.bookList, book.id];
    dispatch(
      updateUserThunk({
        ...user,
        bookList: currentBookList
      })
    );
    getCurrentUserObj();
  };

  const removeBookmarkHandler = async () => {
    dispatch(
      updateUserThunk({
        ...user,
        bookList: user.bookList.filter(id => id !== book.id)
      })
    );
    getCurrentUserObj();
  };

  useEffect(() => {
    if (currentUser) {
        getCurrentUserObj();
    }
  }, []);

  return (
    <li className="list-group-item bg-light-orange p-2">
      {console.log('infinite rerender in reduced flag')}
      {loading && <li className="list-group-item bg-light-orange">Loading...</li>}
      {!loading && book.id && (
        <div className="row">
          <div className="col-2 d-none d-lg-block">
            <img
              className="img-fluid"
              src={bookInfo.imageLinks && bookInfo.imageLinks.thumbnail}
              alt="book image preview"
            ></img>
          </div>
          <div className="col-7 fs-7 fw-light" style={{ fontSize: 12 }}>
            <Link to={`/book-details/${book.id}`}>{bookInfo.title}</Link>
          </div>
          <div className="col-3">
            {user && user.bookList.includes(book.id) && (
              <i className="bi bi-bookmark-fill" onClick={() => removeBookmarkHandler}></i>
            )}
            {user && !user.bookList.includes(book.id) && (
              <i className="bi bi-bookmark" onClick={() => addBookmarkHandler}></i>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default BookReducedPreview;
