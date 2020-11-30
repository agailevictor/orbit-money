import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    let selectedBusinessAccount = localStorage.getItem("selectedCustomerAccount");
    return (
      <React.Fragment>
        <div className="content container-fluid dashboard-container">
          <div className="page-header">
            <div className="row align-items-end">
              <div className="col-sm mb-2 mb-sm-0">
                <h1 className="page-title">{t("Settings.SettingsHeading")}</h1>
              </div>
            </div>
          </div>
          <div className="">
            <div className="row settingBlock">
              <div className="col-md-4">
                <Link className="d-flex align-items-center" to="/personal-account">
                  <img className="avatar" src="./assets/svg/settings/user.svg" alt="" />
                  <div className="ml-3 pr-3">
                    <span className="d-block h5 text-hover-primary mb-0">{t("Settings.PersonalAccountTitle")}</span>
                    <span className="d-block font-size-sm text-body">{t("Settings.PersonalAccountDetails")}</span>
                  </div>
                  <i className="tio-chevron-right"></i>
                </Link>
              </div>
              {selectedBusinessAccount && (
                <div className="col-md-4">
                  <Link className="d-flex align-items-center" to="/business-account">
                    <img className="avatar" src="./assets/svg/settings/briefcase.svg" alt="" />
                    <div className="ml-3 pr-3">
                      <span className="d-block h5 text-hover-primary mb-0">{t("Settings.BusinessAccountTitle")}</span>
                      <span className="d-block font-size-sm text-body">{t("Settings.BusinessAccountDetails")}</span>
                    </div>
                    <i className="tio-chevron-right"></i>
                  </Link>
                </div>
              )}

              {/* <div className="col-md-4">
                <Link className="d-flex align-items-center" to="/email-setting">
                  <img className="avatar" src="./assets/svg/settings/mail.svg" alt="" />
                  <div className="ml-3 pr-3">
                    <span className="d-block h5 text-hover-primary mb-0">{t("Settings.EmailSettingTitle")}</span>
                    <span className="d-block font-size-sm text-body">{t("Settings.EmailSettingDetails")}</span>
                  </div>
                  <i className="tio-chevron-right"></i>
                </Link>
              </div> */}
              <div className="col-md-4">
                <Link className="d-flex align-items-center" to="/notification-settings">
                  <img className="avatar" src="./assets/svg/settings/bell.svg" alt="" />
                  <div className="ml-3 pr-3">
                    <span className="d-block h5 text-hover-primary mb-0">{t("Settings.NotificationTitle")}</span>
                    <span className="d-block font-size-sm text-body">{t("Settings.NotificationDetails")}</span>
                  </div>
                  <i className="tio-chevron-right"></i>
                </Link>
              </div>
              <div className="col-md-4">
                <Link className="d-flex align-items-center" to="/change-password">
                  <img className="avatar" src="./assets/svg/settings/lock.svg" alt="" />
                  <div className="ml-3 pr-3">
                    <span className="d-block h5 text-hover-primary mb-0">{t("Settings.ChangePasswordTitle")}</span>
                    <span className="d-block font-size-sm text-body">{t("Settings.ChangePasswordDetails")}</span>
                  </div>
                  <i className="tio-chevron-right"></i>
                </Link>
              </div>
              <div className="col-md-4">
                <Link className="d-flex align-items-center" to="/delete-my-account">
                  <img className="avatar" src="./assets/svg/settings/delete.svg" alt="" />
                  <div className="ml-3 pr-3">
                    <span className="d-block h5 text-hover-primary mb-0">{t("Settings.DeleteAccountTitle")}</span>
                    <span className="d-block font-size-sm text-body">{t("Settings.DeleteAccountDetails")}</span>
                  </div>
                  <i className="tio-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(Settings);
