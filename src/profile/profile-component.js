import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  findUserByUsernameThunk,
  logoutThunk,
} from "../services/users-thunk";
import BookSidebar from "../home/book-sidebar";

function ProfileComponent({username, canEdit}) {
  const dispatch = useDispatch();
  const {returnedUsers, loading} = useSelector(state => state.users);
  useEffect(() => {
    dispatch(findUserByUsernameThunk(username));
  }, [username]);
  const handleLogout = async () => {
    await dispatch(logoutThunk());
  };
  if (!loading && returnedUsers.bookList) {
    console.log(returnedUsers.bookList);
    console.log(returnedUsers.username);
    return (
        <div className='bg-light-green mt-4 p-3' style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div className='row'>
            <div className='col-1'>
              <img width={70} className="float-start rounded me-2" src="/images/profile-img.jpg" />
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
            </div>
            <div className='col-10'>
              <div>{returnedUsers.firstName} {returnedUsers.lastName}</div>
              <div>@{returnedUsers.username}</div>
              <div>Member since {returnedUsers.createdOn}</div>
              <div>Email: {returnedUsers.email}</div>
            </div>
            {/*<div className='col-1'>*/}
            {/*  <BookSidebar books={returnedUsers.bookList}/>*/}
            {/*</div>*/}
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