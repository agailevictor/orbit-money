import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import BusinessDetails from "./Tabs/BusinessDetails";
import UploadDocument from "./Tabs/UploadDocument";

import "./BusinessAccount.scss";

class BusinessAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "BusinessDetails",
    };
  }

  setTab = (event, tabName) => {
    event.preventDefault();
    this.setState({ activeTab: tabName });
  };

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-end">
              <div className="col-sm mb-2 mb-sm-0">
                <p className="page-title">
                  <Link to="/settings" className="btn btn-ghost-secondary">
                    <i className="tio-chevron-left"></i> {t("Settings.Back")}
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-lg-center mainDetailBlock">
            <div className="col-lg-9">
              <ul
                id="addUserStepFormProgress"
                className="js-step-progress step step-sm step-icon-sm step step-inline step-item-between text-center d-block mb-0 ml-auto"
              >
                <li className={`tabsitem ${this.state.activeTab === "BusinessDetails" ? "active" : ""} `}>
                  <a className="step-content-wrapper" href="" onClick={(e) => this.setTab(e, "BusinessDetails")}>
                    <div className="step-content">
                      <span className="step-title">{t("Settings.BusinessAccount.BusinessDetails")}</span>
                    </div>
                  </a>
                </li>

                <li className={`tabsitem ${this.state.activeTab === "UploadDocument" ? "active" : ""} `}>
                  <a className="step-content-wrapper" href="" onClick={(e) => this.setTab(e, "UploadDocument")}>
                    <div className="step-content">
                      <span className="step-title">{t("Settings.BusinessAccount.UploadedDocument")}</span>
                    </div>
                  </a>
                </li>
              </ul>
              <div id="addUserStepFormContent">
                <BusinessDetails active={this.state.activeTab === "BusinessDetails" ? true : false} />
                {this.state.activeTab === "UploadDocument" && <UploadDocument active={this.state.activeTab === "UploadDocument" ? true : false} />}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(BusinessAccount);
