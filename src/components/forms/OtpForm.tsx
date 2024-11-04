import React, {useState} from 'react'
import OtpInput from 'react-otp-input'
import AppButton from './AppButton';
import { ButtonType, SpinnerType } from '@/enums/ComponentEnums';
import { FaArrowRight } from 'react-icons/fa6';
import useAuth from '@/customHooks/useAuth';
import { OtpProps } from '@/interfaces/ComponentInterfaces';
import useStorage from '@/customHooks/useStorage';

const OtpForm = ({length, prompt='Enter the verification code sent to you at '}: OtpProps) => {
    const {setOtp, otp, verifyOtp, resendOtp, time, loading} = useAuth();
    const {getLocalData} = useStorage();

    return (
        <div className='flex flex-col bg-white'>
            
            <OtpInput 
                value={otp}
                inputType='number'
                onChange={setOtp}
                numInputs={length}
                renderInput={(props) => <input {...props} />}
                containerStyle={'flex justify-between items-center mt-10'}
                inputStyle={{
                    border: '1px solid #C8CCD0',
                    borderRadius: '8px',
                    width: '48px',
                    height: '48px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: '#464749'
                }}
            />
            
            <p className="font-satoshiRegular text-sm text-accent-main mt-5">{prompt} {getLocalData("otpReceiver")}</p>
            
            <p className='font-satoshiBold text-xs text-accent-main my-5'>Did not get Code? 
                {time > 0 ? " Resend code in " : <span onClick={resendOtp} className='cursor-pointer'> Resend</span>}
                {time > 0 && <span> ({`0:${time < 10 ? '0'+time : time}`})</span>}
            </p>

            <AppButton loader={{loading, type: SpinnerType.SECONDARY, height: 25, width: 25}} type={ButtonType.PRIMARY} text='Proceed' icon={FaArrowRight} handleClick={() => verifyOtp(length, getLocalData("otpReceiver"))} />

        </div>
    )
}

export default OtpForm