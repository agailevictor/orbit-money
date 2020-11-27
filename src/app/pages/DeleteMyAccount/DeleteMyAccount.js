import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { callApi } from "../../services/apiService";
import ApiConstants from "../../shared/config/apiConstants";
import { toastService } from "../../services/toastService";

import "./DeleteMyAccount.scss";

class DeleteMyAccount extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteAccount = () => {
    callApi("delete", ApiConstants.DELETE_ACCOUNT)
      .then((response) => {
        if (response.code === 200) {
          toastService.success(response.message);
          localStorage.removeItem("auth");
          localStorage.removeItem("authToken");
          this.props.history.replace("/signin");
        } else {
          toastService.error(response.message);
        }
      })
      .catch((e) => {
        toastService.error(e.message);
      });
  };

  deleteBusinessAccount = () => {
    callApi("delete", ApiConstants.DELETE_ACCOUNT, true)
      .then((response) => {
        if (response.code === 200) {
          toastService.success(response.message);
          localStorage.removeItem("selectedCustomerAccount");
          localStorage.removeItem("CustomerAccountToken");
          this.props.history.replace("/dashboard");
        } else {
          toastService.error(response.message);
        }
      })
      .catch((e) => {
        toastService.error(e.message);
      });
  };

  render() {
    const { t } = this.props;
    const selectedBusinessAccount = localStorage.getItem("selectedCustomerAccount") ? JSON.parse(localStorage.getItem("selectedCustomerAccount")) : null
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
            <div className="col-lg-5">
              <div id="PersonalDetails" className="card card-lg active">
                <div className="card-body">
                  { !selectedBusinessAccount && <h3 className="delete-title"> {t("Settings.DeleteMyAccount.DeleteAccount")}?</h3> }
                  { selectedBusinessAccount && <h3 className="delete-title"> {t("Settings.DeleteMyAccount.DeleteLabel")}  {selectedBusinessAccount.title}?</h3> }

                  <div className="text-center">
                    <img className="img-fluid mb-3" src="./assets/svg/settings/warning.svg" alt="Image Description" style={{ maxWidth: "5rem" }} />

                    <div className="mb-4">
                      <h2>{t("Settings.DeleteMyAccount.Warning")}</h2>
                      <p>{t("Settings.DeleteMyAccount.WarningAlert")}</p>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                      { !selectedBusinessAccount && 
                        <button type="button" className="btn btn-primary m-1" onClick={this.deleteAccount}>
                          {t("Settings.DeleteMyAccount.DeleteAccount")}
                        </button>
                      }
                      { selectedBusinessAccount && 
                        <button type="button" className="btn btn-primary m-1" onClick={this.deleteBusinessAccount}>
                          {t("Settings.DeleteMyAccount.DeleteBusinessAccount")}
                        </button>
                      }
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(DeleteMyAccount);
