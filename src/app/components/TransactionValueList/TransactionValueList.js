import React, { useEffect } from "react";
import { connect } from "react-redux";

import Select2 from "../Select2/Select2";
import ApiConstants from "../../shared/config/apiConstants";
import { callApi } from "../../services/apiService";
import { toastService } from "../../services/toastService";
import { ActionCreators } from "../../actions";

const TransactionValueList = (props) => {
  useEffect(() => {
    if (props.transactionValueList && !props.transactionValueList.length) fetchValueOfTransactions();
  }, []);

  const fetchValueOfTransactions = () => {
    callApi("get", ApiConstants.FETCH_VALUE_OF_TRANSACTIONS)
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
        label: option.text,
      };
    });
  };

  const transactionValueOptions = renderOptions(props.transactionValueList);

  return (
    <React.Fragment>
      <Select2
        options={transactionValueOptions}
        value={transactionValueOptions.filter((option) => option.value === props.value)}
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
    transactionValueList: state.lookupsReducer.transactionValueList,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setData: (data) => dispatch(ActionCreators.transactionValueAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TransactionValueList);
