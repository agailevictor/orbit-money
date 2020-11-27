import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./EmailSetting.scss";

class EmailSetting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .required(t("Settings.EmailSetting.EmailRequiredValidationLabel"))
        .email(t("Settings.EmailSetting.EmailPatternValidationLabel")),
    });
    return (
      <React.Fragment>
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
            <div className="col-lg-8">
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {}}
              >
                {({ errors }) => (
                  <Form>
                    <div id="PersonalDetails" className="card card-lg active">
                      <div className="card-body">
                        <h3>{t("Settings.EmailSetting.RegisteredEmail")}</h3>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-9">
                              <Field
                                type="text"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                name="email"
                                id="email"
                                placeholder={t("Settings.EmailSetting.EmailPlaceholder")}
                              />
                              <ErrorMessage name="email">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                            </div>
                            <div className="col-md-3 text-left">
                              <div className="verifiedLabel" style={{ position: "inherit" }}>
                                <b>
                                  <i className="fas fa-check-circle"></i> {t("Settings.EmailSetting.Verified")}
                                </b>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer d-flex justify-content-end align-items-center">
                        <button type="submit" className="btn btn-primary">
                          {t("Settings.EmailSetting.ChangeEmail")}
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

export default withTranslation()(EmailSetting);
