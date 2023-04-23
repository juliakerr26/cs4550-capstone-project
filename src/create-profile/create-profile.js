import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { registerThunk} from "../services/users-thunk";
import {register} from "../services/users-service";
function CreateProfile() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    isAdmin: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.users);
  if (currentUser) {
    navigate("/profile");
  }
  const register = async () => {
    await dispatch(registerThunk(user));
    navigate("/profile");
  };
  return (
      <div>
        <h1>Register</h1>
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
          <label className='me-2'>Register as an Admin</label>
          <input
              type="checkbox"
              className="mb-3"
              checked={user.isAdmin}
              onChange={(e) => setUser({ ...user, isAdmin: !user.isAdmin })}
          />
          <br/>
          <button onClick={register} className="btn btn-primary">
            Register
          </button>
        </div>
      </div>
  );
}

export default CreateProfile;