import React, {useState} from "react";

const SearchBar = (props) => {

  const isOpen = props.isOpen



  const [inputValue, setInputValue] = useState ("")

  const searchValue = props.searchValue

  const searchOnClick = () => {
searchValue(inputValue)
  }
//   const searchOnClick = async e => {
// e.preventDefault()
// try {
//   const response = await fetch(`http://localhost:4000/products?name=${inputValue}`)
  
//   const res = await response.json()

//   console.log(res)
// } catch (error) {
//   console.error(error.message)
// }
//   };

  


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
