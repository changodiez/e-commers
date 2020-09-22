import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import NavBar from "./Navbar";
import ProductsAdmin from "./ProductsAdmin";
import "./Admin.css";
import UpdateProduct from "./UpdateProducts";
import CustomersAdmin from "./CustomersAdmin";

const Admin = () => {
  
    return (
    <Fragment>
      
      <Route path="/owner" component={NavBar} />
      <Route path="/owner" exact render={() => <ProductsAdmin />} />
      <Route path="/owner/:id" exact render={() => <UpdateProduct />} />
      <Route path="/owner/costumers" exact={true} render={() => <CustomersAdmin/>} />
      <Route
        path="/owner/cosutmers/:id"
        exact
        render={() => <UpdateProduct />}
      />
    </Fragment>
  );
};

export default Admin;
