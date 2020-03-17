import React from 'react'
import Layout from "components/Layout";
import Test from 'pages/Test'

import { TransitionGroup, CSSTransition } from "react-transition-group";
import { HashRouter, Switch, Route } from "react-router-dom";

const HashRouterWrapper = () => {
  return (
    <HashRouter>
      <Route
        render={({ location }) => (
          <Switch location={location}>
            <Layout>
              <TransitionGroup>
                <CSSTransition
                  key={location.pathname}
                  timeout={{ enter: 300, exit: 100 }}
                  classNames="fade"
                >
                  <section className="route-section">
                    <Switch location={location}>
                      <Route path="/" exact>
                        <Test></Test>
                      </Route>

                    </Switch>
                  </section>
                </CSSTransition>
              </TransitionGroup>
            </Layout>
          </Switch>
        )}
      />
    </HashRouter>
  )
}
export default HashRouterWrapper