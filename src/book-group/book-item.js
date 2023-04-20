const BookItem = ({ book, added }) => {
  const bookInfo = book.volumeInfo;
  return (
    <li className="list-group-item lh-2 p-2 mb-1">
      <div className="row">
        <div className="col-2">
          <img
            className="img-fluid"
            src={(bookInfo.imageLinks && bookInfo.imageLinks.smallThumbnail) || './default-book-img.jpg'}
            alt="book preview image"
          ></img>
        </div>
        <div className="col-8">
          <div className="row fw-bold">{bookInfo.title}</div>
          <div className="row fw-light fst-italic">
            {bookInfo.authors} - {bookInfo.publisher}
          </div>
          <div className="row">
            {bookInfo.description &&
              bookInfo.description
                .substring(0, 350)
                .replaceAll('<b>', '')
                .replaceAll('</b>', '')
                .replaceAll('<br>', ' ')}{' '}
            ...
          </div>
        </div>
        <div className="col-2 align-self-center p-2">
          {!added ? (
            <button className="btn float-end justify-content-center">Add</button>
          ) : (
            <button className="btn float-end justify-content-center">Remove</button>
          )}
        </div>
      </div>
    </li>
  );
};

export default BookItem;
