import React, { useEffect } from "react";
import { connect } from "react-redux";

import Select2 from "../Select2/Select2";
import ApiConstants from "../../shared/config/apiConstants";
import { callApi } from "../../services/apiService";
import { toastService } from "../../services/toastService";
import { ActionCreators } from "../../actions";

const CurrencyList = (props) => {
  useEffect(() => {
    if (props.currencyList && !props.currencyList.length) fetchCurrencyList();
  }, []);

  const fetchCurrencyList = () => {
    callApi("get", ApiConstants.FETCH_CURRENCY_LIST)
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
        value: option.code,
        label: (
          <div>
            <img
              src={option.country.url ? option.country.url : ""}
              className="avatar avatar-xss avatar-circle mr-2"
              style={{ width: "1rem", height: "1rem", marginTop: "-3px" }}
            />
            {option.code}
          </div>
        ),
      };
    });
  };

  const currencyOptions = renderOptions(props.currencyList);

  return (
    <React.Fragment>
      <Select2
        isDisabled={props.isDisabled ? props.isDisabled : false}
        options={currencyOptions}
        value={currencyOptions.filter((option) => option.value === props.value)}
        className={props.className}
        placeholder={props.placeholder ? props.placeholder : ""}
        isSearchable={props.isSearchable}
        onChange={(event) => props.onChange(event)}
        error={props.error ? props.error : ""}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    currencyList: state.lookupsReducer.currencyList,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setData: (data) => dispatch(ActionCreators.currencyListAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList);
