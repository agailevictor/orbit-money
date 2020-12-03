import * as types from "./actionTypes";

export const countryListAction = (data) => {
  return {
    type: types.UPDATE_COUNTRY_LIST,
    data,
  };
};

export const provinceListAction = (data) => {
  return {
    type: types.UPDATE_PROVINCE_LIST,
    data,
  };
};

export const cityAction = (data) => {
  return {
    type: types.UPDATE_CITY_LIST,
    data,
  };
};

export const categoriesAction = (data) => {
  return {
    type: types.UPDATE_CATEGORIES_LIST,
    data,
  };
};

export const subCategoriesAction = (data) => {
  return {
    type: types.UPDATE_SUB_CATEGORIES_LIST,
    data,
  };
};

export const transactionValueAction = (data) => {
  return {
    type: types.TRANSACTION_VALUE_LIST,
    data,
  };
};

export const transactionNumberAction = (data) => {
  return {
    type: types.TRANSACTION_NUMBER_LIST,
    data,
  };
};

export const occupationGroupAction = (data) => {
  return {
    type: types.UPDATE_OCCUPATION_GROUP_LIST,
    data,
  };
};

export const occupationAction = (data) => {
  return {
    type: types.UPDATE_OCCUPATION_LIST,
    data,
  };
};

