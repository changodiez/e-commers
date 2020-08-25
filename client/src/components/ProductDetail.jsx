import React from "react";

const ProductDetail = (props) => {
  const data = props.Data ? props.Data : [];

  const product = data.find((e) => e.id == props.match.params.id);

  return (
    <div >
      {product ? (
        <div className="product-detail">
          <div className="img-container">
          <img className="detail-img" src={product.image} alt="Product" />
          </div>
          <div className="detail-body ">
            <h1 className="detail-title">{product.title}</h1>
            <h3 className="detail-description">{product.description} </h3>
            <h1 className="detail-price">{product.price} €</h1>
            <button
              className="detail-button"
              onClick={console.log("To define")}
            >
              Add to cart
            </button>
          </div>
        </div>
      ) : (
        <div>...Loading</div>
      )}
    </div>
  );
};

export default ProductDetail;
