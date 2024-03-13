import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import reducer from "./store/reducer";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store=legacy_createStore(reducer);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
