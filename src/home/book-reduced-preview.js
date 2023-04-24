import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findUserById} from "../services/users-service";
import {updateUserThunk} from "../services/users-thunk";

const BookReducedPreview = ({book}) => {
    const { currentUser } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    // const book = bookParam.bookParam;
    console.log(book)
    const bookInfo = book.volumeInfo;
    console.log("book reduced preview book info");
    console.log(bookInfo);

    const getCurrentUser = async () => {
        const updatedUser = await findUserById(currentUser._id);
        setUser(updatedUser);
    }
    useEffect(() => {
        if (currentUser) {
            getCurrentUser();
        }
    }, [currentUser])
    const addBookmark = async (book_id) => {
        console.log("here add to the user's bookList")
        let temp = [...user.bookList];
        temp = [...temp, book_id];
        dispatch( updateUserThunk({ ...user, //,
                                      bookList: temp
                                  }));// currentUser.bookList.push(book_id) }));
        console.log('end of addBookmark method');
        getCurrentUser();
    };

    const removeBookmark = async (book_id) => {
        console.log("removing book from user's booklist")
        dispatch( updateUserThunk({ ...user,
                                      bookList: user.bookList.filter((id) => id !== book_id)}));
        getCurrentUser();
    };
    return (
        <li className="list-group-item bg-light-orange p-2">
            <div className="row">
                <div className="col-2 d-none d-lg-block">
                    <img className="img-fluid" src={bookInfo.imageLinks && bookInfo.imageLinks.thumbnail} alt="book image preview"></img>
                </div>
                <div className="col-8 fs-7 fw-light" style={{fontSize: 12}}>
                    <Link to={`/book-details/${book.id}`}>{bookInfo.title}</Link>
                </div>
                <div className="col-2">
                    {/*<i className="fa fa-bookmark"></i>*/}
                    { (user && (user.bookList.includes(book.id)) &&
                       ( <i className="bi bi-bookmark-fill"
                            onClick={ () => removeBookmark(book.id) }></i> ))
                    }
                    { (user && !(user.bookList.includes(book.id)) && (
                        <i className="bi bi-bookmark"
                           onClick={ () => addBookmark(book.id) }></i> ))
                    }
                    { !user && (<h6>no one</h6>) }
                </div>
            </div>
        </li>
    )
}

export default BookReducedPreview;