import React from "react";

import Select2 from "../Select2/Select2";

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

const CountryList = (props) => {
  return (
    <React.Fragment>
      <Select2
        options={renderOptions(props.options)}
        defaultValue={props.defaultValue ? props.defaultValue : renderOptions(props.options)[0]}
        placeholder={props.placeholder ? props.placeholder : "Country"}
        isSearchable={props.isSearchable}
        onChange={(event) => props.onChange(event)}
      />
    </React.Fragment>
  );
};
export default CountryList;
