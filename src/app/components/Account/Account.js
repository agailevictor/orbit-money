import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { ActionCreators } from "../../actions";
import { toastService } from "../../services/toastService";
import { callApi } from "../../services/apiService";
import ApiConstants from "../../shared/config/apiConstants";

import "./Account.scss";

const Account = (props) => {
  const { t } = props;
  const [isOpened, setIsOpened] = useState(false);
  const [customerAccounts, setCustomerAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const openClass =
    "hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu hs-unfold-content-initialized hs-unfold-css-animation animated slideInUp";
  const closeClass = "hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu";

  const closePopup = () => {
    setIsOpened(false);
  };

  const logout = (event) => {
    if (event) event.preventDefault();
    localStorage.removeItem("auth");
    localStorage.removeItem("authToken");
    localStorage.removeItem("selectedCustomerAccount");
    localStorage.removeItem("CustomerAccountToken");
    localStorage.removeItem("authToken");
    props.history.replace("/signin");
  };

  useEffect(() => {
    let token = localStorage.getItem("authToken");
    let auth = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : false;
    if (token && auth && props.isAuthenticated) {
      props.renewLogin(token);
    } else {
      logout(null);
    }
  }, [localStorage.getItem("auth")]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const container = document.getElementById("account-drop");
      if (container && !container.contains(e.target)) {
        closePopup();
      }
    });
    props.setRefreshAccount(true)
    return () => {};
  }, []);

  useEffect(() => {
    if(props.refreshAccount) {
      getCustomerAccountsList();
      if (localStorage.getItem("selectedCustomerAccount")) {
        setSelectedAccount(JSON.parse(localStorage.getItem("selectedCustomerAccount")));
      }
      props.setRefreshAccount(false)
    }
    return () => {};
  }, [props.refreshAccount]);

  const getCustomerAccountsList = () => {
    callApi("get", ApiConstants.GET_CUSTOMER_ACCOUNTS)
      .then((response) => {
        if (response.code === 200) {
          setCustomerAccounts(response.dataList);
        }
      })
      .catch((error) => {
        toastService.error(error.message);
      });
  };

  const switchAccount = (event, account) => {
    event.preventDefault();
    localStorage.setItem("selectedCustomerAccount", JSON.stringify(account));
    setSelectedAccount(account);
    props.history.push("/");
    setTimeout(()=> { props.history.replace("/customer-dashboard"); },50)
    closePopup();
  };

  const getCustomerAccounts = customerAccounts.map((account, index) => {
    if (account.type === "BUSINESS") {
      return (
        <React.Fragment key={index}>
          {index > 1 && <div className="custom-dropdown-divider"></div>}
          <div className={`dropdown-item businessLNK  ${selectedAccount && selectedAccount.id === account.id ? "active" : ""}`}>
            <div className="media align-items-center">
              <a href="#" className="d-block w-100" onClick={(e) => switchAccount(e, account)}>
                <div className="media-body">
                  <span className="card-title h5">{account.title} </span>
                  <span className="card-text text-danger">
                    {t("Account.BusinessID")}: {account.businessId}
                  </span>
                  <span className="arrow">
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </React.Fragment>
      );
    }
  });

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
        <div className="business-accounts-list">{getCustomerAccounts}</div>

        <Link className="dropdown-item" to="/create-business-account" onClick={closePopup}>
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

const mapStateToProps = (state) => {
  return {
    userToken: state.userReducer.userToken,
    isAuthenticated: state.userReducer.isAuthenticated,
    refreshAccount: state.userReducer.refreshAccount,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    renewLogin: (token) => dispatch(ActionCreators.userSignedIn(token)),
    setRefreshAccount: (refresh) => dispatch(ActionCreators.refreshAccount(refresh)),
    signout: () => dispatch(ActionCreators.userSignedOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Account));
