import React from 'react'
import Layout from "components/layout";
import TablePage from "pages/table";
import PartitionPage from "pages/partition";

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
                        <Route path="/manage/table" exact>
                          <TablePage></TablePage>
                        </Route>
                        <Route path="/manage/partition">
                          <PartitionPage></PartitionPage>
                        </Route>
                        <Route path="/manage/table/:tableName/partitions">
                          <PartitionPage></PartitionPage>
                        </Route>
                        <Route path="/manage/network">
                          <NetworkPage></NetworkPage>
                        </Route>
                        <Route path="/manage/storage/path">
                          <StoragePath></StoragePath>
                        </Route>
                        <Route path="/manage/metrics">
                          <MetricsPage></MetricsPage>
                        </Route>
                        <Route path="/manage/advanced">
                          <AdvancedPage></AdvancedPage>
                        </Route>
                        <Route path="/manage/hardware">
                          <HardwarePage></HardwarePage>
                        </Route>
                        <Route path="/manage/others">
                          <OtherConfigsPage></OtherConfigsPage>
                        </Route>
                        <Route path="/manage/vector">
                          <VectorSearch></VectorSearch>
                        </Route>
                        <Route path="/manage/logs">
                          <IframeWrapper type="logs"></IframeWrapper>
                        </Route>
                        <Route path="/manage/pm">
                          <IframeWrapper type="mintors"></IframeWrapper>
                        </Route>
                      </Switch>
                    </section>
                  </CSSTransition>
                </TransitionGroup>
              </Layout>
            </Route>
            <Redirect from='/' to='/manage/network' />

            {/* <Route path="/">
              <Login></Login>
            </Route> */}
          </Switch>
        )}
      />
    </HashRouter>
  )
}
export default HashRouterWrapper