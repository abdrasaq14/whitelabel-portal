import { Navigate } from "react-router-dom";
import  Login  from "../pages/auth/Login";
import SignIn from "../pages/auth/SignIn";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { RequestPasswordReset } from "../pages/auth/RequestPasswordReset";
import { PasswordSetup } from "../pages/auth/PasswordSetup";
import { IModuleRouter } from "./index";
import OnboardingLayout from "../pages/auth/layout/onboardingLayout";
import { PasswordRecovery } from "../pages/auth/PasswordRecovery";
import Authenticate from "../pages/auth/Authenticate";

export const AuthRouter: IModuleRouter = {
  key: "auth",
  guard: (loggedIn) => !loggedIn,
  // @ts-ignore
  layout: OnboardingLayout,
  routes: [
    // {
    //   index: true,
    //   element: <Navigate to="/login" />,
    // },
    {
      path: "/",
      element: <Navigate to="/login" /> ,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/password-setup",
      element: <PasswordSetup />,
    },
    {
      path: "/authenticate",
      element: <Authenticate />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/create-password",
      element: <ResetPassword />
    },
    {
      path: "/password-recovery",
      element: <PasswordRecovery />,
    },
    {
      path: "/forgot-password",
      element: <RequestPasswordReset />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ],
};
