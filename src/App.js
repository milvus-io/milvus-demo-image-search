import React from "react";
import Layout from "components/layout";
import Login from "pages/Login";
import TablePage from "pages/table";
import AdvancedPage from "pages/advanced";
import HardwarePage from "pages/hardware";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/manage">
            <Layout>
              <Route path="/manage/table">
                <TablePage></TablePage>
              </Route>
              <Route path="/manage/advanced">
                <AdvancedPage></AdvancedPage>
              </Route>
              <Route path="/manage/hardware">
                <HardwarePage></HardwarePage>
              </Route>
              <Route path="/manage/index">index</Route>
            </Layout>
          </Route>
          <Route path="/">
            <Login></Login>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
