import React from "react";
import { toast, Slide } from "react-toastify";

export const toastService = {
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
      transition: Slide,
    });
  },
  error: (msg, duration = null) => {
    toast.dismiss();
    if (!msg) msg = "Something went wrong. Please try after some time";
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      transition: Slide,
    });
  },
};
