import * as types from "../actions/actionTypes";

const initialState = {
  userToken: null,
  isAuthenticated: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_SIGNED_IN:
      return { ...state, userToken: action.userToken, isAuthenticated: action.isAuthenticated };

    case types.USER_SIGNED_OUT:
      return { ...state, userToken: null, isAuthenticated: false };

    default:
      return state;
  }
};
export default userReducer;
