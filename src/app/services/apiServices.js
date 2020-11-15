import axios from "axios";
import AppConfig from "../shared/config/appConfig";

export const callApi = (method, url, params, header) => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url: AppConfig.API_BASE_URL + url,
      data: params,
      header,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const callDownloadApi = (method, url, params, header, filename) => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url: AppConfig.API_BASE_URL + url,
      data: params,
      header,
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((e) => {
        reject(e);
      });
  });
};
