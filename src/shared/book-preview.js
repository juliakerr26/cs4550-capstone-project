import {Link} from "react-router-dom";
import {updateUserThunk} from "../services/users-thunk";
import {useDispatch, useSelector} from "react-redux";
import * as userService from "../services/users-service"
import {useEffect, useState} from "react";
const BookPreview = ({ book }) => {
    console.log("book id: " + book.id)
    let { currentUser } = useSelector(state => state.users);
    const dispatch = useDispatch();
    // console.log("current book in book preview");
    // console.log(book)
    // console.log("in book preview, here's book param we got");
    // console.log(book);
    // const [user, setUser] = useState(null);
    const bookInfo = book.volumeInfo;
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
    const getUser = async () => {
        currentUser = await userService.findUserByUsername("julia");
        // setUser(currentUser)
        // console.log("user in prev");
        // console.log(user);
        if (currentUser){
            console.log("true prev, this is currentUser");
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
        <li className="list-group-item bg-light-green rounded p-2 mb-1">
            <div className="row">
                <div className="col-2">
                    <img className="img-fluid" style={{minWidth: 20}} src={(bookInfo.imageLinks && bookInfo.imageLinks.smallThumbnail) || "./default-book-img.jpg"}
                         alt="book preview image"></img>
                </div>
                <div className="col-9">
                    <div className="row fw-bold"><Link className="ps-0" to={`/book-details/${book.id}`}>{bookInfo.title}</Link></div>
                    <div className="row fw-light fst-italic">{(bookInfo.authors && bookInfo.authors.join(", ")) || ("Anonymous Author")} - {bookInfo.publisher}</div>
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
                        (currentUser && (book.id in currentUser.bookList) && (
                            <i className="fa fa-bookmark"
                            onClick={ removeBookmark(book.id) }></i>
                                    ))
                        ||
                        (
                            currentUser && !(book.id in currentUser.bookList) && (
                                <i className="fa fa-heart"
                                onClick={ addBookmark(book.id) }></i>
                                ))
                        // (
                        //     console.log("hi " + user)
                        // )
                        // || (
                        //     <h6>weird</h6>
                        // )
                    }
                </div>
            </div>
        </li>
    );
};

export default BookPreview;
