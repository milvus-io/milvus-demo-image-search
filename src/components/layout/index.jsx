import React from "react";
import "./index.less"
const Layout = props => {
  return (
    <div className="layout-wrapper">
      <header className="header-wrapper">
        <h3>IMAGE SEARCH <span>powered by Milvus</span> </h3>
      </header>
      <section className="content-wrapper">
        {props.children}
      </section>
    </div>
  );
};

export default Layout;
