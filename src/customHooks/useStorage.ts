"use client";
import { isJsonString } from '@/utilities/checkers';

const useStorage = () => {
    const isClient = typeof window !== 'undefined';

    const storeLocalData = (key: string, value: string) => {
        if (isClient) {
            localStorage.setItem(key, value);
        }
    };

    const getLocalData = (key: string) => {
        if (!isClient) return null;
        const item = localStorage.getItem(key);
        return item ? (isJsonString(item) ? JSON.parse(item) : item) : null;
    };

    const removeLocalData = (key: string) => {
        if (isClient) {
            localStorage.removeItem(key);
        }
    };

    const clearLocalData = () => {
        if (isClient) {
            localStorage.clear();
        }
    };

    const storeSessionData = (key: string, value: string) => {
        if (isClient) {
            sessionStorage.setItem(key, value);
        }
    };

    const getSessionData = (key: string) => {
        if (!isClient) return null;
        const item = sessionStorage.getItem(key);
        return item ? (isJsonString(item) ? JSON.parse(item) : item) : null;
    };

    const removeSessionData = (key: string) => {
        if (isClient) {
            sessionStorage.removeItem(key);
        }
    };

    const clearSessionData = () => {
        if (isClient) {
            sessionStorage.clear();
        }
    };

    // Directly access session data when you need it
    const currentUser = getSessionData('UserData');
console.log("SessionData", currentUser, storeSessionData);
    return {
        storeLocalData,
        getLocalData,
        removeLocalData,
        clearLocalData,
        storeSessionData,
        getSessionData,
        removeSessionData,
        clearSessionData,
        currentUser,
    };
};

export default useStorage;
