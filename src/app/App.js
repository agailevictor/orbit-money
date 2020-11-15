import React from "react";
import { ToastContainer } from "react-toastify";

import AppRouter from "./Router";
import "./App.scss";

const App = () => {
  return (
    <React.Fragment>
      <AppRouter />
      <ToastContainer pauseOnHover={false} autoClose={2000} />
    </React.Fragment>
  );
};

export default App;
