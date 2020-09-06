import React from "react";

const SearchBar = (props) => {

  const isOpen = props.isOpen


  return (
    <div className={isOpen ? "search-bar-open" :  "search-bar-closed"}>
    <div className="search-bar">
      <div className={isOpen ? "container-open" :  "container-closed"} >
        <p>What are you looking for?</p>
        <div>  
          <input 
          type="text" 
          placeholder="Search.."
          autoFocus={true}
          value={props.inputValue}
          onChange={props.filterOnChange}
          ></input>
        <button onClick={props.filterOnClick}className="search-button">Search</button></div>
      
      </div>
    </div></div>
  );
};

export default SearchBar;
