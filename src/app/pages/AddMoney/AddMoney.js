import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import "./AddMoney.scss";
import Header from "./Header"

class AddMoney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: true,
    };
  }

  componentDidMount() {

  }

  render() {
    const { t } = this.props;

    return (
      <React.Fragment>
        <div className="content container-fluid">
          <Header />

          <div className="content container-fluid">
            <div className="row justify-content-lg-center">
              <div className="col-lg-12">
                <h1 className="text-center">{t('AddMoney.SELECT_OPTION_STATEMENT')}</h1>
                <ul className="addmoneylink">
                  <li>
                    <img src="assets/svg/addmoney/etransfer.svg" />
                    <span>{t("AddMoney.E_Transfer.title")}</span>
                    <Link className="btn btn-primary" to="/add-e-transfer">
                      {t("AddMoney.Select")}
                    </Link>
                  </li>
                  <p className="text-center optionDetail">You will pay <b className="text-dark underline">2.5 USD</b> fees</p>
                  <li>
                    <img src="assets/svg/addmoney/direct-debit.svg" />
                    <span>  {t("AddMoney.Direct_Debit.title")}</span>
                    <Link className="btn btn-primary" to="/add-direct-debit">
                      {t("AddMoney.Select")}
                    </Link>
                  </li>
                  <p className="text-center optionDetail">You will pay <b className="text-dark underline">3.5 USD</b> fees</p>
                  <li>
                    <img src="assets/svg/addmoney/credit-card.svg" />
                    <span>  {t("AddMoney.Credit_Card.title")}</span>
                    <a href="#" className="btn btn-primary">  {t("AddMoney.Select")} </a>
                  </li>
                  <p className="text-center optionDetail">You will pay <b className="text-dark underline">5.5 USD</b> fees</p>
                  <li>
                    <img src="assets/svg/addmoney/wire-transfer.svg" />
                    <span>  {t("AddMoney.Wire_Payment.title")}</span>
                    <Link className="btn btn-primary" to="/add-wire-payment">
                      {t("AddMoney.Select")}
                    </Link>
                  </li>
                  <p className="text-center optionDetail">{t("AddMoney.You_will_pay")} <b className="text-dark underline">7.5 USD</b> {t("AddMoney.Fee")}</p>
                </ul>
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

export default connect(mapStateToProps)(withTranslation()(AddMoney));
