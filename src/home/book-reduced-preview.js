const BookReducedPreview = (bookParam) => {
    const book = bookParam.bookParam;
    const bookInfo = book.volumeInfo;
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-2">
                    <img className="img-fluid" src={bookInfo.imageLinks.smallThumbnail} alt="book image preview"></img>
                </div>
                <div>
                    <p>{bookInfo.title}</p>
                    <p>{bookInfo.authors}</p>
                </div>
                <div>
                    <i className="bi bi-heart"></i>
                </div>
            </div>
        </li>
    )
}

export default BookReducedPreview;