import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";

const ProductsContainer = (props) => {
  //Search
  // console.log(window.location.search);

  const searchValue = props.searchValue;

  const [ wordToSearch, setWordToSearch ] = useState("")

  console.log(searchValue)

  const [productsData, setProductsData] = useState([]);
  
  
  useEffect((x) => {
    console.log(x)
    if (searchValue) {
      setWordToSearch(searchValue)
    }
    console.log(wordToSearch)

    const fetchLink = `http://localhost:4000/products?name=${wordToSearch}`

      fetch(fetchLink)
        .then((res) => res.json())
        .then((json) => {
          setProductsData(json);
        });
  }, []);

  return (
    <div>
      <div className="products-container">
        <div id="products-list" className="cards-grid">
          {productsData ? (
            productsData.map((product, index) => (
              <ProductCard value={product} key={index} />
            ))
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;
