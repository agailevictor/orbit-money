import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import "./Account.scss";

const Account = (props) => {
  const { t } = props;
  const [isOpened, setIsOpened] = useState(false);

  const openClass =
    "hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu hs-unfold-content-initialized hs-unfold-css-animation animated slideInUp";
  const closeClass = "hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu";

  const closePopup = () => {
    setIsOpened(false);
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("auth");
    localStorage.removeItem("authToken");
    props.history.replace("/signin");
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
              <span className="card-text text-danger">{t("Account.MembershipNo")}: P21928534</span>
            </div>
          </div>
        </div>

        <div className="dropdown-divider"></div>
        <div className="dropdown-item businessLNK">
          <div className="media align-items-center">
            <a href="#" className="d-block w-100">
              <div className="media-body">
                <span className="card-title h5">ABC LLC </span>
                <span className="card-text text-danger">{t("Account.BusinessID")}: P21928534</span>
                <span className="arrow">
                  <i className="fas fa-chevron-right"></i>
                </span>
              </div>
            </a>
          </div>
        </div>

        <Link className="dropdown-item" to="#">
          <span className="text-truncate pr-2" title={t("Account.CreateBusinessAccount")}>
            <i className="fas fa-briefcase nav-icon"></i> {t("Account.CreateBusinessAccount")}
          </span>
        </Link>
        <Link className="dropdown-item" to="/settings" onClick={closePopup}>
          <span className="text-truncate pr-2" title={t("Account.Settings")}>
            <i className="fas fa-cog nav-icon"></i> {t("Account.Settings")}
          </span>
        </Link>
        <Link className="dropdown-item" to="" onClick={(e) => logout(e)}>
          <span className="text-truncate pr-2" title={t("Account.Logout")}>
            <i className="fas fa-sign-out nav-i con"></i> {t("Account.Logout")}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default withTranslation()(Account);
