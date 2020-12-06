import React, { useEffect } from "react";
import { connect } from "react-redux";

import Select2 from "../Select2/Select2";
import ApiConstants from "../../shared/config/apiConstants";
import { callApi } from "../../services/apiService";
import { toastService } from "../../services/toastService";
import { ActionCreators } from "../../actions";

const OccupationGroup = (props) => {
  useEffect(() => {
    if (props.occupationGroupList && !props.occupationGroupList.length) fetchOccupationGroup();
  }, []);

  const fetchOccupationGroup = () => {
    callApi("get", ApiConstants.FETCH_OCCUPATION_GROUPS)
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
        label: option.title,
      };
    });
  };

  const occupationGroupOptions = renderOptions(props.occupationGroupList);

  return (
    <React.Fragment>
      <Select2
        options={occupationGroupOptions}
        value={occupationGroupOptions.filter((option) => option.value === props.value)}
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
    occupationGroupList: state.lookupsReducer.occupationGroupList,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setData: (data) => dispatch(ActionCreators.occupationGroupsAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OccupationGroup);
