import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

const Pay = (props) => {
  const { t } = props;

  return (
    <div id="stepPay" className={`step-card-pay card-lg ${props.active ? "active" : ""}`}>
      <div className="card">
        <div className="card-body">
          <div className="text-center">
            <img className="img-fluid mb-3" src="./assets/svg/illustrations/hi-five.svg" alt="Image Description" style={{ maxWidth: "10rem" }} />

            <div className="mb-4">
              <h2>
                {t("SendMoney.Pay.Your_transaction")} <br /> {t("SendMoney.Pay.has_successfully_done")}
              </h2>
              <p>
                {t("SendMoney.Pay.Please_follow_the_instructions_provided_in")} <br /> {t("SendMoney.Pay.your_email_address")}
              </p>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Link className="btn btn-white" to="/dashboard"> {t("SendMoney.Pay.Go_To_Dashboard")}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Pay);
