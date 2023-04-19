import React from 'react';
import { useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteBookClubThunk } from '../services/book-club-thunk';

const BookClubItem = (
  {
    club = {
      _id: 123,
      name: 'Book Club Name',
      admin: 'abc',
      members: [],
      bookList: [],
    },
  },
  isAdmin = true
) => {
  const dispatch = useDispatch();
  const deleteClubHandler = id => {
    dispatch(deleteBookClubThunk(id));
  };
  console.log(isAdmin);

  return (
    <li className="list-group-item bg-light-green m-1 p-2">
      <div className="row">
        <div className="col-10">
          <img width={70} className="float-start rounded me-2" src={`/images/book-stack.jpg`} />
          <div>
            <LinkContainer to={`/book-clubs/${club._id}`}>
              <div className="fw-bolder txt-dark-orange">{club.name}</div>
            </LinkContainer>
              Members: {club.members.length}
              <br />
              Books: {club.bookList.length}
          </div>
        </div>
        <div className="col-2">
          {isAdmin && (
            <i
              className="fa fa-solid fa-trash fa-2xl float-end p-4"
              onClick={() => deleteClubHandler(club._id)}
              style={{ color: '#e32400' }}
            ></i>
          )}
        </div>
      </div>
    </li>
  );
};

export default BookClubItem;
