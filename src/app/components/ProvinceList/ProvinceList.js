import React, { useEffect } from "react";
import { connect } from "react-redux";

import Select2 from "../Select2/Select2";
import ApiConstants from "../../shared/config/apiConstants";
import { callApi } from "../../services/apiService";
import { toastService } from "../../services/toastService";
import { ActionCreators } from "../../actions";

const ProvinceList = (props) => {
  useEffect(() => {
    if (props.countryId && props.provinceList && !props.provinceList[props.countryId]) {
      fetchProvinces(props.countryId);
    }
  }, [props.countryId]);

  const fetchProvinces = (value) => {
    callApi("get", ApiConstants.FETCH_PROVINCES, { countryId: value })
      .then((response) => {
        if (response.code === 200) {
          let provinceData = { ...props.provinceList, [props.countryId]: response.dataList };
          props.setData(provinceData);
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

  const provinceOptions = props.provinceList[props.countryId] ? renderOptions(props.provinceList[props.countryId]) : [];

  return (
    <React.Fragment>
      <Select2
        options={provinceOptions}
        value={provinceOptions.filter((option) => option.value === props.value)}
        className={props.className}
        placeholder={props.placeholder ? props.placeholder : "Province"}
        isSearchable={props.isSearchable}
        onChange={(event) => props.onChange(event)}
        error={props.error ? props.error : ""}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    provinceList: state.lookupsReducer.provinceList,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setData: (data) => dispatch(ActionCreators.provinceListAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProvinceList);
