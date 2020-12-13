import Select from 'react-select'
import React, { useEffect, useState } from 'react';
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { ErrorMessage } from "formik";
import { ActionCreators } from "../../../actions";
import ApiConstants from "../../../shared/config/apiConstants";
import { callApi } from "../../../services/apiService";
import { toastService } from "../../../services/toastService";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'


function BranchList(props) {
  const [loader, setLoader] = useState(false);
  const { t } = props;

  useEffect(() => {
    if (props.branchId !== '')
      fetchList(props.branchId);
  }, [props.branchId]);

  const fetchList = (branchId) => {
    setLoader(true);
    callApi("get", ApiConstants.FETCH_BRANCHES + branchId)
      .then((response) => {
        setLoader(false);
        if (response.code === 200) props.setData(response.data);
        else toastService.error(response.message);
      })
      .catch((e) => {
        setLoader(false);
        toastService.error(e.message);
      });
  };

  return (
    loader ? <div className="form-group"> {t("AddMoney.Direct_Debit.LoadingBranches")}.. <Loader
      type="ThreeDots"
      color="#d25257"
      height={25}
      width={25}
    /></div> :
      <div className="form-group">
        <label className="text-dark"><b>{t("AddMoney.Direct_Debit.FinancialInstitutionBranch")}</b></label>
        <Select
          name="FinancialInstitutionBranchId"
          options={
            props.list.map(l => {
              return {
                value: l.Id,
                label: l.Description
              };
            })
          }
          error={props.errors.FinancialInstitutionBranchId}
          className={`${props.errors.FinancialInstitutionBranchId ? "is-invalid" : ""}`}
          id="FinancialInstitutionBranchId" isSearchable={true} onChange={props.onChange} />
        <ErrorMessage name="FinancialInstitutionBranchId">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
      </div>
  );
}

const mapStateToProps = (state) => {
  return {
    list: state.lookupsReducer.branchList,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setData: (data) => dispatch(ActionCreators.branchListAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(BranchList));