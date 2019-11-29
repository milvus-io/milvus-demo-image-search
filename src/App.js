import React from "react";
import Login from "pages/Login";
import Install from "pages/Install";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/install">
            <Install />
          </Route>
          <Route path="/">
            <Login></Login>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
