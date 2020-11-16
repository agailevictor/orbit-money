import React from "react";

import Select2 from "../Select2/Select2";

const renderOptions = (options) => {
  return options.map((option) => {
    return {
      value: option.id,
      label: (
        <div>
          <img
            src={option.url ? option.url : `./assets/vendor/flags/1x1/${option.icon}.svg`}
            className="avatar avatar-xss avatar-circle mr-2"
            style={{ width: "1rem", height: "1rem", marginTop: "-3px" }}
          />
          {option.alpha3Code}
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
        value={props.value}
        className={props.className}
        placeholder={props.placeholder ? props.placeholder : "Country"}
        isSearchable={props.isSearchable}
        onChange={(event) => props.onChange(event)}
        error={props.error ? props.error : ""}
        touched={props.touched ? props.touched : ""}
      />
    </React.Fragment>
  );
};
export default CountryList;
