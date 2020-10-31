import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Account.scss";

const Account = (props) => {
  const [isOpened, setIsOpened] = useState(false);

  const openClass =
    "hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu hs-unfold-content-initialized hs-unfold-css-animation animated slideInUp";
  const closeClass = "hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu";

  const closePopup = () => {
    setIsOpened(false);
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const container = document.getElementById("account-drop");
      if (container && !container.contains(e.target)) {
        closePopup();
      }
    });
    return () => {};
  }, []);

  return (
    <div id="account-drop">
      <a
        className="js-hs-unfold-invoker navbar-dropdown-account-wrapper"
        href=""
        onClick={(e) => {
          e.preventDefault();
          setIsOpened(!isOpened);
        }}>
        <div className="avatar avatar-sm avatar-circle">
          <img className="avatar-img" src="./assets/img/160x160/img6.jpg" alt="Image Description" />
          <span className="avatar-status avatar-sm-status avatar-status-success"></span>
        </div>
      </a>
      <div id="accountNavbarDropdown" className={isOpened ? openClass : closeClass} style={{ width: "16rem, animation-duration: 300ms" }}>
        <div className="dropdown-item">
          <div className="media align-items-center">
            <div className="avatar avatar-sm avatar-circle mr-2">
              <img className="avatar-img" src="./assets/img/160x160/img6.jpg" alt="Image Description" />
            </div>
            <div className="media-body">
              <span className="card-title h5">Albert Bristol</span>
              <span className="card-text text-danger">Membership No: P21928534</span>
            </div>
          </div>
        </div>

        <div className="dropdown-divider"></div>
        <div className="dropdown-item businessLNK">
          <div className="media align-items-center">
            <a href="#" className="d-block w-100">
              <div className="media-body">
                <span className="card-title h5">ABC LLC </span>
                <span className="card-text text-danger">Business ID: P21928534</span>
                <span className="arrow">
                  <i className="fas fa-chevron-right"></i>
                </span>
              </div>
            </a>
          </div>
        </div>

        <a className="dropdown-item" href="#">
          <span className="text-truncate pr-2" title="Create A business account">
            <i className="fas fa-briefcase nav-icon"></i>&nbsp; Create A business account
          </span>
        </a>
        <a className="dropdown-item" href="#">
          <span className="text-truncate pr-2" title="Settings">
            <i className="fas fa-cog nav-icon"></i>&nbsp; Settings
          </span>
        </a>
        <Link className="dropdown-item" to="/signin">
          <span className="text-truncate pr-2" title="log Out">
            <i className="fas fa-sign-out nav-i con"></i>&nbsp; Logout
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Account;
