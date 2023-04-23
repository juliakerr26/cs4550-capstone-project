import React from "react";
import ProfileComponent from "./profile-component";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";

const Profile = () => {
  const { username } = useParams();
  const {currentUser} = useSelector(state => state.users);
  const navigate = useNavigate();
  let us;
  let canEdit;
  if (username) {
    us = username;
    canEdit = false;
  } else {
    if (!currentUser) {
      navigate('/login');
    } else {
      us = currentUser.username;
      canEdit = true;
    }
  }
  return (
    <div>
      <ProfileComponent username={us} canEdit={canEdit}/>
    </div>
  )
}

export default Profile;