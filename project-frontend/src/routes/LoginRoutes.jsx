import { lazy } from "react";
import Loadable from "../commoncomponents/Loadable/Loadable";
import LayoutAdmin from "../layoutsAdmin/LayoutAdmin";
import AuthGuard from "../utils/AuthGuard";
import Dashboard from "../pages/Dashboard";
const UserList = Loadable(lazy(() => import("../pages/usersList")));
const AddExpense = Loadable(lazy(() => import("../pages/AddExpense")));
const ExpenseList = Loadable(lazy(() => import("../pages/ExpenseList")));
const ViewUserDetails = Loadable(lazy(() => import("../pages/ViewUserDetails")));


const LoginRoutes = {
  path: "/",
  element: (
    <AuthGuard>
    <LayoutAdmin />
    </AuthGuard>
  ),
  children: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/user-list",
      element: <UserList />,
    },
    {
      path: "/add-expense/:id?",
      element: <AddExpense />,
    },
    {
      path: "/expense-list",
      element: <ExpenseList />,
    },
    {
      path: "/view-user-details/:id",
      element: <ViewUserDetails />,
    },

  ],
};

export default LoginRoutes;
