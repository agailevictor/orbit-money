import * as types from "./actionTypes";

export const saveSendingAmountDetails = (data) => {
  return {
    type: types.SAVE_SENDING_AMOUNT_DETAILS,
    data,
  };
};
