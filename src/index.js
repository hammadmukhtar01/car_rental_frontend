import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'select2/dist/css/select2.min.css';
import 'select2';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>{" "}
  </React.StrictMode>
);
