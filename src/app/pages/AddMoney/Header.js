import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

class Header extends React.Component {
  
  render() {
    const { t } = this.props;
    
    return (
      <React.Fragment>
          <div className="page-header">
            <div className="row align-items-end">
              <div className="col-sm mb-2 mb-sm-0">
                <p className="page-title"> 
                  <Link className="btn btn-ghost-secondary" to="/dashboard" title={t("Dashboard.DashboardHeading")}>
                    <i className="tio-chevron-left"></i> {t("Dashboard.DashboardHeading")}
                  </Link>
                </p>
              </div> 
            </div>
          </div>

      </React.Fragment>
    );
  }
}

export default withTranslation()(Header);
