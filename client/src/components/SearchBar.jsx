import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = (props) => {
  const isOpen = props.isOpen;
  const wordToSearch = props.searchValue;

  const [inputValue, setInputValue] = useState("");

  const searchOnClick = () => {
    wordToSearch(inputValue);
    setInputValue("");
  };

  
  return (
    <div className={isOpen ? "search-bar-open" : "search-bar-closed"}>
      
      <div className="search-bar">
        <div className={isOpen ? "container-open" : "container-closed"}>
          <p style={{color:"white"}}>What are you looking for?</p>
          
            <input
              id="inputSearch"
              type="text"
              placeholder="Search.."
              autoFocus={true}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
            <Link to={`/products`}>
              <button
                type="submit"
                onClick={searchOnClick}
                className="search-button"
              >
                Search
              </button>
            </Link>
          
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
