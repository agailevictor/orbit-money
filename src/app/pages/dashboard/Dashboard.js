import React from "react";
import { withTranslation } from "react-i18next";

import Table from "./Table";
import "./Dashboard.scss";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <div className="content container-fluid dashboard-container">
          <div className="page-header">
            <div className="row align-items-end">
              <div className="col-sm mb-2 mb-sm-0">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb breadcrumb-no-gutter">
                    <li className="breadcrumb-item">
                      <a className="breadcrumb-link" href="#">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Dashboard
                    </li>
                  </ol>
                </nav>

                <h1 className="page-title">Dashbaord</h1>
              </div>
            </div>
            <div className="card currencyBalance">
              <div className="row">
                <div className="col-md-5">
                  <p className="text-danger">
                    <img src="assets/svg/flags/united-states-of-america.svg" height="18px" /> Current Balance
                  </p>
                  <p className="currency">
                    <span className="js-counter display-4 text-dark" data-value="158470">
                      158470
                    </span>{" "}
                    <small>USD</small>
                  </p>
                </div>
                <div className="col-md-7 text-right">
                  <a href="#" className="btn btn-default">
                    <img src="assets/svg/dashboard/send-money.svg" /> Pay
                  </a>
                  <a href="#" className="btn btn-default">
                    <img src="assets/svg/dashboard/add-money.svg" /> Top Up Walltet
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <h4>Latest Transcations</h4>
            </div>
            <div className="col-md-6 text-right">
              <a href="#">
                <b>View All</b>
              </a>
            </div>
          </div>

          <Table />
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(Dashboard);
