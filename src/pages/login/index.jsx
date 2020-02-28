import React from "react";
import { usePageStyles } from "../../hooks/page";
import { Typography, Box } from "@material-ui/core";
import PageWrapper from "../../components/page-wrapper";
import LoginForm from "./form";

const Login = props => {
  const classes = usePageStyles();

  return (
    <div className={classes.root}>
      <PageWrapper className={classes.paper}>
        <Typography variant={"h5"}>Connect to Milvus</Typography>
        <Box p={2}>
          <LoginForm></LoginForm>
        </Box>
      </PageWrapper>
    </div>
  );
};

export default Login;
