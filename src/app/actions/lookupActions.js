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

export const occupationGroupsAction = (data) => {
  return {
    type: types.OCCUPATION_GROUP_LIST,
    data,
  };
};

export const occupationAction = (data) => {
  return {
    type: types.OCCUPATION_LIST,
    data,
  };
};

export const currencyListAction = (data) => {
  return {
    type: types.CURRENCIES_LIST,
    data,
  };
};

export const bankListAction = (data) => {
  return {
    type: types.BANK_LIST,
    data,
  };
};

export const branchListAction = (data) => {
  return {
    type: types.BRANCH_LIST,
    data,
  };
};

export const notificationListAction = (data) => {
  return {
    type: types.NOTIFICATIONS_LIST,
    data,
  };
}