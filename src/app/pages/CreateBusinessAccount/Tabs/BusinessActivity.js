import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import AppLoader from "../../../components/AppLoader/AppLoader";
import { ActionCreators } from "../../../actions";
import ApiConstants from "../../../shared/config/apiConstants";
import { callApi } from "../../../services/apiService";
import { toastService } from "../../../services/toastService";
import CategoryList from "../../../components/CategoryList/CategoryList";
import SubCategoryList from "../../../components/SubCategoryList/SubCategoryList";
import TransactionValueList from "../../../components/TransactionValueList/TransactionValueList";
import TransactionNumberList from "../../../components/TransactionNumberList/TransactionNumberList";

const BusinessActivity = (props) => {
  const initValues = {
    categoryId: "",
    subCategory: "",
    website: "",
    valueOfTransactionPerMonth: "",
    numberOfTransactionPerMonth: "",
  };
  const [showLoader, setShowLoader] = useState(false);
  const [businessActivityData, setbusinessActivityData] = useState(initValues);
  const [isSubmitted, setisSubmitted] = useState(false);

  const validationSchema = Yup.object().shape({
    categoryId: Yup.string().required("Required"),
    subCategory: Yup.string().required("Required"),
    website: Yup.string().required("Required"),
    valueOfTransactionPerMonth: Yup.string().required("Required"),
    numberOfTransactionPerMonth: Yup.string().required("Required"),
  });

  const setCustomerAccounts = (id, type) => {
    const selectedAccount = { businessId: "", id: id, title: props.registrationData.companyName, type: type }
    localStorage.setItem("selectedCustomerAccount", JSON.stringify(selectedAccount));
    callApi(
      "post",
      ApiConstants.SWITCH_CUSTOMER_ACCOUNTS, { id: id, type: type },
      false
    )
      .then((response) => {
        if (response.code === 200) {
          localStorage.setItem("CustomerAccountToken", response.data.token);
        }
      })
      .catch((error) => {
        toastService.error(error.message, { position: "top-right",});
      });
  }

  const createBusinessAccount = (businessData) => {
    setShowLoader(true);
    let params = { ...props.registrationData, ...businessData };
    callApi("post", ApiConstants.CREATE_BUSINESS_ACCOUNT, params)
      .then((response) => {
        if (response.code === 200) {
          setCustomerAccounts(response.data.businessAccountId, "BUSINESS")
          toastService.success(response.message);
          setShowLoader(false);
          props.onSetTabs(null, "tab3");
        }
      })
      .catch((e) => {
        toastService.error(e.message);
        setShowLoader(false);
      });
  };

  return (
    <React.Fragment>
      <AppLoader show={showLoader} />
      <div id="stepBusinessActivity" className={`step-card card-lg ${props.active ? "active" : ""}`}>
        <h1>Enter business activity</h1>
        <div className="card">
          <Formik
            enableReinitialize={true}
            initialValues={businessActivityData}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              let params = { ...values, companyType: 0 };
              createBusinessAccount(params);
            }}
            render={({ errors, handleChange, values, setFieldValue }) => (
              <Form>
                <div className="card-body">
                  <div className="form-group">
                    <CategoryList
                      value={values.categoryId}
                      isSearchable={true}
                      placeholder="Select Category"
                      onChange={(value) => {
                        setFieldValue("subCategory", "");
                        let event = { target: { name: "categoryId", value: value.value } };
                        handleChange(event);
                      }}
                      className={`form-control ${errors.categoryId && isSubmitted ? " is-invalid" : ""}`}
                      error={errors.categoryId}
                    />
                  </div>
                  <div className="form-group">
                    <SubCategoryList
                      value={values.subCategory}
                      categoryId={values.categoryId}
                      isSearchable={true}
                      placeholder="Select Subcategory"
                      onChange={(value) => {
                        let event = { target: { name: "subCategory", value: value.value } };
                        handleChange(event);
                      }}
                      className={`form-control ${errors.subCategory && isSubmitted ? " is-invalid" : ""}`}
                      error={errors.subCategory}
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="text"
                      className={`form-control ${errors.website && isSubmitted ? "is-invalid" : ""}`}
                      name="website"
                      id="website"
                      placeholder="Website or social media link"
                    />
                    <ErrorMessage name="website">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <TransactionValueList
                          value={values.valueOfTransactionPerMonth}
                          isSearchable={true}
                          placeholder="Value of Transaction per Month"
                          onChange={(value) => {
                            let event = { target: { name: "valueOfTransactionPerMonth", value: value.value } };
                            handleChange(event);
                          }}
                          className={`form-control ${errors.valueOfTransactionPerMonth && isSubmitted ? " is-invalid" : ""}`}
                          error={errors.valueOfTransactionPerMonth}
                        />
                      </div>
                      <div className="col-md-6">
                        <TransactionNumberList
                          value={values.numberOfTransactionPerMonth}
                          isSearchable={true}
                          placeholder="Number of Transaction per Month"
                          onChange={(value) => {
                            let event = { target: { name: "numberOfTransactionPerMonth", value: value.value } };
                            handleChange(event);
                          }}
                          className={`form-control ${errors.numberOfTransactionPerMonth && isSubmitted ? " is-invalid" : ""}`}
                          error={errors.numberOfTransactionPerMonth}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex align-items-center">
                  <button type="button" className="btn btn-ghost-secondary" onClick={() => props.onSetTabs(null, "tab1")}>
                    <i className="tio-chevron-left"></i> Back
                  </button>
                  <div className="ml-auto">
                    <button type="submit" className="btn btn-primary" onClick={() => setisSubmitted(true)}>
                      Continue <i className="tio-chevron-right"></i>
                    </button>
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
    registrationData: state.businessAccountReducer.registrationData,
    categories: state.lookupsReducer.categories,
    categories: state.lookupsReducer.subCategories,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setData: (data) => dispatch(ActionCreators.updateBusinessAccountAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BusinessActivity);
