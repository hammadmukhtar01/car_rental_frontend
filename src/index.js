import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FormDataProvider } from "./components/Pages/Utils/FormDataContext";
import "select2/dist/css/select2.min.css";
import "select2";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

ReactDOM.render(
  <React.StrictMode>
    <FormDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FormDataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
