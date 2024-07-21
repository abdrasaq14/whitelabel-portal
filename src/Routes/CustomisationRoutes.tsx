import { IModuleRouter } from "./index";
import CustomisationLayout from "../pages/customisation/layout/customisationLayout";
import CustomisationPage from "../pages/customisation/index";

export const CustomisationRouter: IModuleRouter = {
  key: "customisation",
  guard: (loggedIn) => loggedIn,
  next: (isCustomised) => !isCustomised,
  layout: CustomisationLayout,
  routes: [
    {
      path: "/customisation",
      element: <CustomisationPage />
    }
  ]
};
