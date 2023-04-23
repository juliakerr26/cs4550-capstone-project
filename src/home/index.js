import BookList from "../shared/book-list";
import BookSidebar from "./book-sidebar";
import * as service from "../services/books-service"
import * as userService from "../services/users-service"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
    console.log('in home');
    let { currentUser } = useSelector(state => state.users);
    const [books, setBooks] = useState([]);
    const [savedBooks, setSavedBooks] = useState([]);
    const getHomeBooks = async () => {
        // console.log("getHomeBooks books")
        // console.log(books)
        const results = await service.getBooksBySearch("fantasy+subject");
        setBooks(results);
        // console.log("getHomeBooks results")
        // console.log(results)
    }

    const getSavedBooks = async () => {
        // dummy user for now, just to see if it would render. it should work for the logged in user
        // currentUser = await userService.findUserById("6436dd3d62713ff5c9e4e28c");
        // currentUser = await userThunk.findUserByUsernameThunk("julia");
        // currentUser = await userService.findUserByUsername("julia");
        console.log("this is current user");
        console.log(currentUser);
        // need a way to get all the id's of books that a user has liked
        if (currentUser) {
            const savedBooksIDs = currentUser.bookList;
            console.log("user's saved book id's");
            console.log(savedBooksIDs);
            let savedBook = null;
            let saved = [];
            for (let i = 0; i < savedBooksIDs.length; i += 1) {
                savedBook = await service.getBookById(savedBooksIDs[i]);
                console.log("saved book we got")
                console.log(savedBook);
                saved.push(savedBook)
            }
            console.log("all saved books");
            console.log(saved);
            setSavedBooks(saved);
            // get the user, they should have a booklist
        }
        else {
            console.log("getting saved books");
            setSavedBooks([]);
        }
    }

    useEffect( () => {
        if (books) {
            setBooks(books);
            getHomeBooks();
        }
        // if (savedBooks) {
        //     setSavedBooks(savedBooks);
        //     getSavedBooks();
        // }

    }, []);
    useEffect(() => {
        getSavedBooks();
    }, [savedBooks])

    return (
        <div className="row mb-2">
            <h3 className="d-inline-block txt-dark-orange ps-3 pt-3">Home</h3>
            {/* left sidebar go here whatever it is*/}
            <div className="col-9">
                {
                    books.items && (
                    <BookList books={books.items}/>)
                }
            </div>
            <div className="col-3">
                {
                    savedBooks && (
                        <BookSidebar books={savedBooks}/>)
                }
            </div>
        </div>
    );
};

export default Home;
