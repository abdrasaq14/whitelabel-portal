import React from "react";
import { Button } from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { LogoutContext } from "../../context/LogoutContext";
import { ErrorBoundary } from "../../shared_components/ErrorBoundary";
import DashboardHeader from "./Header";
// import { useDashboard } from "../../zustand/dashboard.store";
// import Loader from "../Loader";
import { DashboardSidebar, SideItem } from "./Sidebar";
import { useAuth } from "../../zustand/auth.store";
import NotificationSidebar from "../../components/common/NotificationSidebar";
import { NotificationContext } from "../../context/NotificationContext";
// import { DashboardTopBar } from "./TopBar";

export const DashboardWrapper = ({
  sidebar = [],
  children,
}: {
  sidebar: SideItem[];
  children: React.ReactNode;
}) => {
  const logout: any = React.useContext(LogoutContext);
  const notification:any = React.useContext(NotificationContext)
  return (
    <section className="flex relative h-screen w-full pc-bg-gray text-[15px] max-w-[1560px] mx-auto">
      <DashboardSidebar items={sidebar} />
      <section className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 grid overflow-y-auto relative">
          <Modal onClick={logout.closeLogout} open={logout.isLogoutOpen}>
            <div className="w-[300px] p-5">
              <h6 className="text-center text-pc-grey10 font-semibold">
                Logout
              </h6>
              <p className="mt-4 text-center text-pc-grey10 font-normal">
                Are you sure you want to log out?
              </p>
              <div className="flex mt-6 items-center justify-center">
                <div className="mr-1">
                  <button
                    className="bg-white  text-primary mr-2 font-semibold px-3 h-10"
                    onClick={logout.closeLogout}
                  >
                    Cancel
                  </button>
                </div>
                <div className="ml-1">
                  <Button
                    disabled={false}
                    label="Log Out"
                    onClick={() => {
                      useAuth.getState().logout();
                      logout.closeLogout();
                    }}
                  />
                </div>
              </div>
            </div>
          </Modal>
          {/* {globalLoader && (
            <div className="absolute z-30 left-0 right-0 top-0">
              <Loader type={"bar"} />
            </div>
          )} */}
          <div className="h-full bg-gray-100 z-10 relative w-full flex flex-col overflow-x-auto">
            <ErrorBoundary>{children}</ErrorBoundary>
            <NotificationSidebar
              setIsNotificationOpen={notification?.cloesNotification}
              isNotificationOpen={notification?.isNotificationOpen}
            />
          </div>
        </main>
      </section>
    </section>
  );
};
