import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { callApi } from "../../services/apiService";
import ApiConstants from "../../shared/config/apiConstants";
import { tostService } from "../../services/toastService";

import AppLoader from "../../components/AppLoader/AppLoader";

import "./ChangePassword.scss";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      showCurrentPassword: false,
      showConfirmPassword: false,
      showLoader: false,
    };
  }

  changePassword = (values) => {
    this.setState({ showLoader: true });
    callApi("post", ApiConstants.CHANGE_PASSWORD, {
      password: values.currentPassword,
      newPassword: values.confirmPassword,
    })
      .then((response) => {
        this.setState({ showLoader: false });
        if (response.code === 200) {
          tostService.success(response.message);
        } else {
          tostService.error(response.message);
        }
      })
      .catch((e) => {
        this.setState({ showLoader: false });
        tostService.error(e.message);
      });
  };

  togglePassword = (event) => {
    event.preventDefault();
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  toggleCurrentPassword = (event) => {
    event.preventDefault();
    const { showCurrentPassword } = this.state;
    this.setState({ showCurrentPassword: !showCurrentPassword });
  };

  toggleConfirmPassword = (event) => {
    event.preventDefault();
    const { showConfirmPassword } = this.state;
    this.setState({ showConfirmPassword: !showConfirmPassword });
  };

  render() {
    const { t } = this.props;
    const { showPassword, showConfirmPassword, showCurrentPassword } = this.state;
    const validationSchema = Yup.object().shape({
      currentPassword: Yup.string()
        .required(t("Settings.ChangePassword.CurrentPasswordRequiredValidationLabel"))
        .min(8, t("SignUp.PasswordMinValidationLabel")),
      newPassword: Yup.string()
        .required(t("Settings.ChangePassword.NewPasswordRequiredValidationLabel"))
        .min(8, t("SignUp.PasswordMinValidationLabel")),
      confirmPassword: Yup.string()
        .required(t("Settings.ChangePassword.ConfirmPasswordRequiredValidationLabel"))
        .min(8, t("SignUp.PasswordMinValidationLabel"))
        .oneOf([Yup.ref("newPassword")], t("SignUp.PasswordMatchValidationLabel")),
    });
    return (
      <React.Fragment>
        <AppLoader show={this.state.showLoader} />
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-end">
              <div className="col-sm mb-2 mb-sm-0">
                <p className="page-title">
                  <Link to="/settings" className="btn btn-ghost-secondary">
                    <i className="tio-chevron-left"></i> {t("Settings.Back")}
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-lg-center mainDetailBlock">
            <div className="col-lg-5">
              <Formik
                initialValues={{
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  this.changePassword(values);
                  resetForm();
                }}>
                {({ errors }) => (
                  <Form>
                    <div id="PersonalDetails" className="card card-lg active">
                      <div className="card-body">
                        <h3 className="text-center" style={{ marginBottom: "25px" }}>
                          {t("Settings.ChangePassword.ChangePassword")}
                        </h3>
                        <div className="form-group">
                          <div className="input-group input-group-merge">
                            <Field
                              type={showCurrentPassword ? "text" : "password"}
                              className={`form-control ${errors.currentPassword ? "is-invalid" : ""}`}
                              name="currentPassword"
                              id="currentPassword"
                              placeholder={t("Settings.ChangePassword.CurrentPassword")}
                            />
                            <ErrorMessage name="currentPassword">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                            <div id="changePassTarget1" className="input-group-append" style={{ height: "44px" }}>
                              <Link to="#" className="input-group-text" onClick={this.toggleCurrentPassword}>
                                <i id="changePassIcon" className={showCurrentPassword ? "tio-visible-outlined" : "tio-hidden-outlined"}></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group input-group-merge">
                            <Field
                              type={showPassword ? "text" : "password"}
                              className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                              name="newPassword"
                              id="signupSrConfirmPassword"
                              placeholder={t("Settings.ChangePassword.NewPassword")}
                            />
                            <ErrorMessage name="newPassword">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>

                            <div id="changePassTarget2" className="input-group-append" style={{ height: "44px" }}>
                              <Link to="#" className="input-group-text" onClick={this.togglePassword}>
                                <i id="changePassIcon" className={showPassword ? "tio-visible-outlined" : "tio-hidden-outlined"}></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group input-group-merge">
                            <Field
                              type={showConfirmPassword ? "text" : "password"}
                              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                              name="confirmPassword"
                              id="signupSrConfirmPassword"
                              placeholder={t("Settings.ChangePassword.ConfirmPassword")}
                            />
                            <ErrorMessage name="confirmPassword">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                            <div id="changePassTarget3" className="input-group-append" style={{ height: "44px" }}>
                              <Link to="#" className="input-group-text" onClick={this.toggleConfirmPassword}>
                                <i id="changePassIcon" className={showConfirmPassword ? "tio-visible-outlined" : "tio-hidden-outlined"}></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer d-flex justify-content-end align-items-center">
                        <button type="submit" className="btn btn-primary">
                          {t("Settings.Update")}
                        </button>
                      </div>
                    </div>
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

export default withTranslation()(ChangePassword);
