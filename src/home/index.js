// import books from '../data/books.json';
import BookList from "../shared/book-list";
import BookSidebar from "./book-sidebar";
import * as service from "../services/books-service"
import {useEffect, useState} from "react";

/* the books that are used here can be changed releatively easily */

const Home = () => {
    // books.map(b => console.log(concat(b.volumeInfo, "")));
    // console.log(books);
    console.log('in home');
    const [books, setBooks] = useState([]);
    // books.map(b => console.log(b.volumeInfo.title));
    const getHomeBooks = async () => {
        console.log("getHomeBooks books")
        console.log(books)
        const results = await service.getBooksBySearch("fantasy+subject");
        setBooks(results);
        console.log("getHomeBooks results")
        console.log(results)
    }

    const getSavedBooks = async () => {
        // need a way to get all the id's of books that a user has liked
        //
        const saved = await service.getBookById("13");
        console.log("here is where we should try to tie in the user's saved books")
    }

    useEffect( () => {
        if (books) {
            setBooks(books);
            getHomeBooks();
        }
    })

    return (
        <div className="row">
            <h1>Home</h1>
            {/* left sidebar go here whatever it is*/}
            <div className="col-9">
                {
                    books.items && (
                    <BookList books={books.items}/>)
                }
            </div>
            <div className="col-3">
                {
                    books.items && (
                <BookSidebar books={books.items}/>)
                }
            </div>


            {/* right preview sidebar can go here*/}
        </div>
    );
};

export default Home;
