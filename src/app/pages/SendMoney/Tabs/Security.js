import React from "react";
import { withTranslation } from "react-i18next";

const Security = (props) => {
  const { t } = props;

  return (
    <div id="stepSecurity" className={`step-card-pay card-lg ${props.active ? "active" : ""}`}>
      <h1>{t("SendMoney.Security.Recipient_details_and_security")}</h1>
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <label>
              <b>{t("SendMoney.Security.Recipient_Details")}</b>
            </label>
            <span className="redColor">*</span>
            <input type="text" className="form-control" name="" id="" placeholder="Name" />
          </div>
          <div className="form-group">
            <label>
              <b>{t("SendMoney.Security.Create_a_question_with_a_secret_answer_password")}</b>
            </label>
            <span className="redColor">*</span>
            <select className="form-control js-select2-custom select2-hidden-accessible">
              <option defaultValue>{t("SendMoney.Security.Select_Question")}</option>
              <option>{t("SendMoney.Security.What_is_your_first_school")}</option>
              <option>{t("SendMoney.Security.What_is_your_favorite_color")}</option>
              <option>{t("SendMoney.Security.Enter_your_pin_code_of_your_choice")}</option>
            </select>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" name="" id="" placeholder={t("SendMoney.Security.Select_answer_as_password")} />
          </div>
          <div className="form-group">
            <label>
              <b>{t("SendMoney.Security.Reference_Purpose_to_sending_money")}</b>
            </label>
            <span className="redColor">*</span>
            <input type="text" className="form-control" name="" id="" placeholder="Reference/Purpose to sending money" />
          </div>
        </div>
        <div className="card-footer d-sm-flex align-items-sm-center">
          <button type="button" className="btn btn-ghost-secondary">
            <i className="tio-chevron-left"></i> {t("SendMoney.Back")}
          </button>

          <div className="ml-auto">
            <button type="button" className="btn btn-primary">
              {t("SendMoney.Continue")} <i className="tio-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Security);
