import React, { useContext, useState, useEffect } from "react";
import NotificationIcon from "../../components/common/NotificationIcon";
import NotificationSidebar from "../../components/common/NotificationSidebar";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { useAuth } from "../../zustand/auth.store";

import { Link } from "react-router-dom";
import Clock from "../../components/Clock";
import { NotificationContext } from "../../context/NotificationContext";
import CurrencySymbol from "../../components/common/CurrencySymbol";
import LanguageFlag from "../../components/common/LanguageFlag";
import { useQuery } from 'react-query'
import { NotificationService } from '../../services/notification.service'

const _extractInitials = (val: string) => {
  const _first = val.split(" ")[0].slice(0, 1);
  const _second = val?.split(" ")[1]?.slice(0, 1);
  return `${_first.toLocaleUpperCase()}${_second && _second.toLocaleUpperCase()}`;
};

const user = {
  name: "Favour Adebayo",
  time: "11:24 AM",
  location: "Lagos, Nigeria"
}


const DashboardHeader = ({setNotificationIndicator}: any) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const companyDetails: any = useAuth(state => state.profile);
  const {isNewNotificationAvailable, toggleOpen}: any = useContext(NotificationContext)

  const profile: any = useAuth((s) => s.profile)

  // console.log("User profile", profile)
  // console.log("Company profile", companyDetails)

  useEffect(() => {
    console.log("Last notification", isNewNotificationAvailable)
  }, [isNewNotificationAvailable])

  const { data: notifications, } = useQuery(
    ["query-user-Notifications-sales", profile],
    async () => {
        return await NotificationService.getUsersNewNotification();
    },
    {
        enabled: true,
        onSuccess: (res) => {
          console.log("Notifications response", res)
          res?.data?.result?.length > 0 ? setNotificationIndicator(true) : setNotificationIndicator(false) 
          console.log("Checking new notification", isNewNotificationAvailable)
        },
        onError: (err: any) => {
            console.log("Error Occured:", err.response);
        },

    }
  );

  // console.log("Notification>>>>>>>>>>>>>>>", notifications)

  const _openNav = () => {
    toggleOpen();
  };

  return (
    <header className="h-20 w-full sticky top-0  shadow-sm  overflow-hidden">
      <div className="px-6 h-full flex justify-between bg-white items-center">
        <div>
          <p className="font-medium text-base text-[#464749] font-satoshiRegular">Welcome back.</p>
          <p className="font-bold mt-1 text-base text-[#464749]  font-satoshiBold">
            <span className="font-medium font-satoshiRegular text-base text-[#464749] mr-1">
              Hi,
            </span>
            {profile?._doc?.role === 'Staff' ? profile?._doc?.firstName : companyDetails?.whiteLabelName}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <LanguageFlag languageCode={companyDetails?.language} />{companyDetails?.language}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <CurrencySymbol currencyCode={companyDetails?.currency} />{companyDetails?.currency}
          </div>

          <div className="flex items-center">
            <IoIosHelpCircleOutline size={28} fill="#000000" />
          </div>
          <div className="flex items-center ">

            <div
              onClick={_openNav}
              className={`w-10 h-10 rounded-full bg-opacity-20 cursor-pointer ${isNotificationOpen ? "bg-pc-lightblue" : "bg-transparent"
                } flex justify-center items-center`}
            >
              <div className="relative p-2 mr-3 mt-1">
                {isNewNotificationAvailable && <span className="w-3 h-3 absolute bg-red-500 rounded-full z-10 top-1 right-[0.45rem] "></span>}
                <NotificationIcon fill="#06C270" />
              </div>

            </div>


          </div>
          <div>
            <p className=" font-normal text-xs text-[#464749]">{user.location}</p>
            <p className="font-satoshiBold text-xs text-[#464749] mt-1 text-end "><Clock /></p>
          </div>
        </div>
      </div>

    </header>
  );
};

export default DashboardHeader;
