import React, {useState} from "react";

const SearchBar = (props) => {

  const isOpen = props.isOpen
  const wordToSearch = props.searchValue


  const [inputValue, setInputValue] = useState ("")

  const searchOnClick = (e) => {
    wordToSearch(inputValue)
    setInputValue("")
  }

  


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
          value={inputValue}
          onChange={e => setInputValue(e.target.value) }
          ></input>
        <button type="submit" onClick={searchOnClick}className="search-button">Search</button></div>
      
      </div>
    </div></div>
  );
};

export default SearchBar;
