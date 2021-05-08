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
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

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

  const { Provider } = rootContext;

  return (
    <Provider value={{ openSnackBar, dialog, setDialog, hideDialog }}>
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
    </Provider>
  );
};

export default RootProvider;
