import React, { useEffect } from "react";
import { connect } from "react-redux";

import Select2 from "../Select2/Select2";
import ApiConstants from "../../shared/config/apiConstants";
import { callApi } from "../../services/apiService";
import { toastService } from "../../services/toastService";
import { ActionCreators } from "../../actions";

const TransactionNumberList = (props) => {
  useEffect(() => {
    if (props.transactionNumberList && !props.transactionNumberList.length) fetchNoOfTransactions();
  }, []);

  const fetchNoOfTransactions = () => {
    callApi("get", ApiConstants.FETCH_NUMBER_OF_TRANSACTIONS)
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

  const transactionNumberOptions = renderOptions(props.transactionNumberList);

  return (
    <React.Fragment>
      <Select2
        options={transactionNumberOptions}
        value={transactionNumberOptions.filter((option) => option.value === props.value)}
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
    transactionNumberList: state.lookupsReducer.transactionNumberList,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setData: (data) => dispatch(ActionCreators.transactionNumberAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TransactionNumberList);
