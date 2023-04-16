const BookPreview = (bookParam) => {
    const book = bookParam.bookParam;
    console.log("current book in book preview");
    console.log(book)
    const bookInfo = book.volumeInfo;
    return (
        <li className="list-group-item bg-light-green lh-2 p-2">
            <div className="row">
                <div className="col-2">
                    <img className="img-fluid" max-height={"80"} src={bookInfo.imageLinks.smallThumbnail}
                         alt="book preview image"></img>
                </div>
                <div className="col-9">
                    <div className="row fw-bold">{bookInfo.title}</div>
                    <div className="row fw-light fst-italic">{bookInfo.authors} - {bookInfo.publisher}</div>
                    {/* the "replace all" will only work for <b> for now, can be changed at some point*/}
                    <div className="row">{bookInfo.description.substring(0,350).replaceAll('<b>', "").replaceAll('</b>', "").replaceAll('<br>', " ")} ...</div>
                </div>
                <div className="col-1 align-self-center">
                    {/*<i className="bi bi-balloon-heart"></i>*/}
                    {/* TODO: add onclick functionality => save into Saved Books */}
                    <i className="fa fa-bookmark"></i>
                </div>
            </div>
        </li>
    );
};

export default BookPreview;
