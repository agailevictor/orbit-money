import axios from "axios";
import AppConfig from "../shared/config/appConfig";

export const callApi = (method, url, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url: AppConfig.API_BASE_URL + url,
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
