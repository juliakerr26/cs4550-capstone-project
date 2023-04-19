import React, { useState, useEffect } from 'react';
import * as service from "../services/books-thunks";
import {useParams, useNavigate} from "react-router-dom";
import BookPreview from "../shared/book-preview";
import books from "../data/books.json"
const Search = () => {
    const { query } = useParams();
    const navigate = useNavigate();
    const [queryTerm, setQuery] = useState(query);
    // an example w dummy data, except it doesn't seem to work if the array is empty
    const [results, setResults] = useState(books);
    // const [results, setResults] = useState([]);
    const searchForBooks = async () => {
        console.log(results);
        const searchResults = await service.getBooksBySearchThunk(queryTerm);
        setResults(searchResults);
        // i forgot what to send this to
        navigate();
    }
    useEffect(() => {
       if (query){
           setQuery(query);
           searchForBooks();
       }
    }, [queryTerm]);
    return (
        <>
            <div className="input-group p-2">
                <div className="col-8 align-self-center position-relative">
                    <input type="search" id="search-bar" className="form-control"
                           placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)}/>
                </div>
                {/* onclick return search results*/}
                <button type="button" className="btn bg-dark-green p-2" onClick={searchForBooks}>
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <div>
                {
                    results.map((result) => (
                        <BookPreview bookParam={result}/>
                    ))
                }
            {/*    here render the results we have so far, if any. if we don't have any
            bc we're waiting or whatever, show a loading screen. if results is empty, show no results*/}
            </div>
        </>
    )
}

export default Search;