import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { callApi } from "../../../services/apiService";
import ApiConstants from "../../../shared/config/apiConstants";
import { tostService } from "../../../services/toastService";

import Select2 from "../../../components/Select2/Select2";
import CountryList from "../../../components/CountryList/CountryList";

const BusinessDetails = (props) => {
  const { t } = props;
  const validationSchema = Yup.object().shape({
    orbitInvestment: Yup.string().required(t("Settings.BusinessAccount.OrbitInvestmentRequiredValidationLabel")),
    firstName: Yup.string().required(t("Settings.BusinessAccount.FirstNameRequiredValidationLabel")),
    lastName: Yup.string().required(t("Settings.BusinessAccount.LastNameRequiredValidationLabel")),
    firstNameSH: Yup.string().required(t("Settings.BusinessAccount.FirstNameRequiredValidationLabel")),
    lastNameSH: Yup.string().required(t("Settings.BusinessAccount.LastNameRequiredValidationLabel")),
    regNo: Yup.string().required(t("Settings.BusinessAccount.RegistrationNoRequiredValidationLabel")),
    taxNo: Yup.string().required(t("Settings.BusinessAccount.TaxNoRequiredValidationLabel")),
    address: Yup.string().required(t("Settings.BusinessAccount.AddressRequiredValidationLabel")),
    country: Yup.string().required(t("SignUp.CountryRequiredValidationLabel")),
    city: Yup.mixed().required(t("Settings.BusinessAccount.CityRequiredValidationLabel")),
    province: Yup.mixed().required(t("Settings.BusinessAccount.ProvinceRequiredValidationLabel")),
  });

  const [countryOptions, setCountryOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const fetchCountries = () => {
    callApi("get", ApiConstants.FETCH_COUNTRIES)
      .then((response) => {
        if (response.code === 200) {
          setCountryOptions(response.dataList);
        }
      })
      .catch((e) => {
        tostService.error(e.message, { autoClose: true });
      });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchProvinces = (value) => {
    callApi("get", ApiConstants.FETCH_PROVINCES + value.value)
      .then((response) => {
        if (response.code === 200) {
          setProvinceOptions(response.dataList, { autoClose: true });
        } else {
          tostService.error(response.message, { autoClose: true });
        }
      })
      .catch((e) => {
        tostService.error(e.message, { autoClose: true });
      });
  };

  const fetchCities = (value) => {
    callApi("get", ApiConstants.FETCH_CITIES + value.value)
      .then((response) => {
        if (response.code === 200) {
          setCityOptions(response.dataList);
        } else {
          tostService.error(response.message);
        }
      })
      .catch((e) => {
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
      <div id="BusinessDetails" className="card card-lg active" style={{ display: `${props.active ? "block" : "none"}` }}>
        <Formik
          initialValues={{
            orbitInvestment: "",
            firstName: "",
            lastName: "",
            firstNameSH: "",
            lastNameSH: "",
            regNo: "",
            taxNo: "",
            address: "",
            country: "",
            city: "",
            province: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {}}
        >
          {({ errors, touched, handleChange }) => (
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
                    <div className="verifiedLabel">
                      <b>
                        <i className="fas fa-check-circle"></i> {t("Settings.Verified")}
                      </b>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <Field
                        type="text"
                        className={`form-control ${errors.orbitInvestment ? "is-invalid" : ""}`}
                        name="orbitInvestment"
                        id=""
                        placeholder={t("Settings.BusinessAccount.OrbitInvestmentInc")}
                      />
                      <ErrorMessage name="orbitInvestment">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                </div>
                <label className="small">{t("Settings.BusinessAccount.Director")}</label>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <Field
                        type="text"
                        className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                        name="firstName"
                        id=""
                        placeholder={t("Settings.BusinessAccount.FirstName")}
                      />
                      <ErrorMessage name="firstName">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <Field
                        type="text"
                        className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                        name="lastName"
                        id=""
                        placeholder={t("Settings.BusinessAccount.LastName")}
                      />
                      <ErrorMessage name="lastName">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                </div>
                <label className="small">{t("Settings.BusinessAccount.ShareHolders")}</label>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <Field
                        type="text"
                        className={`form-control ${errors.firstNameSH ? "is-invalid" : ""}`}
                        name="firstNameSH"
                        id=""
                        placeholder={t("Settings.BusinessAccount.FirstName")}
                      />
                      <ErrorMessage name="firstNameSH">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <Field
                        type="text"
                        className={`form-control ${errors.lastNameSH ? "is-invalid" : ""}`}
                        name="lastNameSH"
                        id=""
                        placeholder={t("Settings.BusinessAccount.LastName")}
                      />
                      <ErrorMessage name="lastNameSH">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <Field
                        type="text"
                        className={`form-control ${errors.regNo ? "is-invalid" : ""}`}
                        name="regNo"
                        id=""
                        placeholder={t("Settings.BusinessAccount.RegistrationNo")}
                      />
                      <ErrorMessage name="regNo">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <Field
                        type="text"
                        className={`form-control ${errors.taxNo ? "is-invalid" : ""}`}
                        name="taxNo"
                        id=""
                        placeholder={t("Settings.BusinessAccount.TaxNumber")}
                      />
                      <ErrorMessage name="taxNo">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
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
                        options={countryOptions}
                        isSearchable={true}
                        onChange={(value) => {
                          let event = { target: { name: "country", value: value.value } };
                          handleChange(event);
                          fetchProvinces(value);
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
                        className={errors.province ? "is-invalid" : ""}
                        placeholder={t("Settings.BusinessAccount.Province")}
                        isSearchable={true}
                        onChange={(value) => {
                          let event = { target: { name: "province", value: value } };
                          handleChange(event);
                          fetchCities(value);
                        }}
                        error={errors.province}
                        touched={touched.province}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <Select2
                        options={renderOptions(cityOptions)}
                        className={errors.city ? "is-invalid" : ""}
                        placeholder={t("Settings.BusinessAccount.City")}
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
                  <label>{t("Settings.BusinessAccount.PEPQuestion")}</label>
                  <div className="input-group input-group-sm-down-break">
                    <div className="form-control radioBlock">
                      <div className="custom-control custom-radio stopFloating">
                        <input type="radio" className="custom-control-input" name="quesO" id="quesO1" />
                        <label className="custom-control-label" htmlFor="quesO1">
                          Yes
                        </label>
                      </div>
                      <div className="custom-control custom-radio stopFloating">
                        <input type="radio" className="custom-control-input" name="quesO" defaultChecked id="quesO2" />
                        <label className="custom-control-label" htmlFor="quesO2">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>{t("Settings.BusinessAccount.PEDQuestion")}</label>
                  <div className="input-group input-group-sm-down-break">
                    <div className="form-control radioBlock">
                      <div className="custom-control custom-radio stopFloating">
                        <input type="radio" className="custom-control-input" name="quesT" id="quesT1" />
                        <label className="custom-control-label" htmlFor="quesT1">
                          Yes
                        </label>
                      </div>
                      <div className="custom-control custom-radio stopFloating">
                        <input type="radio" className="custom-control-input" name="quesT" defaultChecked id="quesT2" />
                        <label className="custom-control-label" htmlFor="quesT2">
                          No
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

export default withTranslation()(BusinessDetails);
