import * as types from "./actionTypes";

export const updateBusinessAccountAction = (data) => {
  return {
    type: types.UPDATE_REGISTRATION_DATA,
    data,
  };
};
