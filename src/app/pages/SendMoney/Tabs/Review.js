import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import AppLoader from "../../../components/AppLoader/AppLoader";
import { callApi } from "../../../services/apiService";
import { toastService } from "../../../services/toastService";
import ApiConstants from "../../../shared/config/apiConstants";

import { ActionCreators } from "../../../actions";

const Review = (props) => {
  const [showLoader, setShowLoader] = useState(false);

  const transferMoney = (values) => {
    console.log("values", values);
    setShowLoader(true);
    let params = values;
    callApi("post", ApiConstants.TRANSFER_MONEY, params)
      .then((response) => {
        console.log("values response", response);
        if (response.code === 200) {
          toastService.success(response.message);
          props.onSetTabs(null, "tab5");
        } else {
          toastService.error(response.message);
        }
        setShowLoader(false);
      })
      .catch((e) => {
        toastService.error(e.message);
        setShowLoader(false);
      });
  };

  return (
    <React.Fragment>
      <AppLoader show={showLoader} />
      <div id="stepReview" className={`step-card-pay card-lg ${props.active ? "active" : ""}`}>
        <h1>Review your transaction</h1>
        <div className="card">
          <Formik
            enableReinitialize={true}
            initialValues={{
              amount: props.sendMoneyData?.transferRate.Amount,
              beneficiaryId: 13,
              purposeOfPayment: "",
              quoteId: props.sendMoneyData?.transferRate.QuoteId,
              settlementCcy: props.sendMoneyData?.transferRate.SettlementCcy,
              tradeCcy: props.sendMoneyData?.transferRate.TradeCcy,
            }}
            onSubmit={(values) => {
              transferMoney(values);
            }}
            render={({ values }) => (
              <Form>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-5 text-right">
                      <label>You send</label>
                    </div>
                    <div className="col-md-7">
                      <div className="amountField">
                        {props.sendMoneyData?.amountData.tradeAmount} <span>{props.sendMoneyData?.transferRate.TradeCcy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center ">
                    <div className="col-md-6">
                      <ul className="amoutList">
                        <li>
                          <span>Sending Fee</span>{" "}
                          <span className="float-right">
                            {props.sendMoneyData?.transferRate.fees
                              ? props.sendMoneyData.transferRate.fees + " " + props.sendMoneyData.transferRate.TradeCcy
                              : "10.00 CAD"}
                          </span>
                        </li>
                        <li>
                          <span>Conversion rate(+)</span>
                          <span className="float-right">
                            <a href="#" className="text-danger">
                              <i className="far fa-question-circle"></i>
                            </a>
                            &nbsp;
                            {props.sendMoneyData?.transferRate.Rate}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-5 text-right">
                      <label>Payee receives</label>
                    </div>
                    <div className="col-md-7">
                      <div className="amountField">
                        {props.sendMoneyData?.amountData.settlementAmount} <span>{props.sendMoneyData?.transferRate.SettlementCcy}</span>
                      </div>
                    </div>
                  </div>
                  <br />

                  <div className="row justify-content-lg-center">
                    <div className="col-md-10">
                      <div className="form-group">
                        <label>
                          <b>Reference/Purpose to sending money</b>
                        </label>
                        <span className="redColor">*</span>
                        <Field type="text" className="form-control" name="purposeOfPayment" id="" placeholder="Reference/Purpose to sending money" />
                      </div>
                    </div>
                  </div>

                  <div className="card-footer d-sm-flex align-items-sm-center">
                    <button type="button" className="btn btn-ghost-secondary" onClick={() => props.onSetTabs(null, "tab2")}>
                      <i className="tio-chevron-left"></i> Back
                    </button>

                    <div className="ml-auto">
                      <button type="button" className="btn btn-info" disabled>
                        Pay & Send
                      </button>
                      &nbsp; &nbsp;
                      <button type="submit" className="btn btn-primary" disabled={!values.purposeOfPayment}>
                        Confirm and Pay <i className="tio-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    sendMoneyData: state.sendMoneyReducer.sendMoneyData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveSendingAmountDetails: (data) => dispatch(ActionCreators.saveSendingAmountDetails(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Review));
