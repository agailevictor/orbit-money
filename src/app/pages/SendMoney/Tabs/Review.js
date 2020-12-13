import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";

import AppLoader from "../../../components/AppLoader/AppLoader";
import Select2 from "../../../components/Select2/Select2";
import { callApi } from "../../../services/apiService";
import { toastService } from "../../../services/toastService";
import ApiConstants from "../../../shared/config/apiConstants";

import { ActionCreators } from "../../../actions";

const Review = (props) => {
  const { t } = props;
  const [showLoader, setShowLoader] = useState(false);
  const [purposeList, setpurposeList] = useState([]);
  const [purposeOptions, setpurposeOptions] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  const transferMoney = (values) => {
    setShowLoader(true);
    let params = values;
    callApi("post", ApiConstants.TRANSFER_MONEY, params)
      .then((response) => {
        props.afterTransaction();
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

  const fetchPurposeOfTransaction = () => {
    setShowLoader(true);
    let params = { countryId: props.sendMoneyData.beneficiary.countryId };
    callApi("post", ApiConstants.GET_PURPOSE_LIST, params)
      .then((response) => {
        if (response.code === 200) {
          setpurposeList(response.dataList);

          let purpose = response.dataList.map((option) => {
            return { value: option.Code, label: option.Description };
          });
          setpurposeOptions(purpose);
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
    if (!purposeList.length && props.sendMoneyData && props.sendMoneyData.beneficiary) fetchPurposeOfTransaction();
  }, [props.sendMoneyData]);

  return (
    <React.Fragment>
      <AppLoader show={showLoader} />
      <div id="stepReview" className={`step-card-pay card-lg ${props.active ? "active" : ""}`}>
        <h1>{t("SendMoney.Review.Review_your_transaction")}</h1>
        <div className="card">
          <Formik
            enableReinitialize={true}
            initialValues={{
              amount: props.sendMoneyData?.transferRate?.Amount,
              beneficiaryId: props.sendMoneyData?.beneficiary?.id,
              purposeOfPayment: "",
              quoteId: props.sendMoneyData?.transferRate?.QuoteId,
              settlementCcy: props.sendMoneyData?.transferRate?.TradeCcy,
              tradeCcy: props.sendMoneyData?.transferRate?.SettlementCcy,
            }}
            onSubmit={(values) => {
              transferMoney(values);
            }}
            render={({ values, handleChange }) => (
              <Form>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-5 text-right">
                      <label>{t("SendMoney.Review.You_send")}</label>
                    </div>
                    <div className="col-md-7">
                      <div className="amountField">
                        {props.sendMoneyData?.amountData.tradeAmount} <span>{props.sendMoneyData?.transferRate?.TradeCcy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center ">
                    <div className="col-md-6">
                      <ul className="amoutList">
                        <li>
                          <span>{t("SendMoney.Review.Sending_Fee")}</span>
                          <span className="float-right">
                            {props.sendMoneyData?.transferRate?.feeAmt
                              ? props.sendMoneyData.transferRate?.feeAmt + " " + props.sendMoneyData?.transferRate?.TradeCcy
                              : "10.00 " + props.sendMoneyData?.transferRate?.TradeCcy}
                          </span>
                        </li>
                        <li>
                          <span>{t("SendMoney.Review.Conversion_rate")}</span>
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
                            {props.sendMoneyData?.transferRate?.Rate}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-5 text-right">
                      <label>{t("SendMoney.Review.Payee_receives")}</label>
                    </div>
                    <div className="col-md-7">
                      <div className="amountField">
                        {props.sendMoneyData?.amountData.settlementAmount} <span>{props.sendMoneyData?.transferRate?.SettlementCcy}</span>
                      </div>
                    </div>
                  </div>
                  <br />

                  <div className="row justify-content-lg-center">
                    <div className="col-md-10">
                      <div className="form-group">
                        <label>
                          <b>{t("SendMoney.Review.Reference_Purpose_to_sending_money")}</b>
                        </label>
                        <span className="redColor">*</span>
                        <Select2
                          options={purposeOptions}
                          value={purposeOptions.filter((option) => option.value === values.purposeOfPayment)}
                          className="form-control"
                          placeholder={t("SendMoney.Review.Reference_Purpose_to_sending_money")}
                          isSearchable={true}
                          onChange={(value) => {
                            let event = { target: { name: "purposeOfPayment", value: value.value } };
                            handleChange(event);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card-footer d-sm-flex align-items-sm-center">
                    <button type="button" className="btn btn-ghost-secondary" onClick={() => props.onSetTabs(null, "tab2")}>
                      <i className="tio-chevron-left"></i> {t("SendMoney.Back")}
                    </button>

                    <div className="ml-auto">
                      {/* <button type="button" className="btn btn-info" disabled>
                        {t("SendMoney.Review.Pay_Send")}
                      </button> */}
                      <Link className="btn btn-info" to="/add-money" disabled={!values.purposeOfPayment}>
                        {t("SendMoney.Review.Pay_Send")}
                      </Link>
                      &nbsp; &nbsp;
                      <button type="submit" className="btn btn-primary" disabled={!values.purposeOfPayment}>
                        {t("SendMoney.Review.Confirm_and_Pay")} <i className="tio-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          />
        </div>
      </div>
      <InfoModal show={modalShow} onHide={() => setModalShow(false)} />
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
