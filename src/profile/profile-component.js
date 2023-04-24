import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  findUserByUsernameThunk,
  logoutThunk,
} from "../services/users-thunk";
import BookSidebar from "../home/book-sidebar";
import * as service from "../services/books-service";

function ProfileComponent({username, canEdit}) {
  const dispatch = useDispatch();
  const {returnedUsers, loading} = useSelector(state => state.users);
  const [savedBooks, setSavedBooks] = useState([]);
  useEffect(() => {
    dispatch(findUserByUsernameThunk(username));
  }, [username]);
  useEffect(() => {
    getSavedBooks();
  }, [returnedUsers]);
  const getSavedBooks = async () => {
    if (!returnedUsers || !returnedUsers.bookList) {
      return;
    }
    let saved = [];
    for (let i = 0; i < returnedUsers.bookList.length; i += 1) {
      let savedBook = await service.getBookById(returnedUsers.bookList[i]);
      saved.push(savedBook);
    }
    setSavedBooks(saved);
  }
  const handleLogout = async () => {
    await dispatch(logoutThunk());
  };
  if (!loading && returnedUsers) {
    console.log(returnedUsers.bookList);
    console.log(returnedUsers.username);
    return (
        <div className='bg-light-green mt-4 p-3' style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div className='row'>
            <div className='col-2'>
              <img width={70} className="float-start rounded me-2" src="/images/profile-img.jpg" />
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
            </div>
            <div className='col-8'>
              <div>{returnedUsers.firstName} {returnedUsers.lastName}</div>
              <div>@{returnedUsers.username}</div>
              <div>Member since {returnedUsers.createdOn}</div>
              <div>Email: {returnedUsers.email}</div>
            </div>
            <div className='col-2'>
              <BookSidebar books={savedBooks}/>
            </div>
          </div>
        </div>
    );
  } else if (loading) {
    return(
        <div className='bg-light-green mt-4 p-3' style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{textAlign: 'center'}}>
            <h1>Loading...</h1>
          </div>
        </div>
    );
  } else {
    return(
        <div className='bg-light-green mt-4 p-3' style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{textAlign: 'center'}}>
            <h1>User not found.</h1>
          </div>
        </div>
    )
  }
}

export default ProfileComponent;