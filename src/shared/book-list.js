import BookPreview from "./book-preview";

const BookList = ({ books }) => {
    return (
        <ul className="list-group">
            <li className="list-group-item bg-light-green p-2 border-white rounded">
                <h4>Recommended Books</h4>
            </li>
            {books.map((b) => (
            <BookPreview book={b}/>))}
        </ul>
    )
}

export default BookList;