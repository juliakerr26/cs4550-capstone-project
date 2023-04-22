import {Link} from "react-router-dom";
import {updateUserThunk} from "../services/users-thunk";
import {useDispatch, useSelector} from "react-redux";
import * as userService from "../services/users-service"
import {useEffect, useState} from "react";
const BookPreview = ({ book }) => {
    let { currentUser } = useSelector(state => state.users);
    const dispatch = useDispatch();
    console.log("current book in book preview");
    console.log(book)
    console.log("in book preview, here's book param we got");
    console.log(book);
    const [user, setUser] = useState(null);
    const bookInfo = book.volumeInfo;
    const addBookmark = (book_id) => {
        console.log("here add to the user's bookList")
        dispatch(
            updateUserThunk({
                                ...user,
                                bookList: user.bookList.push(book_id)
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
    const getUser = async () => {
        currentUser = await userService.findUserByUsername("julia");
        setUser(currentUser)
        console.log("user in prev");
        console.log(currentUser);
        if (currentUser){
            console.log("true prev");
            console.log(currentUser);
        }
        else {
            console.log('COMING UP FALSE');
        }
    }
    useEffect( () => {
        console.log("in useEffect")
        if (currentUser) {
            console.log('have user ' + currentUser);
        }
        else {
            console.log("getting user")
            getUser();
        }
    }, []);
    return (
        <li className="list-group-item bg-light-green lh-2 p-2 border-2 border-white rounded">
            <div className="row">
                <div className="col-2">
                    <img className="img-fluid" src={(bookInfo.imageLinks && bookInfo.imageLinks.smallThumbnail) || "./default-book-img.jpg"}
                         alt="book preview image"></img>
                </div>
                <div className="col-9">
                    <div className="row fw-bold"><Link className="ps-0" to={`/book-details/${book.id}`}>{bookInfo.title}</Link></div>
                    <div className="row fw-light fst-italic">{bookInfo.authors.join(", ")} - {bookInfo.publisher}</div>
                    <div className="row">{
                        bookInfo.description &&
                        bookInfo.description.substring(0,350)
                            .replaceAll('<b>', "")
                            .replaceAll('</b>', "")
                            .replaceAll('<br>', " ")}...
                    </div>
                </div>
                <div className="col-1 align-self-center ps-2">
                    {/* TODO: add onclick functionality => save into Saved Books */}
                    {
                        (user && (book.id in user.bookList) && (
                            <i className="fa fa-bookmark"
                            onClick={ removeBookmark(book.id) }></i>
                                    ))
                        ||
                        (
                            user && !(book.id in user.bookList) && (
                                <i className="fa-regular fa-bookmark"
                                onClick={ addBookmark(book.id) }></i>
                                ))
                        // (
                        //     console.log("hi " + user)
                        // )
                        || (
                            <h4>add a book</h4>
                        )
                    }
                </div>
            </div>
        </li>
    );
};

export default BookPreview;
