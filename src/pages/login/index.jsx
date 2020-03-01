import React from 'react'
import { usePageStyles } from '../../hooks/page'
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import PaperWrapper from '../../components/page-wrapper'
import LoginForm from './form'
const Login = props => {
  const classes = usePageStyles()
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <PaperWrapper className={classes.paper}>
        <div className={classes.titleContainer}>
          <Typography variant={"h5"}>{t('connectTitle')}</Typography>
        </div>
        <LoginForm></LoginForm>
      </PaperWrapper>
    </div>
  )
};

export default Login;
