import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  //GET PRODUCT DATA

  const [refresh, setRefresh] = useState("");
  const [productData, setProductData] = useState([]);

  let id = useParams().id;

  const getProductData = async () => {
    fetch(`/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setProductData(json[0]);
      });
  };

  const [inputs, setInputs] = useState({
    product_name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

  const setData = () => {
    setInputs({
      product_name: productData.product_name,
      category: productData.category,
      price: productData.unit_price,
      image: productData.image,
      description: productData.description,
    });
  };

  const { product_name, category, price, image, description } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const UpdateProduct = async (e) => {
    const body = { product_name, category, price, image, description, id };

    try {
      await fetch(`/admin/products/update`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
    setRefresh(!refresh);
  };

  useEffect(() => {
    getProductData();
  }, [refresh]);

  useEffect(() => {
    setData();
  }, [productData]);

  return (
    <Fragment>
      <div className="navbar-space"></div>
      <div className="basic-container">
        <div className="titles">
          <h1>UPDATE PRODUCTS</h1>
        </div>
        <div className="container-form-update">
        <div className="img-preveiw-container">
                {image ? (
                  <img src={image} className="img-preview" alt={image}></img>
                ) : (
                  <p>Image Preview</p>
                )}
              </div>
              <div className="data-colum">
          <form onSubmit={UpdateProduct}>
            <div className="form-row-update">            
              
              <div className="col">
                  <p>Product Name:</p>
                <input
                  type="text"
                  placeholder="Product Name.."
                  name="product_name"
                  required
                  value={product_name}
                  onChange={(e) => onChange(e)}
                ></input>
              </div>
              <div className="col">
              <p>Category:</p>
                <input
                  type="text"
                  placeholder="Category"
                  name="category"
                  value={category}
                  onChange={(e) => onChange(e)}
                ></input>
              </div>
              <div className="col">
              <p>Price:</p>
                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  required
                  value={price}
                  onChange={(e) => onChange(e)}
                ></input>
              </div>
              <div className="col">
              <p>URL IMAGE:</p>
                <input
                  type="text"
                  placeholder="image URL"
                  name="image"
                  required
                  value={image}
                  onChange={(e) => onChange(e)}
                ></input>
              </div>
              <div className="col">
              <p>Description:</p>
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={(e) => onChange(e)}
                ></input>
              </div>
              </div>
            
            <button type="submit">UPDATE</button>
          </form></div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
