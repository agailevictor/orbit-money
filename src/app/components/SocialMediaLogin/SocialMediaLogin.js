import React from "react";
import { useTranslation } from "react-i18next";

const SocialMediaLogin = (props) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <a className="btn btn-lg btn-white btn-block f-13" href="#">
              <span className="d-flex justify-content-center align-items-center">
                <img className="avatar avatar-xss mr-2" src="./assets/svg/brands/google.svg" alt="Login with google" />
                {t("SocialMediaLogin.LoginwithGoogle")}
              </span>
            </a>
          </div>
          <div className="col-md-6">
            <a className="btn btn-lg btn-white btn-block f-13" href="#">
              <span className="d-flex justify-content-center align-items-center">
                <img className="avatar avatar-xss mr-2" src="./assets/svg/brands/facebook.svg" alt="Login with facebook" />
                {t("SocialMediaLogin.LoginwithFacebook")}
              </span>
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SocialMediaLogin;
