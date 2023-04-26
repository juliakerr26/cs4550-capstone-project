import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  findUserByUsernameThunk,
  loginThunk,
  updateUserThunk
} from "../services/users-thunk";
import { findUserById } from '../services/users-service';

function EditProfile() {
  const {currentUser} = useSelector(state => state.users);
  const originalUsername = currentUser.username;
  const [user, setUser] = useState(currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstNameAlert, setFirstNameAlert] = useState(false);
  const [lastNameAlert, setLastNameAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [usernameAlert, setUsernameAlert] = useState(false);
  const [usernameUniqueAlert, setUsernameUniqueAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    if (currentUser) {
      getCurrentUserObj();
    }
  }, []);

  const getCurrentUserObj = async () => {
    const updatedUser = await findUserById(currentUser._id);
    setUser(updatedUser);
  };

  const edit = async () => {
    const exists = (await dispatch(findUserByUsernameThunk(user.username))).payload && user.username !== originalUsername;
    if (!(user.username.length < 3 || user.password.length < 3 || user.firstName.length < 2 || user.lastName.length < 2 || user.email.length < 3 || exists)) {
      await dispatch(updateUserThunk(user));
      await dispatch(loginThunk(user));
      navigate("/profile");
    } else {
      setUsernameUniqueAlert(exists);
      setFirstNameAlert(user.firstName.length < 2);
      setLastNameAlert(user.lastName.length < 2);
      setEmailAlert(user.email.length < 3);
      setUsernameAlert(user.username.length < 3);
      setPasswordAlert(user.password.length < 3);
    }
  };
  return (
      <div className='bg-light-green mt-4 mb-4 p-3' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ textAlign: 'center' }}>Edit Profile</h1>
        {usernameAlert && (
            <div className="alert alert-danger" role="alert">
              Username must be at least 3 characters!
            </div>
        )}
        {usernameUniqueAlert && (
            <div className="alert alert-danger" role="alert">
              Username is taken!
            </div>
        )}
        {passwordAlert && (
            <div className="alert alert-danger" role="alert">
              Password must be at least 3 characters!
            </div>
        )}
        {firstNameAlert && (
            <div className="alert alert-danger" role="alert">
              First name must be at least 2 characters!
            </div>
        )}
        {lastNameAlert && (
            <div className="alert alert-danger" role="alert">
              Last name must be at least 2 characters!
            </div>
        )}
        {emailAlert && (
            <div className="alert alert-danger" role="alert">
              Email must be at least 3 characters!
            </div>
        )}
        <div className="form-group">
          <label>Username</label>
          <input
              type="text"
              className="form-control mb-3"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <label>Password</label>
          <input
              type="password"
              className="form-control mb-3"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <label>First Name</label>
          <input
              type="text"
              className="form-control mb-3"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
          <label>Last Name</label>
          <input
              type="text"
              className="form-control mb-3"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
          <label>Email</label>
          <input
              type="text"
              className="form-control mb-3"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <br/>
          <div style={{ textAlign: 'center' }}>
            <button onClick={edit} className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </div>
  );
}

export default EditProfile;