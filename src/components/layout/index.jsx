import React from "react";
import Logo from "../../assets/imgs/logo.svg";
import Menu from "./Menu";
import useStyles from "./Style";
const Layout = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.menuWrapper}>
        <div className="logo-wrapper">
          <img src={Logo} alt="Milvus Logo"></img>
        </div>

        <div className={classes.menuContent}>
          <Menu></Menu>
        </div>
      </div>
      <div className={classes.content}>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
