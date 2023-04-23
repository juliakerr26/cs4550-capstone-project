import BookReducedPreview from "./book-reduced-preview";
import {Link} from "react-router-dom";

const BookSidebar = ({ books }) => {
    return (
        <ul className="list-group">
            <li className="list-group-item bg-light-orange">
                Saved Books
            </li>
            { books.map(b => (
                <BookReducedPreview book={b}/>
            ))}
            <li className="list-group-item bg-light-orange">
                <Link to="/saved-books">See All</Link>
            </li>
        </ul>
    )
}

export default BookSidebar;