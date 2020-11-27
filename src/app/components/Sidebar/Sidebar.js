import React from "react";
import { Link, useLocation } from "react-router-dom";
import { withTranslation } from "react-i18next";

import "./Sidebar.scss";

const Sidebar = (props) => {
  const { t } = props;

  const closeMobileMenu = () => {
    if (props.openMenu) {
      //close
      document.body.classList.add("navbar-vertical-aside-mini-mode");
      document.body.classList.add("navbar-vertical-aside-closed-mode");
      document.getElementById("aside1").classList.remove("navbar-vertical-aside-initialized");
    }
    props.onMobileMenuClick(!props.openMenu);
  };

  const navClick = () => {
    if (window.innerWidth < 1200) {
      closeMobileMenu();
    }
  };

  const location = useLocation();

  return (
    <React.Fragment>
      <aside
        id="aside1"
        className="js-navbar-vertical-aside navbar navbar-vertical-aside navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-bordered">
        <div className="navbar-vertical-container">
          <div className="navbar-vertical-footer-offset">
            <div className="navbar-brand-wrapper justify-content-between">
              <Link className="navbar-brand" to="/" aria-label="Front">
                <img className="navbar-brand-logo" src="./assets/svg/logos/logo.svg" alt="Logo" />
                <img className="navbar-brand-logo-mini" src="./assets/svg/logos/logo-short.svg" alt="Logo" />
              </Link>

              <button
                type="button"
                className="js-navbar-vertical-aside-toggle-invoker navbar-vertical-aside-toggle btn btn-icon btn-xs btn-ghost-dark">
                <i className="tio-clear tio-lg" onClick={closeMobileMenu}></i>
              </button>
            </div>

            <div className="navbar-vertical-content">
              <ul className="navbar-nav navbar-nav-lg nav-tabs">
                <li className={`nav-item ${location.pathname === "/dashboard" || location.pathname === "/" ? "active" : ""}`}>
                  <Link className="js-nav-tooltip-link nav-link" to="/dashboard" title="Welcome page" data-placement="left" onClick={navClick}>
                    <i className="fas fa-home nav-icon"></i>
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">{t("Sidebar.Dashboard")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="js-nav-tooltip-link nav-link" to="#" title="Recipients" data-placement="left">
                    <i className="fas fa-user-friends nav-icon"></i>
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">{t("Sidebar.Recipients")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="js-nav-tooltip-link nav-link" to="#" title="Reports" data-placement="left">
                    <i className="fas fa-file-invoice nav-icon"></i>
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">{t("Sidebar.Reports")}</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar-vertical-footer">
              <ul className="navbar-vertical-footer-list">
                <li className="navbar-vertical-footer-list-item">
                  <ul className="navbar-nav navbar-nav-lg nav-tabs">
                    <li className="nav-item ">
                      <Link className="js-nav-tooltip-link nav-link " to="#" title="Privacy Policy" data-placement="left">
                        <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">{t("Sidebar.PrivacyPolicy")}</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link className="js-nav-tooltip-link nav-link " to="#" title="Terms and Condition" data-placement="left">
                        <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">{t("Sidebar.TermsAndConditions")}</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link className="js-nav-tooltip-link nav-link " to="#" title="Support" data-placement="left">
                        <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">{t("Sidebar.Support")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
      {props.openMenu && (
        <div className="js-navbar-vertical-aside-toggle-invoker navbar-vertical-aside-mobile-overlay" onClick={closeMobileMenu}></div>
      )}
    </React.Fragment>
  );
};

export default withTranslation()(Sidebar);
