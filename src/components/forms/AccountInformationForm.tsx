import React from 'react'
import AppTextBox from './AppTextBox'
import AppButton from './AppButton';
import { ButtonType, SpinnerType, TextboxType } from '@/enums/ComponentEnums';
import ValidationError from './ValidationError';
import { BsExclamationCircle } from 'react-icons/bs';
import { useCustomFormik } from '@/customHooks/useCustomFormik';
import { loginValidation } from '@/utilities/validations';
import { FaArrowRight } from 'react-icons/fa6';
import Image from 'next/image';
import { CiLock } from 'react-icons/ci';

const AccountInformationForm = () => {
    const loading = false;
    const initialValues = { 
        companyName: '', 
        companyEmail: '', 
        adminName: '', 
        adminEmail: '', 
        companyPhoneNumber: '', 
        adminPhoneNumber: '', 
        companyAddress: '' 
    };

    const onSubmit = (values: any) => {
        console.log("Account info", values);
    };

    const {handleBlur, handleChange, errors, values, handleSubmit, touched} = useCustomFormik(initialValues, onSubmit, loginValidation);

    return (
        <form onSubmit={handleSubmit} className='w-full'>
            <div className='grid grid-cols-2 gap-6'>
                <div className='w-full mt-5'>
                    <AppTextBox 
                        name="companyName" 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        value={values.email}  
                        topLabel="Company Name" 
                        type={TextboxType.TEXT} 
                        placeholder='Enter Email' 
                        bottomLabel={touched.email && errors.email ? <ValidationError icon={BsExclamationCircle} message={String(errors.email)} /> : ""}
                    />
                </div>

                <div className='w-full mt-5'>
                    <AppTextBox 
                        name="adminName" 
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
            </div>

            <div className='w-full mt-5'>
                <AppButton loader={{loading, type: SpinnerType.SECONDARY, height: 25, width: 25}} type={ButtonType.PRIMARY} text='Proceed' icon={FaArrowRight} handleClick={() => {}} />
            </div>

            <div className='w-100 my-10 flex justify-center'><Image alt='profitAll Logo' src='/images/logo-purple.svg' width={100} height={18} priority /></div>
        </form>
    )
}

export default AccountInformationForm