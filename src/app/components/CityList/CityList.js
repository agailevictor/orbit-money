import React, { useEffect } from "react";
import { connect } from "react-redux";

import Select2 from "../Select2/Select2";
import ApiConstants from "../../shared/config/apiConstants";
import { callApi } from "../../services/apiService";
import { toastService } from "../../services/toastService";
import { ActionCreators } from "../../actions";

const CityList = (props) => {
  useEffect(() => {
    if (props.stateId && props.cityList && !props.cityList[props.stateId]) {
      fetchCities(props.stateId);
    }
  }, [props.stateId]);

  const fetchCities = (value) => {
    callApi("get", ApiConstants.FETCH_CITIES, { stateId: value })
      .then((response) => {
        if (response.code === 200) {
          let cityData = { ...props.cityList, [props.stateId]: response.dataList };
          props.setData(cityData);
        } else toastService.error(response.message);
      })
      .catch((e) => {
        toastService.error(e.message);
      });
  };

  const renderOptions = (options) => {
    return options.map((option) => {
      return {
        value: option.id,
        label: option.title,
      };
    });
  };

  const cityOptions = props.cityList[props.stateId] ? renderOptions(props.cityList[props.stateId]) : [];

  return (
    <React.Fragment>
      <Select2
        options={cityOptions}
        value={cityOptions.filter((option) => option.value === props.value)}
        className={props.className}
        placeholder={props.placeholder ? props.placeholder : "City"}
        isSearchable={props.isSearchable}
        onChange={(event) => props.onChange(event)}
        error={props.error ? props.error : ""}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cityList: state.lookupsReducer.cityList,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setData: (data) => dispatch(ActionCreators.cityAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CityList);
