import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { toastService } from "../../services/toastService";
import Caption from "../../components/Caption/Caption";
import { callApi } from "../../services/apiService";
import ApiConstants from "../../shared/config/apiConstants";

import "./ForgotPassword.scss";

let ForgotPasswordSchema = null;

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitted: false,
            ForgotPasswordProgress: false,
        };
        const { t } = this.props;
        ForgotPasswordSchema = Yup.object().shape({
            email: Yup.string().email(t("SignUp.EmailPatternValidationLabel")).required(t("SignUp.EmailRequiredValidationLabel"))
        });
    }

    isRequired = (message) => (value) => (!!value ? undefined : message);

    render() {
        const { t } = this.props;
        const { isSubmitted } = this.state;

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
                                    email: ""
                                }}
                                validationSchema={ForgotPasswordSchema}
                                onSubmit={(values) => {
                                    this.setState({ ForgotPasswordProgress: true });
                                    callApi("post", ApiConstants.FORGOT_PASSWORD_REQUEST, {
                                        email: values.email
                                    })
                                        .then((response) => {
                                            if (response.code === 200) {
                                                toastService.success(response.message);
                                                this.props.history.push("/signin");
                                            } else {
                                                toastService.error(response.message);
                                            }
                                            this.setState({ ForgotPasswordProgress: false });
                                        })
                                        .catch((e) => {
                                            toastService.error(e.message);
                                            this.setState({ ForgotPasswordProgress: false });
                                        });
                                }}>
                                {({ errors, handleChange, touched, values }) => (
                                    <Form>
                                        <div className="text-center mb-5">
                                            <h1 className="display-4">{t("ForgotPassword.ForgotPasswordLabel")}</h1>
                                            <p>
                                                {t("ForgotPassword.MainHeading")}
                                            </p>
                                        </div>

                                        <div className="js-form-message form-group">
                                            <label className="input-label" htmlFor="forgotPasswordEmail">
                                                {t("ForgotPassword.YourEmailLabel")}
                                            </label>

                                            <Field
                                                type="email"
                                                className={`form-control form-control-lg ${errors.email && isSubmitted ? "is-invalid" : ""}`}
                                                name="email"
                                                id="forgotPasswordEmail"
                                                placeholder="Markwilliams@example.com"
                                            />
                                            <ErrorMessage name="email">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-lg btn-block btn-primary mb-2"
                                            disabled={this.state.ForgotPasswordProgress}
                                            onClick={() => this.setState({ isSubmitted: true })}>
                                            {t("ForgotPassword.ForgotPasswordButtonLabel")}
                                        </button>
                                        <div className="text-center mb-5">
                                            <p>
                                                {t("ForgotPassword.ForgotPasswordBack")} <Link to="/signin">{t("SignIn.SignInButtonLabel")}</Link>
                                            </p>
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

export default withTranslation()(ForgotPassword);