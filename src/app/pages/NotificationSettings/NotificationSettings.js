import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import "./NotificationSettings.scss";

class NotificationSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
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
              <div id="PersonalDetails" className="card card-lg active">
                <div className="">
                  <div className="row">
                    <div className="col-md-12">
                      <ul className="list-group" style={{ marginBottom: "15px" }}>
                        <li className="list-group-item">
                          <div className="row align-items-center gx-2">
                            <div className="col">
                              <h3>{t("Settings.Notification.Notification")}</h3>
                            </div>
                            <div className="col-auto">
                              <div className="chekboxEP">
                                <div className="custom-control custom-checkbox p-0">
                                  <h3 className="text-center">{t("Settings.Notification.Email")}</h3>
                                </div>
                                <div className="custom-control custom-checkbox p-0">
                                  <h3 className="text-center">{t("Settings.Notification.Push")}</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li className="list-group-item">
                          <div className="row align-items-center gx-2">
                            <div className="col">
                              <h5 className="mb-0">
                                <a className="text-dark" href="#">
                                  Suspendisse eleifend faucibus congue.
                                </a>
                              </h5>
                              <ul className="list-inline list-separator small">
                                <li className="list-inline-item">Nullam augue orci, mattis non gravida tincidunt risus.</li>
                              </ul>
                            </div>
                            <div className="col-auto">
                              <div className="chekboxEP">
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="emailChk1" defaultChecked />
                                  <label className="custom-control-label" htmlFor="emailChk1"></label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="pushChk1" defaultChecked />
                                  <label className="custom-control-label" htmlFor="pushChk1"></label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li className="list-group-item">
                          <div className="row align-items-center gx-2">
                            <div className="col">
                              <h5 className="mb-0">
                                <a className="text-dark" href="#">
                                  Suspendisse eleifend faucibus congue.
                                </a>
                              </h5>
                              <ul className="list-inline list-separator small">
                                <li className="list-inline-item">Nullam augue orci, mattis non gravida tincidunt risus.</li>
                              </ul>
                            </div>
                            <div className="col-auto">
                              <div className="chekboxEP">
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="emailChk2" defaultChecked />
                                  <label className="custom-control-label" htmlFor="emailChk2"></label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="pushChk2" defaultChecked />
                                  <label className="custom-control-label" htmlFor="pushChk2"></label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li className="list-group-item">
                          <div className="row align-items-center gx-2">
                            <div className="col">
                              <h5 className="mb-0">
                                <a className="text-dark" href="#">
                                  Suspendisse eleifend faucibus congue.
                                </a>
                              </h5>
                              <ul className="list-inline list-separator small">
                                <li className="list-inline-item">Nullam augue orci, mattis non gravida tincidunt risus.</li>
                              </ul>
                            </div>
                            <div className="col-auto">
                              <div className="chekboxEP">
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="emailChk3" />
                                  <label className="custom-control-label" htmlFor="emailChk3"></label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="pushChk3" defaultChecked />
                                  <label className="custom-control-label" htmlFor="pushChk3"></label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li className="list-group-item">
                          <div className="row align-items-center gx-2">
                            <div className="col">
                              <h5 className="mb-0">
                                <a className="text-dark" href="#">
                                  Suspendisse eleifend faucibus congue.
                                </a>
                              </h5>
                              <ul className="list-inline list-separator small">
                                <li className="list-inline-item">Nullam augue orci, mattis non gravida tincidunt risus.</li>
                              </ul>
                            </div>
                            <div className="col-auto">
                              <div className="chekboxEP">
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="emailChk4" defaultChecked />
                                  <label className="custom-control-label" htmlFor="emailChk4"></label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="pushChk4" />
                                  <label className="custom-control-label" htmlFor="pushChk4"></label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-end align-items-center">
                  <button type="button" className="btn btn-primary">
                    {t("Settings.Notification.SaveChanges")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(NotificationSettings);
