import React from "react";
import { Link } from "react-router-dom";

import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <React.Fragment>
      <aside className="js-navbar-vertical-aside navbar navbar-vertical-aside navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-bordered">
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
                <i className="tio-clear tio-lg"></i>
              </button>
            </div>

            <div className="navbar-vertical-content">
              <ul className="navbar-nav navbar-nav-lg nav-tabs">
                <li className="nav-item active">
                  <Link className="js-nav-tooltip-link nav-link" to="/dashboard" title="Welcome page" data-placement="left">
                    <i className="fas fa-home nav-icon"></i>
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="js-nav-tooltip-link nav-link " to="/dashboard" title="Recipients" data-placement="left">
                    <i className="fas fa-user-friends nav-icon"></i>
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">Recipients</span>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="js-nav-tooltip-link nav-link " href="/dashboard" title="Reports" data-placement="left">
                    <i className="fas fa-file-invoice nav-icon"></i>
                    <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">Reports</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar-vertical-footer">
              <ul className="navbar-vertical-footer-list">
                <li className="navbar-vertical-footer-list-item">
                  <ul className="navbar-nav navbar-nav-lg nav-tabs">
                    <li className="nav-item ">
                      <Link className="js-nav-tooltip-link nav-link " href="/dashboard" title="Privacy Policy" data-placement="left">
                        <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">Privacy Policy</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link className="js-nav-tooltip-link nav-link " href="/dashboard" title="Terms and Condition" data-placement="left">
                        <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">Terms and Conditions</span>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link className="js-nav-tooltip-link nav-link " href="/dashboard" title="Support" data-placement="left">
                        <span className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">Support</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;
