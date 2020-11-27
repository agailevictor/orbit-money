import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

import AppLoader from "../../../components/AppLoader/AppLoader";
import CountryList from "../../../components/CountryList/CountryList";
import ProvinceList from "../../../components/ProvinceList/ProvinceList";
import CityList from "../../../components/CityList/CityList";
import { ActionCreators } from "../../../actions";

const Registration = (props) => {
  const initValues = {
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
    state: "",
    city: "",
    pep: false,
    dpep: false,
  };
  const [showLoader, setShowLoader] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [registerData, setregisterData] = useState(initValues);

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("Required"),
    businessAccountShareHoldersDirectorsList: Yup.array().of(
      Yup.object().shape({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        isShareHolder: Yup.boolean(),
        sharePercentage: Yup.string().when("isShareHolder", {
          is: true,
          then: Yup.string().required("Required"),
        }),
      })
    ),
    registrationNo: Yup.string().required("Required"),
    taxNumber: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    city: Yup.mixed().required("Required"),
    state: Yup.mixed().required("Required"),
  });

  return (
    <React.Fragment>
      <AppLoader show={showLoader} />
      <div id="stepRegistration" className={`step-card card-lg ${props.active ? "active" : ""}`}>
        <h1>Enter you business details</h1>
        <div className="card">
          <Formik
            enableReinitialize={true}
            initialValues={registerData}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              values.businessAccountShareHoldersDirectorsList.forEach((item) => {
                item.id = 0;
                item.isDeleted = true;
                item.sharePercentage = item.sharePercentage ? parseInt(item.sharePercentage) : 0;
              });    
              setShowLoader(true);
              props.setData(values);
              setTimeout(()=> {
                props.onSetTabs(null, "tab2");
                setShowLoader(false);
              },500)
            }}
            render={({ errors, handleChange, values, setFieldValue }) => (
              <Form>
                <div className="card-body business-registration">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <Field
                          name="companyName"
                          type="text"
                          className={`form-control ${errors.companyName && isSubmitted ? "is-invalid" : ""}`}
                          id="companyName"
                          placeholder="Company Name"
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
                                    />
                                    <ErrorMessage name={`businessAccountShareHoldersDirectorsList.${index}.email`}>
                                      {(msg) => <div className="invalid-feedback">{msg}</div>}
                                    </ErrorMessage>
                                    {values.businessAccountShareHoldersDirectorsList.length > 1 && (
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
                          name="registrationNo"
                          type="text"
                          className={`form-control ${errors.registrationNo && isSubmitted ? "is-invalid" : ""}`}
                          id="registrationNo"
                          placeholder="Registration No"
                        />
                        <ErrorMessage name="registrationNo">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <Field
                          name="taxNumber"
                          type="text"
                          className={`form-control ${errors.taxNumber && isSubmitted ? "is-invalid" : ""}`}
                          id="taxNumber"
                          placeholder="Tax Number"
                        />
                        <ErrorMessage name="taxNumber">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
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
                </div>
                <div className="card-footer d-flex justify-content-end align-items-center">
                  <button type="submit" className="btn btn-primary" onClick={() => setisSubmitted(true)}>
                    Continue <i className="tio-chevron-right"></i>
                  </button>
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
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setData: (data) => dispatch(ActionCreators.updateBusinessAccountAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
