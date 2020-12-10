import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import "./AddMoney.scss";
import Header from "./Header"

class WirePayment extends React.Component {
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
                <h1 className="text-center">{ t("AddMoney.Wire_Payment.title") }</h1>
                <ul className="inner-addmoneylink">
                  <li><a href=""> <img src="assets/svg/addmoney/wire-transfer.svg" /> { t("AddMoney.Wire_Payment.title") }</a></li> 
                </ul>
            </div>
          </div> 
          <div className="row justify-content-lg-center"> 
            <div className="col-md-5 ">
              <div className="row wire-paymentContent">
                <div className="col-md-6">
                  <p className="text-dark"><b>Bank details</b></p>
                  <p>
                    <span>Royal Bank of Canada</span> <br/> 
                    <span>2955 Hazelton Place</span> <br/> 
                    <span>Mississauga, ON L5M 6J3</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="text-dark"><b>Orbit Account Details</b></p>
                  <p>
                    <span>Account name: <span>Orbit Money Inc</span></span> <br/> 
                    <span>Account No. <span>5195555</span></span> <br/> 
                    <span>Transit No. <span>00144</span></span> <br/>
                    <span>Swift No. <span>ROYCCAT2</span></span>
                  </p>
                </div>
                <div className="col-md-12 mt-3">
                  <p>
                    <b>Note:</b>  
                    <span>Please put your Orbit account number as a payment reference.</span> <br/>
                    <span>Your Orbit account number is: 
                      <b>{localStorage.getItem("accountNumber")} <a className="js-clipboard" href="#" data-toggle="tooltip" title="Copy Code"><i id="apiKeyCodeIcon1" className="tio-copy"></i> </a></b>
                    </span>
                  </p>
                  <p></p>
                </div>
              </div>  
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

export default connect(mapStateToProps)(withTranslation()(WirePayment));
