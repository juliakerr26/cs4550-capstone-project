import BookReducedPreview from "./book-reduced-preview";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateUserThunk} from "../services/users-thunk";
import {useEffect, useState} from "react";
import {findUserById} from "../services/users-service";
import * as service from "../services/books-service";
import {LinkContainer} from "react-router-bootstrap";
const BookSidebar = ({ books }) => {
    console.log("books sidebar books");
    console.log(books);
    let { currentUser } = useSelector(state => state.users);
    const [user, setUser] = useState();
    const dispatch = useDispatch();
    let [savedBooks, setSavedBooks] = useState([books]);
    console.log("saved books state in sidebar")
    console.log(savedBooks);
    console.log("saved books in sidebar")
    console.log(savedBooks);
    // const getCurrentUser = async () => {
    //     const updatedUser = await findUserById(currentUser._id);
    //     setUser(updatedUser);
    //     getSavedBooks()
    // }
    // const getSavedBooks = async () => {
    //     console.log("this is current user");
    //     console.log(user);
    //     // need a way to get all the id's of books that a user has liked
    //     if (currentUser || user) {
    //         // this seems to be an issue
    //         const savedBooksIDs = user.bookList;
    //         console.log("user's saved book id's");
    //         console.log(savedBooksIDs);
    //         let savedBook = null;
    //         let saved = [];
    //         for (let i = 0; i < savedBooksIDs.length; i += 1) {
    //             savedBook = await service.getBookById(savedBooksIDs[i]);
    //             console.log("saved book we got")
    //             console.log(savedBook);
    //             saved.push(savedBook)
    //         }
    //         console.log("all saved books");
    //         console.log(saved);
    //         setSavedBooks(saved);
    //         // get the user, they should have a booklist
    //     }
    //     else {
    //         console.log("getting saved books");
    //         setSavedBooks([]);
    //     }
    // }

    // useEffect(() => {
    //     console.log("USE EFFECT GETTIN CUR USER");
    //     if(currentUser) {
    //         getCurrentUser();
    //     }
    // }, [user])
    //
    // useEffect(() => {
    //     console.log("USE EFFECT CURR USER & SAVED BOOKS");
    //     getCurrentUser();
    //     getSavedBooks();
    //     // if (books) {
    //     //     setSavedBooks(books);
    //     // }
    //     // else {
    //     //     getCurrentUser();
    //     //     getSavedBooks();
    //     // }
    // }, [currentUser] )

    return (
        <ul className="list-group" style = {{overflowY:"scroll", maxHeight:"auto"}}>
            <li className="list-group-item bg-light-orange">
                Saved Books
            </li>
            { currentUser && (books.map(b => (
                <BookReducedPreview book={b}/>
            )))
                ||
              (<li className="list-group-item bg-light-orange"><Link to={"/login"}>Log in or register</Link> to save books!</li>)
            }
        </ul>
    )
}

export default BookSidebar;