import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";

import CurrencyList from "../../../components/CurrencyList/CurrencyList";
import AppLoader from "../../../components/AppLoader/AppLoader";
import ApiConstants from "../../../shared/config/apiConstants";
import { callApi } from "../../../services/apiService";
import { toastService } from "../../../services/toastService";
import { ActionCreators } from "../../../actions";

const Amount = (props) => {
  const { t } = props;

  const [showLoader, setShowLoader] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const defaultCurrency = localStorage.getItem("currency") ? localStorage.getItem("currency") : "";

  const [amountData, setamountData] = useState({
    tradeAmount: "",
    settlementAmount: "",
    tradeCurrency: defaultCurrency,
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
          props.onTriggerCounter();
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

  const refreshTransferRate = () => {
    // setModalShow(false);
    setShowLoader(true);
    let params = { amount: amountData.tradeAmount, currencyPair: amountData.tradeCurrency + amountData.currencyCurrency };
    callApi("get", ApiConstants.FETCH_TRANSFER_RATE, params)
      .then((response) => {
        if (response.code === 200) {
          let updatedAmountData = { ...amountData, settlementAmount: response.data.SettlementAmt };
          setamountData(updatedAmountData);
          settransferRate(response.data);
          let updatedData = { ...props.sendMoneyData, amountData: updatedAmountData, settlementAmount: response.data.SettlementAmt };
          props.saveSendingAmountDetails(updatedData);
          props.onTriggerCounter();
        } else {
          toastService.error(response.message);
        }
        setShowLoader(false);
        props.onCompleteRefreshRate();
      })
      .catch((e) => {
        toastService.error(e.message);
        setShowLoader(false);
      });
  };

  const InfoModal = (props) => {
    return (
      <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <div className="text-center">
            <p>
              <b>
                {t("SendMoney.Amount.Conversion_rate_will_be_changed")} <br /> {t("SendMoney.Amount.in_next_30_seconds")}
              </b>
            </p>
            <br />
            <button type="button" className="btn btn-ghost-secondary" onClick={props.onHide}>
              {t("SendMoney.Amount.Okay")}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  useEffect(() => {
    if (props.refreshRate) {
      refreshTransferRate();
    }
  }, [props.refreshRate]);

  return (
    <React.Fragment>
      <AppLoader show={showLoader} />

      <div id="stepAmount" className={`step-card-pay card-lg ${props.active ? "active" : ""}`}>
        <h1 className="col-lg-12">{t("SendMoney.Amount.tab1Title")}</h1>
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
                        <b>{t("SendMoney.Amount.You_Send")}</b>
                      </label>
                    </div>
                    <Field
                      type="text"
                      className="form-control"
                      name="tradeAmount"
                      id="website"
                      placeholder={t("SendMoney.Amount.Amount")}
                      value={values.tradeAmount}
                      onChange={(e) => {
                        let event = { target: { name: "tradeAmount", value: e.target.value } };
                        handleChange(event);
                        setFieldValue("currencyCurrency", "");
                      }}
                    />

                    <div>
                      <CurrencyList
                        isDisabled={true}
                        isSearchable={false}
                        className="custom-form-conntrol"
                        placeholder={t("SendMoney.Amount.Select")}
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
                        <b>{t("SendMoney.Amount.Recipient_Gets")}</b>
                      </label>
                    </div>
                    <Field type="text" className="form-control" name="settlementAmount" id="website" placeholder="Trade amount" disabled />

                    <div>
                      <CurrencyList
                        isSearchable={false}
                        className="custom-form-conntrol"
                        value={values.currencyCurrency}
                        placeholder={t("SendMoney.Amount.Select")}
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
                                    <span>{t("SendMoney.Amount.You_send")}</span>{" "}
                                    {transferRate && transferRate.Amount && (
                                      <span className="float-right">
                                        {transferRate.Amount} {transferRate.TradeCcy}
                                      </span>
                                    )}
                                  </li>
                                  <li>
                                    <span>{t("SendMoney.Amount.Our_fees")}</span>{" "}
                                    {transferRate && (
                                      <span className="float-right">
                                        {transferRate.feeAmt ? transferRate.feeAmt + " " + transferRate.TradeCcy : "10.00 " + transferRate.TradeCcy}
                                      </span>
                                    )}
                                  </li>
                                  <li>
                                    <span>{t("SendMoney.Amount.Recipient_gets")}</span>
                                    {transferRate && transferRate.SettlementAmt && (
                                      <span className="float-right">
                                        {transferRate.SettlementAmt} {transferRate.SettlementCcy}
                                      </span>
                                    )}
                                  </li>
                                  <li>
                                    <span>{t("SendMoney.Amount.Conversion_rate")}</span>
                                    {transferRate && transferRate.Rate && (
                                      <span className="float-right">
                                        <a
                                          href=""
                                          className="text-danger"
                                          onClick={(event) => {
                                            event.preventDefault();
                                            setModalShow(true);
                                          }}>
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

      <InfoModal show={modalShow} onHide={() => setModalShow(false)} />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userToken: state.userReducer.userToken,
    sendMoneyData: state.sendMoneyReducer.sendMoneyData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveSendingAmountDetails: (data) => dispatch(ActionCreators.saveSendingAmountDetails(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Amount));
