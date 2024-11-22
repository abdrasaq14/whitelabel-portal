"use client";
import { isJsonString } from '@/utilities/helpers';

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

    const updateLocalData = (key: string, prop: string, value: any) => {
        
        if (!isClient) return null;

        const data = getLocalData(key);

        data[prop] = value;

        storeLocalData(key, data)

        return data;

    }

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

    const updateSessionData = (key: string, prop: string, value: any) => {
        
        if (!isClient) return null;

        const data = getSessionData(key);

        // console.log(key, prop, value, data)

        data[prop] = value;

        storeSessionData(key, JSON.stringify(data))

        return data;

    }
    

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

        updateLocalData,

        updateSessionData
    
    };
}
export default useStorage;
