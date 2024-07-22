import { Suspense, useEffect, useState } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { AuthRouter } from "./AuthRoutes";
import { AdminDashRouter } from "./DashboardRoutes";
import { AppFallback } from "./Layout";
import { useAuth } from "../zustand/auth.store";
import { TRUE } from "sass";
import { CustomisationRouter } from "./CustomisationRoutes";



export interface IModuleRouter {
  guard: (loggedIn: boolean, isCustomised?: boolean) => boolean;
  next?: (isCustomised: boolean) => boolean;
  routes: RouteObject[];
  layout?: () => JSX.Element;
  key: string;
}

const ModuleRouters: Array<IModuleRouter> = [
  AuthRouter,
  AdminDashRouter,
  CustomisationRouter
];

export const AppRouter = () => {

  const [router, setRouter] = useState<IModuleRouter | null>(null);
  const isLoggedIn: boolean = useAuth(s => !!s.token)
  // const isLoggedIn: boolean = false
  const isCustomised: boolean = useAuth(
    // @ts-ignore
    (s) => s.profile?.customisationData.completeSetup === "completed"
  );

  useEffect(() => {
    // const routeToRender = ModuleRouters.find((rtr) => rtr.guard(isLoggedIn));
    const routeToRender = ModuleRouters.filter((rtr) => rtr.guard(isLoggedIn));

    if (routeToRender.length > 1) {
      // @ts-ignore
      const routeToRender2 = routeToRender.find((rtr) => rtr.next(isCustomised));
      if (routeToRender2) {
        setRouter(routeToRender2);
      } else {
        setRouter(null);
      }
    } else {
      setRouter(routeToRender[0]);
    }
    // if (routeToRender) {
    //   setRouter(routeToRender);
    // } else {
    //   setRouter(null);
    // }
  }, [isLoggedIn, isCustomised]);

  const Layout = router?.layout ?? AppFallback;
  const routerView = useRoutes([
    {
      element: <Layout />,
      children: router?.routes ?? [],
    },
  ]);

  if (!router) {
    return <AppFallback screen />;
  }
  return <Suspense fallback={<AppFallback />}>{routerView}</Suspense>;
};
