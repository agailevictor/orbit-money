/*
 * Reducer actions related with sign in
 */
import * as types from "./actionTypes";

export function signInResponse(userToken) {
  return {
    type: types.SIGNIN_RESPONSE,
    userToken,
  };
}
