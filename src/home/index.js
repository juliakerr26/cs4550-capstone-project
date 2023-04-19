import books from '../data/books.json';
import BookList from "../shared/book-list";
import BookSidebar from "./book-sidebar";

/* the books that are used here can be changed releatively easily */

const Home = () => {
    // books.map(b => console.log(concat(b.volumeInfo, "")));
    console.log(books);
    console.log('in home');
    // books.map(b => console.log(b.volumeInfo.title));

    return (
        <div className="row">
            <h1>Home</h1>
            {/* do we need a search bar across the entire website? or just this page? */}

            {/* left sidebar go here whatever it is*/}
            <div className="col-9">
                {/*{books.map(b => (*/}
                {/*  // <p>{b.volumeInfo}</p>*/}
                {/*  <BookPreview key={b._id} book1={b} />*/}
                {/*))}*/}
                <BookList books={books}/>
            </div>
            <div className="col-3">
                <BookSidebar books={books}/>
            </div>


            {/* right preview sidebar can go here*/}
        </div>
    );
};

export default Home;
