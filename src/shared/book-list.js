import BookPreview from "./book-preview";
import {useEffect} from "react";
const BookList = ({ books }) => {
    // console.log("this is bookParam")
    // console.log(bookParam)
    // const books = bookParam.bookParam;
    // console.log("bookParam.bookParam");
    // console.log(books)
    useEffect(() => {

    }, [])
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