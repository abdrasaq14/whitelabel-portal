import { useRouter } from 'next/navigation';
import {jwtDecode} from "jwt-decode";
import useStorage from './useStorage';

const protectedRoutes: string[] = [
    '/Dashboard'
]

const useNavigation = () => {

    const {getSessionData} = useStorage();

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
            
            windowRedirect("/Login"); 
            
            return;  
        }

        const {authToken} = userData;

        // console.log("Auth token", authToken)

        const tokenValid = isTokenValid(authToken);

        // console.log("Token valid", tokenValid)

        if(!tokenValid){
            
            windowRedirect("/Login"); 
            
            return;
        }
    }

    const windowRedirect = (destination: string) => {

        if(protectedRoutes.includes(destination)){
            
            const userData = getSessionData('UserData');
        
            // console.log("Session user data", userData);
            
            if(userData === null){
                
                windowRedirect("/Login"); 
                
                return;  
            }

            const {authToken} = userData;

            // console.log("Auth token", authToken)

            const tokenValid = isTokenValid(authToken);

            // console.log("Token valid", tokenValid)

            if(!tokenValid){
                
                windowRedirect("/Login"); 
                
                return;
            }
        }

        window.location.href = destination;

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