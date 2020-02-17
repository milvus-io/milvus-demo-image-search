import React from 'react'
import Layout from "components/layout";
import Login from "pages/Login";
import TablePage from "pages/table";
import AdvancedPage from "pages/advanced";
import HardwarePage from "pages/hardware";
import VectorSearch from "pages/vector-search";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { HashRouter, Switch, Route } from "react-router-dom";
const HashRouterWrapper = () => {
  return (
    <HashRouter>
      <Route
        render={({ location }) => (
          <Switch location={location}>
            <Route path="/manage">
              <Layout>
                <TransitionGroup>
                  <CSSTransition
                    key={location.pathname}
                    timeout={{ enter: 300, exit: 100 }}
                    classNames="fade"
                  >
                    <section className="route-section">
                      <Switch location={location}>
                        <Route path="/manage/table">
                          <TablePage></TablePage>
                        </Route>
                        <Route path="/manage/advanced">
                          <AdvancedPage></AdvancedPage>
                        </Route>
                        <Route path="/manage/hardware">
                          <HardwarePage></HardwarePage>
                        </Route>
                        <Route path="/manage/vector">
                          <VectorSearch></VectorSearch>
                        </Route>
                      </Switch>
                    </section>
                  </CSSTransition>
                </TransitionGroup>
              </Layout>
            </Route>
            <Route path="/">
              <Login></Login>
            </Route>
          </Switch>
        )}
      />
    </HashRouter>
  )
}
export default HashRouterWrapper