import { useHistory } from "react-router";

export const AppSignout = () => {
  const history = useHistory();
  localStorage.removeItem("auth");
  localStorage.removeItem("authToken");
  localStorage.removeItem("selectedCustomerAccount");
  localStorage.removeItem("CustomerAccountToken");
  localStorage.removeItem("authToken");
  history.replace("/signin");
};
