import Newsies from "./newsies";
import Search from "./search"
import Home from "./home"
import Profile from "./profile"
import Login from "./login"
import {BrowserRouter, Link} from "react-router-dom";
import {Routes, Route} from "react-router";

function App() {
  return (
    <BrowserRouter>
          <div className="container">
              <Link to="/">Newsies</Link> | 
              <Link to="home">Home</Link> | 
              <Link to="search">Search</Link> |
              <Link to="profile">Profile</Link> | 
              <Link to="login">Login</Link>
              <Routes>
                  <Route path="/" element={<Newsies/>}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/search" element={<Search/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/login" element={<Login/>}/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
