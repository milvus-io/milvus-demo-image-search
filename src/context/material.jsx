import React, { useState, useEffect, useReducer, useContext } from 'react'
import { Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const materialContext = React.createContext({
  openSnackBar: (message, type = "success", duration, position = { vertical: "top", horizontal: "center" }) => { },
})

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

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
const TestDialog = {
  open: true,
  title: "Test Dialog",
  component: <div onClick={() => console.log('xixiixiixiix')}><p>wahhhhhh</p><p>this is test dialog </p></div>,
  confirm: {
    label: '确定',
    onConfirm: () => { console.log('dialog confirm') },
  },
  cancle: {
    label: '取消',
    onCancel: () => { console.log('dialog cancle') }
  }
}
const { Provider } = materialContext

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
  const [dialog, setDialog] = useState(TestDialog);

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
  const { open, title, component, confirm = {}, cancle = {} } = dialog;
  const _confirmDialog = () => {
    if (confirm.onConfirm) {
      confirm.onConfirm();
    }
    setDialog(HiddenDialog)
  }
  const _cancelDialog = () => {
    if (cancle.onCancel) {
      cancle.onCancel();
    }
    setDialog(HiddenDialog)
  }

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
      <Dialog classes={{ paper: classes.paper }} open={open} onClose={() => { }}>
        <DialogTitle >{title}</DialogTitle>
        <DialogContent>
          {component}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _confirmDialog()} color="primary">
            {confirm.label}
          </Button>
          <Button onClick={() => _cancelDialog()} color="primary">
            {cancle.label}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  </Provider>
}
