import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import store from "../src/redux/store";

import { Auth0Provider } from "@auth0/auth0-react";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain={process.env.REACT_APP_DOMAIN}
          clientId={process.env.REACT_APP_CLIENT_ID}
          authorizationParams={{
            redirect_uri: window.location.href,
            audience: process.env.REACT_APP_AUDIENCE,
            scope: "write:orders write:users",
          }}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
