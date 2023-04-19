import React, { useState, useEffect } from 'react';
import * as service from "../services/books-thunks";
import {useParams, useNavigate} from "react-router-dom";
import BookPreview from "../shared/book-preview";
const Search = () => {
    const { query } = useParams();
    const navigate = useNavigate();
    const [queryTerm, setQuery] = useState(query);
    const [results, setResults] = useState([]);
    const searchForBooks = async () => {
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
            <div className="input-group">
                <div className="form-outline">
                    <input type="search" id="search-bar" className="form-control"
                           placeholder="Search" value={query}/>
                </div>
                {/* onclick return search results*/}
                <button type="button" className="btn bg-dark-green" onClick={}>
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <div>
                {
                    results.map((result) => (
                        <BookPreview bookParam = {result}/>
                    ))
                }
            {/*    here render the results we have so far, if any. if we don't have any
            bc we're waiting or whatever, show a loading screen. if results is empty, show no results*/}
            </div>
        </>
    )
}

export default Search;