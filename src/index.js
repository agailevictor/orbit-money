import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";

import "./index.scss";
import App from "./app/App";
import i18n from "./app/shared/lib/i18n";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.Fragment>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
