import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import { rootContext } from './context/Root'
import Layout from "components/layout/new-layout";
import TablePage from "pages/table";
import PartitionPage from "pages/partition";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
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

const HiddenDialog = {
  open: false,
  title: "",
  component: <></>,
  confirm: {
    label: '',
    onConfirm: () => { },
  },
  cancle: {
    label: '',
    onCancel: () => { }
  }
}

const HashRouterWrapper = () => {
  const classes = makeStyles({
    paper: {
      minWidth: '300px'
    }
  })()
  const { dialog, setDialog } = useContext(rootContext)
  const { open, title, component, confirm = {}, cancle = {} } = dialog;
  const _onConfirmClick = () => {
    if (confirm.onConfirm) {
      confirm.onConfirm();
    }
    setDialog(HiddenDialog)
  }
  const _onCancelClick = () => {
    if (cancle.onCancel) {
      cancle.onCancel();
    }
    setDialog(HiddenDialog)
  }

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
                        <Route path="/data/table" exact>
                          <TablePage></TablePage>
                        </Route>
                        <Route path="/data/partition">
                          <PartitionPage></PartitionPage>
                        </Route>
                        <Route path="/data/table/:tableName/partitions">
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
                <Dialog classes={{ paper: classes.paper }} open={open} onClose={() => { }}>
                  <DialogTitle >{title}</DialogTitle>
                  <DialogContent>
                    {component}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => _onConfirmClick()} color="primary">
                      {confirm.label}
                    </Button>
                    <Button onClick={() => _onCancelClick()} color="primary">
                      {cancle.label}
                    </Button>
                  </DialogActions>
                </Dialog>
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