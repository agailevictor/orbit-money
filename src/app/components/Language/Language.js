import React from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";

import "./Language.scss";

const options = [
  {
    value: "en_us",
    label: (
      <div>
        <img src="./assets/vendor/flags/1x1/us.svg" className="avatar avatar-xss avatar-circle mr-2" alt="country-img" />
        English (US)
      </div>
    ),
  },
  {
    value: "en_uk",
    label: (
      <div>
        <img src="./assets/vendor/flags/1x1/gb.svg" className="avatar avatar-xss avatar-circle mr-2" alt="country-img" />
        English (UK)
      </div>
    ),
  },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "transparent",
    border: "none",
    outline: "none",
    boxShadow: "none",
  }),
};

const languageChange = (value) => {
  console.log(value);
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
        <Select
          options={options}
          defaultValue={options.find((i) => i.value === languageSelected)}
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
