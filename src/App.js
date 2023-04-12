import Search from './search';
import Home from './home';
import BookClub from './main';
import Profile from './profile';
import Login from './login';
import { BrowserRouter, Link } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import BookDetails from './shared/book-details.js';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Link to="/">Main Page</Link> |
        <Link to="home">Home</Link> |
        <Link to="search">Search</Link> |
        <Link to="book-details/zyTCAlFPjgYC">Book Details</Link> |
        <Link to="profile">Profile</Link> |
        <Link to="login">Login</Link>
        <Routes>
          <Route path="/" element={<BookClub />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/book-details/:id" element={<BookDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
