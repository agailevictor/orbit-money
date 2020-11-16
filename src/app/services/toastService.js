import React from "react";
import { toast, Slide } from "react-toastify";

export const tostService = {
  success: (msg, duration = null) => {
    toast.dismiss();
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  },
  error: (msg, duration = null) => {
    toast.dismiss();
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  },
};
