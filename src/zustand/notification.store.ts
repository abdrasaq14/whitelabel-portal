import { AxiosBasicCredentials } from "axios";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export const useNotification = create(
  persist(
    combine(
      {
        notifications: [] as any[],
        showIndicator: false
      },
      (set) => ({
        setNotification: (value: any[]) => {
          set({ notifications: value });
        },
        setShowIndicator: (value: boolean) => {
            set({showIndicator: value})
        }
      })
    ),
    {
      name: "notification-store",
      getStorage: () => sessionStorage,
    }
  )
);

export const NotificationActions = {
  setNotification: (notification: any[]) => {
    useNotification.getState().setNotification(notification);
    if(notification.length > 0) useNotification.getState().setShowIndicator(true)
  }
};
