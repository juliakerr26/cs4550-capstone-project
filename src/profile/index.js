import React from "react";
import ProfileComponent from "./profile-component";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";

const Profile = () => {
  const { username } = useParams();
  const { currentUser } = useSelector(state => state.users);
  const navigate = useNavigate();
  let us;
  let canEdit;
  let loggedIn;
  if (username) {
    us = username;
    loggedIn = currentUser;
    canEdit = currentUser && currentUser.username === us;
  } else {
    if (!currentUser) {
      navigate('/login');
    } else {
      loggedIn = true;
      us = currentUser.username;
      canEdit = true;
    }
  }
  return (
    <div>
      <ProfileComponent username={us} canEdit={canEdit} loggedIn={loggedIn}/>
    </div>
  )
}

export default Profile;