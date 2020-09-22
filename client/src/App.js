import React, { Fragment } from "react";
import {
  BrowserRouter,
  
  Route
} from "react-router-dom";
import "./App.css";

import User from "./components/User";
import Admin from "./components/Admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Route path="/" exact={true} render={() => <User />} />
        <Route path="/admin"  render={() => <Admin />} />
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
