import React from "react";
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "transparent",
    borderColor: "#e7eaf3",
    outline: "none",
    boxShadow: "none",
  }),
  container: (provided, state) => ({ ...provided, zIndex: 10 }),
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
    <Select
      options={props.options}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      isSearchable={props.isSearchable}
      styles={{ ...customStyles, ...props.styles }}
      onChange={(event) => props.onChange(event)}
    />
  );
};

export default Select2;
