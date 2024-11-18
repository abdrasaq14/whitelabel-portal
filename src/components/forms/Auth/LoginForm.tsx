"use client"
import React, {useState} from 'react'
import AppCard from '../../utilities/AppCard'
import { ButtonType, CardType, ModalFooterType, ModalHeaderType, SpinnerType, TextboxType } from '@/enums/ComponentEnums'
import { useCustomFormik } from '@/customHooks/useCustomFormik'
import { loginValidation } from '@/utilities/validations'
import AppTextBox from '../AppTextBox'
import {FaRegEnvelope} from "react-icons/fa6";
import { CiLock } from "react-icons/ci";
import AppCheckbox from '../AppCheckbox'
import Link from 'next/link'
import AppButton from '../AppButton'
import { FaArrowRight } from "react-icons/fa6";
import Image from 'next/image'
import { BsExclamationCircle } from "react-icons/bs";
import ValidationError  from '../ValidationError'
import useAuth from '@/customHooks/useAuth'
import OtpModal from '../../modals/OtpModal'

const LoginForm = () => {
    const {handleLogin, loading} = useAuth();

    const [isChecked, setIsChecked] = useState<boolean>(false);

    const initialValues = { email: '', password: '' };

    const onSubmit = (values: any) => {
        handleLogin(values);
    };

    const {handleBlur, handleChange, errors, values, handleSubmit, touched} = useCustomFormik(initialValues, onSubmit, loginValidation);

  return (
    <div className='w-full sm:w-[464px]'>
        <AppCard type={CardType.BORDERED}>
            <h2 className='text-2xl sm:text-center font-gooperSemibold text-black mb-2'>
                Login
            </h2>
            <p className='text-base xs:mb-4 sm:text-center mt-2 font-satoshiRegular text-accent-main'>
                Enter your credentials to access your account
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
                    <AppTextBox 
                        name="password" 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        value={values.password} 
                        leftIcon={CiLock} 
                        topLabel="Password" 
                        type={TextboxType.PASSWORD} 
                        placeholder='Password' 
                        bottomLabel={touched.password && errors.password ? <ValidationError icon={BsExclamationCircle} message={String(errors.password)} /> : ""}
                    />
                </div>

                <div className='flex justify-between items-center mt-5'>
                    <AppCheckbox label="Remember me for the next 30 days" checked={isChecked} onChange={(checked) => setIsChecked(checked)} />
                    <Link href='/forgot-password' className="text-sm text-purple-main font-satoshi underline">Forgot password?</Link>
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

export default LoginForm