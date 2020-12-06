import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import CurrencyList from "../../../components/CurrencyList/CurrencyList";
import AppLoader from "../../../components/AppLoader/AppLoader";
import ApiConstants from "../../../shared/config/apiConstants";
import { callApi } from "../../../services/apiService";
import { toastService } from "../../../services/toastService";

import { ActionCreators } from "../../../actions";

const Amount = (props) => {
  const [showLoader, setShowLoader] = useState(false);
  const [amountData, setamountData] = useState({
    tradeAmount: "",
    settlementAmount: "",
    tradeCurrency: "",
    currencyCurrency: "",
  });
  const [transferRate, settransferRate] = useState(null);

  const fetchTransferRate = (values) => {
    setShowLoader(true);
    let params = { amount: values.tradeAmount, currencyPair: values.tradeCurrency + values.currencyCurrency };
    callApi("get", ApiConstants.FETCH_TRANSFER_RATE, params)
      .then((response) => {
        if (response.code === 200) {
          let updatedData = { ...values, settlementAmount: response.data.SettlementAmt };
          setamountData(updatedData);
          settransferRate(response.data);
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

  const onProceedNext = () => {
    props.saveSendingAmountDetails({ amountData, transferRate });
    props.onSetTabs(null, "tab2");
  };

  return (
    <React.Fragment>
      <AppLoader show={showLoader} />

      <div id="stepAmout" className={`step-card-pay card-lg ${props.active ? "active" : ""}`}>
        <h1 className="col-lg-12">How much would you like to pay?</h1>
        <div className="card">
          <Formik
            enableReinitialize={true}
            initialValues={amountData}
            onSubmit={(values) => {
              if (values.tradeAmount && values.tradeCurrency && values.currencyCurrency) {
                fetchTransferRate(values);
              }
            }}
            render={({ errors, handleChange, values, submitForm, setFieldValue }) => (
              <Form>
                <div className="card-body">
                  <div className="input-group input-group-sm-down-break align-items-center selectWDDM">
                    <div className="input-group-append">
                      <label className="form-control">
                        <b>You Send</b>
                      </label>
                    </div>
                    <Field
                      type="text"
                      className="form-control"
                      name="tradeAmount"
                      id="website"
                      placeholder="Amount"
                      value={values.tradeAmount}
                      onChange={(e) => {
                        let event = { target: { name: "tradeAmount", value: e.target.value } };
                        handleChange(event);
                        setFieldValue("currencyCurrency", "");
                      }}
                    />

                    <div className="input-group-append">
                      <CurrencyList
                        isSearchable={false}
                        placeholder="Select"
                        value={values.tradeCurrency}
                        onChange={(value) => {
                          let event = { target: { name: "tradeCurrency", value: value.value } };
                          handleChange(event);
                        }}
                      />
                    </div>
                  </div>
                  <div className="input-group input-group-sm-down-break align-items-center selectWDDM mt-2">
                    <div className="input-group-append">
                      <label className="form-control">
                        <b>Recipient gets</b>
                      </label>
                    </div>
                    <Field type="text" className="form-control" name="settlementAmount" id="website" placeholder="Trade amount" disabled />

                    <div className="input-group-append" style={{ zIndex: 1 }}>
                      <CurrencyList
                        isSearchable={false}
                        value={values.currencyCurrency}
                        placeholder="Select"
                        onChange={(value) => {
                          let event = { target: { name: "currencyCurrency", value: value.value } };
                          handleChange(event);
                          submitForm();
                        }}
                      />
                    </div>
                  </div>
                  {transferRate && (
                    <div className="row">
                      <div className="col-sm-12 tabBankDetail mt-3">
                        <div className="tab-content">
                          <div className="tab-pane fade show active" id="lowCostTransfer" role="tabpanel" aria-labelledby="lowCostTransfer-tab">
                            <div className="row">
                              <div className="col-md-12">
                                <ul className="amoutList">
                                  <li>
                                    <span>You send</span>{" "}
                                    {transferRate && transferRate.Amount && (
                                      <span className="float-right">
                                        {transferRate.Amount} {transferRate.TradeCcy}
                                      </span>
                                    )}
                                  </li>
                                  <li>
                                    <span>Our fees</span>{" "}
                                    {transferRate && (
                                      <span className="float-right">
                                        {transferRate.fees ? transferRate.fees + " " + transferRate.TradeCcy : "10.00 CAD"}
                                      </span>
                                    )}
                                  </li>
                                  <li>
                                    <span>Recipient gets</span>
                                    {transferRate && transferRate.SettlementAmt && (
                                      <span className="float-right">
                                        {transferRate.SettlementAmt} {transferRate.SettlementCcy}
                                      </span>
                                    )}
                                  </li>
                                  <li>
                                    <span>Conversion rate(+)</span>
                                    {transferRate && transferRate.Rate && (
                                      <span className="float-right">
                                        <a href="#" className="text-danger" data-toggle="modal">
                                          <i className="far fa-question-circle"></i>
                                        </a>
                                        &nbsp;
                                        {transferRate.Rate}
                                      </span>
                                    )}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Form>
            )}
          />

          <div className="card-footer d-flex justify-content-end align-items-center">
            <button type="button" className="btn btn-primary" disabled={!transferRate} onClick={onProceedNext}>
              Continue <i className="tio-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userToken: state.userReducer.userToken,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveSendingAmountDetails: (data) => dispatch(ActionCreators.saveSendingAmountDetails(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Amount));
