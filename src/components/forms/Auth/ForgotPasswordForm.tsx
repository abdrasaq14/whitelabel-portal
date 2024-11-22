"use client"
import React from 'react'
import AppCard from '../../utilities/AppCard'
import { ButtonType, CardType, SpinnerType, TextboxType } from '@/enums/ComponentEnums'
import { useCustomFormik } from '@/customHooks/useCustomFormik'
import { emailValidation } from '@/utilities/validations'
import AppTextBox from '../AppTextBox'
import {FaRegEnvelope} from "react-icons/fa6";
import AppButton from '../AppButton'
import { FaArrowRight } from "react-icons/fa6";
import Image from 'next/image'
import { BsExclamationCircle } from "react-icons/bs";
import ValidationError  from '../ValidationError'
import OtpModal from '../../modals/OtpModal'

const ForgotPasswordForm = ({handleForgotPassword, loading}: any) => {
    
    const initialValues = { email: '' };

    const onSubmit = (values: any) => {
        handleForgotPassword(values);
    };

    const {handleBlur, handleChange, errors, values, handleSubmit, touched} = useCustomFormik(initialValues, onSubmit, emailValidation);

  return (
    <div className='w-full sm:w-[464px]'>
        <AppCard type={CardType.BORDERED}>
            <h2 className='text-2xl sm:text-center font-gooperSemibold text-black mb-2'>
                Password Recovery
            </h2>
            <p className='text-base xs:mb-4 sm:text-center mt-2 font-satoshiRegular text-accent-main'>
                A password reset link will be sent to your email. Click on it to reset your password.
            </p>

            <form onSubmit={handleSubmit}>
                <div className='w-full mt-5'>
                    <AppTextBox 
                        name="email" 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        value={values.email} 
                        leftIcon={FaRegEnvelope} 
                        topLabel="Email" 
                        type={TextboxType.EMAIL} 
                        placeholder='Enter Email' 
                        bottomLabel={touched.email && errors.email ? <ValidationError icon={BsExclamationCircle} message={String(errors.email)} /> : ""}
                    />
                </div>

                <div className='w-full mt-5'>
                    <AppButton loader={{loading, type: SpinnerType.SECONDARY, height: 25, width: 25}} type={ButtonType.PRIMARY} text='Proceed' icon={FaArrowRight} handleClick={() => {}} />
                </div>

                <div className='w-100 my-10 flex justify-center'><Image alt='profitAll Logo' src='/images/logo-purple.svg' width={100} height={18} priority /></div>
            </form>
        </AppCard>
        <OtpModal />
    </div>
  )
}

export default ForgotPasswordForm