import * as userActions from "./userActions";
import * as lookupActions from "./lookupActions";
import * as updateBusinessAccountAction from "./businessAccountActions";
import * as sendMoneyActions from "./sendMoneyActions";

export const ActionCreators = { ...userActions, ...lookupActions, ...updateBusinessAccountAction, ...sendMoneyActions };
