import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import AppLoader from "../../../components/AppLoader/AppLoader";
import ApiConstants from "../../../shared/config/apiConstants";
import { callApi } from "../../../services/apiService";
import { toastService } from "../../../services/toastService";
import { ActionCreators } from "../../../actions";

const Recipient = (props) => {
  const { t } = props;

  const [beneficiaryList, setbeneficiaryList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedBeneficiary, setselectedBeneficiary] = useState(null);

  useEffect(() => {
    getBeneficiaryList();
  }, []);

  const getBeneficiaryList = () => {
    setShowLoader(true);
    callApi("get", ApiConstants.GET_BENEFICIARY_LIST, null)
      .then((response) => {
        if (response.code === 200) {
          setbeneficiaryList(response.dataList);
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
    props.onSetTabs(null, "tab4");
  };

  const selectBeneficiary = (beneficiary) => {
    setselectedBeneficiary(beneficiary);
    props.saveSendingAmountDetails({ ...props.sendMoneyData, beneficiary });
  };

  const searchBeneficiaryByName = (searchKey) => {
    setShowLoader(true);
    let params = { fullName: searchKey };
    callApi("post", ApiConstants.SEARCH_BENEFICIARY_LIST, params)
      .then((response) => {
        if (response.code === 200) {
          setbeneficiaryList(response.dataList);
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

  const serachBeneficiary = (event) => {
    if (event.charCode == 13) {
      let searchKey = event.target.value;
      if (searchKey) {
        searchBeneficiaryByName(searchKey);
      } else {
        getBeneficiaryList();
      }
    }
  };

  return (
    <React.Fragment>
      <AppLoader show={showLoader} />
      <div id="stepRecipient" className={`step-card-pay card-lg ${props.active ? "active" : ""}`}>
        <h1>{t("SendMoney.Recipient.Where_would_you_like_to_receive")}</h1>
        <div className="card">
          <div className="card-body radioCustom accordion" id="accordionExample">
            <div className="form-control bb-0" style={{ pointerEvents: "none", opacity: 0.5 }}>
              <div className="custom-control custom-radio">
                <input type="radio" className="custom-control-input" name="payType" id="payType1" />
                <label className="custom-control-label" htmlFor="payType1">
                  <div className="row">
                    <div className="col-md-12 col-xs-12">
                      <b>{t("SendMoney.Recipient.Share_by_Link")}</b> <br />
                      <span className="text-muted">{t("SendMoney.Recipient.Recipent_will_receive_payment_via_link")}</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div className="text-center mb-4">
              <span className="divider text-muted">
                <span className="orTxt">{t("SendMoney.Recipient.OR")}</span>
              </span>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="input-group input-group-sm-down-break align-items-center customControl">
                  <input
                    type="text"
                    className="js-masked-input form-control bdr-8"
                    name="phone"
                    id="searchBeneficiary"
                    placeholder={t("SendMoney.Recipient.Search_Beneficiary")}
                    onKeyPress={serachBeneficiary}
                  />

                  <div className="input-group-append"></div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                {!beneficiaryList.length && <div className="form-control no-list">{t("SendMoney.Recipient.No_Beneficiary_found")}</div>}
                {beneficiaryList.map((beneficiary, key) => {
                  return (
                    <div className="form-control" key={key}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="beneficiary"
                          id={`beneficiary${key}`}
                          onChange={() => {
                            selectBeneficiary(beneficiary);
                          }}
                        />
                        <label className="custom-control-label" htmlFor={`beneficiary${key}`}>
                          <div className="row">
                            <div className="col-sm-12 mb-2 mb-sm-0">
                              <h4 className="mb-2">
                                <i className="fas fa-money-check"></i> {t("SendMoney.Recipient.Beneficiary_Details")}
                              </h4>
                              <hr />
                              <div className="row">
                                <div className="col-md-6">
                                  <span className="d-block text-dark strong">Country:</span>
                                </div>
                                <div className="col-md-6">
                                  <span className="d-block text-dark">
                                    <img src="assets/svg/flags/canada.svg" style={{ width: "15px" }} /> {beneficiary.country}
                                  </span>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <span className="d-block text-dark strong">{t("SendMoney.Recipient.Currency")}</span>
                                </div>
                                <div className="col-md-6">
                                  <span className="d-block text-dark">{beneficiary.currency}</span>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <span className="d-block text-dark strong">{t("SendMoney.Recipient.Beneficiary_Full_Name")}</span>
                                </div>
                                <div className="col-md-6">
                                  <span className="d-block text-dark">{beneficiary.fullName} </span>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <span className="d-block text-dark strong">{t("SendMoney.Recipient.Bank_Name")}</span>
                                </div>
                                <div className="col-md-6">
                                  <span className="d-block text-dark">{beneficiary.bankName}</span>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <span className="d-block text-dark strong">{t("SendMoney.Recipient.IBAN")}</span>
                                </div>
                                <div className="col-md-6">
                                  <span className="d-block text-dark">{beneficiary.bankAccountNumber} </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card-footer d-flex align-items-center">
              <button type="button" className="btn btn-ghost-secondary" onClick={() => props.onSetTabs(null, "tab1")}>
                <i className="tio-chevron-left"></i> {t("SendMoney.Back")}
              </button>

              <div className="ml-auto">
                <button type="button" className="btn btn-primary" onClick={onProceedNext} disabled={!selectedBeneficiary}>
                  {t("SendMoney.Continue")} <i className="tio-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Recipient));
