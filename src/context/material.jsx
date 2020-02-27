import React, { useState } from 'react'
import { Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { DialogActions, DialogContent, DialogTitle, Button, Dialog } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import MuiAlert from '@material-ui/lab/Alert';

import CreateCollection from '../components/dialogs/CreateCollection'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const materialContext = React.createContext({
  openSnackBar: (message, type = "success", duration, position = { vertical: "top", horizontal: "center" }) => { },
})

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const HiddenDialog = {
  open: false,
  type: 'notice',
  title: "",
  component: <></>,
  confirm: () => { },
  cancel: () => { }
}
const TestDialog = {
  open: false,
  type: 'notice', // notice | custom
  title: "Test Dialog",
  Component: <div onClick={() => console.log('xixiixiixiix')}><p>wahhhhhh</p><p>this is test dialog </p></div>,
  confirmLabel: '确定',
  confirm: () => { console.log('dialog confirm') },
  cancelLabel: '取消',
  cancel: () => { console.log('dialog cancel') },
}
const TestCustomDialog = {
  open: true,
  type: 'custom',
  params: {
    Component: CreateCollection
  },
}
const { Provider } = materialContext
// Dialog has two type : notice | custom;
// notice type mean it's a notice dialog you need to set props like title, content, actions 
// custom type could have own state, you could set a complete component in dialog.
export const MaterialProvider = ({ children }) => {
  const classes = makeStyles({
    paper: {
      minWidth: '300px'
    }
  })()
  const [snackBar, setSnackBar] = useState({
    vertical: "top",
    horizontal: "center",
    open: false,
    message: "",
    type: "success"
  })
  const [dialog, setDialog] = useState(TestCustomDialog);

  const handleClose = (e, reason) => {
    // only click x to close or auto hide.
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar(v => ({ ...v, open: false }))
  };
  const openSnackBar = (message, type = "success", duration = 2000, position = { vertical: "top", horizontal: "center" }) => {
    setSnackBar({
      open: true,
      message,
      type,
      duration,
      ...position
    })
  }
  const { open, type, params = {} } = dialog;
  const { Component } = params
  const { title, confirm, confirmLabel = "", cancel, cancelLabel = "" } = params; // for notice type
  const { props = {} } = params; // for custom type
  const _confirmDialog = async () => {
    if (confirm) {
      await confirm()
    }
    hideDialog()
  }
  const _cancelDialog = async () => {
    if (cancel) {
      await cancel()
    }
    hideDialog()
  }
  const hideDialog = () => setDialog(HiddenDialog)

  return <Provider value={{
    openSnackBar,
    dialog, setDialog,
  }}>
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={{ vertical: snackBar.vertical, horizontal: snackBar.horizontal }}
        key={`${snackBar.vertical}${snackBar.horizontal}`}
        open={snackBar.open}
        onClose={handleClose}
        autoHideDuration={snackBar.duration}
      >
        <Alert onClose={handleClose} severity={snackBar.type}>
          {snackBar.message}
        </Alert>
      </Snackbar>
      {children}
      <Dialog classes={{ paper: classes.paper }} open={open} onClose={() => setDialog(HiddenDialog)}>
        {type === 'notice'
          ? (<>
            <DialogTitle >{title}</DialogTitle>
            <DialogContent><Component /></DialogContent>
            <DialogActions>
              <Button onClick={() => _confirmDialog()} color="primary">
                {confirmLabel}
              </Button>
              <Button onClick={() => _cancelDialog()} color="primary">
                {cancelLabel}
              </Button>
            </DialogActions>
          </>)
          : <Component {...props} hideDialog={hideDialog} />
        }

      </Dialog>
    </ThemeProvider>
  </Provider>
}
