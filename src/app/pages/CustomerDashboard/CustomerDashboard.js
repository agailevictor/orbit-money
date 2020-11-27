import React from "react";
import CountUp from "react-countup";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import { callApi } from "../../services/apiService";
import { toastService } from "../../services/toastService";

import ApiConstants from "../../shared/config/apiConstants";

import DataGrid from "./DataGrid/DataGrid";
import AppLoader from "../../components/AppLoader/AppLoader";
import "./CustomerDashboard.scss";

class CustomerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      currency: "",
      imgFlag: "",
      showLoader: true,
      showGrid: false,
    };
    this.accountData = JSON.parse(localStorage.getItem("selectedCustomerAccount"));
  }

  componentDidMount() {
    this.switchCustomerAccounts();
  }

  switchCustomerAccounts() {
    this.setState({ showLoader: true });
    callApi(
      "post",
      ApiConstants.SWITCH_CUSTOMER_ACCOUNTS,
      {
        id: this.accountData.id,
        type: this.accountData.type,
      },
      false
    )
      .then((response) => {
        if (response.code === 200) {
          localStorage.setItem("CustomerAccountToken", response.data.token);
          this.setState({ showGrid: true });
          this.fetchBalance();
        } else {
          this.setState({ showLoader: false });
          toastService.error(response.message);
        }
      })
      .catch((error) => {
        this.setState({ showLoader: false });
        toastService.error(error.message);
      });
  }

  fetchBalance() {
    callApi("get", ApiConstants.FETCH_BALANCE, null, true)
      .then((response) => {
        if (response.code === 200) {
          this.setState({ showLoader: false, balance: response.data.balance, currency: response.data.currency, imgFlag: response.data.url });
        } else {
          this.setState({ showLoader: false });
          toastService.error(response.message);
        }
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
                <h1 class="page-title">
                  {this.accountData.title}&nbsp;
                  <small>
                    {this.accountData.businessId}&nbsp;
                    <a class="js-clipboard" href="javascript:;" title="" data-tip="Copy Code Number">
                      <i id="apiKeyCodeIcon1" class="tio-copy"></i>
                    </a>
                  </small>
                </h1>
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
                  <a href="#" className="btn btn-default">
                    <img src="assets/svg/dashboard/send-money.svg" /> {t("Dashboard.Add")}
                  </a>
                  <a href="#" className="btn btn-default">
                    <img src="assets/svg/dashboard/add-money.svg" /> {t("Dashboard.Receive")}
                  </a>
                  <a href="#" className="btn btn-default">
                    <img src="assets/svg/dashboard/send-money.svg" /> {t("Dashboard.Convert")}
                  </a>
                  <a href="#" className="btn btn-default">
                    <img src="assets/svg/dashboard/add-money.svg" /> {t("Dashboard.Send")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {this.state.showGrid ? (
            <DataGrid />
          ) : (
            <div className="row">
              <div className="col-md-12 text-center mt-9">
                <img src="assets/svg/addmoney/no-transaction.svg" />
                <h2 className="mt-5">{t("Dashboard.NoTransaction")}</h2>
                <p>{t("Dashboard.SendOrAddMoneytoWallet")}</p>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userToken: state.userReducer.userToken,
});

export default connect(mapStateToProps)(withTranslation()(CustomerDashboard));
