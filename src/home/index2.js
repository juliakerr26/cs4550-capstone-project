import BookList from '../shared/book-list';
import BookSidebar from './book-sidebar';
import * as service from '../services/books-service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { findUserById } from '../services/users-service';

// original code for home index.
// has less code duplication but does not perform the functionality i need from it as it is.

const Home = () => {
    let { currentUser, loading } = useSelector(state => state.users);
    const [user, setUser] = useState();
    const [books, setBooks] = useState([]);
    const [savedBooks, setSavedBooks] = useState([]);

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

    const getCurrentUser = async () => {
        if (currentUser) {
            const updatedUser = await findUserById(currentUser._id);
            setUser(updatedUser);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    useEffect(() => {
        getHomeBooks();
        getSavedBooks();
    }, [user]);

    // this is new
    // useEffect(() => {
    //     getHomeBooks();
    //     getSavedBooks();
    // }, [currentUser])
    useEffect(() => {
        getCurrentUser();
    }, [])

    return (
        <div className="row mb-2">
            <h3 className="d-inline-block txt-dark-orange ps-3 pt-3">Home</h3>
            <div className="col-9">
                {(!loading && books.items && <BookList books={books.items} />) ||
                 (loading && console.log('loading books ' + books)) ||
                 (<h2>Loading...</h2> && console.log('loading : ' + books))}
            </div>
            <div className="col-3">{savedBooks && <BookSidebar books={savedBooks} />}</div>
        </div>
    );
};

export default Home;
