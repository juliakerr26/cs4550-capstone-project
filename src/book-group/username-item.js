import React from 'react';

const UsernameItem = ({ user, added }) => {
  return (
    <li className="list-group-item">
      {!added ? (
        <button className="btn float-end justify-content-center">Add</button>
      ) : (
        <button className="btn float-end justify-content-center">Remove</button>
      )}
      <b>
        {user.firstName} {user.lastName}
      </b>
      <p className="fw-light fst-italic">{user.username}</p>
    </li>
  );
};

export default UsernameItem;
