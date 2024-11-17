import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import useStorage from "@/customHooks/useStorage";
import { User } from "@/interfaces/AppInterfaces";

interface BreadcrumbProp {
  handleBackAction: () => void;
  backText: string;
  currentPath: string;
}
export const BreadCrumb = ({
  handleBackAction,
  backText,
  currentPath
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
  currentPath
}: BreadcrumbPropClient) => {
  const { getSessionData } = useStorage();
  const profile = getSessionData("UserData")?.user as User;
  
  return (
    <div className="flex mb-6">
      <div className="flex  font-medium  text-sm text-accent-darker">
        <p className=" ">
          {profile?._doc?.role === 'Staff' ? profile?._doc?.firstName : profile?.whiteLabelName}
          <span className="mx-3 text-gray-300">{" / "}</span>{" "}
        </p>
      </div>

      <h6 className="text-foundation-darkPurple text-sm font-medium ">
        {currentPath}
      </h6>
    </div>
  );
};
interface BreadCrumbWithBackButtonProps {
  backText: string;
  showBackButton?: boolean;
  currentPath: string;
  handleBackAction: () => void;
}

export const BreadCrumbWithBackButton = ({
  backText,
  currentPath,
  handleBackAction,
  showBackButton
}: BreadCrumbWithBackButtonProps) => {
  // const profile: any = useAuth((s) => s.profile);
  return (
    <div className="flex mb-6 items-center text-accent-light3">
      <div className="flex cursor-pointer items-center">
        {showBackButton && (
          <span onClick={handleBackAction}>
            <MdOutlineKeyboardBackspace className="font-bold mr-2 text-[18px]" />
          </span>
        )}
        {backText && (
          <>
            <Link href="/blog" className="mx-1">
              {backText}{" "}
            </Link>
            <span className="text-gray-300"> {" / "}</span>
          </>
        )}
      </div>

      <span className="ml-1 text-primary font-semibold">{currentPath}</span>
    </div>
  );
};
