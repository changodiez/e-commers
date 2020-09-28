import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CustomerOrdersList = () => {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchLink = `/admin/customers/orders/${id}`;

    fetch(fetchLink)
      .then((res) => res.json())
      .then((json) => {
        setOrders(json);
      });
  }, []);

  return (
    <tr>
      <th>{orders.id}</th>
      <th>{orders.open ? "Abierta" : "Cerrada"}</th>
      <th>{orders.open_date}</th>
      <th>{orders.close_date}</th>
    </tr>
  );
};

export default CustomerOrdersList;
