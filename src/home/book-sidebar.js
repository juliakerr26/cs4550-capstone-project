import BookReducedPreview from './book-reduced-preview';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BookSidebar = ({ books }) => {
  let { currentUser } = useSelector(state => state.users);

  return (
    <ul className="list-group" style={{ overflowY: 'scroll', maxHeight: 'auto' }}>
      <li className="list-group-item bg-light-orange">Saved Books</li>
      {(currentUser && books.map(b => <BookReducedPreview book={b} />)) || (
        <li className="list-group-item bg-light-orange">
          <Link to={'/login'}>Log in or register</Link> to save books!
        </li>
      )}
    </ul>
  );
};

export default BookSidebar;
