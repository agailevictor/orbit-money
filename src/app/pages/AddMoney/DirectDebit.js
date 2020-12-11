import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import "./AddMoney.scss";
import Header from "./Header"
import Account from "./Account"
import DirectDebitForm from "./DirectDebitForm"

import AppLoader from "../../components/AppLoader/AppLoader";
import ApiConstants from "../../shared/config/apiConstants";
import { callApi } from "../../services/apiService";
import { toastService } from "../../services/toastService";

class DirectDebit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: true,
      showForm: false,
      formMessage: "",
      accounts: [
        {
          accountBank: "Bank Name",
          accountName: "User Test",
          accountNumber: "123123",
          dcbankCustomerStatus: "PENDING",
        },
        {
          accountBank: "Bank Name X",
          accountName: "User X",
          accountNumber: "99999",
          dcbankCustomerStatus: "ACTIVE",
        }
      ]
    };
  }

  componentDidMount() {
    this.setState({
      showLoader: true
    });
    callApi("get", ApiConstants.FETCH_DIRECT_DEBIT_ACCOUNTS)
      .then((response) => {
        console.log(response);
        if (response.code === 200) {
          this.setState({
            accounts: response.data.bankAccounts,
            showLoader: false
          });
        }
        else toastService.error(response.message);
        this.setState({
          showLoader: false
        });
      })
      .catch((e) => {
        this.setState({
          showLoader: false
        });
        toastService.error(e.message);
      });
  }

  render() {
    const { t } = this.props;

    return (
      this.state.showLoader ? <AppLoader show /> :
        <React.Fragment>
          <div className="content container-fluid">
            <Header />

            <div className="content container-fluid">

              <div className="row justify-content-lg-center">
                <div className="col-lg-12">
                  <h1 className="text-center">{t("AddMoney.Direct_Debit.title")}</h1>
                  <ul className="inner-addmoneylink">
                    <li><a href="#"> <img src="assets/svg/addmoney/direct-debit.svg" /> {t("AddMoney.Direct_Debit.title")}</a></li>
                  </ul>
                </div>
              </div>

              <div className="row justify-content-lg-center">
                <div className="col-md-4 p-2">

                  {
                    this.state.accounts.length > 0 && !this.state.showForm ? <div className="">
                      <div className="row">
                        <div className="col-md-6">
                          <label className="text-dark"><b>{t("AddMoney.Direct_Debit.select_account")}</b></label>
                        </div>
                        <div className="col-md-6 text-right">
                          <button type="button" onClick={() => this.setState({ showForm: true })} className="btn btn-outline-primary btn-sm"> <i className="tio-add"></i> {t("AddMoney.Direct_Debit.add_new")}</button>
                        </div>
                      </div>

                      {this.state.accounts.map(function (acc, i) {
                        return <Account account={acc} key={i} />;
                      })}

                    </div> : <DirectDebitForm />
                  }


                </div>

              </div>


              <div className="row justify-content-lg-center">
                <div className="col-md-4">
                  <div className="text-center mt-5">
                    {
                      this.state.formMessage.length > 0 &&
                      <div className="alert alert-success" role="alert">
                        {this.state.formMessage}
                      </div>
                    }
                    <div className="d-flex justify-content-center">
                      {
                        this.state.showForm ?
                          <button className="btn btn-ghost-secondary" onClick={() => this.setState({ showForm: false })}>  <i className="tio-chevron-left"></i> Back</button>
                          : <Link className="btn btn-ghost-secondary" to="/add-money"> <i className="tio-chevron-left"></i> Back</Link>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userToken: state.userReducer.userToken,
});

export default connect(mapStateToProps)(withTranslation()(DirectDebit));
