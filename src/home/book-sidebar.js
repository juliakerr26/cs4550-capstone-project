import BookReducedPreview from "./book-reduced-preview";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateUserThunk} from "../services/users-thunk";
import {useEffect} from "react";
const BookSidebar = ({ books }) => {
    let { currentUser } = useSelector(state => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
        if (books) {

        }
    }, [])
    return (
        <ul className="list-group">
            <li className="list-group-item bg-light-orange">
                Saved Books
            </li>
            { books.map(b => (
                <BookReducedPreview book={b}/>
            ))}
            <li className="list-group-item bg-light-orange">
                {/* links to all saved books*/}
                <Link to="/saved-books">See All</Link>
            </li>
        </ul>
    )
}

export default BookSidebar;