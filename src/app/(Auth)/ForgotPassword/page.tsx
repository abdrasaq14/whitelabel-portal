'use client'
import ForgotPasswordForm from '@/components/forms/Auth/ForgotPasswordForm'
import useAuth from '@/customHooks/useAuth';
import React from 'react'

const page = () => {

    const {handleForgotPassword, loading} = useAuth()
   
    return (

        <div className="w-full h-screen flex flex-col">
            
            <div className="grow flex justify-center items-center">

                <ForgotPasswordForm handleForgotPassword={handleForgotPassword} loading={loading} />

            </div>

        </div>

    )

}

export default page