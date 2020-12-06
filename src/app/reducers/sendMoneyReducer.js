import * as types from "../actions/actionTypes";

const initialState = {
  sendMoneyData: null,
};

const sendMoneyReducer = (state = initialState, action) => {
  console.log("actoin.data", action.data);

  switch (action.type) {
    case types.SAVE_SENDING_AMOUNT_DETAILS:
      return {
        ...state,
        sendMoneyData: action.data,
      };

    default:
      return state;
  }
};
export default sendMoneyReducer;
