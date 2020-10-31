import React, { useState } from "react";
import { Link } from "react-router-dom";

import Account from "../Account/Account";
import Notification from "../Notification/Notification";
import "./Header.scss";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    if (showSidebar) {
      document.body.classList.remove("navbar-vertical-aside-mini-mode");
    } else {
      document.body.classList.add("navbar-vertical-aside-mini-mode");
    }
    setShowSidebar(!showSidebar);
  };

  return (
    <React.Fragment>
      <header id="header" className="navbar navbar-expand-lg navbar-fixed navbar-height navbar-flush navbar-container navbar-bordered">
        <div className="navbar-nav-wrap">
          <div className="navbar-brand-wrapper">
            <Link className="navbar-brand" to="/dashboard" aria-label="Front">
              <img className="navbar-brand-logo" src="./assets/svg/logos/logo.svg" alt="Logo" />
              <img className="navbar-brand-logo-mini" src="./assets/svg/logos/logo-short.svg" alt="Logo" />
            </Link>
          </div>

          <div className="navbar-nav-wrap-content-left">
            <button type="button" className="js-navbar-vertical-aside-toggle-invoker close mr-3" onClick={toggleSidebar}>
              <i
                className="tio-first-page navbar-vertical-aside-toggle-short-align"
                data-toggle="tooltip"
                data-placement="right"
                title="Collapse"></i>
              <i
                className="tio-last-page navbar-vertical-aside-toggle-full-align"
                data-template='<div class="tooltip d-none d-sm-block" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
                data-toggle="tooltip"
                data-placement="right"
                title="Expand"></i>
            </button>
          </div>

          <div className="navbar-nav-wrap-content-right">
            <ul className="navbar-nav align-items-center flex-row">
              <li className="nav-item d-none d-sm-inline-block">
                <div className="hs-unfold">
                  <Notification />
                </div>
              </li>

              <li className="nav-item">
                <div className="hs-unfold">
                  <Account />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
