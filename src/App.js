import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Nav from "./Parts/Nav";
import Main from "./Parts/Main";

import "gestalt/dist/gestalt.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />

        <Switch>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
