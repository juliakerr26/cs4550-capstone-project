import BookPreview from "./book-preview";
const BookList = (bookParam) => {
    // console.log("this is bookParam")
    // console.log(bookParam)
    const books = bookParam.bookParam;
    // console.log("bookParam.bookParam");
    // console.log(books)
    return (
        <ul className="list-group">
            {books.map(b => (
            <BookPreview bookParam={b}/>))}
        </ul>
    )
}

export default BookList;