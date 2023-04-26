import * as service from '../services/books-service';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {findUserById} from '../services/users-service';
import {updateUserThunk} from "../services/users-thunk";
import {Link} from "react-router-dom";

const Home = () => {
    let {currentUser, loading} = useSelector(state => state.users);
    const [user, setUser] = useState();
    const [books, setBooks] = useState([]);
    const [savedBooks, setSavedBooks] = useState([]);
    const dispatch = useDispatch();

    const getHomeBooks = async () => {
        const results = await service.getBooksBySearch('fantasy+subject');
        setBooks(results);
    };

    const getSavedBooks = async () => {
        if (user) {
            const savedBooksIDs = user.bookList;
            let savedBook = null;
            let saved = [];
            for (let i = 0; i < savedBooksIDs.length; i += 1) {
                savedBook = await service.getBookById(savedBooksIDs[i]);
                saved.push(savedBook);
            }
            setSavedBooks(saved);
        } else if (currentUser) {
            await getCurrentUser();
            setSavedBooks([]);
        }
    };

    const getDescription = async (book_id) => {
        let descriptionWithoutTags = "";
        if (book_id) {
            const tempBook = await service.getBookById(book_id);
            const tempElement = document.createElement('div');
            tempElement.innerHTML = tempBook.volumeInfo.description;
            descriptionWithoutTags = tempElement.textContent || tempElement.innerText || '';
        }
        return descriptionWithoutTags;
    }

    const getCurrentUser = async () => {
        if (currentUser) {
            const updatedUser = await findUserById(currentUser._id);
            setUser(updatedUser);
        }
    };

    const addBookmarkHandler = async (book_id) => {
        console.log("adding bookmark for " + book_id)
        console.log("user booklist before:")
        console.log(user.bookList);
        const currentBookList = [...user.bookList, book_id];
        dispatch(
            updateUserThunk({
                                ...user,
                                bookList: currentBookList
                            })
        );
        getCurrentUser();
        console.log('user booklist after: ')
        console.log(user.bookList)
    };

    const removeBookmarkHandler = async (book_id) => {
        console.log("removing bookmark for " + book_id)
        console.log("user booklist before:")
        console.log(user.bookList);
        dispatch(
            updateUserThunk({
                                ...user,
                                bookList: user.bookList.filter(id => id !== book_id)
                            })
        );
        getCurrentUser();
        console.log('user booklist after: ')
        console.log(user.bookList)
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    useEffect(() => {
        getHomeBooks();
        getSavedBooks();
    }, [user]);

    // useEffect(() => {
    //     getCurrentUser();
    // }, [])

    return (
        <div className="row mb-2">
            <h3 className="d-inline-block txt-dark-orange ps-3 pt-3">Home</h3>
            <div className="col-9">
                {(!loading && books.items && (
                     <ul className="list-group">
                         <li className="list-group-item bg-light-green p-2 border-white rounded">
                             <h4>Recommended Books</h4>
                         </li>
                         {
                             books.items.map((book) => (
                                 <li className="list-group-item bg-light-green rounded p-2 mb-1">
                                     {console.log('infinite rerender flag')}
                                     <div className="row">
                                         <div className="col-2">
                                             <img
                                                 className="img-fluid"
                                                 style={{minWidth: 20}}
                                                 src={(book.volumeInfo.imageLinks
                                                       && book.volumeInfo.imageLinks.smallThumbnail)
                                                      || './default-book-img.jpg'}
                                                 alt="book preview image"
                                             ></img>
                                         </div>
                                         <div className="col-9">
                                             <div className="row fw-bold">
                                                 <Link className="ps-0"
                                                       to={`/book-details/${book.id}`}>
                                                     {book.volumeInfo.title}
                                                 </Link>
                                             </div>
                                             <div className="row fw-light fst-italic">
                                                 {(book.volumeInfo.authors
                                                   && book.volumeInfo.authors.join(', '))
                                                  || 'Anonymous Author'} - {book.volumeInfo.publisher}
                                             </div>
                                             <div
                                                 className="row"> {/*// dangerouslySetInnerHTML={{__html:getDescription()}}*/}
                                                 {/*{book.volumeInfo.description &&*/}
                                                 {/*    getDescription(book_id)*/}
                                                 {/*}*/}
                                                 {
                                                     book.volumeInfo.description.substring(0, 250)
                                                 }
                                                 ...
                                             </div>
                                         </div>
                                         <div className="col-1 align-self-center ps-2">
                                             {user && user.bookList.includes(book.id) && (
                                                 <i className="bi bi-bookmark-fill"
                                                    onClick={() => removeBookmarkHandler(
                                                        book.id)}></i>
                                             )}
                                             {user && !user.bookList.includes(book.id) && (
                                                 <i className="bi bi-bookmark"
                                                    onClick={() => addBookmarkHandler(book.id)}></i>
                                             )}
                                         </div>
                                     </div>
                                 </li>
                                             )
                             )
                         }
                     </ul>
                 ))
                 ||
                 (loading && console.log('loading books ' + books)) ||
                 (<h2>Loading...</h2> && console.log('loading : ' + books))}
            </div>
            <div className="col-3">{savedBooks && (
                <ul className="list-group" style={{overflowY: 'scroll', maxHeight: 'auto'}}>
                    <li className="list-group-item bg-light-orange">Saved Books</li>
                    {(currentUser && savedBooks.map(b => (
                                            <li className="list-group-item bg-light-orange p-2">
                                                {console.log('infinite rerender in reduced flag')}
                                                {loading && <li
                                                    className="list-group-item bg-light-orange">Loading...</li>}
                                                {!loading && b.id && (
                                                    <div className="row">
                                                        <div className="col-2 d-none d-lg-block">
                                                            <img
                                                                className="img-fluid"
                                                                src={b.volumeInfo.imageLinks
                                                 && b.volumeInfo.imageLinks.thumbnail}
                                                                alt="book image preview"
                                                            ></img>
                                                        </div>
                                                        <div className="col-7 fs-7 fw-light" style={{fontSize: 12}}>
                                                            <Link
                                                                to={`/book-details/${b.id}`}>{b.volumeInfo.title}</Link>
                                                        </div>
                                                        <div className="col-3">
                                                            {user && user.bookList.includes(b.id) && (
                                                                <i className="bi bi-bookmark-fill"
                                                                   onClick={() => removeBookmarkHandler(b.id)}></i>
                                                            )}
                                                            {user && !user.bookList.includes(b.id) && (
                                                                <i className="bi bi-bookmark"
                                                                   onClick={() => addBookmarkHandler(b.id)}></i>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </li>)
                     )) // <BookReducedPreview book={b} />
                     ||
                     (
                         <li className="list-group-item bg-light-orange">
                             <Link to={'/login'}>Log in or register</Link> to save books!
                         </li>
                     )}
                </ul>

            )
            }
            </div>
        </div>
    );
};

export default Home;
