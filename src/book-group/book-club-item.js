import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteBookClubThunk } from '../services/book-club-thunk';

const BookClubItem = ({ club, isAdmin = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteClubHandler = id => {
    dispatch(deleteBookClubThunk(id));
  };
  const updateClubHandler = id => {
    navigate(`/book-clubs/edit/${id}`);
  }

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
            Reading List: {club.bookList.length}
          </div>
        </div>
        {isAdmin && (
          <div className="col-2">
            <i
              className="fa fa-solid fa-trash fa-2xl float-end p-4"
              onClick={() => deleteClubHandler(club._id)}
              style={{ color: '#e32400' }}
            ></i>
            <i className="fa fa-solid fa-pen fa-2xl float-end pt-4" onClick={() => updateClubHandler(club._id)} style={{ color: '#264653' }}></i>
          </div>
        )}
      </div>
    </li>
  );
};

export default BookClubItem;
