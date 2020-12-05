import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";

import ApiConstants from "../../../shared/config/apiConstants";
import { callApi } from "../../../services/apiService";
import { toastService } from "../../../services/toastService";

import AppLoader from "../../../components/AppLoader/AppLoader";
import CountryList from "../../../components/CountryList/CountryList";
import ProvinceList from "../../../components/ProvinceList/ProvinceList";
import CityList from "../../../components/CityList/CityList";
import OccupationGroup from "../../../components/OccupationGroup/OccupationGroup";
import OccupationList from "../../../components/OccupationList/OccupationList";

const PersonalDetails = (props) => {
  const { t } = props;
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t("Settings.PersonalAccount.FirstNameRequiredValidationLabel")),
    middleName: Yup.string().required(t("Settings.PersonalAccount.MiddleNameRequiredValidationLabel")),
    lastName: Yup.string().required(t("Settings.PersonalAccount.LastNameRequiredValidationLabel")),
    dateOfBirth: Yup.string().required(t("Settings.PersonalAccount.DateOfBirthRequiredValidationLabel")),
    postalCode: Yup.string().required(t("Settings.PersonalAccount.PostalCodeRequiredValidationLabel")),
    occupationId: Yup.string().required(t("Settings.PersonalAccount.OccupationRequiredValidationLabel")),
    occupationGroupId: Yup.string().required(t("Settings.PersonalAccount.OccupationTypeRequiredValidationLabel")),
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
    dateOfBirth: new Date(),
    postalCode: "",
    occupationId: "",
    occupationGroupId: "",
    address: "",
    country: "",
    city: "",
    state: "",
    pep: "false",
    dpep: "false",
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
          let data = {
            ...response.data,
            pep: response.data.pep ? response.data.pep : false,
            dpep: response.data.dpep ? response.data.dpep : false,
          };
          setPersonalData(data);
        } else {
          toastService.error(response.message);
        }
      })
      .catch((e) => {
        setShowLoader(false);
        toastService.error(e.message);
      });
  };

  const updatePersonalAccountDetails = (values) => {
    setShowLoader(true);
    let params = { ...values };
    callApi("put", ApiConstants.UPDATE_PERSONAL_ACCOUNT_DETAILS, params)
      .then((response) => {
        setShowLoader(false);
        if (response.code === 200) {
          if (response.data && response.data.token) {
            localStorage.setItem("authToken", response.data.token);
            props.history.push("/dashboard");
          }
          toastService.success(response.message);
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
                        <div class="avatarCircle">
                          <span class="initials">{personalData.firstName ? personalData.firstName.charAt(0).toUpperCase() + personalData.lastName.charAt(0).toUpperCase() : "NA"}</span>
                        </div>
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
                  <div className="col-md-3">
                    <div className="form-group input-group-merge">
                      <DateRangePicker
                        key={moment(personalData.dateOfBirth).format("MM/DD/YYYY")}
                        initialSettings={{
                          singleDatePicker: true,
                          showDropdowns: true,
                          minYear: 1970,
                          maxYear: parseInt(moment().format("YYYY"), 10),
                          autoApply: true,
                          autoUpdateInput: false,
                          isCustomDate: true,
                          startDate: moment(personalData.dateOfBirth).format("MM/DD/YYYY"),
                        }}
                        onApply={(event, picker) => {
                          picker.element.val(moment(picker.startDate).format("YYYY-MM-DD"));
                          let e = { target: { name: "dateOfBirth", value: moment(picker.startDate).format("YYYY-MM-DD") } };
                          handleChange(e);
                        }}>
                        <input
                          name="dateOfBirth"
                          id="dateOfBirth"
                          placeholder={t("Settings.PersonalAccount.DateOfBirth")}
                          type="text"
                          className={`form-control ${errors.dateOfBirth && isSubmitted ? "is-invalid" : ""}`}
                          style={{ backgroundColor: "transparent", position: "relative", zIndex: 1 }}
                          defaultValue=""
                        />
                      </DateRangePicker>
                      <ErrorMessage name="dateOfBirth">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                      <div className="input-group-append" style={{ zIndex: 0 }}>
                        <Link to="" className="input-group-text" onClick={(e) => e.preventDefault()}>
                          <i className="fa fa-calendar"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <Field
                        type="text"
                        className={`form-control ${errors.postalCode && isSubmitted ? "is-invalid" : ""}`}
                        name="postalCode"
                        id="postalCode"
                        placeholder={t("Settings.PersonalAccount.PostalCode")}
                      />
                      <ErrorMessage name="postalCode">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <OccupationGroup
                        isSearchable={true}
                        value={values.occupationGroupId}
                        className={`form-control ${errors.occupationGroupId && isSubmitted ? "is-invalid" : ""}`}
                        name="occupationGroupId"
                        id="occupationGroupId"
                        placeholder={t("Settings.PersonalAccount.OccupationType")}
                        onChange={(value) => {
                          let event = { target: { name: "occupationGroupId", value: value.value } };
                          handleChange(event);
                        }}
                        error={errors.occupationGroupId}
                      />
                      <ErrorMessage name="occupationGroupId">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <OccupationList
                        isSearchable={true}
                        groupId={values.occupationGroupId}
                        value={values.occupationId}
                        className={`form-control ${errors.occupationId && isSubmitted ? "is-invalid" : ""}`}
                        name="occupationId"
                        id="occupationId"
                        placeholder={t("Settings.PersonalAccount.Occupation")}
                        onChange={(value) => {
                          let event = { target: { name: "occupationId", value: value.value } };
                          handleChange(event);
                        }}
                        error={errors.occupationId}
                      />
                      <ErrorMessage name="occupationId">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <Field
                        name="address"
                        type="text"
                        className={`form-control ${errors.address && isSubmitted ? "is-invalid" : ""}`}
                        id="address"
                        placeholder="Address"
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
