import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import User from "./components/User";
import Admin from "./components/Admin/Admin";

function App() {
   return (
    <Router>
      <Switch>
        <Route path="/" exact={true} render={() => <User />} />
        <Route path="/admin" exact={true} render={() => <Admin />} />
      </Switch>
    </Router>
  );
}

export default App;
