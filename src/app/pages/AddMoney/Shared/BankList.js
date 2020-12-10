import Select from 'react-select'
import React, { useEffect } from 'react';
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Formik, ErrorMessage } from "formik";
import { ActionCreators } from "../../../actions";
import ApiConstants from "../../../shared/config/apiConstants";
import { callApi } from "../../../services/apiServices";
import { toastService } from "../../../services/toastService";

function BankList(props){
    const { t } = props;
    useEffect(() => {
        if (props.bankList && !props.bankList.length) fetchBanks();
      }, []);
    
      const fetchBanks = () => {
        callApi("get", ApiConstants.FETCH_BANKS)
          .then((response) => {
            if (response.code === 200) props.setData(response.data);
            else toastService.error(response.message);
          })
          .catch((e) => {
            toastService.error(e.message);
          });
      };
    
    return (
        <div className="form-group">  
            <label className="text-dark"><b>{ t("AddMoney.Direct_Debit.FinancialInstitution") }</b></label>
            <Select
            name="FinancialInstitutionId"
            options={
                props.bankList.map(bank => {
                    return {
                        value: bank.institudeId,
                        label: bank.instituteName
                    };
                })
            }
            error={props.errors.FinancialInstitutionId}
            className={`${props.errors.FinancialInstitutionId ? "is-invalid" : ""}`}
            id="FinancialInstitutionId" isSearchable={true} onChange={props.onChange} />
            <ErrorMessage name="FinancialInstitutionId">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        bankList: state.lookupsReducer.bankList,
    };
  };
  
  const mapDispatchToProps = (dispatch, getState) => {
    return {
      setData: (data) => dispatch(ActionCreators.bankListAction(data)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(BankList));