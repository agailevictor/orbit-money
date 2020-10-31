import React, { useEffect } from "react";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const MainLayout = (props) => {
  useEffect(() => {
    let e = document.getElementsByTagName("body")[0];
    e.className = "has-navbar-vertical-aside navbar-vertical-aside-show-xl footer-offset";
  }, []);

  return (
    <React.Fragment>
      <Header></Header>
      <Sidebar></Sidebar>
      <main id="content" role="main" className="main">
        {props.children}
      </main>
    </React.Fragment>
  );
};

export default MainLayout;
