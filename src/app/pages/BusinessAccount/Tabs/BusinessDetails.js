import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

import { callApi } from "../../../services/apiService";
import ApiConstants from "../../../shared/config/apiConstants";
import { toastService } from "../../../services/toastService";

import AppLoader from "../../../components/AppLoader/AppLoader";
import CountryList from "../../../components/CountryList/CountryList";
import ProvinceList from "../../../components/ProvinceList/ProvinceList";
import CityList from "../../../components/CityList/CityList";
import CategoryList from "../../../components/CategoryList/CategoryList";
import SubCategoryList from "../../../components/SubCategoryList/SubCategoryList";
import TransactionValueList from "../../../components/TransactionValueList/TransactionValueList";
import TransactionNumberList from "../../../components/TransactionNumberList/TransactionNumberList";

const BusinessDetails = (props) => {
  const { t } = props;
  const [isSubmitted, setisSubmitted] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [businessDetailsData, setBusinessDetailsData] = useState({
    companyName: "",
    businessAccountShareHoldersDirectorsList: [
      {
        firstName: "",
        lastName: "",
        email: "",
        sharePercentage: "",
        isShareHolder: false,
        isDirector: false,
      },
    ],
    registrationNo: "",
    taxNumber: "",
    address: "",
    country: "",
    city: "",
    state: "",
    pep: false,
    dpep: false,
    category: "",
    subCategory: "",
    website: "",
    numberOfTransactionPerMonth: "",
    valueOfTransactionPerMonth: "",
  });

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required(t("Settings.BusinessAccount.ComapnyNameRequiredValidationLabel")),
    businessAccountShareHoldersDirectorsList: Yup.array().of(
      Yup.object().shape({
        firstName: Yup.string().required(t("Settings.BusinessAccount.FirstNameRequiredValidationLabel")),
        lastName: Yup.string().required(t("Settings.BusinessAccount.LastNameRequiredValidationLabel")),
        email: Yup.string()
          .required(t("Settings.BusinessAccount.EmailRequiredValidationLabel"))
          .email(t("Settings.BusinessAccount.EmailPatternValidationLabel")),
        isShareHolder: Yup.boolean(),
        sharePercentage: Yup.string().when("isShareHolder", {
          is: true,
          then: Yup.string().required(t("Settings.BusinessAccount.SharePercentageRequiredValidationLabel")),
        }),
      })
    ),
    registrationNo: Yup.string().required(t("Settings.BusinessAccount.RegistrationNoRequiredValidationLabel")),
    taxNumber: Yup.string().required(t("Settings.BusinessAccount.TaxNoRequiredValidationLabel")),
    address: Yup.string().required(t("Settings.BusinessAccount.AddressRequiredValidationLabel")),
    country: Yup.string().required(t("SignUp.CountryRequiredValidationLabel")),
    city: Yup.mixed().required(t("Settings.BusinessAccount.CityRequiredValidationLabel")),
    state: Yup.mixed().required(t("Settings.BusinessAccount.ProvinceRequiredValidationLabel")),
    category: Yup.string().required(t("Settings.BusinessAccount.CategoryRequiredValidationLabel")),
    subCategory: Yup.string().required(t("Settings.BusinessAccount.SubCategoryRequiredValidationLabel")),
    website: Yup.string().required(t("Settings.BusinessAccount.WebsiteRequiredValidationLabel")),
    valueOfTransactionPerMonth: Yup.string().required(t("Settings.BusinessAccount.ValueofTransactionRequiredValidationLabel")),
    numberOfTransactionPerMonth: Yup.string().required(t("Settings.BusinessAccount.NumberofTransactionRequiredValidationLabel")),
  });

  useEffect(() => {
    fetchBusinesstDetails();
  }, []);

  const updateBusinessAccount = (values) => {
    setShowLoader(true);
    
    values.businessAccountShareHoldersDirectorsList.forEach(item => {
      item.sharePercentage = item.isShareHolder ? item.sharePercentage : 0
    });
    values.transactionNumberPm = values.valueOfTransactionPerMonth;
    values.transactionValuePm = values.numberOfTransactionPerMonth;
    callApi("put", ApiConstants.UPDATE_BUSINESS_ACCOUNT, values, true)
      .then((response) => {
        setShowLoader(false);
        if (response.code === 200) {
          toastService.success(response.message);
        }
      })
      .catch((e) => {
        setShowLoader(false);
        toastService.error(e.message);
      });
  }

  const fetchBusinesstDetails = () => {
    setShowLoader(true);
    callApi("get", ApiConstants.GET_BUSINESS_ACCOUNT_DETAILS, null, true)
      .then((response) => {
        setShowLoader(false);
        if (response.code === 200) {
          setBusinessDetailsData(response.data);
        } else {
          toastService.error(response.message);
        }
      })
      .catch((e) => {
        setShowLoader(false);
        toastService.error(e.message);
      });
  };

  return (
    <React.Fragment>
      <AppLoader show={showLoader} />
      <div id="BusinessDetails" className="card card-lg active business-details" style={{ display: `${props.active ? "block" : "none"}` }}>
        <Formik
          enableReinitialize={true}
          initialValues={businessDetailsData}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            updateBusinessAccount(values)
          }}>
          {({ errors, handleChange, values, setFieldValue }) => (
            <Form>
              <div className="card-body" style={{ padding: "2rem" }}>
                <div className="row form-group">
                  <div className="col-sm-12 text-center">
                    <div className="d-block align-items-center">
                      <label className="avatar avatar-xl avatar-circle avatar-uploader mr-5" htmlFor="avatarUploader">
                        <img id="avatarImg" className="avatar-img" src="./assets/img/160x160/img1.jpg" />
                        <input type="file" className="js-file-attach avatar-uploader-input" id="avatarUploader" />
                        <span className="avatar-uploader-trigger">
                          <i className="tio-edit avatar-uploader-icon shadow-soft"></i>
                        </span>
                      </label>
                    </div>
                    <div className={`verifiedLabel ${businessDetailsData.kycVerified ? "" : "not-verified"}`}>
                      <b>
                        <i className={businessDetailsData.kycVerified ? "fas fa-check-circle" : "fas fa-times"}></i>
                        {businessDetailsData.kycVerified ? t("Settings.Verified") : t("Settings.PendingVerification")}
                      </b>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <Field
                        type="text"
                        className={`form-control ${errors.companyName && isSubmitted ? "is-invalid" : ""}`}
                        name="companyName"
                        id=""
                        placeholder={t("Settings.BusinessAccount.CompanyNameLabel")}
                        disabled= {true}
                      />
                      <ErrorMessage name="companyName">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                </div>

                <FieldArray
                  name="businessAccountShareHoldersDirectorsList"
                  render={(arrayHelpers) => (
                    <React.Fragment>
                      <div className="row">
                        <div className="col-md-4 col-6">
                          <label>Members:</label>
                        </div>
                        <div className="col-md-8 col-6">
                          <a
                            href="#"
                            onClick={(event) => {
                              event.preventDefault();
                              arrayHelpers.push("");
                            }}
                            className="form-link float-right mt-0">
                            <i className="tio-add"></i> Add Member
                          </a>
                        </div>
                      </div>
                      {values.businessAccountShareHoldersDirectorsList.map((item, index) => (
                        <div key={index} className="custom-memberBlock">
                          <div className="row">
                            <div className="col-sm-4">
                              <div className="form-group">
                                <Field
                                  name={`businessAccountShareHoldersDirectorsList.${index}.firstName`}
                                  type="text"
                                  className={`form-control ${
                                    errors.businessAccountShareHoldersDirectorsList &&
                                    errors.businessAccountShareHoldersDirectorsList[index] &&
                                    errors.businessAccountShareHoldersDirectorsList[index].firstName &&
                                    isSubmitted
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  id="firstName"
                                  placeholder="First Name"
                                  disabled={values.businessAccountShareHoldersDirectorsList[index].id ? true : false}
                                />
                                <ErrorMessage name={`businessAccountShareHoldersDirectorsList.${index}.firstName`}>
                                  {(msg) => <div className="invalid-feedback">{msg}</div>}
                                </ErrorMessage>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                                <Field
                                  name={`businessAccountShareHoldersDirectorsList.${index}.lastName`}
                                  type="text"
                                  className={`form-control ${
                                    errors.businessAccountShareHoldersDirectorsList &&
                                    errors.businessAccountShareHoldersDirectorsList[index] &&
                                    errors.businessAccountShareHoldersDirectorsList[index].lastName &&
                                    isSubmitted
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  id="lastName"
                                  placeholder="Last Name"
                                  disabled={values.businessAccountShareHoldersDirectorsList[index].id ? true : false}
                                />
                                <ErrorMessage name={`businessAccountShareHoldersDirectorsList.${index}.lastName`}>
                                  {(msg) => <div className="invalid-feedback">{msg}</div>}
                                </ErrorMessage>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                                <div className="input-group-add-field mt-0">
                                  <Field
                                    name={`businessAccountShareHoldersDirectorsList.${index}.email`}
                                    type="text"
                                    className={`form-control ${
                                      errors.businessAccountShareHoldersDirectorsList &&
                                      errors.businessAccountShareHoldersDirectorsList[index] &&
                                      errors.businessAccountShareHoldersDirectorsList[index].email &&
                                      isSubmitted
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    id="email"
                                    placeholder="Email"
                                    disabled={values.businessAccountShareHoldersDirectorsList[index].id ? true : false}
                                  />
                                  <ErrorMessage name={`businessAccountShareHoldersDirectorsList.${index}.email`}>
                                    {(msg) => <div className="invalid-feedback">{msg}</div>}
                                  </ErrorMessage>
                                  {values.businessAccountShareHoldersDirectorsList.length > 1 && !values.businessAccountShareHoldersDirectorsList[index].id && (
                                    <a
                                      className="input-group-add-field-delete"
                                      href="#"
                                      onClick={(event) => {
                                        event.preventDefault();
                                        arrayHelpers.remove(index);
                                      }}>
                                      <i className="tio-clear"></i>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                  <Field
                                    name={`businessAccountShareHoldersDirectorsList.${index}.isDirector`}
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={`isDirector${index}`}
                                    disabled={values.businessAccountShareHoldersDirectorsList[index].id ? true : false}
                                  />
                                  <label className="custom-control-label font-size-sm text-muted" htmlFor={`isDirector${index}`}>
                                    Director
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                  <Field
                                    name={`businessAccountShareHoldersDirectorsList.${index}.isShareHolder`}
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={`isShareholder${index}`}
                                    disabled={values.businessAccountShareHoldersDirectorsList[index].id ? true : false}
                                  />
                                  <label className="custom-control-label font-size-sm text-muted" htmlFor={`isShareholder${index}`}>
                                    Shareholder
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div className="form-group" style={{ height: "32px" }}>
                                {values.businessAccountShareHoldersDirectorsList[index].isShareHolder && (
                                  <Field
                                    name={`businessAccountShareHoldersDirectorsList.${index}.sharePercentage`}
                                    type="text"
                                    className={`form-control ${
                                      errors.businessAccountShareHoldersDirectorsList &&
                                      errors.businessAccountShareHoldersDirectorsList[index] &&
                                      errors.businessAccountShareHoldersDirectorsList[index].sharePercentage &&
                                      isSubmitted
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    value={
                                      values.businessAccountShareHoldersDirectorsList[index].isShareHolder
                                        ? values.businessAccountShareHoldersDirectorsList[index].sharePercentage
                                        : ""
                                    }
                                    id="sharePercentage"
                                    placeholder="Percentage of share"
                                    disabled={values.businessAccountShareHoldersDirectorsList[index].id ? true : false}
                                  />
                                )}
                                <ErrorMessage name={`businessAccountShareHoldersDirectorsList.${index}.sharePercentage`}>
                                  {(msg) => <div className="invalid-feedback">{msg}</div>}
                                </ErrorMessage>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  )}
                />

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <Field
                        type="text"
                        className={`form-control ${errors.registrationNo && isSubmitted ? "is-invalid" : ""}`}
                        name="registrationNo"
                        id=""
                        placeholder={t("Settings.BusinessAccount.RegistrationNo")}
                        disabled= {true}
                      />
                      <ErrorMessage name="registrationNo">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <Field
                        type="text"
                        className={`form-control ${errors.taxNumber && isSubmitted ? "is-invalid" : ""}`}
                        name="taxNumber"
                        id=""
                        placeholder={t("Settings.BusinessAccount.TaxNumber")}
                        disabled= {true}
                      />
                      <ErrorMessage name="taxNumber">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <Field
                        type="text"
                        className={`form-control ${errors.address && isSubmitted ? "is-invalid" : ""}`}
                        name="address"
                        id=""
                        placeholder={t("Settings.BusinessAccount.Address")}
                      />
                      <ErrorMessage name="address">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <CountryList
                        value={values.country}
                        isSearchable={true}
                        onChange={(value) => {
                          setFieldValue("state", "");
                          setFieldValue("city", "");
                          let event = { target: { name: "country", value: value.value } };
                          setTimeout(() => {
                            handleChange(event);
                          }, 10);
                        }}
                        className={`form-control ${errors.country && isSubmitted ? " is-invalid" : ""}`}
                        error={errors.country}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <ProvinceList
                        isSearchable={true}
                        value={values.state}
                        countryId={values.country}
                        onChange={(value) => {
                          setFieldValue("city", "");
                          let event = { target: { name: "state", value: value.value } };
                          setTimeout(() => {
                            handleChange(event);
                          }, 10);
                        }}
                        className={errors.state && isSubmitted ? " is-invalid" : ""}
                        error={errors.state}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <CityList
                        isSearchable={true}
                        value={values.city}
                        stateId={values.state}
                        onChange={(value) => {
                          let event = { target: { name: "city", value: value.value } };
                          handleChange(event);
                        }}
                        className={errors.city && isSubmitted ? " is-invalid" : ""}
                        error={errors.city}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Are you a political exposed person(PEP)?</label>
                  <div className="input-group input-group-sm-down-break">
                    <Field
                      name="pep"
                      render={({ field }) => (
                        <div className="form-control radioBlock">
                          <div className="custom-control custom-radio stopFloating">
                            <input
                              type="radio"
                              className="custom-control-input"
                              name="pepType"
                              checked={field.value === true}
                              id="quesO1"
                              onChange={() => {
                                let event = { target: { name: "pep", value: true } };
                                handleChange(event);
                              }}
                            />
                            <label className="custom-control-label" htmlFor="quesO1">
                              Yes
                            </label>
                          </div>
                          <div className="custom-control custom-radio stopFloating">
                            <input
                              type="radio"
                              className="custom-control-input"
                              name="pepType"
                              checked={field.value === false}
                              id="quesO2"
                              onChange={() => {
                                let event = { target: { name: "pep", value: false } };
                                handleChange(event);
                              }}
                            />
                            <label className="custom-control-label" htmlFor="quesO2">
                              No
                            </label>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Are you directly related to a political exposed person(PED)?</label>
                  <div className="input-group input-group-sm-down-break">
                    <Field
                      name="dpep"
                      render={({ field }) => (
                        <div className="form-control radioBlock">
                          <div className="custom-control custom-radio stopFloating">
                            <input
                              type="radio"
                              className="custom-control-input"
                              name="dpepType"
                              checked={field.value === true}
                              id="quesT1"
                              onChange={() => {
                                let event = { target: { name: "dpep", value: true } };
                                handleChange(event);
                              }}
                            />
                            <label className="custom-control-label" htmlFor="quesT1">
                              Yes
                            </label>
                          </div>
                          <div className="custom-control custom-radio stopFloating">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="quesT2"
                              name="dpepType"
                              checked={field.value === false}
                              onChange={() => {
                                let event = { target: { name: "dpep", value: false } };
                                handleChange(event);
                              }}
                            />
                            <label className="custom-control-label" htmlFor="quesT2">
                              No
                            </label>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <CategoryList
                        value={values.category}
                        isSearchable={true}
                        placeholder="Select Category"
                        onChange={(value) => {
                          setFieldValue("subCategory", "");
                          let event = { target: { name: "category", value: value.value } };
                          handleChange(event);
                        }}
                        className={`form-control ${errors.category && isSubmitted ? " is-invalid" : ""}`}
                        error={errors.category}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <SubCategoryList
                        value={values.subCategory}
                        categoryId={values.category}
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
                  </div>

                  <div className="col-md-4">
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
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
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
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
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
              <div className="card-footer d-flex justify-content-end align-items-center">
                <button type="submit" className="btn btn-primary" onClick={() => setisSubmitted(true)}>
                  {t("Settings.Update")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(BusinessDetails);
