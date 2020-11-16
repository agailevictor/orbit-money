import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { callApi } from "../../../services/apiService";
import ApiConstants from "../../../shared/config/apiConstants";
import { tostService } from "../../../services/toastService";

import AppLoader from "../../../components/AppLoader/AppLoader";
import Select2 from "../../../components/Select2/Select2";
import CountryList from "../../../components/CountryList/CountryList";

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

  const [countryOptions, setCountryOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
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

  const fetchCountries = (personalData) => {
    callApi("get", ApiConstants.FETCH_COUNTRIES)
      .then((response) => {
        if (response.code === 200) {
          setCountryOptions(response.dataList);
          let index = response.dataList.findIndex((country) => country.id === personalData.country);
          index > -1 &&
            setPersonalData({
              ...personalData,
              country: {
                value: response.dataList[index].id,
                label: (
                  <div>
                    <img
                      src={response.dataList[index].url}
                      className="avatar avatar-xss avatar-circle mr-2"
                      style={{ width: "1rem", height: "1rem", marginTop: "-3px" }}
                    />
                    {response.dataList[index].alpha3Code}
                  </div>
                ),
              },
            });
          if (personalData.state !== "") {
            fetchProvinces(personalData.country);
          }
        } else {
          // tostService.error(response.message, { autoClose: true });
        }
      })
      .catch((e) => {
        // tostService.error(e.message, { autoClose: true });
      });
  };

  useEffect(() => {
    fetchPersonalAccountDetails();
  }, []);

  useEffect(() => {}, [countryOptions]);

  const fetchProvinces = (value) => {
    callApi("get", ApiConstants.FETCH_PROVINCES + value)
      .then((response) => {
        if (response.code === 200) {
          setProvinceOptions(response.dataList);
        } else {
          //tostService.error(response.message, { autoClose: true });
        }
      })
      .catch((e) => {
        // tostService.error(e.message, { autoClose: true });
      });
  };

  useEffect(() => {
    let index = provinceOptions.findIndex((state) => state.id === personalData.state);
    index > -1 &&
      setPersonalData({
        ...personalData,
        state: {
          value: provinceOptions[index].id,
          label: <div>{provinceOptions[index].title}</div>,
        },
      });
    if (personalData.state !== "") {
      fetchCities(personalData.state);
    }
  }, [provinceOptions]);

  const fetchCities = (value) => {
    callApi("get", ApiConstants.FETCH_CITIES + value)
      .then((response) => {
        if (response.code === 200) {
          setCityOptions(response.dataList);
        } else {
          //tostService.error(response.message, { autoClose: true });
        }
      })
      .catch((e) => {
        //tostService.error(e.message, { autoClose: true });
      });
  };

  useEffect(() => {
    let index = cityOptions.findIndex((city) => city.id === personalData.city);
    index > -1 &&
      setPersonalData({
        ...personalData,
        city: {
          value: cityOptions[index].id,
          label: <div>{cityOptions[index].title}</div>,
        },
      });
  }, [cityOptions]);

  const fetchPersonalAccountDetails = () => {
    setShowLoader(true);
    callApi("get", ApiConstants.FETCH_PERSONAL_ACCOUNT_DETAILS)
      .then((response) => {
        setShowLoader(false);
        if (response.code === 200) {
          setPersonalData(response.data);
          if (response.data.country !== "") {
            fetchCountries(response.data);
          }
        } else {
          tostService.error(response.message, { autoClose: true });
        }
      })
      .catch((e) => {
        setShowLoader(false);
        tostService.error(e.message, { autoClose: true });
      });
  };

  const updatePersonalAccountDetails = (values) => {
    setShowLoader(true);
    callApi("put", ApiConstants.UPDATE_PERSONAL_ACCOUNT_DETAILS, {
      firstName: values.firstName,
      lastName: values.lastName,
      address: values.address,
      country: values.country.value,
      state: values.state.value,
      city: values.city.value,
      pep: values.pep === "true" ? true : false,
      dpep: values.dped === "true" ? true : false,
    })
      .then((response) => {
        setShowLoader(false);
        if (response.code === 200) {
          tostService.success(response.message, { autoClose: true });
        } else {
          tostService.error(response.message, { autoClose: true });
        }
      })
      .catch((e) => {
        setShowLoader(false);
        tostService.error(e.message, { autoClose: true });
      });
  };

  const renderOptions = (options) => {
    return options.map((option) => {
      return {
        value: option.id,
        label: <div>{option.title}</div>,
      };
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
          }}
        >
          {({ errors, touched, handleChange, values, setFieldValue }) => (
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
                        className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
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
                        className={`form-control ${errors.middleName ? "is-invalid" : ""}`}
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
                        className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
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
                        className={`form-control ${errors.address ? "is-invalid" : ""}`}
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
                        options={countryOptions}
                        value={values.country}
                        isSearchable={true}
                        onChange={(value) => {
                          let event = { target: { name: "country", value: value } };
                          handleChange(event);
                          setFieldValue("state", "");
                          fetchProvinces(value.value);
                        }}
                        className={`form-control ${errors.country ? " is-invalid" : ""}`}
                        error={errors.country}
                        touched={touched.country}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <Select2
                        options={renderOptions(provinceOptions)}
                        value={values.state}
                        className={errors.state ? "is-invalid" : ""}
                        placeholder={t("Settings.PersonalAccount.Province")}
                        isSearchable={true}
                        onChange={(value) => {
                          console.log("value", value);
                          let event = { target: { name: "state", value: value } };
                          handleChange(event);
                          setFieldValue("city", "");
                          fetchCities(value.value);
                        }}
                        error={errors.state}
                        touched={touched.state}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <Select2
                        options={renderOptions(cityOptions)}
                        value={values.city}
                        className={errors.city ? "is-invalid" : ""}
                        style={{ padding: "0" }}
                        placeholder={t("Settings.PersonalAccount.City")}
                        isSearchable={true}
                        onChange={(value) => {
                          let event = { target: { name: "city", value: value } };
                          handleChange(event);
                        }}
                        error={errors.city}
                        touched={touched.city}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>{t("Settings.PersonalAccount.PEPQuestion")}</label>
                  <div className="input-group input-group-sm-down-break">
                    <div className="form-control radioBlock">
                      <div className="custom-control custom-radio stopFloating">
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="pep"
                          defaultChecked={values.pep ? true : false}
                          id="quesO1"
                          value={true}
                          onChange={handleChange}
                        />
                        <label className="custom-control-label" htmlFor="quesO1">
                          {t("Settings.PersonalAccount.Yes")}
                        </label>
                      </div>
                      <div className="custom-control custom-radio stopFloating">
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="pep"
                          defaultChecked={!values.pep ? true : false}
                          id="quesO2"
                          value={false}
                          onChange={handleChange}
                        />
                        <label className="custom-control-label" htmlFor="quesO2">
                          {t("Settings.PersonalAccount.No")}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>{t("Settings.PersonalAccount.PEDQuestion")}</label>
                  <div className="input-group input-group-sm-down-break">
                    <div className="form-control radioBlock">
                      <div className="custom-control custom-radio stopFloating">
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="dped"
                          defaultChecked={values.dped ? true : false}
                          id="quesT1"
                          value={true}
                          onChange={handleChange}
                        />
                        <label className="custom-control-label" htmlFor="quesT1">
                          {t("Settings.PersonalAccount.Yes")}
                        </label>
                      </div>
                      <div className="custom-control custom-radio stopFloating">
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="dped"
                          defaultChecked
                          id="quesT2"
                          defaultChecked={!values.dped ? true : false}
                          onChange={handleChange}
                        />
                        <label className="custom-control-label" htmlFor="quesT2">
                          {t("Settings.PersonalAccount.No")}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-end align-items-center">
                <button type="submit" className="btn btn-primary">
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
