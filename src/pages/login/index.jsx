import React from 'react'
import Grid from '@material-ui/core/Grid'
import { usePageStyles } from '../../hooks/page'
import PageWrapper from '../../components/page-wrapper'
import LoginForm from './form'
const Login = props => {
  const classes = usePageStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2 className={classes.h2}>Connect to Milvus</h2>
        </Grid>
        <Grid item xs={6}>
          <PageWrapper>
            <LoginForm></LoginForm>
          </PageWrapper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
