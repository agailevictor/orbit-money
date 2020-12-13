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
      showRateCounter: false,
      counterValue: 30,
      refreshRate: false,
    };
    this.countdown = null;
  }

  setTabs = (event, tab) => {
    if (event) event.preventDefault();
    this.setState({ activeTab: tab });
  };

  deactivateRateCounter = () => {
    if (this.countdown) clearInterval(this.countdown);
    this.setState({ showRateCounter: false });
  }

  activateRateCounter = () => {
    this.setState({ showRateCounter: true });
    let counter = 30;
    this.countdown = setInterval(() => {
      counter--;
      if (counter === 0) {
        clearInterval(this.countdown);
        setTimeout(() => {
          this.setState({ refreshRate: true });
        }, 1000);
      }
      this.setState({ counterValue: counter });
    }, 1000);
  };

  onCompleteRefreshRate = () => {
    this.setState({ counterValue: 30, refreshRate: false });
    if (this.countdown) clearInterval(this.countdown);
    setTimeout(() => {
      this.activateRateCounter();
    }, 1000);
  };

  componentWillUnmount() {
    if (this.countdown) clearInterval(this.countdown);
  }

  render() {
    const { t } = this.props;

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
                      <span className="step-title">{t("SendMoney.Amount.Amount")}</span>
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
                      <span className="step-title">{t("SendMoney.Recipient.Recipient")}</span>
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
                      <span className="step-title">{t("SendMoney.Security.Security")}</span>
                    </div>
                    <span className="step-icon step-icon-soft-dark">3</span>
                  </a>
                  <div className="verticalBar">&nbsp;</div>
                </li>
                <li className={`step-item ${this.state.activeTab === "tab4" || this.state.activeTab === "tab5" ? "active" : ""}`}>
                  <a className="step-content-wrapper" to="#">
                    <div className="step-content">
                      <span className="step-title">{t("SendMoney.Review.Review")}</span>
                    </div>
                    <span className="step-icon step-icon-soft-dark">4</span>
                  </a>
                  <div className="verticalBar">&nbsp;</div>
                </li>
                <li className={`step-item ${this.state.activeTab === "tab5" ? "active" : ""}`}>
                  <a className="step-content-wrapper" to="#">
                    <div className="step-content">
                      <span className="step-title">{t("SendMoney.Pay.Pay")}</span>
                    </div>
                    <span className="step-icon step-icon-soft-dark">5</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-8">
              <div id="addUserStepFormContent">
                <Amount
                  active={this.state.activeTab === "tab1"}
                  onSetTabs={this.setTabs}
                  onTriggerCounter={this.activateRateCounter}
                  refreshRate={this.state.refreshRate}
                  onCompleteRefreshRate={this.onCompleteRefreshRate}
                />
                <Recipient active={this.state.activeTab === "tab2"} onSetTabs={this.setTabs} />
                <Security active={this.state.activeTab === "tab3"} onSetTabs={this.setTabs} />
                <Review active={this.state.activeTab === "tab3"} onSetTabs={this.setTabs} />
                <Review active={this.state.activeTab === "tab4"} onSetTabs={this.setTabs} />
                <Pay active={this.state.activeTab === "tab5"} onSetTabs={this.setTabs} afterTransaction={this.deactivateRateCounter} />
              </div>
              {this.state.showRateCounter && (
                <div className="rate-refresh">
                  {t("SendMoney.TimerText")}
                  <span className="rate-refresh-time"> {this.state.counterValue} </span>
                  {t("SendMoney.Seconds")}
                </div>
              )}
            </div>
            <div className="col-lg-1"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(SendMoney);
