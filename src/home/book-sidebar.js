import BookReducedPreview from "./book-reduced-preview";
const BookSidebar = (bookParam) => {
    const books = bookParam.bookParam;
    return (
        <ul className="list-group-item">
            {books.map(b => (
                <BookReducedPreview bookParam={b}/>
            ))}
        </ul>
    )
}

export default BookSidebar