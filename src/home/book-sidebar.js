import BookReducedPreview from "./book-reduced-preview";
const BookSidebar = ({books}) => {
    // const books = bookParam.bookParam;
    return (
        <ul className="list-group">
            {books.map(b => (
                <BookReducedPreview book={b}/>
            ))}
        </ul>
    )
}

export default BookSidebar