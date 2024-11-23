"use client"
import { useRouter } from 'next/navigation';
import {jwtDecode} from "jwt-decode";
import useStorage from './useStorage';

const protectedRoutes: string[] = [
    '/Dashboard',
    '/Account',
    '/inventory',
    '/Message'
]

const useNavigation = () => {

    const isClient = typeof window !== 'undefined';

    const {getSessionData, clearSessionData} = useStorage();

    const router = useRouter();
    
    const push = (destination: string) => {
        
        if(protectedRoutes.includes(destination)){
            
            checkUserAuthenticity()

        }

        requestAnimationFrame(() => {
            
            router.push(destination);
        
        });
    }

    const checkUserAuthenticity = () => {

        const userData = getSessionData('UserData');
        
        // console.log("Session user data", userData);
        
        if(userData === null){

            // console.log("User data is null")
            
            windowRedirect("/Login"); 
            
            return;  
        }

        const {authToken} = userData;

        // console.log("Auth token", authToken)

        const tokenValid = isTokenValid(authToken);

        // console.log("Token valid", tokenValid)

        if(!tokenValid){

            // console.log("Not a valid token")

            clearSessionData();
            
            windowRedirect("/Login"); 
            
            return;
        }
    }

    const windowRedirect = (destination: string) => {

        if(protectedRoutes.includes(destination)){
            
            checkUserAuthenticity()
        }

        if(isClient) {
            window.location.href = destination;
        }

    }

    const isTokenValid = (token: string): boolean => {
        
        try {

            const decodedToken: any = jwtDecode(token);
            
            // console.log("Decoded token", decodedToken);
            
            const currentTime = Date.now() / 1000;
            
            return decodedToken.exp > currentTime;

        } catch (error) {

            // console.error("Invalid token format:", error);

            return false;

        }
    }

    const goBack = () => router.back();

    return {
        push,

        windowRedirect,

        goBack,

        checkUserAuthenticity
    }
}

export default useNavigation