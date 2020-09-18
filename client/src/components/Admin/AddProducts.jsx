import React, { useState } from "react";

const AddProducts = (props) => {
 
  const [inputs, setInputs] = useState({
    product_name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

   const { product_name, category, price, image, description } = inputs; 

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addNewProduct = async (e) => {
    e.preventDefault();
    const body = { product_name, category, price, image, description };
    
    try {
      const response = await fetch("http://localhost:4000/admin/products/add", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response)
    } catch (error) {
      console.error(error);
    }
    props.refresh(true);
  };

  return (
    <div className="contenedor-add">
      <div className="titles">
        <h1>ADD PRODUCTS</h1>
      </div>
      <div className="container-form">
        <form onSubmit={addNewProduct}>
          <div className="form-row">
            <div className="col">
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
              <input
                type="text"
                placeholder="Category"
                name="category"
                value={category}
                onChange={(e) => onChange(e)}
              ></input>
            </div>
            <div className="col">
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
              <input
                type="text"
                placeholder="image URL"
                name="image"
                required
                value={image}
                onChange={(e) => onChange(e)}
              ></input>
              <p>Image Preview</p>
              <img src={image} className="img-preview" alt={image}></img>
            </div>
            <div className="col">
              <input
                type="text"
                placeholder="Description"
                name="description"
                required
                value={description}
                onChange={(e) => onChange(e)}
              ></input>
            </div>
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
