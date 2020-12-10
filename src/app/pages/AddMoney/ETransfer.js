import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import "./AddMoney.scss";
import Header from "./Header"

class ETransfer extends React.Component {
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
                    <h1 className="text-center">{ t("AddMoney.E_Transfer.title") }</h1>
                    <ul className="inner-addmoneylink">
                    <li><a href=""> <img src="assets/svg/addmoney/etransfer.svg" /> { t("AddMoney.E_Transfer.title") }</a></li> 
                    </ul>
                </div>
            </div> 
            <div className="row justify-content-lg-center"> 
                <div className="col-md-5 e-transfer">
                <p>Send funds to your Orbit account to: <a href="epayments@orbitmoney.ca" className="text-blue">epayments@orbitmoney.ca <i id="apiKeyCodeIcon1" className="tio-copy"></i> </a></p>
                <p><b>Note</b>: When making an E-transfer, please insert your account number in the message box.</p>
                <p>Do not use spaces when typing in your account number.</p>
                <p>Your account number is: 
                    <b>{localStorage.getItem("accountNumber")}  <a className="js-clipboard" href="#" data-toggle="tooltip" title="Copy Code"><i id="apiKeyCodeIcon1" className="tio-copy"></i> </a></b></p>
                </div>  
            </div>

            <div className="row">
                <div className="col-md-12 text-center mt-4">
                <Link className="btn btn-ghost-secondary" to="/add-money">  <i className="tio-chevron-left"></i> Back</Link>
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

export default connect(mapStateToProps)(withTranslation()(ETransfer));
