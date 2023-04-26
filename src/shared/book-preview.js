import { Link } from 'react-router-dom';
import { updateUserThunk } from '../services/users-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { findUserById } from '../services/users-service';

const BookPreview = ({ book }) => {
  let { currentUser } = useSelector(state => state.users);
  const [user, setUser] = useState();
  const bookInfo = book.volumeInfo;

  let descriptionWithoutTags = "";
  if (book.id) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = bookInfo.description;
    descriptionWithoutTags = tempElement.textContent || tempElement.innerText || '';
  }

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
    <li className="list-group-item bg-light-green rounded p-2 mb-1">
        {console.log('infinite rerender flag')}
      <div className="row">
        <div className="col-2">
          <img
            className="img-fluid"
            style={{ minWidth: 20 }}
            src={(bookInfo.imageLinks && bookInfo.imageLinks.smallThumbnail) || './default-book-img.jpg'}
            alt="book preview image"
          ></img>
        </div>
        <div className="col-9">
          <div className="row fw-bold">
            <Link className="ps-0" to={`/book-details/${book.id}`}>
              {bookInfo.title}
            </Link>
          </div>
          <div className="row fw-light fst-italic">
            {(bookInfo.authors && bookInfo.authors.join(', ')) || 'Anonymous Author'} - {bookInfo.publisher}
          </div>
          <div className="row">
            {bookInfo.description &&
              descriptionWithoutTags.substring(0,350)}
            ...
          </div>
        </div>
        <div className="col-1 align-self-center ps-2">
          {user && user.bookList.includes(book.id) && (
            <i className="bi bi-bookmark-fill" onClick={() => removeBookmarkHandler}></i>
          )}
          {user && !user.bookList.includes(book.id) && (
            <i className="bi bi-bookmark" onClick={() => addBookmarkHandler}></i>
          )}
        </div>
      </div>
    </li>
  );
};

export default BookPreview;
