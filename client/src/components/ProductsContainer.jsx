import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";

const ProductsContainer = (props) => {
  //Search
  console.log(window.location.search);

  const searchValue = props.searchValue;

  // console.log(searchValue)
  const [value, setValue] = useState("");

  const [productsData, setProductsData] = useState([]);
  let fetchLink;
  setValue (searchValue)
  
  useEffect(() => {
    searchValue ? setValue(searchValue) : setValue("")
    if ( value === "") {fetchLink = "http://localhost:4000/products"} else {fetchLink = `http://localhost:4000/products?name=${value}`}
    
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
