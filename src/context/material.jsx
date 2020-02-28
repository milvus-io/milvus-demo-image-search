import React, { useState, useEffect, useReducer, useContext } from 'react'
import { Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { DialogActions, DialogContent, DialogTitle, Button, Dialog } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import MuiAlert from '@material-ui/lab/Alert';

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
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
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
  open: false,
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
