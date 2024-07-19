import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useClickOutside";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useAuth } from "../../zustand/auth.store";
import { NotificationService } from "../../services/notification.service";
import { fDate, fToNow } from "../../utils/formatTime";


export const SampleNotification = [
  {
    "date": "Today",
    "notifications": [
      {
        "title": "New Merchant Added",
        "description": "You added a new merchant",
        "isRead": true,
        "time": "9:30"
      },
      {
        "title": "New Merchant Added",
        "description": "You added a new merchant",
        "isRead": false,
        "time": "14:45"
      }
    ]
  },
  {
    "date": "Yesterday",
    "notifications": [
      {
        "title": "New Merchant Added",
        "description": "You added a new merchant",
        "isRead": false,
        "time": "8:20"
      },
      {
        "title": "New Merchant Added",
        "description": "You added a new merchant",
        "isRead": true,
        "time": "10:55"
      }
    ]
  },
  {
    "date": "2024-03-15",
    "notifications": [
      {
        "title": "New Merchant Added",
        "description": "You added a new merchant",
        "isRead": true,
        "time": "11:10"
      },
      {
        "title": "New Merchant Added",
        "description": "You added a new merchant",
        "isRead": false,
        "time": "15:25"
      },
      {
        "title": "New Merchant Added",
        "description": "You added a new merchant",
        "isRead": true,
        "time": "18:40"
      }
    ]
  },
  {
    "date": "2024-03-14",
    "notifications": [
      {
        "title": "New Merchant Added",
        "description": "You added a new merchant",
        "isRead": false,
        "time": "12:15"
      },
      {
        "title": "New Merchant Added",
        "description": "You added a new merchant",
        "isRead": true,
        "time": "16:30"
      }
    ]
  }
]
interface INO {
  isNotificationOpen: boolean;
  setIsNotificationOpen: any;
}

const NotificationSidebar = ({
  isNotificationOpen,
  setIsNotificationOpen,
}: INO) => {
  const sideNavRef = useRef<any>();
  const profile: any = useAuth((s) => s.profile)
  console.log(profile)

  const navigate = useNavigate()


  useOnClickOutside(sideNavRef, () => {
    setIsNotificationOpen(false);
  });

  const { data: notifications, } = useQuery(
    ["query-user-Notifications-sales", profile],
    async () => {
      return await NotificationService.getUsersNotification();
    },
    {
      enabled: true,
      onSuccess: (res) => {
      },
      onError: (err: any) => {
        console.log("Error Occured:", err.response);
      },

    }
  );




  console.log(notifications)


  return (
    <>
      {isNotificationOpen && (
        <div className="modal-background fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-70 z-[90]">
          <section
            ref={sideNavRef}
            className={`absolute notification-sidebar transition-transform duration-500 ease-in-out ${isNotificationOpen ? 'transform  z-[90] translate-x-0' : 'transform -translate-x-full'
              }
         rounded-tl rounded-bl transition-transform duration-[30001] h-full w-[388px]  top-0 shadow-md bg-white  right-0`}
          >
            <div className="h-full flex  flex-col pr-1 justify-center">
              <div
                style={{ borderColor: "#EBEFF2" }}
                className="py-5 flex justify-between items-center px-5 border-b"
              >
                <div className="flex items-center">
                  <h6 className="text-[#101010]">Notification Area</h6>

                </div>
                <button onClick={() => {
                  setIsNotificationOpen(false);
                }} className="flex gap-2 items-center justify-center"><img

                    src="/icons/close-circle.svg"
                    className="w-4 h-auto cursor-pointer"
                    alt=""
                  />
                  Close
                </button>

              </div>
              <div className="flex-1  scrollbar px-6 py-4 overflow-y-auto">
                <div className="mb-24">
                 
                  {
                    notifications?.data.result.length > 0 ?
                      <>
                        {
                          notifications?.data.result.map((items: any, index: number) => <Notification key={index} data={items} />)
                        }
                      </> : <div className="text-center w-full mt-12 text-sm">No Notifation</div>
                  }
                </div>


                <div className="w-full py-4 bg-white right-0  px-4 absolute bottom-0 ">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => {
                      setIsNotificationOpen(false);
                      navigate("/notifications")
                    }} className="whitespace-nowrap px-3 py-3 text-sm text-white bg-primary rounded ">View all Notification</button>
                    <button className="whitespace-nowrap px-3 py-3 text-sm bg-transparent border rounded ">Mark all as read</button>
                  </div>

                </div>
              </div>


            </div>
          </section>
        </div>
      )}


    </>

  );
};


export const Notification = ({ data }: any) => {

  return (
    <div>
      <h3 className="text-xs border-b py-2 mt-3 ">{fDate(data?.createdAt)}</h3>
      <div >


        <div className="w-full flex items-end justify-between py-2 border-b">
          <div>
            <h3 className="font-medium">{data.title}</h3>
            <h5 className="text-xs text-[#6F7174]">{data.body[0][1]}</h5>
          </div>
          <div>
            <h3 className="text-xs text-[#4D5154] ">{fToNow(data?.createdAt)}</h3>
          </div>


        </div>

      </div>
    </div>
  )
}

export default NotificationSidebar;
