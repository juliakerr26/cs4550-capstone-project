const BookPreview = (book1) => {
//   console.log('in book preview');
//   console.log(book1);
  const book = book1.book1;
//   console.log(book);
//   console.log(book.volumeInfo);
  const bookInfo = book.volumeInfo;
  // const book = b.book;
  // console.log(book);
  return (
    // <>
      // {/* <table class="table">
      //       <thead><th>1</th><th>2</th><th>3</th><th>4</th></thead>
      //       <tbody> */}
      // {/* <tr> */}
        <div class="row">
            <div class="col-2">
            {/* src={book.imageLinks.smallThumbnail} */}
            {/* src={book.volumeInfo.imageLinks.smallThumbnail}*/}
            {/* src={book.volumeInfo.title} */}
            <img src={bookInfo.imageLinks.smallThumbnail} alt="book preview image"></img>
            </div>

            <div class="col-10">
            { bookInfo.title }
            <div class="row">{bookInfo.title}</div>
            </div>
        </div>
        // </div>
      // {/* </tr> */}
      // {/* </tbody>
      //   </table> */}
    // </>
  );
};

export default BookPreview;
