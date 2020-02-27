import React from 'react'
import Layout from "components/layout/new-layout";
import Collections from "pages/collections";
import PartitionPage from "pages/partition";
import Login from 'pages/login/index'
import NetworkPage from "pages/network";
import MetricsPage from "pages/metrics";
import OtherConfigsPage from "pages/others";
import AdvancedPage from "pages/advanced";
import HardwarePage from "pages/hardware";
import StoragePath from "pages/storage-path";
import VectorSearch from "pages/vector-search";
import IframeWrapper from "pages/iframe-wrapper";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

const HashRouterWrapper = () => {
  return (
    <HashRouter>
      <Route
        render={({ location }) => (
          <Switch location={location}>
            <Route path="/">
              <Layout>
                <TransitionGroup>
                  <CSSTransition
                    key={location.pathname}
                    timeout={{ enter: 300, exit: 100 }}
                    classNames="fade"
                  >
                    <section className="route-section">
                      <Switch location={location}>
                        <Route path="/login" exact>
                          <Login></Login>
                        </Route>
                        <Route path="/data/collections" exact>
                          <Collections></Collections>
                        </Route>
                        <Route path="/data/collections/:collectionName" exact>
                          <PartitionPage></PartitionPage>
                        </Route>

                        <Route path="/data/collections/:collectionName/partitions/:partitionTag">
                          <PartitionPage></PartitionPage>
                        </Route>

                        <Route path="/data/vector">
                          <VectorSearch></VectorSearch>
                        </Route>
                        <Route path="/configs/storage">
                          <StoragePath></StoragePath>
                        </Route>
                        <Route path="/configs/metrics">
                          <MetricsPage></MetricsPage>
                        </Route>
                        <Route path="/configs/network">
                          <NetworkPage></NetworkPage>
                        </Route>
                        <Route path="/configs/advanced">
                          <AdvancedPage></AdvancedPage>
                        </Route>
                        <Route path="/configs/hardware">
                          <HardwarePage></HardwarePage>
                        </Route>
                        <Route path="/configs/others">
                          <OtherConfigsPage></OtherConfigsPage>
                        </Route>
                        <Route path="/configs/logs">
                          <IframeWrapper type="logs"></IframeWrapper>
                        </Route>
                        <Route path="/configs/pm">
                          <IframeWrapper type="mintors"></IframeWrapper>
                        </Route>
                      </Switch>
                    </section>
                  </CSSTransition>
                </TransitionGroup>
              </Layout>
            </Route>
            <Redirect from='/' to='/login' />
          </Switch>
        )}
      />
    </HashRouter>
  )
}
export default HashRouterWrapper