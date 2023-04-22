import Home from './home';
import Search from './search';
import BookDetails from './shared/book-details.js';
import BookGroup from './book-group';
import CreateBookClub from './book-group/create-book-club.js'
import BookList from './book-group/book-list.js'
import Profile from './profile';
import Login from './login';
import NavBar from './shared/nav-bar';
import usersReducer from './reducers/users-reducer.js';
import booksReducer from './reducers/books-reducer.js';
import bookClubReducer from './reducers/book-club-reducer.js';
import { BrowserRouter, Link } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import CurrentUserContext from './redux/current-user-context';
import store from './redux/store'
import SavedBooks from "./saved-books";

function App() {
  return (
    <Provider store={store}>
      <CurrentUserContext>
        <BrowserRouter>
          <div className="container">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/saved-books" element={<SavedBooks />} />
              <Route path="/book-details/:id" element={<BookDetails />} />
              <Route path="/book-clubs" element={<BookGroup/>} />
              <Route path="/book-clubs/create" element={<CreateBookClub/>} />
              <Route path="/book-clubs/edit/:id" element={<CreateBookClub/>} />
              <Route path="/book-clubs/update/:id" element={<BookGroup/>} />
              <Route path="/book-clubs/:id" element={<BookList/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CurrentUserContext>
    </Provider>
  );
}

export default App;
