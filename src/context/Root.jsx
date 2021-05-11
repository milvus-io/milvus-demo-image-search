import React, { useState, createContext } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Dialog,
  duration,
  Snackbar,
  SnackbarCloseReason,
  useMediaQuery
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MuiAlert from "@material-ui/lab/Alert";
import CustomDialog from '../components/CustomDialog';

console.log(CustomDialog);
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const rootContext = createContext({
  openSnackBar: (
    message,
    type = "success",
    duration = 2000
  ) => { },
  dialog: {},
  setDialog: (params) => { },
  hideDialog: () => { },
});

const DefaultDialogConfig = {
  open: false,
  type: "notice",
  params: {
    title: "",
    component: <></>,
    confirm: () => { },
    cancel: () => { },
    confirmLabel: "Confirm",
    cancelLabel: "Concel",
  },
};

const RootProvider = (props) => {
  const [snackBar, setSnackBar] = useState({
    open: false,
    type: "success",
    message: "",
    autoHideDuration: 2000,
    vertical: "top",
    horizontal: "center",
  });

  const [dialog, setDialog] = useState(DefaultDialogConfig);
  const [customDialog, setCustomDialog] = useState({
    open: false,
    onClose: () => { },
    component: <></>
  });

  const openSnackBar = (
    message,
    type = "success",
    autoHideDuration = 2000,
    position = { vertical: "top", horizontal: "center" }
  ) => {
    setSnackBar({
      open: true,
      message,
      type,
      autoHideDuration,
      ...position,
    });
  };

  const hideDialog = () => {
    setDialog({
      open: false,
      type: "custom",
      params: {
        title: "",
        component: <></>,
        confirm: () => { },
        cancel: () => { },
        confirmLabel: "",
        cancelLabel: "",
      },
    });
  };

  const {
    open,
    type,
    params: {
      title,
      component,
      confirm,
      confirmLabel = "Confirm",
      cancel,
      cancelLabel = "Cancel",
    },
  } = dialog;
  const { component: CustomComponent } = dialog.params;

  const _confirmDialog = async () => {
    if (confirm) {
      await confirm();
    }
    hideDialog();
  };
  const _cancelDialog = async () => {
    if (cancel) {
      await cancel();
    }
    hideDialog();
  };
  const handleClose = (e, reason) => {
    // only click x to close or auto hide.
    if (reason === "clickaway") {
      return;
    }
    setSnackBar((v) => ({ ...v, open: false }));
  };

  const closeCustomDialog = () => {
    setCustomDialog({
      open: false,
      onClose: () => { },
      component: <></>
    });
  };

  const { Provider } = rootContext;

  const commonThemes = {
    palette: {
      primary: {
        main: '#06aff2'
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1025,
        lg: 1200,
        xl: 1920,
      },
    },
    spacing: (factor) => `${8 * factor}px`,
  };

  const theme = createMuiTheme({
    ...commonThemes,
    overrides: {
      MuiTypography: {
        h5: {
          fontSize: '16px',
          lineHeight: '18px',
          fontFamily: 'Roboto',
          fontWeight: 500
        },
        body1: {
          fontSize: '16px',
          lineHeight: '18px',
          fontFamily: 'Roboto',
          fontWeight: 400
        },
        body2: {
          fontSize: '12px',
          lineHeight: '14px',
          fontFamily: 'Roboto',
          fontWeight: 400
        },
      },
      MuiButton: {
        contained: {
          color: '#fff',
          backgroundColor: '#12c3f4',
          boxShadow: 'initial',

          '&:hover': {
            backgroundColor: '#65daf8',
            boxShadow: 'initial',
          },
        },
        containedPrimary: {
          color: '#fff',
          backgroundColor: '#12c3f4',

          '&:hover': {
            backgroundColor: '#65daf8',
          },
        },
      }
    }
  });

  return (
    <Provider value={{ openSnackBar, dialog, setDialog, hideDialog, setCustomDialog, closeCustomDialog }}>
      <ThemeProvider theme={theme}>
        <Snackbar
          anchorOrigin={{
            vertical: snackBar.vertical,
            horizontal: snackBar.horizontal,
          }}
          key={`${snackBar.vertical}${snackBar.horizontal}`}
          open={snackBar.open}
          onClose={handleClose}
          autoHideDuration={snackBar.autoHideDuration}
        >
          <Alert onClose={handleClose} severity={snackBar.type}>
            {snackBar.message}
          </Alert>
        </Snackbar>
        {props.children}
        <Dialog open={open} onClose={hideDialog}>
          {type === "notice" ? (
            <>
              <DialogTitle>{title}</DialogTitle>
              <DialogContent>{component}</DialogContent>

              <DialogActions>
                <Button onClick={() => _confirmDialog()} color="primary">
                  {confirmLabel}
                </Button>
                <Button onClick={() => _cancelDialog()} color="default">
                  {cancelLabel}
                </Button>
              </DialogActions>
            </>
          ) : (
            CustomComponent
          )}
        </Dialog>
        <CustomDialog
          open={customDialog.open}
          onClose={closeCustomDialog}
          component={customDialog.component}
        />
      </ThemeProvider>
    </Provider>
  );
};

export default RootProvider;
