import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/books-service';
import '../index.css';

import testingBook from '../data/books.json';

const BookDetails = () => {
  const testBook = testingBook[0].volumeInfo;
  const { id } = useParams();
  const [book, setBook] = useState({});
  const fetchBook = async () => {
    const bookObject = await getBookById(id);
    setBook(bookObject.volumeInfo);
  };
  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <div className="row pt-5 pb-5">
      {console.log(book)}
      <div className="col-4 text-center">
        <div className="bg-light-green rounded">
          <img src={testBook.imageLinks.medium} className="img-fluid p-3" />
        </div>
        <div className="d-none d-lg-block">
          <a className="btn btn-lg rounded-pill align-middle mt-3" href={testBook.infoLink}>
            Open in Google Books
          </a>
        </div>
        <div className="d-lg-none">
          <a className="btn rounded-pill align-middle mt-3" href={testBook.infoLink}>
            Open in Google Books
          </a>
        </div>
        <div className="txt-dark-green pt-4">
          <h5>
            {testBook.averageRating} <i className="fa fa-regular fa-star fa-sm"></i>
          </h5>
          <h5>{testBook.ratingsCount} Reviews</h5>
        </div>
      </div>
      <div className="col-8 txt-dark-green">
        <div>
        <i className="fa fa-solid fa-heart fa-lg float-end p-3" style={{color: "#ff2600"}}></i>
        <h1>{testBook.title}</h1>
        </div>
        <h3>{testBook.subtitle}</h3>

        <div>
          <h6 className="d-inline-block">By:</h6>
          <h6 className="d-inline-block p-1 txt-gray-green">{testBook.authors.join(', ')}</h6>
        </div>

        <div>
          <div className="d-inline-block">
            <h6 className="d-inline-block">Publisher:</h6>
            <h6 className="d-inline-block p-1 txt-gray-green">{testBook.publisher}</h6>
          </div>
          <div className="d-inline-block">
            <h6 className="d-inline-block">Publish Date:</h6>
            <h6 className="d-inline-block p-1 txt-gray-green">{testBook.publishedDate}</h6>
          </div>
        </div>

        <div dangerouslySetInnerHTML={{__html: testBook.description}}/>
      </div>
    </div>
  );
};

export default BookDetails;
