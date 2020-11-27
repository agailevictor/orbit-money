import React, { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const MainLayout = (props) => {
  let isOpen = window.innerWidth >= 1200 ? true : false;
  const [openMenu, setopenMenu] = useState(isOpen);

  useEffect(() => {
    let e = document.getElementsByTagName("body")[0];
    e.className = "has-navbar-vertical-aside navbar-vertical-aside-show-xl footer-offset";
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1200) {
        setopenMenu(true);
        document.body.classList.remove("navbar-vertical-aside-closed-mode");
        document.body.classList.remove("navbar-vertical-aside-mini-mode");
      } else {
        // close
        setopenMenu(false);
        document.body.classList.add("navbar-vertical-aside-mini-mode");
        document.body.classList.add("navbar-vertical-aside-closed-mode");
        if (document.getElementById("aside1")) document.getElementById("aside1").classList.remove("navbar-vertical-aside-initialized");
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", () => {});
    };
  });

  const mobileMenuClick = (open) => {
    setopenMenu(open);
  };

  return (
    <React.Fragment>
      <Header onMobileMenuClick={mobileMenuClick} openMenu={openMenu}></Header>
      <Sidebar onMobileMenuClick={mobileMenuClick} openMenu={openMenu}></Sidebar>
      <main id="content" role="main" className="main">
        {props.children}
      </main>
    </React.Fragment>
  );
};

export default MainLayout;
