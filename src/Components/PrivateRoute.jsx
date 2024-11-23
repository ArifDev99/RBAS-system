import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../Context/userContext";

function PrivateRoute({ children, allowedRoles }) {
  const { userInfo } = useUser();
  const userHasRequireRole =
    userInfo &&
    Array.isArray(allowedRoles) &&
    allowedRoles.includes(userInfo.role.toUpperCase());

  if (!userInfo) {
    return <Navigate to="/Login" />;
  }

  if (userInfo && !userHasRequireRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
