import React, { useEffect, useState } from "react";
import Loader from "./Button/Loader";
import ProductCard from "./ProductCard";

const ProductsContainer = (props) => {
  //Search

  const searchValue = props.searchValue;

  const [productsData, setProductsData] = useState([]);
  
  useEffect(() => {

      const fetchLink = `/products?name=${searchValue}`

      fetch(fetchLink)
        .then((res) => res.json())
        
        .then((json) => {
          setProductsData(json);
        });
  }, [searchValue]);


  return (
    <div>
      <div className="products-container basic-container">
        <div id="products-list" className="cards-grid">
        {(() => {
        if (productsData.length === 0 && searchValue.length === 0) {
          return (
            <Loader/>
          )
        } else if (productsData.length === 0 && searchValue.length > 0) {
          return (
            <div className="nothing-here">
            <p>No exact matches found for {searchValue} try again</p>
            </div>
            
          )
        } else {
          return (
            productsData.map((product, index) => (
              <ProductCard value={product} key={index} />
            ))
          )
        }
      })()}
         
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;
