import React from "react";
import { Link } from "react-router-dom";

const ShowProducts = (props) => {
  const data = props.data;

  //DELETE FUNCTION

  const deleteProduct = async (id) => {
    let respuesta = window.confirm(
      `Are you sure you wanna delete the product ${data.product_name}?? `
    );
    if (respuesta) {
      try {
        const response = await fetch(
          `/admin/products/${id}`,
          {
            method: "DELETE",
          }
        );
        const res = await response.json();

      } catch (error) {
        console.error(error);
      }
      props.refresh(Math.random());
    }
  };

  return (
    <tr>
      <th>{data.id}</th>
      <th>{data.product_name || data.first_name} </th>
      <th>{data.category || data.last_name || "undefined"}</th>
      <th>{data.unit_price || data.email }</th>
      <th>
        {<img src={`${data.image}`} alt="" /> || data.address + data.city + data.postcode + data.country}
      </th>
      <th>{data.description || data.movile || "undefined"}</th>

      <th>
        <Link to={`/admin/products/update/${data.id}`}>
          <button className="button-update">UPDATE</button>
        </Link>
      </th>
      <th>
        <button
          onClick={() => deleteProduct(data.id)}
          className="button-delete"
        >
          DELETE
        </button>
      </th>
    </tr>
  );
};

export default ShowProducts;
