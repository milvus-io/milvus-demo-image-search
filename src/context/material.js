import React, { useState, useEffect, useReducer, useContext } from 'react'
import { Snackbar } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const materialContext = React.createContext({
  openSnackBar: (message, type = "success", position = { vertical: "top", horizontal: "center" }) => { },
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


const { Provider } = materialContext

export const MaterialProvider = ({ children }) => {
  const [snackBar, setSnackBar] = useState({
    vertical: "top",
    horizontal: "center",
    open: false,
    message: "",
    type: "success"
  })


  const handleClose = () => {
    setSnackBar(v => ({ ...v, open: false }))
  };

  const openSnackBar = (message, type = "success", position = { vertical: "top", horizontal: "center" }) => {
    setSnackBar({
      open: true,
      message,
      type,
      ...position
    })
  }

  return <Provider value={{
    openSnackBar
  }}>
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={{ vertical: snackBar.vertical, horizontal: snackBar.horizontal }}
        key={`${snackBar.vertical}${snackBar.horizontal}`}
        open={snackBar.open}
        onClose={handleClose}
        autoHideDuration={2000}
      >
        <Alert onClose={handleClose} severity={snackBar.type}>
          {snackBar.message}
        </Alert>
      </Snackbar>
      {children}
    </ThemeProvider>
  </Provider>
}
