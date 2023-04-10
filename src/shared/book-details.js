import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookById } from "../services/books-service";

import testingBook from "../data/books.json";

const BookDetails = () => {
  const testBook = testingBook[0]
  const { id } = useParams();
  const [book, setBook] = useState({});
  const fetchBook = async () => {
    const book = await getBookById(id);
    setBook(book);
    console.log(book);
  }
  useEffect(() => {
    fetchBook();
  }, []) ;

  return (
    <div>
      <h1>Book Details</h1>
      <img src={testBook.volumeInfo.imageLinks.small}/>
    </div>
  )
}

export default BookDetails;