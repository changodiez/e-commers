import React from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {

  const product = props.value

  return (
    <Link to={'/products/'+ product.id}>
    <div className="card">      
      <img className="card-img" src={product.image} alt="Product" />
      <div className="card-body ">
        <h5 className="card-title">{product.product_name}</h5>
        <h5 className="card-title">{product.unit_price} €</h5>
        <h5 id="view-item">VIEW ITEM</h5>
       
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;
