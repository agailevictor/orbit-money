import axios from "axios";
import ApiConstants from "../shared/config/apiConstants";

export const callApi = (method, url, params) => {
  // alert(ApiConstants.BASE_URL + url);
  return new Promise((resolve, reject) => {
    axios({
      method,
      url: ApiConstants.BASE_URL + url,
      data: params,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
