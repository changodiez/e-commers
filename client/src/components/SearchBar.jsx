import React from "react";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <div className="container">
        <p>What are you looking for?</p> <button>Close</button>
        <input type="text" placeholder="Search.."></input>
        <button>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
