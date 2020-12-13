import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Language from "../Language/Language";

import "./Caption.scss";

const Caption = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div className="position-absolute top-0 left-0 right-0 mt-3 mx-3">
        <div className="d-none d-lg-flex justify-content-between">
          <Link to="/">
            <img className="w-100" src="./assets/svg/logos/logo.svg" alt="Logo" />
          </Link>
          {/* <Language width="160px" /> */}
        </div>
      </div>
      <div className="caption-container">
        <div className="text-center mb-5">
          <img className="img-fluid caption-chat" src="./assets/svg/illustrations/chat.svg" alt="Caption" />
        </div>

        <div className="mb-5">
          <h2 className="display-4">{t("Caption.MainHeading")}</h2>
        </div>

        <ul className="list-checked list-checked-lg list-checked-primary list-unstyled-py-4">
          <li className="list-checked-item">
            <span className="d-block font-weight-bold mb-1">{t("Caption.SubHeading1")}</span>
            {t("Caption.SubDesc1")}
          </li>

          <li className="list-checked-item">
            <span className="d-block font-weight-bold mb-1">{t("Caption.SubHeading2")}</span>
            {t("Caption.SubDesc2")}
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Caption;
