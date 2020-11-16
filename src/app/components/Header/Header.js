import React from "react";
import { Link, withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import ReactTooltip from "react-tooltip";

import Account from "../Account/Account";
import Notification from "../Notification/Notification";
import "./Header.scss";

const Header = (props) => {
  const { t } = props;

  const toggleSidebar = () => {
    document.body.classList.remove("navbar-vertical-aside-closed-mode");
    if (props.openMenu) {
      // close
      document.body.classList.add("navbar-vertical-aside-mini-mode");
    } else {
      // open
      document.body.classList.remove("navbar-vertical-aside-mini-mode");
    }
    props.onMobileMenuClick(!props.openMenu);
  };

  const toggleMobileMenu = () => {
    if (props.openMenu) {
      //close
      document.body.classList.add("navbar-vertical-aside-mini-mode");
      document.body.classList.add("navbar-vertical-aside-closed-mode");
      document.getElementById("aside1").classList.remove("navbar-vertical-aside-initialized");
    } else {
      //open
      document.body.classList.remove("navbar-vertical-aside-mini-mode");
      document.body.classList.remove("navbar-vertical-aside-closed-mode");
      document.getElementById("aside1").classList.add("navbar-vertical-aside-initialized");
    }
    props.onMobileMenuClick(!props.openMenu);
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
            <ReactTooltip id="toggle-invoker" place="right" />
            <button type="button" className="js-navbar-vertical-aside-toggle-invoker toggle-invoker close mr-3" onClick={toggleSidebar}>
              <i className="tio-first-page navbar-vertical-aside-toggle-short-align" data-for="toggle-invoker" data-tip={t("Header.Collapse")}></i>
              <i className="tio-last-page navbar-vertical-aside-toggle-full-align" data-for="toggle-invoker" data-tip={t("Header.Expand")}></i>
            </button>
            <button type="button" className="js-navbar-vertical-aside-toggle-invoker mobile-toggle-invoker close mr-3" onClick={toggleMobileMenu}>
              <i className="tio-first-page navbar-vertical-aside-toggle-short-align" data-for="toggle-invoker" data-tip1={t("Header.Collapse")}></i>
              <i className="tio-last-page navbar-vertical-aside-toggle-full-align" data-for="toggle-invoker" data-tip1={t("Header.Collapse")}></i>
            </button>
          </div>

          <div className="navbar-nav-wrap-content-right">
            <ul className="navbar-nav align-items-center flex-row">
              <li className="nav-item d-none d-sm-inline-block">
                <div className="hs-unfold">
                  <Notification {...props} />
                </div>
              </li>

              <li className="nav-item">
                <div className="hs-unfold">
                  <Account {...props} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default withTranslation()(withRouter(Header));
