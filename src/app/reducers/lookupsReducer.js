import * as types from "../actions/actionTypes";

const initialState = {
  countryList: [],
  provinceList: {},
  cityList: {},
  categoryList: [],
  subCategoryList: {},
  transactionValueList: [],
  transactionNumberList: [],
  occupationGroupList: [],
  occupationList: []
};

const lookupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_COUNTRY_LIST:
      return { ...state, countryList: action.data };
    case types.UPDATE_PROVINCE_LIST:
      return { ...state, provinceList: action.data };
    case types.UPDATE_CITY_LIST:
      return { ...state, cityList: action.data };
    case types.UPDATE_CATEGORIES_LIST:
      return { ...state, categoryList: action.data };
    case types.UPDATE_SUB_CATEGORIES_LIST:
      return { ...state, subCategoryList: action.data };
    case types.TRANSACTION_VALUE_LIST:
      return { ...state, transactionValueList: action.data };
    case types.TRANSACTION_NUMBER_LIST:
      return { ...state, transactionNumberList: action.data };
    case types.UPDATE_OCCUPATION_GROUP_LIST:
      return { ...state, occupationGroupList: action.data };
    case types.UPDATE_OCCUPATION_LIST:
      return { ...state, occupationList: action.data };
    default:
      return state;
  }
};
export default lookupsReducer;
