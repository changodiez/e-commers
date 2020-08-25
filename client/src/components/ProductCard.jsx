import React from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {

  const product = props.value

  return (
    <Link to={'/product/'+ product.id}>
    <div className="card">      
      <img className="card-img" src={product.image} alt="Product" />
      <div className="card-body ">
        <h5 className="card-title">{product.title}</h5>
        <h5 className="card-title">{product.price} €</h5>
        <h5 id="view-item">VIEW ITEM</h5>
        {/* <button className="search-button" onClick={console.log("To define")}>Add to cart</button> */}
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;
