import {Link} from "react-router-dom";
import {updateUserThunk} from "../services/users-thunk";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findUserById} from "../services/users-service";
const BookPreview = ({ book }) => {
    console.log("book id: " + book.id)
    let { currentUser } = useSelector(state => state.users);
    const dispatch = useDispatch();
    // console.log("current book in book preview");
    // console.log(book)
    // console.log("in book preview, here's book param we got");
    // console.log(book);
    const [user, setUser] = useState();
    console.log("book prev current user")
    console.log(currentUser);
    const bookInfo = book.volumeInfo;
    useEffect( () => {
        if(currentUser) {
            getCurrentUser();
        }
    }, [user]);

    const addBookmark = async (book_id) => {
        console.log("adding " + book_id + " to user's bookList");
        // console.log("here add to the user's bookList")
        let temp = [...user.bookList];
        temp = [...temp, book_id];
        // console.log("this is temp");
        // console.log(temp);
        // temp = temp.push(book_id);
        dispatch( updateUserThunk({ ...user, //,
                               bookList: temp
            }));// currentUser.bookList.push(book_id) }));
        // console.log('end of addBookmark method');
        getCurrentUser();
    };

    const removeBookmark = async (book_id) => {
        console.log("removing book from user's booklist")
        dispatch( updateUserThunk({ ...user,
                                bookList: user.bookList.filter((id) => id !== book_id)}));
        console.log('end of removeBookmark method');
        getCurrentUser();
    };
    const getCurrentUser = async () => {
        const updatedUser = await findUserById(currentUser._id);
        setUser(updatedUser);
    }

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
                            .replaceAll('<br>', " ")}
                        ...
                    </div>
                </div>
                <div className="col-1 align-self-center ps-2">
                    { (user && (user.bookList.includes(book.id)) &&
                       ( <i className="bi bi-bookmark-fill"
                            onClick={ () => removeBookmark(book.id) }></i> ))
                    }
                    { (user && !(user.bookList.includes(book.id)) && (
                                <i className="bi bi-bookmark"
                                onClick={ () => addBookmark(book.id) }></i> ))
                        // (
                        //     console.log("hi " + user)
                        // )
                        // || (
                        //     <h6>weird</h6>
                        // )
                    }
                    {/*{*/}
                    {/*    // to be taken out later, just to know if there's no current user*/}
                    {/*    !user && (<h6>no one</h6>)*/}
                    {/*}*/}
                </div>
            </div>
        </li>
    );
};

export default BookPreview;
