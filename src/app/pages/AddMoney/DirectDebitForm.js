import React, { useState } from 'react';
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Input from "./../../components/Formik/Input"
import { Form } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import BankList from "./Shared/BankList";
import BranchList from "./Shared/BranchList"
import AppLoader from "./../../components/AppLoader/AppLoader";

import ApiConstants from "./../../shared/config/apiConstants";
import { callApi } from "./../../services/apiServices";
import { toastService } from "./../../services/toastService";

function DirectDebitForm(props){

    const [branchId, setBranchId] = useState('');
    const [loader, setLoader] = useState(false);
    const { t } = props;

    const schema = yup.object({
      FirstName: yup.string().required(t("AddMoney.Direct_Debit.Errors.FirstName")),
      LastName: yup.string().required(t("AddMoney.Direct_Debit.Errors.LastName")),
      AccountName: yup.string().required(t("AddMoney.Direct_Debit.Errors.AccountName")),
      AccountNumber: yup.string().required(t("AddMoney.Direct_Debit.Errors.AccountNumber")),
      FinancialInstitutionId: yup.number().required(t("AddMoney.Direct_Debit.Errors.Institute")),
      FinancialInstitutionBranchId: yup.number().required(t("AddMoney.Direct_Debit.Errors.Branch")),
    });

    function submitData(data){
      data.CustomerTypeCode = "P"
      data.ProgramList = ["EFT"]
      setLoader(true);
      callApi("post", ApiConstants.POST_BANK_DETAILS, data)
        .then((response) => {
          console.log(response);
          setLoader(false);
          if (response.code === 200) toastService.success("Successfully saved!");
          else toastService.error(response.message);
        })
        .catch((e) => {
          setLoader(false);
          toastService.error(e.message);
        });
    }

    return (
      loader ? <AppLoader show /> :
        <Formik
      validationSchema={schema}
      onSubmit={submitData}
      initialValues={{
        FirstName: '',
        LastName: '',
        AccountName: '',
        AccountNumber: '',
        FinancialInstitutionId: '',
        FinancialInstitutionBranchId: ''
      }}
    >
        {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
        <div className="">

        <Input 
              name="FirstName"
              placeholder="First Name"
              handleChange={handleChange}
              values={values} 
              errors={errors} />

          <Input 
              name="LastName"
              placeholder="Last Name"
              handleChange={handleChange}
              values={values} 
              errors={errors} />

          <Input 
            name="AccountName"
            placeholder="Account Name"
            handleChange={handleChange}
            values={values} 
            errors={errors} />

          <Input 
              name="AccountNumber"
              placeholder="Account Number"
              handleChange={handleChange}
              values={values} 
              errors={errors} />
                  
          <BankList
            errors={errors}
            onChange={x => {
                values.FinancialInstitutionId = x.value;
                values.FinancialInstitutionBranchId = ''
                setBranchId(x.value)
            }}
            />

          <BranchList
            errors={errors}
            branchId={branchId}
            onChange={x => values.FinancialInstitutionBranchId = x.value}
            />


              <div className="col-md-12 text-center mt-2">
              <button type="submit" className="btn btn-primary width100"> Add my account</button>
            </div>
            </div>
            </Form>
            )}
            </Formik>
    );
}

const mapStateToProps = (state) => ({
    userToken: state.userReducer.userToken,
  });
  
  export default connect(mapStateToProps)(withTranslation()(DirectDebitForm));