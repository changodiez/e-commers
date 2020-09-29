import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CustomerOrdersList = () => {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();

  console.log(id)

  const getOrders = async () =>{
    const fetchLink = `/admin/customers/orders/${id}`;

    fetch(fetchLink)
      .then ((res) => res.json())
      .then((json) => {
        setOrders(json);
      });
  }

  useEffect(() => {
    getOrders()
  }, []);

  console.log(orders)

  return (
    <div className="all-products-container basic-container">
      <div className="titles">
  <h1>ORDER OF THE CUSTOMER ID:{id}</h1>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>STATUS</th>
              <th>OPEN DATE</th>
              <th>CLOSE DATA</th>              
            </tr>
          </thead>
          <tbody>
            {orders.map((order)=> <tr>
      <th>{order.id}</th>
      <th>{!order.status ? "OPEN" : "CLOSED"}</th>
      <th>{order.open_date}</th>
      <th>{order.close_date || "---"}</th>
    </tr>)}
    
    </tbody>
    </table>
    </div>
  );
};

export default CustomerOrdersList;
