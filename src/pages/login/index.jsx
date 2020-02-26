import React, { useState } from 'react'
import { usePageStyles } from '../../hooks/page'
import PageWrapper from '../../components/page-wrapper'
import LoginForm from './form'
const Login = props => {
  const classes = usePageStyles()

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2 className={classes.h2}>Connect to Milvus</h2>
      </div>
      <PageWrapper className={classes.paper}>
        <LoginForm></LoginForm>
      </PageWrapper>
    </div>
  )
}

export default Login