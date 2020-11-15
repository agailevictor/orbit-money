import * as types from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  userToken: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNIN_RESPONSE:
      return [
        ...state,
        {
          userToken: action.userToken,
        },
      ];
    default:
      return state;
  }
};
export default userReducer;
