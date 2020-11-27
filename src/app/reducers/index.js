import { combineReducers } from "redux";
import userReducer from "./userReducer";
import lookupsReducer from "./lookupsReducer";
import businessAccountReducer from "./businessAccountReducer";

export default combineReducers({
  userReducer,
  lookupsReducer,
  businessAccountReducer,
});
