import React from "react";
import { withTranslation } from "react-i18next";

import Registration from "./Tabs/Registration";
import BusinessActivity from "./Tabs/BusinessActivity";
import Verification from "./Tabs/Verification";

import "./CreateBusinessAccount.scss";

class CreateBusinessAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "tab1",
    };
  }

  setTabs = (event, tab) => {
    if (event) event.preventDefault();
    this.setState({ activeTab: tab });
  };

  render() {
    return (
      <React.Fragment>
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-end">
              <div className="col-sm mb-2 mb-sm-0">
                <h1 className="page-title">Create Account</h1>
              </div>
            </div>
          </div>

          <div className="row justify-content-lg-center">
            <div className="col-lg-3 vertailTab">
              <ul id="addUserStepFormProgress" className="step step-sm step-icon-sm step-inline step-item-between mb-3 mb-md-5 verticleSteps">
                <li
                  className={`step-item ${
                    this.state.activeTab === "tab1" || this.state.activeTab === "tab2" || this.state.activeTab === "tab3" ? "active" : ""
                  }`}>
                  <a className="step-content-wrapper" to="#">
                    <div className="step-content">
                      <span className="step-title">Registration</span>
                    </div>
                    <span className="step-icon step-icon-soft-dark">1</span>
                  </a>
                  <div className="verticalBar">&nbsp;</div>
                </li>
                <li className={`step-item ${this.state.activeTab === "tab2" || this.state.activeTab === "tab3" ? "active" : ""}`}>
                  <a className="step-content-wrapper" to="#">
                    <div className="step-content">
                      <span className="step-title">Business Activity</span>
                    </div>
                    <span className="step-icon step-icon-soft-dark">2</span>
                  </a>
                  <div className="verticalBar">&nbsp;</div>
                </li>
                <li className={`step-item ${this.state.activeTab === "tab3" ? "active" : ""}`}>
                  <a className="step-content-wrapper" to="#">
                    <div className="step-content">
                      <span className="step-title">Verification</span>
                    </div>
                    <span className="step-icon step-icon-soft-dark">3</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-8">
              <div id="addUserStepFormContent">
                <Registration active={this.state.activeTab === "tab1"} onSetTabs={this.setTabs} />
                <BusinessActivity active={this.state.activeTab === "tab2"} onSetTabs={this.setTabs} />
                <Verification active={this.state.activeTab === "tab3"} onSetTabs={this.setTabs} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(CreateBusinessAccount);
