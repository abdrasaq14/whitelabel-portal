"use client"

import React from 'react'
import { useSearchParams } from "next/navigation";
import SetPasswordForm from '@/components/forms/Auth/SetPasswordForm';
import useAuth from '@/customHooks/useAuth';

const page = () => {

    const {handleResetPassword, loading} = useAuth();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");
  
    return (

        <div className="w-full h-screen flex flex-col">
            
            <div className="grow flex justify-center items-center">
            
                <SetPasswordForm handleResetPassword={(values: any) => handleResetPassword({...values, resetToken: token})} loading={loading} />
            
            </div>
        
        </div>
  
    )

}

export default page