import React from 'react';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#bad1a1' }}>
      <div className="container-fluid">
        <a className="navbar-brand">Bookish</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <LinkContainer to="/">
              <NavLink className="nav-link active">Home</NavLink>
            </LinkContainer>
            <LinkContainer to="/saved-books">
              <NavLink className="nav-link">Saved Books</NavLink>
            </LinkContainer>
            <LinkContainer to="/search">
              <NavLink className="nav-link">Search</NavLink>
            </LinkContainer>
            <LinkContainer to="/book-details/zyTCAlFPjgYC">
              <NavLink className="nav-link">Book Details</NavLink>
            </LinkContainer>
            <LinkContainer to="/book-clubs">
              <NavLink className="nav-link">Book Clubs</NavLink>
            </LinkContainer>
            <LinkContainer to="/profile">
              <NavLink className="nav-link">Profile</NavLink>
            </LinkContainer>
            <LinkContainer to="/login">
              <NavLink className="nav-link">Login</NavLink>
            </LinkContainer>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
