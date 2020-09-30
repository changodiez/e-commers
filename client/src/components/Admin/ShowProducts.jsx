import React from "react";
import { Link } from "react-router-dom";

const ShowProducts = (props) => {
  const data = props.data;

  //DELETE FUNCTION

  const deleteProduct = async (id) => {
    if (data.product_name) {
      let respuesta = window.confirm(
        `Are you sure you wanna delete the product ${data.product_name}? `
      );
      if (respuesta) {
        try {
          await fetch(`/admin/products/${id}`, {
            method: "DELETE",
          });

          //We can do something visual with the answer
        } catch (error) {
          console.error(error);
        }
        props.refresh(Math.random());
      }
    } else {
      let respuesta = window.confirm(
        `Are you sure you wanna delete the customer ${data.first_name}? `
      );
      if (respuesta) {
        try {
          await fetch(`/admin/customers/${id}`, {
            method: "DELETE",
          });

        } catch (error) {
          console.error(error);
        }
        props.refresh(Math.random());
      }
    }
  };

  return (
    <tr>
      <th>{data.id}</th>
      <th>{data.product_name || data.first_name} </th>
      <th>{data.category || data.last_name || "undefined"}</th>
      <th>{data.unit_price || data.email}</th>
      <th>
        {(data.image ? (
          <img src={`${data.image}`} alt="" />
        ) : (
          data.address +
          " " +
          data.city +
          " " +
          data.postcode +
          " " +
          data.country
        )) || "undefined"}
      </th>
      <th>
        {data.description ? data.description : data.mobile || "undefined"}
      </th>
      {data.first_name ? null : (
        <th>
          <Link to={`/owner/product/${data.id}`}>
            <button className="button-update">UPDATE</button>
          </Link>
        </th>
      )}

      <th>
        <button
          onClick={() => deleteProduct(data.id)}
          className="button-delete"
        >
          DELETE
        </button>
      </th>
      {data.first_name ? (
        <th>
          <Link to={`/owner/customers/orders/${data.id}`}>
            <button>ORDERS</button>
          </Link>
        </th>
      ) : null}
    </tr>
  );
};

export default ShowProducts;
