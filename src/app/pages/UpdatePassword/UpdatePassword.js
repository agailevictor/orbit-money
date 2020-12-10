import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { toastService } from "../../services/toastService";
import Caption from "../../components/Caption/Caption";
import { callApi } from "../../services/apiService";
import ApiConstants from "../../shared/config/apiConstants";

import "./UpdatePassword.scss";

let UpdatePasswordSchema = null;

class UpdatePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitted: false,
            UpdatePasswordProgress: false,
            showPassword: false,
            showLoader: false,
        };
        const { t } = this.props;
        UpdatePasswordSchema = Yup.object().shape({
            password: Yup.string().required(t("SignUp.PasswordRequiredValidationLabel")).min(8, t("SignUp.PasswordMinValidationLabel")),
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
        const { isSubmitted, showPassword } = this.state;
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
                                    password: ""
                                }}
                                validationSchema={UpdatePasswordSchema}
                                onSubmit={(values) => {
                                    this.setState({ UpdatePasswordProgress: true });
                                    callApi("post", ApiConstants.FORGOT_PASSWORD_CHANGE, {
                                        password: values.password,
                                        token: localStorage.getItem('changePasswordToken')
                                    })
                                        .then((response) => {
                                            localStorage.removeItem('changePasswordToken');
                                            if (response.code === 200) {
                                                toastService.success(response.message);
                                                this.props.history.push("/signin");
                                            } else {
                                                toastService.error(response.message);
                                            }
                                            this.setState({ UpdatePasswordProgress: false });
                                        })
                                        .catch((e) => {
                                            toastService.error(e.message);
                                            this.setState({ UpdatePasswordProgress: false });
                                        });
                                }}>
                                {({ errors, handleChange, touched, values }) => (
                                    <Form>
                                        <div className="text-center mb-5">
                                            <h1 className="display-4">{t("ForgotPassword.ChangePasswordLabel")}</h1>
                                        </div>

                                        <div className="form-group">
                                            <div className="input-group-merge">
                                                <Field
                                                    type={showPassword ? "text" : "password"}
                                                    className={`form-control form-control-lg ${errors.password && isSubmitted ? "is-invalid" : ""}`}
                                                    name="password"
                                                    id="updateSrPassword"
                                                    placeholder="8+ characters required"
                                                    validate={this.isRequired(t("SignIn.PasswordRequiredValidationLabel"))}
                                                    tabIndex={2}
                                                />
                                                <ErrorMessage name="password">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>

                                                <div id="changePassTarget" className="input-group-append">
                                                    <Link to="" className="input-group-text" onClick={this.togglePassword}>
                                                        <i id="changePassIcon" className={showPassword ? "tio-visible-outlined" : "tio-hidden-outlined"}></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-lg btn-block btn-primary mb-2"
                                            disabled={this.state.UpdatePasswordProgress}
                                            onClick={() => this.setState({ isSubmitted: true })}>
                                            {t("ForgotPassword.ForgotPasswordButtonLabel")}
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

export default withTranslation()(UpdatePassword);