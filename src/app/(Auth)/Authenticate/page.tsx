"use client"
import OtpForm from '@/components/forms/OtpForm'
import React from 'react'

const page = () => {
  return (
    <div className='bg-white my-8 sm:border-[0.4px] sm:border-purple-main rounded-lg h-auto w-full sm:w-[464px] py-8 px-9 sm:shadow-custom max-h-[624px]'>
      <h2 className='text-2xl sm:text-center font-gooperSemibold text-black mb-2'>Account Authentication</h2>

      <p className='text-sm xs:mb-4 font-normal sm:text-center mt-2 font-satoshiRegular text-accent-main'>
          Enter your OTP to proceed
      </p>

      <OtpForm length={6} />  
    
    </div>
  )
}

export default page