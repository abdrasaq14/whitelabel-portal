import { Navigate } from "react-router-dom";
import { AdminLayout } from "../pages/dashboard/layout/AdminLayout";
import { LazyRoute } from "../utils/helpers";
import { IModuleRouter } from "./index";

export const AdminDashRouter: IModuleRouter = {
  key: "dashboard",
  guard: (loggedIn) => loggedIn,
  layout: AdminLayout,
  routes: [
    {
      index: true,
      element: <Navigate to="/dashboard" />,
    },
    LazyRoute(
      {
        path: "/dashboard",
      },
      () => import("../pages/dashboard/Dashboard")
    ),
    // product discovery
    LazyRoute(
      {
        path: "/discover-products",
      },
      () => import("../pages/dashboard/ProductDiscovery/ProductDiscovery")
    ),
    // products
    LazyRoute(
      {
        path: "/products",
      },
      () => import("../pages/dashboard/Products/AllProducts")
    ),
    LazyRoute(
      {
        path: "/blocked-products",
      },
      () => import("../pages/dashboard/Products/BlockedProducts")
    ),
    // merchants
    LazyRoute(
      {
        path: "/merchant/all-merchants",
      },
      () => import("../pages/dashboard/Merchants/AllMerchants")
    ),
    LazyRoute(
      {
        path: "/merchant/add-merchants",
      },
      () => import("../pages/dashboard/Merchants/AddMerchants")
    ),
    LazyRoute(
      {
        path: "/merchant/request-merchants",
      },
      () => import("../pages/dashboard/Merchants/MerchantRequest")
    ),
    LazyRoute(
      {
        path: "/merchant/suspend-merchants",
      },
      () => import("../pages/dashboard/Merchants/SuspendedMerchants")
    ),
    LazyRoute(
      {
        path: "/merchant/profile/:id",
      },
      () => import("../pages/dashboard/Merchants/MerchantDetails")
    ),
    // messages
    LazyRoute(
      {
        path: "/message",
      },
      () => import("../pages/dashboard/Messages/Messages")
    ),
    //settings
    LazyRoute(
      {
        path: "/settings",
      },
      () => import("../pages/dashboard/Settings/Settings")
    ),
    // Account Info
    LazyRoute(
      {
        path: "/account",
      },
      () => import("../pages/dashboard/Account/AccountInfo")
    ),
    //Orders & Transaction
    LazyRoute(
      {
        path: "/orders",
      },
      () => import("../pages/dashboard/Orders & Transaction/Orders")
    ),
    LazyRoute(
      {
        path: "/notifications",
      },
      () => import("../pages/dashboard/Notifications/Notifications")
    ),
    {
      path: "/login",
      element: <Navigate to="/dashboard" />,
    },
    {
      path: "*",
      element: <div>Not found</div>,
    },
  ],
};
