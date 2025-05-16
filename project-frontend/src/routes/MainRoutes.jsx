import { lazy } from "react";
import Loadable from "../commoncomponents/Loadable/Loadable";
import Layout from "../layouts/Layout";
import GuestGuard from "../utils/GuestGuard";
import { Navigate } from "react-router-dom";

const Login = Loadable(lazy(() => import("../pages/Login")));
const Registration = Loadable(lazy(() => import("../pages/Registration")));

const MainRoutes = {
  path: "/",
  element: (
    <GuestGuard>
      <Layout />
    </GuestGuard>
  ),
  children: [
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Registration />,
    }
  ],
};

export default MainRoutes;