import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RootProvider from "./context/Root";
import Home from "./pages/Home";
import "./App.css";

import "gestalt/dist/gestalt.css";

function App() {
  return (
    <RootProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </RootProvider>
  );
}

export default App;
