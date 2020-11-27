import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import ApiConstants from "../../../shared/config/apiConstants";
import { callApi } from "../../../services/apiService";
import { toastService } from "../../../services/toastService";

import AppLoader from "../../../components/AppLoader/AppLoader";
import CountryList from "../../../components/CountryList/CountryList";
import ProvinceList from "../../../components/ProvinceList/ProvinceList";
import CityList from "../../../components/CityList/CityList";

const PersonalDetails = (props) => {
  const { t } = props;
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t("Settings.PersonalAccount.FirstNameRequiredValidationLabel")),
    middleName: Yup.string().required(t("Settings.PersonalAccount.MiddleNameRequiredValidationLabel")),
    lastName: Yup.string().required(t("Settings.PersonalAccount.LastNameRequiredValidationLabel")),
    address: Yup.string().required(t("Settings.PersonalAccount.AddressRequiredValidationLabel")),
    country: Yup.string().required(t("SignUp.CountryRequiredValidationLabel")),
    city: Yup.mixed().required(t("Settings.PersonalAccount.CityRequiredValidationLabel")),
    state: Yup.mixed().required(t("Settings.PersonalAccount.ProvinceRequiredValidationLabel")),
  });

  const [showLoader, setShowLoader] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [personalData, setPersonalData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    country: "",
    city: "",
    state: "",
    pep: "false",
    dped: "false",
  });

  useEffect(() => {
    fetchPersonalAccountDetails();
  }, []);

  const fetchPersonalAccountDetails = () => {
    setShowLoader(true);
    callApi("get", ApiConstants.FETCH_PERSONAL_ACCOUNT_DETAILS)
      .then((response) => {
        setShowLoader(false);
        if (response.code === 200) {
          setPersonalData(response.data);
        } else {
          toastService.error(response.message, { autoClose: true });
        }
      })
      .catch((e) => {
        setShowLoader(false);
        toastService.error(e.message, { autoClose: true });
      });
  };

  const updatePersonalAccountDetails = (values) => {
    setShowLoader(true);
    let params = {
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
      address: values.address,
      country: values.country,
      state: values.state,
      city: values.city,
      pep: values.pep,
      dpep: values.dpep,
    };
    callApi("put", ApiConstants.UPDATE_PERSONAL_ACCOUNT_DETAILS, params)
      .then((response) => {
        setShowLoader(false);
        if (response.code === 200) {
          toastService.success(response.message, { autoClose: true });
        } else {
          toastService.error(response.message, { autoClose: true });
        }
      })
      .catch((e) => {
        setShowLoader(false);
        toastService.error(e.message, { autoClose: true });
      });
  };

  return (
    <React.Fragment>
      <AppLoader show={showLoader} />
      <div id="PersonalDetails" className="card card-lg active" style={{ display: `${props.active ? "block" : "none"}` }}>
        <Formik
          enableReinitialize={true}
          initialValues={personalData}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            updatePersonalAccountDetails(values);
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
                    <div className={`verifiedLabel ${personalData.kycVerified ? "" : "not-verified"}`}>
                      <b>
                        <i className={personalData.kycVerified ? "fas fa-check-circle" : "fas fa-times"}></i>
                        {personalData.kycVerified ? t("Settings.Verified") : t("Settings.PendingVerification")}
                      </b>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <Field
                        type="text"
                        className={`form-control ${errors.firstName && isSubmitted ? "is-invalid" : ""}`}
                        name="firstName"
                        id="firstName"
                        placeholder={t("Settings.PersonalAccount.FirstName")}
                      />
                      <ErrorMessage name="firstName">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <Field
                        type="text"
                        className={`form-control ${errors.middleName && isSubmitted ? "is-invalid" : ""}`}
                        name="middleName"
                        id="middleName"
                        placeholder={t("Settings.PersonalAccount.MiddleName")}
                      />
                      <ErrorMessage name="middleName">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <Field
                        type="text"
                        className={`form-control ${errors.lastName && isSubmitted ? "is-invalid" : ""}`}
                        name="lastName"
                        id="lastName"
                        placeholder={t("Settings.PersonalAccount.LastName")}
                      />
                      <ErrorMessage name="lastName">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
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
                        id="Address"
                        placeholder={t("Settings.PersonalAccount.Address")}
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
                  <label>{t("Settings.PersonalAccount.PEPQuestion")}</label>
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
                              {t("Settings.PersonalAccount.Yes")}
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
                              {t("Settings.PersonalAccount.No")}
                            </label>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>{t("Settings.PersonalAccount.PEDQuestion")}</label>
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
                              {t("Settings.PersonalAccount.Yes")}
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
                              {t("Settings.PersonalAccount.No")}
                            </label>
                          </div>
                        </div>
                      )}
                    />
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

export default withTranslation()(PersonalDetails);
