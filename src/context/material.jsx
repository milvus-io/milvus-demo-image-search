import React, { useState } from 'react'
import { Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { DialogActions, DialogContent, DialogTitle, Button, Dialog } from '@material-ui/core'
import { blue, green } from '@material-ui/core/colors'
import { useTranslation } from "react-i18next";

import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const materialContext = React.createContext({
  openSnackBar: (message, type = "success", duration, position = { vertical: "top", horizontal: "center" }) => { },
  dialog: {},
  setDialog: (params) => { },
  hideDialog: () => { }
})

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green
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

const DefaultDialogConfigs = {
  open: false,
  type: 'notice',
  params: {
    title: "",
    component: <></>,
    confirm: () => { },
    cancel: () => { }
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
    open: false,
    type: "success",
    message: "",
    vertical: "top",
    horizontal: "center"
  })
  const [dialog, setDialog] = useState(DefaultDialogConfigs);
  const { t } = useTranslation();
  const buttonTrans = t("button");

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
  const { title, component, confirm, confirmLabel = buttonTrans.confirm, cancel, cancelLabel = buttonTrans.cancel } = params; // for notice type
  const { component: CustomComponent } = params; // for custom type
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
  const hideDialog = () => {
    setDialog(DefaultDialogConfigs)
  }

  return <Provider value={{
    openSnackBar,
    dialog,
    setDialog,
    hideDialog
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
      <Dialog classes={{ paper: classes.paper }} open={open} onClose={() => setDialog(DefaultDialogConfigs)}>
        {type === 'notice'
          ? (<>
            <DialogTitle >{title}</DialogTitle>
            <DialogContent>{component}</DialogContent>

            <DialogActions>
              <Button onClick={() => _confirmDialog()} color="primary">
                {confirmLabel}
              </Button>
              <Button onClick={() => _cancelDialog()} color="default">
                {cancelLabel}
              </Button>
            </DialogActions>
          </>)
          : CustomComponent
        }
      </Dialog>
    </ThemeProvider>
  </Provider>
}
