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
    const [isNewNotificationAvailable, setIsNewNotificatioAvailable] = useState(false)

    function toggleOpen() {
        setIsNotificationOpen(!isNotificationOpen)
    }

    function cloesNotification() {
        setIsNotificationOpen(false)
    }

    function setNotificationIndicator(value: boolean){
        console.log("Setting indicator", value)
        setIsNewNotificatioAvailable(value)
    }

    const value = useMemo(
        () => ({
            isNotificationOpen,
            isNewNotificationAvailable,
            toggleOpen,
            cloesNotification,
            setNotificationIndicator
        }),
        [isNotificationOpen, isNewNotificationAvailable]
    )

    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}