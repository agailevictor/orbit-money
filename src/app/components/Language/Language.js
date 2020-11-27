import React from "react";
import { useTranslation } from "react-i18next";

import Select2 from "../Select2/Select2";
import "./Language.scss";

const countryOptions = [
  {
    value: "en_us",
    label: "English (US)",
    icon: "us",
  },
  {
    value: "fr",
    label: "French",
    icon: "fr",
  },
];

const renderOptions = (options) => {
  return options.map((option) => {
    return {
      value: option.value,
      label: (
        <div>
          <img
            src={`./assets/vendor/flags/1x1/${option.icon}.svg`}
            className="avatar avatar-xss avatar-circle mr-2"
            style={{ width: "1rem", height: "1rem" }}
          />
          {option.label}
        </div>
      ),
    };
  });
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "transparent",
    border: "none",
    outline: "none",
    boxShadow: "none",
  }),
};

const Language = (props) => {
  const { i18n } = useTranslation();
  const languageSelected = localStorage.getItem("languageSelected") ? localStorage.getItem("languageSelected") : "en_us";

  const changeLanguage = (lng) => {
    const { value } = lng;
    localStorage.setItem("languageSelected", value);
    i18n.changeLanguage(lng.value);
  };

  return (
    <React.Fragment>
      <div className="select2-custom select2-custom-right" style={{ width: props.width ? props.width : "100%" }}>
        <Select2
          options={renderOptions(countryOptions)}
          defaultValue={renderOptions(countryOptions).find((i) => i.value === languageSelected)}
          placeholder="Select Language"
          isSearchable={false}
          onChange={changeLanguage}
          styles={customStyles}
        />
      </div>
    </React.Fragment>
  );
};

export default Language;
