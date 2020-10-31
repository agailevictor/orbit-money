import React, { useEffect, useState } from "react";

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
    return () => {};
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
              <a className="nav-link" href="#">
                <div className="media align-items-center">
                  <span className="mr-3">
                    <img className="avatar avatar-xs avatar-4by3" src="./assets/svg/brands/atlassian.svg" alt="User Account" />
                  </span>
                  <div className="media-body text-truncate">
                    <span className="h5 mb-0">Atlassian</span>
                    <span className="d-block font-size-sm text-body">Security and control across Cloud</span>
                  </div>
                </div>
              </a>

              <a className="nav-link" href="#">
                <div className="media align-items-center">
                  <span className="mr-3">
                    <img className="avatar avatar-xs avatar-4by3" src="./assets/svg/brands/slack.svg" alt="Image Description" />
                  </span>
                  <div className="media-body text-truncate">
                    <span className="h5 mb-0">
                      Slack <span className="badge badge-primary badge-pill text-uppercase ml-1">Try</span>
                    </span>
                    <span className="d-block font-size-sm text-body">Email collaboration software</span>
                  </div>
                </div>
              </a>

              <a className="nav-link" href="#">
                <div className="media align-items-center">
                  <span className="mr-3">
                    <img className="avatar avatar-xs avatar-4by3" src="./assets/svg/brands/google-webdev.svg" alt="Image Description" />
                  </span>
                  <div className="media-body text-truncate">
                    <span className="h5 mb-0">Google webdev</span>
                    <span className="d-block font-size-sm text-body">Work involved in developing a website</span>
                  </div>
                </div>
              </a>

              <a className="nav-link" href="#">
                <div className="media align-items-center">
                  <span className="mr-3">
                    <img className="avatar avatar-xs avatar-4by3" src="./assets/svg/brands/frontapp.svg" alt="Image Description" />
                  </span>
                  <div className="media-body text-truncate">
                    <span className="h5 mb-0">Frontapp</span>
                    <span className="d-block font-size-sm text-body">The inbox for teams</span>
                  </div>
                </div>
              </a>

              <a className="nav-link" href="#">
                <div className="media align-items-center">
                  <span className="mr-3">
                    <img className="avatar avatar-xs avatar-4by3" src="./assets/svg/illustrations/review-rating-shield.svg" alt="Image Description" />
                  </span>
                  <div className="media-body text-truncate">
                    <span className="h5 mb-0">HS Support</span>
                    <span className="d-block font-size-sm text-body">Customer service and support</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <a className="card-footer text-center" href="#">
            View all notifications
            <i className="tio-chevron-right"></i>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Notification;
