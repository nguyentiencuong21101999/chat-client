import React from "react";
import { Navigate } from "react-router-dom";
import auth from "../../component/service/auth";

const AuthRouteNotLogin = ({ children }) => {
  const isRole = auth.checkRoleNotLogin();
  if (!isRole) {
    return <Navigate to="/" replace />;
  }
  return children;
};
const AuthRouteUser = ({ children }) => {
  const isRole = auth.checkRoleNotLogin();
  if (isRole) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export { AuthRouteNotLogin, AuthRouteUser };
