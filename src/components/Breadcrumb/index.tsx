import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../zustand/auth.store";

interface BreadcrumbProp {
  handleBackAction: () => void;
  backText: string;
  currentPath: string;
}
export const BreadCrumb = ({
  handleBackAction,
  backText,
  currentPath,
}: BreadcrumbProp) => (
  <div className="flex mb-6">
    <div className="flex cursor-pointer" onClick={handleBackAction}>
      <ChevronLeftIcon className="w-[16px] font-bold mr-2" />
      <p className="pc-text-gray font-normal">
        {backText} <span className="mx-3 text-gray-300">{" / "}</span>{" "}
      </p>
    </div>

    <h6>{currentPath}</h6>
  </div>
);
interface BreadcrumbPropClient {
  brand: string;
  backText: string;
  currentPath: string;
}

export const BreadCrumbClient = ({
  brand,
  backText,
  currentPath,
}: BreadcrumbPropClient) => {
  const profile:any = useAuth((s) => s.profile)
  return (
    <div className="flex mb-6">
      <div className="flex cursor-pointer font-medium  text-sm text-primary-text">
        <p className=" ">
          {profile.whiteLabelName} <span className="mx-3 text-gray-300">{" / "}</span>{" "}
        </p>
        <p className=" text-primary-text">
          {backText} <span className="mx-3 text-gray-300">{" / "}</span>{" "}
        </p>
      </div>

      <h6 className="text-foundation-darkPurple text-sm font-medium ">{currentPath}</h6>
    </div>
  );
}


