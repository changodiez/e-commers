import React, { Fragment } from "react";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import NavBar from "./Navbar";
import ProductsAdmin from "./ProductsAdmin";
import "./Admin.css";
import UpdateProduct from "./UpdateProducts";

const Admin = () => {
  return (
    <Fragment>
      <NavBar />
      <Switch>
      <ProductsAdmin />
      <UpdateProduct/>
      </Switch>
  </Fragment>
  );
};

export default Admin;
