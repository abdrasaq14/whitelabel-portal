import { isJsonString } from '@/utilities/checkers'

const useStorage = () => {
    
    const storeLocalData = (key: string, value: string) => {
        
        localStorage.setItem(key, value)

    }

    const getLocalData = (key: string) => {
        
        const item = localStorage.getItem(key);

        if(!item){

            return null;

        }

        return isJsonString(item) ? JSON.parse(item) : item;

    }

    const removeLocalData = (key: string) => {
        
        localStorage.removeItem(key);

    }

    const clearLocalData = () => {

        localStorage.clear();
        
    }

    const storeSessionData = (key: string, value: string) => {
        
        sessionStorage.setItem(key, value)
    
    }

    const getSessionData = (key: string) => {
        
        const item = sessionStorage.getItem(key);

        if(!item){

            return null;

        }

        return isJsonString(item) ? JSON.parse(item) : item;
    }

    const removeSessionData = (key: string) => {
        
        sessionStorage.removeItem(key);
    
    }

    const clearSessionData = () => {
        
        sessionStorage.clear();
    
    }

    return {
        storeLocalData,

        getLocalData,

        removeLocalData,

        clearLocalData,

        storeSessionData,

        getSessionData,

        removeSessionData,

        clearSessionData
    }

}

export default useStorage