import React, { Fragment } from "react";
import AddRows from "./AddRows";

const AddProducts = (props) => {
  const data = props.data;

  return (
    <div className="contenedor-add">
    <div className="titles">
      <h1 >ADD PRODUCTS</h1></div>
      <div className="container-form">
        <form>
          <div className="form-row">
          {data ? (
            Object.keys(data).slice(1).map((e, index) => (
              <AddRows valor={e} index={index} />
            ))
          ) : (
            <div>Loading</div>
          )}
</div>
          <button>Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
