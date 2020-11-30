import axios from "axios";

import AppConfig from "../shared/config/appConfig";

export const callApi = (method, url, params, hasCustomerAccountToken) => {
  let token = localStorage.getItem("authToken");
  let customerToken = localStorage.getItem("CustomerAccountToken");

  const config = {
    headers: { Authorization: `Bearer ${hasCustomerAccountToken ? customerToken : token}` },
  };

  let axiosConfig = {
    method,
    url: AppConfig.API_BASE_URL + url,
    headers: config.headers,
  };

  if (method.toUpperCase() === "GET") {
    axiosConfig.params = params;
  } else {
    axiosConfig.data = params;
  }

  return new Promise((resolve, reject) => {
    axios(axiosConfig)
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => {
        // if (e.response.status === 401) {
        //   localStorage.removeItem("auth");
        // }
        reject(e);
      });
  });
};

export const callDownloadApi = (method, url, params, filename, hasCustomerAccountToken) => {
  let token = localStorage.getItem("authToken");
  let customerToken = localStorage.getItem("CustomerAccountToken");

  const config = {
    headers: { Authorization: `Bearer ${hasCustomerAccountToken ? customerToken : token}` },
  };

  let axiosConfig = {
    method,
    url: AppConfig.API_BASE_URL + url,
    headers: config.headers,
    responseType: "blob",
  };

  if (method.toUpperCase() === "GET") {
    axiosConfig.params = params;
  } else {
    axiosConfig.data = params;
  }

  return new Promise((resolve, reject) => {
    axios(axiosConfig)
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
