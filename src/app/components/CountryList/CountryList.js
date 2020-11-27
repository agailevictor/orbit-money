import React, { useEffect } from "react";
import { connect } from "react-redux";

import Select2 from "../Select2/Select2";
import ApiConstants from "../../shared/config/apiConstants";
import { callApi } from "../../services/apiService";
import { toastService } from "../../services/toastService";
import { ActionCreators } from "../../actions";

const CountryList = (props) => {
  useEffect(() => {
    if (props.countryList && !props.countryList.length) fetchCountries();
  }, []);

  const fetchCountries = () => {
    callApi("get", ApiConstants.FETCH_COUNTRIES)
      .then((response) => {
        if (response.code === 200) props.setData(response.dataList);
        else toastService.error(response.message);
      })
      .catch((e) => {
        toastService.error(e.message);
      });
  };

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
            {option.title}
          </div>
        ),
      };
    });
  };

  const countryOptions = renderOptions(props.countryList);

  return (
    <React.Fragment>
      <Select2
        options={countryOptions}
        value={countryOptions.filter((option) => option.value === props.value)}
        className={props.className}
        placeholder={props.placeholder ? props.placeholder : "Country"}
        isSearchable={props.isSearchable}
        onChange={(event) => props.onChange(event)}
        error={props.error ? props.error : ""}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    countryList: state.lookupsReducer.countryList,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setData: (data) => dispatch(ActionCreators.countryListAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CountryList);
