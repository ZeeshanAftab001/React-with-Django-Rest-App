import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Layout from "../Pages/Layout";

export default function ProtectRoute() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Layout /> : <Navigate to="/login" replace />;
}
