import React from "react";
import { useReload } from "./utils";
import ReloadingComponent from "./reloadingComponent";

const ReloadHandler = ({ children }) => {
  const { loading } = useReload();

  return loading ? <ReloadingComponent /> : children;
};

export default ReloadHandler;
