import React, { useEffect } from "react";
import { connect } from "react-redux";

import Select2 from "../Select2/Select2";
import ApiConstants from "../../shared/config/apiConstants";
import { callApi } from "../../services/apiService";
import { toastService } from "../../services/toastService";
import { ActionCreators } from "../../actions";

const SubCategoryList = (props) => {
  useEffect(() => {
    if (props.categoryId && props.subCategoryList && !props.subCategoryList[props.categoryId]) {
      fetchSubCategories(props.categoryId);
    }
  }, [props.categoryId]);

  const fetchSubCategories = (value) => {
    callApi("get", ApiConstants.FETCH_SUB_CATEGORIES, { categoryId: value })
      .then((response) => {
        if (response.code === 200) {
          let subCategoryData = { ...props.subCategoryList, [props.categoryId]: response.dataList };
          props.setData(subCategoryData);
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

  const subCategoryOptions = props.subCategoryList[props.categoryId] ? renderOptions(props.subCategoryList[props.categoryId]) : [];

  return (
    <React.Fragment>
      <Select2
        options={subCategoryOptions}
        value={subCategoryOptions.filter((option) => option.value === props.value)}
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
    subCategoryList: state.lookupsReducer.subCategoryList,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setData: (data) => dispatch(ActionCreators.subCategoriesAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryList);
