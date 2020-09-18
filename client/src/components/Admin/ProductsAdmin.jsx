import React, { Fragment, useEffect, useState } from "react";

import AddProducts from "./AddProducts";
import ShowProducts from "./ShowProducts";

const ProductsAdmin = () => {

  
    const  [ refres, setRefres ] = useState (false)

  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchLink = `http://localhost:4000/admin/products`;

    fetch(fetchLink)
      .then((res) => res.json())
      .then((json) => {
        setProductsData(json);
      });
      setRefres(false)
  }, [refres]);

  return (
    <Fragment>
      <AddProducts data={productsData[0]} refresh={setRefres} />)

<div className="all-products-container">
    <div className="titles">
      <h1 >ALL YOUR PRODUCTS</h1></div>
      <table className="table">
        <thead>
          <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Image</th>
          <th>Description</th>
          <th>UPDATE</th>
          <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
        {productsData ? productsData.map((product, index) => <ShowProducts data={product} index={index} refresh={setRefres}   /> ): null}
        </tbody>
      </table>
      </div>
      
    </Fragment>
  );
};

export default ProductsAdmin;
