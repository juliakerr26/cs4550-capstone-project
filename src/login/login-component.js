import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { loginThunk } from "../services/users-thunk";
function LoginScreen() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.users);
  if (currentUser) {
    navigate("/profile");
  }
  const login = async () => {
    console.log('clicked');
    const ret = await dispatch(loginThunk(user));
    if (ret.type === 'users/login/rejected') {

    } else {
      navigate("/profile");
    }
  };
  return (
      <div className='bg-light-green mt-4 p-3' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ textAlign: 'center' }}>Login</h1>
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
              className="form-control"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <p className="mb-3 link-primary" onClick={() => navigate('/create-profile')}>Create account.</p>
          <div style={{ textAlign: 'center' }}>
            <button onClick={login} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
  );
}

export default LoginScreen;