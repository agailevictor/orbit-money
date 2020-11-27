import * as types from "../actions/actionTypes";

const initialState = {
  registrationData: {},
  businessActivityData: {},
};

const businessAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_REGISTRATION_DATA:
      return {
        ...state,
        registrationData: action.data,
      };
    default:
      return state;
  }
};
export default businessAccountReducer;
