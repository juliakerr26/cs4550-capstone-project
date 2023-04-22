import dummybooks from '../data/books.json';
import BookList from "../shared/book-list";
import BookSidebar from "./book-sidebar";
import * as service from "../services/books-service"
import * as userService from "../services/users-service"
import * as userThunk from "../services/users-thunk"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateUserThunk} from "../services/users-thunk";

/* the books that are used as default here can be changed relatively easily */

const Home = () => {
    console.log('in home');
    let { currentUser } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [books, setBooks] = useState([]);
    const [savedBooks, setSavedBooks] = useState([]);
    const getHomeBooks = async () => {
        console.log("getHomeBooks books")
        console.log(books)
        const results = await service.getBooksBySearch("fantasy+subject");
        setBooks(results);
        console.log("getHomeBooks results")
        console.log(results)
    }

    const getSavedBooks = async () => {
        // currentUser = userService.findUserById("6436dd3d62713ff5c9e4e28c");
        // currentUser = await userThunk.findUserByUsernameThunk("julia");
        currentUser = await userService.findUserByUsername("julia");
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
                savedBook = await service.getBookById(savedBooksIDs[i]._id);
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

    const addBookmark = (book_id) => {
        console.log("here add to the user's bookList")
        dispatch(
            updateUserThunk({
                ...currentUser,
                bookList: currentUser.bookList.push(book_id)
            }));
    };

    const removeBookmark = (book_id) => {
        console.log("removing book from user's booklist")
        dispatch(
            updateUserThunk({
                ...currentUser,
                bookList: currentUser.bookList.filter((id) => id !== book_id)
            }));
    };

    useEffect( () => {
        if (books) {
            setBooks(books);
            getHomeBooks();
        }
        // if (savedBooks) {
        //     setSavedBooks(savedBooks);
        //     getSavedBooks();
        // }
        getSavedBooks();
    }, []);

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
                //         might or might not have to change this back to savedBooks.items
                <BookSidebar books={savedBooks}/>)
                }
            </div>
        </div>
    );
};

export default Home;
