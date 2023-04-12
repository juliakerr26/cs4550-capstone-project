import BookPreview from '../shared/book-preview.js';
import books from '../data/books.json';

/* the books that are used here can be changed releatively easily */

const Home = () => {
  // books.map(b => console.log(concat(b.volumeInfo, "")));
  console.log(books);
  console.log('in home');
  books.map(b => console.log(b.volumeInfo.title));

  return (
    <div>
      <h1>Home</h1>
      {/* <table>
          <thead>
            <th>Things??????</th>
          </thead> */}
      {books.map(b => (
        // <p>{b.volumeInfo}</p>
        <BookPreview key={b._id} book1={b} />
      ))}
      {/* </table> */}
    </div>
  );
};

export default Home;
