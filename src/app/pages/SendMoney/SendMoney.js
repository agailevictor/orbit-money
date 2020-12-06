import React from "react";
import { withTranslation } from "react-i18next";

import Amount from "./Tabs/Amount";
import Recipient from "./Tabs/Recipient";
import Security from "./Tabs/Security";
import Review from "./Tabs/Review";
import Pay from "./Tabs/Pay";

import "./SendMoney.scss";

class SendMoney extends React.Component {
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
          <div className="row justify-content-lg-center">
            <div className="col-lg-2 vertailTab">
              <ul id="addUserStepFormProgress" className="step step-sm step-icon-sm step-inline step-item-between mb-3 mb-md-5 verticleSteps">
                <li
                  className={`step-item ${this.state.activeTab === "tab1" ||
                    this.state.activeTab === "tab2" ||
                    this.state.activeTab === "tab3" ||
                    this.state.activeTab === "tab4" ||
                    this.state.activeTab === "tab5"
                    ? "active"
                    : ""
                    }`}>
                  <a className="step-content-wrapper" to="#">
                    <div className="step-content">
                      <span className="step-title">Amount</span>
                    </div>
                    <span className="step-icon step-icon-soft-dark">1</span>
                  </a>
                  <div className="verticalBar">&nbsp;</div>
                </li>
                <li
                  className={`step-item ${this.state.activeTab === "tab2" ||
                    this.state.activeTab === "tab3" ||
                    this.state.activeTab === "tab4" ||
                    this.state.activeTab === "tab5"
                    ? "active"
                    : ""
                    }`}>
                  <a className="step-content-wrapper" to="#">
                    <div className="step-content">
                      <span className="step-title">Recipient</span>
                    </div>
                    <span className="step-icon step-icon-soft-dark">2</span>
                  </a>
                  <div className="verticalBar">&nbsp;</div>
                </li>
                <li
                  className={`step-item ${this.state.activeTab === "tab3" || this.state.activeTab === "tab4" || this.state.activeTab === "tab5" ? "active" : ""
                    }`}>
                  <a className="step-content-wrapper" to="#">
                    <div className="step-content">
                      <span className="step-title">Security</span>
                    </div>
                    <span className="step-icon step-icon-soft-dark">3</span>
                  </a>
                  <div className="verticalBar">&nbsp;</div>
                </li>
                <li className={`step-item ${this.state.activeTab === "tab4" || this.state.activeTab === "tab5" ? "active" : ""}`}>
                  <a className="step-content-wrapper" to="#">
                    <div className="step-content">
                      <span className="step-title">Review</span>
                    </div>
                    <span className="step-icon step-icon-soft-dark">4</span>
                  </a>
                  <div className="verticalBar">&nbsp;</div>
                </li>
                <li className={`step-item ${this.state.activeTab === "tab5" ? "active" : ""}`}>
                  <a className="step-content-wrapper" to="#">
                    <div className="step-content">
                      <span className="step-title">Security</span>
                    </div>
                    <span className="step-icon step-icon-soft-dark">5</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-8">
              <div id="addUserStepFormContent">
                <Amount active={this.state.activeTab === "tab1"} onSetTabs={this.setTabs} />
                <Recipient active={this.state.activeTab === "tab2"} onSetTabs={this.setTabs} />
                <Security active={this.state.activeTab === "tab3"} onSetTabs={this.setTabs} />
                <Review active={this.state.activeTab === "tab3"} onSetTabs={this.setTabs} />
                <Review active={this.state.activeTab === "tab4"} onSetTabs={this.setTabs} />
                <Pay active={this.state.activeTab === "tab5"} onSetTabs={this.setTabs} />
              </div>
            </div>
            <div className="col-lg-1"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(SendMoney);
