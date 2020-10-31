import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

import Caption from "../../components/Caption/Caption";
import SocialMediaLogin from "../../components/SocialMediaLogin/SocialMediaLogin";

import { callApi } from "../../services/apiServices";
import ApiConstants from "../../shared/config/apiConstants";

import "react-toastify/dist/ReactToastify.css";
import "./Signin.scss";

let SignInSchema = null;

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
    const { t } = this.props;
    SignInSchema = Yup.object().shape({
      email: Yup.string().email("Invalid email address").required(t("SignIn.EmailRequiredValidationLabel")),
      password: Yup.string().required(t("SignIn.PasswordRequiredValidationLabel")).min(8, "Minimum 8 characters required"),
    });
  }

  isRequired = (message) => (value) => (!!value ? undefined : message);

  togglePassword = (event) => {
    event.preventDefault();
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  render() {
    const { t } = this.props;
    const { showPassword } = this.state;
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
                  email: "",
                  password: "",
                }}
                validationSchema={SignInSchema}
                onSubmit={async (values) => {
                  callApi("post", ApiConstants.SIGN_IN, { email: values.email, password: values.password })
                    .then((response) => {
                      if (response.code === 200) {
                        this.props.history.push("/dashboard");
                      }
                    })
                    .catch((error) => {
                      toast.error(error.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                      });
                    });
                }}>
                {({ errors }) => (
                  <Form>
                    <div className="text-center mb-5">
                      <h1 className="display-4">{t("SignIn.SignInLabel")}</h1>
                      <p>
                        {t("SignIn.HaveAccntLabel")}
                        <Link to="/signup"> {t("SignIn.SignuphereLabel")}</Link>
                      </p>
                    </div>

                    <SocialMediaLogin />

                    <div className="text-center mb-4">
                      <span className="divider text-muted">OR</span>
                    </div>

                    <div className="js-form-message form-group">
                      <label className="input-label" htmlFor="signupSrEmail">
                        {t("SignIn.YourEmailLabel")}
                      </label>
                      <Field
                        type="text"
                        className={`form-control form-control-lg ${errors.email ? "is-invalid" : ""}`}
                        placeholder="Markwilliams@example.com"
                        name="email"
                      />
                      <ErrorMessage name="email">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="js-form-message form-group">
                      <label className="input-label" htmlFor="signupSrPassword" tabIndex="0">
                        <span className="d-flex justify-content-between align-items-center">
                          {t("SignIn.PasswordLabel")}
                          <Link to="/signin" className="input-label-secondary">
                            {t("SignIn.ForgotPasswordLabel")}
                          </Link>
                        </span>
                      </label>

                      <div className="input-group-merge">
                        <Field
                          type={showPassword ? "text" : "password"}
                          className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""}`}
                          name="password"
                          id="signupSrPassword"
                          placeholder="8+ characters required"
                          validate={this.isRequired(t("SignIn.PasswordRequiredValidationLabel"))}
                        />
                        <ErrorMessage name="password">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>

                        <div id="changePassTarget" className="input-group-append">
                          <Link to="" className="input-group-text" onClick={this.togglePassword}>
                            <i id="changePassIcon" className={showPassword ? "tio-visible-outlined" : "tio-hidden-outlined"}></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <Field type="checkbox" className="custom-control-input" id="termsCheckbox" name="termsCheckbox" />
                        <label className="custom-control-label font-size-sm text-muted" htmlFor="termsCheckbox">
                          {t("SignIn.RememberMeLabel")}
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-lg btn-block btn-primary" ref={(c) => (this.buttonSubmit = c)}>
                      {t("SignIn.SignInButtonLabel")}
                    </button>

                    <ToastContainer />
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

export default withTranslation()(Signin);
