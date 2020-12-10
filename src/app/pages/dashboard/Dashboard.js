import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import { callApi } from "../../services/apiService";
import { toastService } from "../../services/toastService";
import ApiConstants from "../../shared/config/apiConstants";

import DataGrid from "./DataGrid/DataGrid";
import AppLoader from "../../components/AppLoader/AppLoader";
import "./Dashboard.scss";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      currency: "",
      imgFlag: "",
      showLoader: true,
    };
  }

  componentDidMount() {
    this.fetchBalance();
  }

  fetchBalance() {
    this.setState({ showLoader: true });
    callApi("get", ApiConstants.FETCH_BALANCE)
      .then((response) => {
        if (response.code === 200) {
          this.setState({
            balance: response.data.balance ? response.data.balance : 0,
            currency: response.data.currency,
            imgFlag: response.data.url,
          });
          localStorage.setItem("currency", response.data.currency);
        }
        this.setState({ showLoader: false });
      })
      .catch((error) => {
        toastService.error(error.message);
        this.setState({ showLoader: false });
      });
  }

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <div className="content container-fluid dashboard-container">
          <AppLoader show={this.state.showLoader} />
          <div className="page-header">
            <div className="row align-items-end">
              <div className="col-sm mb-2 mb-sm-0">
                <h1 className="page-title">{t("Dashboard.DashboardHeading")}</h1>
              </div>
            </div>
            <div className="card currencyBalance">
              <div className="row">
                <div className="col-md-5">
                  <p className="text-danger">
                    {this.state.imgFlag && <img className="country-flag" src={this.state.imgFlag} style={{ marginRight: "5px" }} />}
                    {t("Dashboard.CurrentBalance")}
                  </p>
                  <p className="currency">
                    <span className="display-4 text-dark">
                      <CountUp start={0} end={this.state.balance} duration={1.5} />
                    </span>
                    <small className="balance_currency">{this.state.currency}</small>
                  </p>
                </div>
                <div className="col-md-7 text-right">
                  <Link to="/send-money" className="btn btn-default">
                    <img src="assets/svg/dashboard/send-money.svg" /> {t("Dashboard.SendMoney")}
                  </Link>
                  <Link to="" className="btn btn-default">
                    <img src="assets/svg/dashboard/add-money.svg" /> {t("Dashboard.AddMoney")}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <DataGrid />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userToken: state.userReducer.userToken,
});

export default connect(mapStateToProps)(withTranslation()(Dashboard));
