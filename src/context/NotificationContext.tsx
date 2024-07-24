import React, { useState, useMemo, ReactNode, useEffect } from 'react'
import { useAuth } from '../zustand/auth.store';

// create context
export const NotificationContext = React.createContext<valueItf | null>(null)


interface valueItf {
    isNotificationOpen: boolean;
    toggleOpen: () => void;
    cloesNotification: () => void;
}
interface notificationITF {
    children: ReactNode
}

const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
];

export const NotificationProvider = ({ children }: notificationITF) => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)

    function toggleOpen() {
        setIsNotificationOpen(!isNotificationOpen)
    }

    function cloesNotification() {
        setIsNotificationOpen(false)
    }

    const value = useMemo(
        () => ({
            isNotificationOpen,
            toggleOpen,
            cloesNotification,
        }),
        [isNotificationOpen]
    )




    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}