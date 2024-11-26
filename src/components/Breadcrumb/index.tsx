import Link from "next/link";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import useStorage from "@/customHooks/useStorage";
import { FaChevronCircleLeft } from "react-icons/fa";
import { useState, useEffect } from "react";

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
      <FaChevronCircleLeft className="w-[16px] font-bold mr-2" />
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
  const [isClient, setIsClient] = useState(false);
  const { currentUser } = useStorage()

  useEffect(() => {
    setIsClient(true); // Sets to true only on client side
  }, []);

  if (!isClient) {
    // Avoids rendering until client-side mounting
    return null;
  }

  return (
    <div className="flex mb-6">
      <div className="flex  font-medium  text-sm text-accent-dark2">
        <p className=" ">
          {currentUser?.user?._doc?.role === 'Staff' ? currentUser?.user?._doc?.firstName : currentUser?.user?.whiteLabelName}{" "}
          <span className="mx-3 text-gray-300">{" / "}</span>{" "}
        </p>
      </div>

      <h6 className="text-purple-main text-sm font-medium ">
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
    <div className="flex mb-6 items-center">
      <div className="flex cursor-pointer items-center">
        {showBackButton && (
          <span onClick={handleBackAction}>
            <MdOutlineKeyboardBackspace className="font-bold mr-2 text-accent-darker text-[18px]" />
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

      <span className="ml-1 text-accent-darker font-semibold">{currentPath}</span>
    </div>
  );
};
