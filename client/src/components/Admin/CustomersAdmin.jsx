import React, { Fragment, useEffect, useState } from "react";

import ShowProducts from "./ShowProducts";

const CustomersAdmin = () => {
  const [refres, setRefres] = useState(Math.random());

  const [customersData, setCustomersData] = useState([]);

  useEffect(() => {
    const fetchLink = `/admin/customers`;

    fetch(fetchLink)
      .then((res) => res.json())
      .then((json) => {
        setCustomersData(json);
      });
    
  }, [refres]);

  return (
      <Fragment>
      <div className="all-products-container basic-container">
        <div className="titles">
          <h1>ALL YOUR CUSTOMERS</h1>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>PHONE</th>             
              <th>DELETE</th>
              <th>ORDERS</th>
            </tr>
          </thead>
          <tbody>
            {customersData
              ? customersData.map((product, index) => (
                  <ShowProducts
                    data={product}
                    index={index}
                    refresh={setRefres}
                  />
                ))
              : null}
          </tbody>
        </table>
      </div>
      </Fragment>
  );
};

export default CustomersAdmin;