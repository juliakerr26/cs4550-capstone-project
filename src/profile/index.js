import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../services/users-thunk";
import React from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.users);
  const handleLogout = async () => await dispatch(logoutThunk());
  console.log(currentUser);
  return (
    <div>
      <h1>Profile</h1>
      <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
    </div>
  )
}

export default Profile;