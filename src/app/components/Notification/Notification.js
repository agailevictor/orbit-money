import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { ActionCreators } from "../../actions";

import { callApi } from "../../services/apiService";
import ApiConstants from "../../shared/config/apiConstants";


const Notification = (props) => {
  const [isOpened, setIsOpened] = useState(false);

  const openClass =
    "hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu hs-unfold-content-initialized hs-unfold-css-animation animated slideInUp";
  const closeClass = "hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu";

  const closePopup = () => {
    setIsOpened(false);
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const container = document.getElementById("nottfication-drop");
      if (container && !container.contains(e.target)) {
        closePopup();
      }
    });
    callApi("get", ApiConstants.FETCH_NOTIFICATIONS + "10")
      .then((response) => {
        if (response.code === 200) {
          props.setNotifications(response.dataList);
          callApi("get", ApiConstants.MARK_NOTIFICATIONS);
        }
      });
    return () => { };
  }, []);

  return (
    <React.Fragment>
      <div id="nottfication-drop">
        <a
          id="showNotificationTrigger"
          className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
          href=""
          onClick={(e) => {
            e.preventDefault();
            setIsOpened(!isOpened);
          }}>
          <i className="tio-notifications-on-outlined"></i>
          <span className="btn-status btn-sm-status btn-status-danger"></span>
        </a>
        <div id="appsDropdown" className={isOpened ? openClass : closeClass} style={{ width: "25rem" }}>
          <div className="card-header">
            <span className="card-title h4">Notification</span>
          </div>
          <div className="card-body card-body-height">
            <div className="nav nav-pills flex-column">

              {
                props.notifications.map((n, i) => {
                  return (
                    <a className="nav-link" href="#" key={i}>
                      <div className="media align-items-center">
                        <span className="mr-3">
                          <img className="avatar avatar-xs avatar-4by3" src="./assets/svg/dashboard/notification-icon.svg" alt="User Account" />
                        </span>
                        <div className="media-body text-truncate">
                          <span className="h5 mb-0">{n.title}</span>
                          <span className="d-block font-size-sm text-body">{n.detail}</span>
                        </div>
                      </div>
                    </a>
                  );
                })
              }

            </div>
          </div>
          <Link className="card-footer text-center" to="/notifications">
            View all notifications
            <i className="tio-chevron-right"></i>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    notifications: state.lookupsReducer.notifications,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setNotifications: (data) => dispatch(ActionCreators.notificationListAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Notification));