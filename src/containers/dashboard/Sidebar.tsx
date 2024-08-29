import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";
// import { ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { IoStorefrontOutline } from "react-icons/io5";
import { useRef, useState, useContext } from "react";
import { useSingleState } from "../../hooks/useSingleState";
import { LogoutContext } from "../../context/LogoutContext";
import { sidebar } from "../../pages/dashboard/layout/AdminLayout";
import { useAuth } from "../../zustand/auth.store";

export const DashboardSidebar = ({ items }: { items: SideItem[] }) => {
  const companyDetails: any = useAuth(state => state.profile);
  const logout: any = useContext(LogoutContext)
  const collapsed = useSingleState(false);
  const hovered = useSingleState(false);
  const throttledHover = useRef(false);
  const isExpanded = hovered.get || !collapsed.get;
  const isCollapsed = !isExpanded;

  // console.log("Company details>>>>>>>>>>>>>>>>", companyDetails.customisationData.domain)

  return (
    <aside
      className={clsx(
        "h-full md:flex hidden transition-[width,padding] text-[#464749]  duration-300 flex-col overflow-y-hidden overflow-x-hidden bg-white relative",
        "w-[300px]"
      )}
    >
      <div
        className={clsx(
          " py-8 transition-[padding]",
          isCollapsed ? "" : "px-4 w-full"
        )}
      >
        <img
          src={companyDetails?.companyLogo}
          className={clsx(
            "transition-[width] w-auto  h-[64px] "
          )}
          alt="Brand_logo"
        />
      </div>
      <nav
        id="Sidebar-nav"
        onMouseEnter={() => {
          throttledHover.current = true;
          setTimeout(() => {
            if (throttledHover.current) {
              hovered.set(true);
            }
          }, 400);
        }}
        onMouseLeave={() => {
          hovered.set(false);
          throttledHover.current = false;
        }}
        className={clsx(
          isCollapsed ? "w-full" : "w-full",
          "flex-1 overflow-y-hidden pb-40 hover:overflow-y-auto   custom-scrollbar"
        )}
      >

        <SidebarItem />

        <NavLink target="_blank" className={"flex px-6 py-2 gap-2 items-center text-[#2B2C34]"} to={`https://${companyDetails?.customisationData?.domain}`}><IoStorefrontOutline /> Visit Marketplace</NavLink>
        <div className="w-full bg-white absolute bottom-[0px]  2xl:bottom-8 h-[105px]  gap-3.5  flex items-center px-6">


          <div onClick={() => logout?.toggleLogout()} className="w-full flex cursor-pointer bg-[#C8CCD0] rounded-md p-4 border-[1px] border-foundation-darkPurple items-center gap-3.5 ">


            <div

              className={`whitespace-nowrap pc-text-danger flex-grow ${isCollapsed ? "hidden" : ""
                }`}
            >
              <img
                src={companyDetails?.companyLogo || ""}
                className={clsx(
                  "transition-[width] w-auto  h-[24.5px] "
                )}
                alt="Brand_logo"
              />
              <p className="font-normal  font-satoshiRegular text-xs text-primary-text">{companyDetails?.email}</p>
            </div>
            <img
              src={`/icons/sidebar/logout.svg`}
              className={clsx("h-6 w-6")}
              alt="log_out"
            />
          </div>
        </div>

      </nav>
    </aside>
  );
};

export interface SideItem {
  name: string;
  path?: any;
  iconName?: string;
  children?: SideItem[];
}

export const SidebarItem = ({
  className
}: {
  className?: any;
}) => {


  return (
    <div className="mb-8 ">
      {sidebar.map((items, index) =>
        <div className="w-full my-[18px] px-3">
          {items.children ?
            <SubItem key={items.name} items={items} />
            :
            <NavLink to={items.path ?? "/"} className={({ isActive }) =>
              clsx(
                "flex items-center gap-3  px-3 py-2 text-sm",
                isActive ? "bg-primary rounded " : ""

              )
            }>
              {({ isActive }) => <>
                <img className={clsx(
                  isActive ? "invert-[100%] brightness-0 " : ""
                )} src={`/icons/sidebar/${items.iconName}.svg`} alt={items.path} />

                <h3 className={clsx("capitalize", isActive ? "text-white" : "")}>{items.name}</h3>
              </>}

            </NavLink>}

        </div>
      )
      }

    </div >


  );
};

export const SubItem = ({ items }: { items: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div >
      <div
        onClick={toggleMenu}
        className={

          clsx(
            "flex items-center gap-3 cursor-pointer text-sm  px-3 py-2",
            pathname.includes(`/${items.path}`) ? "bg-primary rounded  " : ""

          )
        }>
        <img className={clsx(
          pathname.includes(`/${items.path}`) ? "invert-[100%] brightness-0 h-4 w-4" : ""
        )} src={`/icons/sidebar/${items.iconName}.svg`} alt={items.path} style={{ objectFit: "contain" }} />
        <h3 className={clsx("capitalize", pathname.includes(`/${items.path}`) ? "text-white" : "")}>{items.name}</h3>

        <img src="/icons/arrow-down.svg" alt="" className={clsx("capitalize ml-auto", isOpen && "rotate-180", pathname.includes(`/${items.path}`) ? "invert-[100%] brightness-0" : "")} />
      </div>
      {isOpen && <>
        {items.children.map((item: any) =>
          <>
            <NavLink to={item.path ?? "/"} className={({ isActive }) =>
              clsx(
                "flex items-center gap-3  my-2 px-3 py-2 text-xs",
                isActive ? "bg-[#EDE6F3] rounded " : ""

              )
            }>
              {({ isActive }) => <>
                <img className={clsx(
                  isActive ? "" : "invert-[100%] brightness-0"
                )} alt="" /> <h3 className={clsx("capitalize", isActive ? " " : "")}>{item.name}</h3>
              </>}

            </NavLink>
          </>
        )}
      </>}



    </div>
  )
}