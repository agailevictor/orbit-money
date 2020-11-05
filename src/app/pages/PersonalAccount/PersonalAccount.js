import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import PersonalDetails from "./Tabs/PersonalDetails";
import UploadDocument from "./Tabs/UploadDocument";

import "./PersonalAccount.scss";

class PersonalAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "PersonalDetails",
    };
  }

  setTab = (event, tabName) => {
    event.preventDefault();
    this.setState({ activeTab: tabName });
  };

  render() {
    return (
      <React.Fragment>
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-end">
              <div className="col-sm mb-2 mb-sm-0">
                <p className="page-title">
                  <Link to="/settings" className="btn btn-ghost-secondary">
                    <i className="tio-chevron-left"></i> Back
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <form className="js-step-form py-md-5">
            <div className="row justify-content-lg-center mainDetailBlock">
              <div className="col-lg-9">
                <ul
                  id="addUserStepFormProgress"
                  className="js-step-progress step step-sm step-icon-sm step step-inline step-item-between text-center d-block mb-0 ml-auto">
                  <li className={`tabsitem ${this.state.activeTab === "PersonalDetails" ? "active" : ""} `}>
                    <a className="step-content-wrapper" href="" onClick={(e) => this.setTab(e, "PersonalDetails")}>
                      <div className="step-content">
                        <span className="step-title">Personal Details</span>
                      </div>
                    </a>
                  </li>

                  <li className={`tabsitem ${this.state.activeTab === "UploadDocument" ? "active" : ""} `}>
                    <a className="step-content-wrapper" href="" onClick={(e) => this.setTab(e, "UploadDocument")}>
                      <div className="step-content">
                        <span className="step-title">Uploaded Document</span>
                      </div>
                    </a>
                  </li>
                </ul>
                <div id="addUserStepFormContent">
                  <PersonalDetails active={this.state.activeTab === "PersonalDetails" ? true : false} />
                  {this.state.activeTab === "UploadDocument" && <UploadDocument active={this.state.activeTab === "UploadDocument" ? true : false} />}
                </div>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(PersonalAccount);
