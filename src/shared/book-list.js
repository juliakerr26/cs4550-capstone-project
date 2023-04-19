import BookPreview from "./book-preview";
const BookList = ({ books }) => {
    // console.log("this is bookParam")
    // console.log(bookParam)
    // const books = bookParam.bookParam;
    // console.log("bookParam.bookParam");
    // console.log(books)
    return (
        <ul className="list-group">
            {books.map((b) => (
            <BookPreview book={b}/>))}
        </ul>
    )
}

export default BookList;