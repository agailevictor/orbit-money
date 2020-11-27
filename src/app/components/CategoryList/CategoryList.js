import React, { useEffect } from "react";
import { connect } from "react-redux";

import Select2 from "../Select2/Select2";
import ApiConstants from "../../shared/config/apiConstants";
import { callApi } from "../../services/apiService";
import { toastService } from "../../services/toastService";
import { ActionCreators } from "../../actions";

const CategoryList = (props) => {
  useEffect(() => {
    if (props.categoryList && !props.categoryList.length) fetchCategories();
  }, []);

  const fetchCategories = () => {
    callApi("get", ApiConstants.FETCH_CATEGORIES)
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

  const categoryOptions = renderOptions(props.categoryList);

  return (
    <React.Fragment>
      <Select2
        options={categoryOptions}
        value={categoryOptions.filter((option) => option.value === props.value)}
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
    categoryList: state.lookupsReducer.categoryList,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setData: (data) => dispatch(ActionCreators.categoriesAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
