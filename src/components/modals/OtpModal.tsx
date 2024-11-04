import React from 'react'
import AppModal from '../AppModal'
import useModal from '@/customHooks/useModal'
import OtpForm from '../forms/OtpForm';

const OtpModal = () => {
  const {showOtpModal, closeOtpModal} = useModal();

  return (
    <AppModal hasClose={true} isOpen={showOtpModal} closeClicked={closeOtpModal}>
        
        <div className='my-8 sm:border-[0.4px] sm:border-purple-main rounded-lg h-auto w-full sm:w-[464px] py-8 px-9 sm:shadow-custom max-h-[624px]'>
          <h2 className='text-2xl sm:text-center font-gooperSemibold text-black mb-2'>Account Authentication</h2>

          <p className='text-sm xs:mb-4 font-normal sm:text-center mt-2 font-satoshiRegular text-accent-main'>
              Enter your OTP to proceed
          </p>

          <OtpForm length={6} />  
        
        </div>
    
    </AppModal>
  )
}

export default OtpModal