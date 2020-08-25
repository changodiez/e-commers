import React from "react";

const ProductCard = (props) => {
  return (
    <div
      className="card text-center p-3 overflow-auto h-50 mh-50"
      style={{ overflowY: "scroll" }}
    >
      <img className="card-img-top" src={props.value.image} alt="Product" />
      <div className="card-body ">
        <h5 className="card-title">{props.value.title}</h5>
        <p className="card-text">{props.value.description}</p>
        <button onClick={console.log("To define")} className="btn btn-primary">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
