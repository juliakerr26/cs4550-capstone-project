import {Link} from "react-router-dom";
const BookPreview = ({ book }) => {
    // console.log("current book in book preview");
    // console.log(book)
    console.log("in book preview, here's book param we got");
    console.log(book);
    const bookInfo = book.volumeInfo;
    // console.log(bookInfo);
    return (
        <li className="list-group-item bg-light-green lh-2 p-2 border-2 border-white ">
            <div className="row">
                <div className="col-2">
                    <img className="img-fluid" src={(bookInfo.imageLinks && bookInfo.imageLinks.smallThumbnail) || "./default-book-img.jpg"}
                         alt="book preview image"></img>
                </div>
                <div className="col-9">
                    <div className="row fw-bold"><Link className="ps-0" to={`/book-details/${book.id}`}>{bookInfo.title}</Link></div>
                    <div className="row fw-light fst-italic">{bookInfo.authors} - {bookInfo.publisher}</div>
                    <div className="row">{
                        bookInfo.description &&
                        bookInfo.description.substring(0,350)
                            .replaceAll('<b>', "")
                            .replaceAll('</b>', "")
                            .replaceAll('<br>', " ")}...
                    </div>
                </div>
                <div className="col-1 align-self-center ps-2">
                    {/* TODO: add onclick functionality => save into Saved Books */}
                    <i className="fa fa-bookmark"></i>
                </div>
            </div>
        </li>
    );
};

export default BookPreview;
