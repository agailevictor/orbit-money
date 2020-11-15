import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import SocialMediaLogin from "../../components/SocialMediaLogin/SocialMediaLogin";
import Caption from "../../components/Caption/Caption";
import { callApi } from "../../services/apiServices";
import ApiConstants from "../../shared/config/apiConstants";

import "./Signup.scss";

let SignUpSchema = null;

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
      showConfirmPassword: false,
      showTermsErrorMsg: false,
    };

    const { t } = this.props;
    SignUpSchema = Yup.object().shape({
      firstName: Yup.string().required(t("SignUp.FirstNameRequiredValidationLabel")),
      lastName: Yup.string().required(t("SignUp.LastNameRequiredValidationLabel")),
      email: Yup.string().email(t("SignUp.EmailPatternValidationLabel")).required(t("SignUp.EmailRequiredValidationLabel")),
      password: Yup.string().required(t("SignUp.PasswordRequiredValidationLabel")).min(8, t("SignUp.PasswordMinValidationLabel")),
      confirmPassword: Yup.string()
        .required(t("SignUp.PasswordRequiredValidationLabel"))
        .min(8, t("SignUp.PasswordMinValidationLabel"))
        .oneOf([Yup.ref("password")], t("SignUp.PasswordMatchValidationLabel")),
      termsCheckbox: Yup.bool().oneOf([true], t("SignUp.TermsConditionRequiredLabel")),
    });
  }

  isRequired = (message) => (value) => (!!value ? undefined : message);

  togglePassword = (event) => {
    event.preventDefault();
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  toggleConfirmPassword = (event) => {
    event.preventDefault();
    const { showConfirmPassword } = this.state;
    this.setState({ showConfirmPassword: !showConfirmPassword });
  };

  render() {
    const { t } = this.props;
    const { showPassword, showConfirmPassword } = this.state;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center min-vh-lg-100 position-relative bg-light px-0">
            <Caption />
          </div>

          <div className="col-lg-6 d-flex justify-content-center align-items-center min-vh-lg-100">
            <div className="w-100 pt-10 pt-lg-7 pb-7" style={{ maxWidth: "25rem" }}>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  termsCheckbox: false,
                }}
                validationSchema={SignUpSchema}
                onSubmit={async (values) => {
                  callApi("post", ApiConstants.SIGN_UP, {
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    password: values.password,
                  })
                    .then((response) => {
                      if (response.code === 200) {
                        alert(response.message);
                      }
                    })
                    .catch((e) => {
                      alert(e);
                    });
                }}>
                {({ errors }) => (
                  <Form>
                    <div className="text-center mb-5">
                      <h1 className="display-4">{t("SignUp.SignUpLabel")}</h1>
                      <p>
                        {t("SignUp.HaveAccntLabel")} <Link to="/signin">{t("SignUp.SignuphereLabel")}</Link>
                      </p>
                    </div>

                    <SocialMediaLogin />

                    <div className="text-center mb-4">
                      <span className="divider text-muted">OR</span>
                    </div>

                    <label className="input-label" htmlFor="fullNameSrEmail">
                      {t("SignUp.FullNameLabel")}
                    </label>

                    <div className="form-row">
                      <div className="col-sm-6">
                        <div className="js-form-message form-group">
                          <Field
                            type="text"
                            className={`form-control form-control-lg ${errors.firstName ? "is-invalid" : ""}`}
                            name="firstName"
                            id="fullNameSrEmail"
                            placeholder="Mark"
                          />
                          <ErrorMessage name="firstName">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="js-form-message form-group">
                          <Field
                            type="text"
                            name="lastName"
                            className={`form-control form-control-lg ${errors.lastName ? "is-invalid" : ""}`}
                            placeholder="Williams"
                          />
                          <ErrorMessage name="lastName">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                        </div>
                      </div>
                    </div>
                    <div className="js-form-message form-group">
                      <label className="input-label" htmlFor="signupSrEmail">
                        {t("SignUp.YourEmailLabel")}
                      </label>

                      <Field
                        type="email"
                        className={`form-control form-control-lg ${errors.email ? "is-invalid" : ""}`}
                        name="email"
                        id="signupSrEmail"
                        placeholder="Markwilliams@example.com"
                      />
                      <ErrorMessage name="email">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="js-form-message form-group">
                      <label className="input-label" htmlFor="signupSrPassword">
                        {t("SignUp.PasswordLabel")}
                      </label>

                      <div className="input-group-merge">
                        <Field
                          type={showPassword ? "text" : "password"}
                          className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""}`}
                          name="password"
                          id="signupSrPassword"
                          placeholder="8+ characters required"
                        />
                        <ErrorMessage name="password">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                        <div className="js-toggle-password-target-1 input-group-append">
                          <Link className="input-group-text" to="" onClick={this.togglePassword}>
                            <i className={showPassword ? "tio-visible-outlined" : "tio-hidden-outlined"}></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="js-form-message form-group">
                      <label className="input-label" htmlFor="signupSrConfirmPassword">
                        {t("SignUp.ConfirmPasswordLabel")}
                      </label>

                      <div className="input-group-merge">
                        <Field
                          type={showConfirmPassword ? "text" : "password"}
                          className={`form-control form-control-lg ${errors.confirmPassword ? "is-invalid" : ""}`}
                          name="confirmPassword"
                          id="signupSrConfirmPassword"
                          placeholder="8+ characters required"
                        />
                        <ErrorMessage name="confirmPassword">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                        <div className="js-toggle-password-target-2 input-group-append">
                          <Link className="input-group-text" to="" onClick={this.toggleConfirmPassword}>
                            <i className={showConfirmPassword ? "tio-visible-outlined" : "tio-hidden-outlined"}></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="js-form-message form-group">
                      <div className="custom-control custom-checkbox">
                        <Field type="checkbox" className="custom-control-input" id="termsCheckbox" name="termsCheckbox" />
                        <label className="custom-control-label font-size-sm text-muted" htmlFor="termsCheckbox">
                          {t("SignUp.CheckboxLabel")} <a href="#">{t("SignUp.TermsLabel")}</a>
                        </label>
                      </div>
                      <ErrorMessage name="termsCheckbox">
                        {(msg) => (
                          <div id="termsCheckbox-error" className="invalid-feedback" style={{ display: "block" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>

                    <button type="submit" className="btn btn-lg btn-block btn-primary mb-2">
                      {t("SignUp.SignUpButtonLabel")}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(Signup);
