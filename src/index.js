import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import "./index.scss";
import App from "./app/App";
import i18n from "./app/shared/lib/i18n";
import reducer from "./app/reducers";

import * as serviceWorker from "./serviceWorker";

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.Fragment>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
