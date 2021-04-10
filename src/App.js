import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./Parts/Nav";
import Main from "./Parts/Main";
import Resource from "./Parts/Resource";

import "gestalt/dist/gestalt.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/s/:id">
            <Nav />
            <Main />
          </Route>
          <Route path="/i/:id">
            <Nav />
            <Resource />
          </Route>
          <Route path="/">
            <Nav />
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
