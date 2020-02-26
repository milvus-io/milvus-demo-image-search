import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
const Login = props => {
  const theme = useTheme()
  const classes = makeStyles({
    root: {
      padding: theme.spacing(3),
    },
    inputWrapper: {
      width: '35%',
      marginBottom: theme.spacing(1),
      position: 'relative',
    },
    title: {
      fontSize: '1.5rem'
    },
    submit: {
      position: 'absolute',
      right: 0
    }
  })()
  const [params, setParams] = useState({
    ip: '',
    port: ''
  })
  const connectMilvus = () => { }
  return (
    <div className={classes.root}>
      <h3 className={classes.title}>Connect to Milvus</h3>
      <div className={classes.inputWrapper}>
        <TextField
          label="IP"
          value={params.ip || ""}
          variant="outlined"
          fullWidth={true}
          onChange={e => setParams({ ...params, ip: e.target.value })}
        />
      </div>
      <div className={classes.inputWrapper}>
        <TextField
          label="Port"
          value={params.port || ""}
          variant="outlined"
          fullWidth={true}
          onChange={e => setParams({ ...params, port: e.target.value })}
        />
      </div>
      <div className={classes.inputWrapper}>
        <Button className={classes.submit} color="primary" variant="outlined" onClick={connectMilvus}>Connect</Button>
      </div>

    </div>
  )
}

export default Login