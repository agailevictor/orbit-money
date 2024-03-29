import React from "react";
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "transparent",
    border: "none",
    outline: "none",
    boxShadow: "none",
    height: "100%",
  }),
  container: (provided, state) => ({ ...provided, minWidth: "110px", padding: 0 }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      ...dot(isSelected),
      cursor: "pointer",
      backgroundColor: isSelected || isFocused ? "#bdc5d14d" : "#fff",
    };
  },
};

const dot = (isSelected) => {
  if (isSelected) {
    return {
      alignItems: "center",
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      color: "#1e2022",

      ":after": {
        background: "url(/assets/svg/tick.svg) no-repeat right center/1rem 1rem",
        content: "''",
        width: "1rem",
        height: "1rem",
        position: "absolute",
        right: ".5rem",
      },
    };
  }
};
const Select2 = (props) => {
  return (
    <div>
      <Select
        name={props.name}
        id={props.id}
        options={props.options}
        value={props.value}
        getOptionLabel={(x) => x.label}
        getOptionValue={(x) => x.value}
        className={`form-control ${props.className ? props.className : ""}`}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        isSearchable={props.isSearchable}
        filterOption={props.filterOption}
        styles={{ ...customStyles, ...props.style }}
        onChange={(event) => props.onChange(event)}
        autosize={false}
        isDisabled={props.isDisabled ? props.isDisabled : false}
      />
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
};

export default Select2;
