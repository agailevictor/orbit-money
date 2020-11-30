import * as types from "./actionTypes";

export function userSignedIn(userToken) {
  return {
    type: types.USER_SIGNED_IN,
    userToken,
    isAuthenticated: true,
  };
}

export function userSignedOut() {
  return {
    type: types.USER_SIGNED_OUT,
  };
}

export function refreshAccount(refresh) {
  return {
    type: types.REFRESH_ACCOUNT,
    refresh
  };
}

