import {Link} from "react-router-dom";

const BookReducedPreview = ({book}) => {
    // const book = bookParam.bookParam;
    const bookInfo = book.volumeInfo;
    console.log("book reduced preview book info");
    console.log(bookInfo);
    return (
        <li className="list-group-item bg-light-orange p-2">
            <div className="row">
                <div className="col-2 d-none d-lg-block">
                    <img className="img-fluid" src={bookInfo.imageLinks && bookInfo.imageLinks.thumbnail} alt="book image preview"></img>
                </div>
                <div className="col-8 fs-7 fw-light" style={{fontSize: 12}}>
                    {/*<p>{bookInfo.title}</p>*/}
                    <Link to={`/book-details/${book.id}`}>{bookInfo.title}</Link>
                </div>
                <div className="col-2">
                    <i className="fa fa-bookmark"></i>
                </div>
            </div>
        </li>
    )
}

export default BookReducedPreview;