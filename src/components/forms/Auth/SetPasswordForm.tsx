import { useCustomFormik } from '@/customHooks/useCustomFormik';
import React from 'react'
import Image from 'next/image';
import { ButtonType, CardType, SpinnerType, TextboxType } from '@/enums/ComponentEnums';
import AppCard from '@/components/utilities/AppCard';
import AppButton from '../AppButton';
import AppTextBox from '../AppTextBox';
import { CiLock } from 'react-icons/ci';
import ValidationError from '../ValidationError';
import { BsExclamationCircle } from 'react-icons/bs';
import { SetPasswordValidation } from '@/utilities/validations';

const SetPasswordForm = ({handleResetPassword, loading}: any) => {

    const initialValues = { password: '', confirmPassword: '' };

    const onSubmit = (values: any) => {

        // console.log(values);
        
        handleResetPassword(values);
    
    };

    const {handleBlur, handleChange, errors, values, handleSubmit, touched} = useCustomFormik(initialValues, onSubmit, SetPasswordValidation);

    return (

        <div className='w-full sm:w-[464px]'>
        
            <AppCard type={CardType.BORDERED}>
                
                <h2 className='text-2xl sm:text-center font-gooperSemibold text-black mb-2'>Password Set Up</h2>
                
                <p className='text-base xs:mb-4 sm:text-center mt-2 font-satoshiRegular text-accent-main'>Kindly set up your account password</p>

                <form onSubmit={handleSubmit}>
                    
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

                    <div className='w-full mt-5'>
                        
                        <AppTextBox 
                            name="confirmPassword" 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            value={values.confirmPassword} 
                            leftIcon={CiLock} 
                            topLabel="Confirm Password" 
                            type={TextboxType.PASSWORD} 
                            placeholder='Your password' 
                            bottomLabel={touched.confirmPassword && errors.confirmPassword ? <ValidationError icon={BsExclamationCircle} message={String(errors.confirmPassword)} /> : ""}
                        />
                    
                    </div>

                    <div className='w-full mt-5'>
                        <AppButton loader={{loading, type: SpinnerType.SECONDARY, height: 25, width: 25}} type={ButtonType.PRIMARY} text='Set Up Account' handleClick={() => {}} />
                    </div>

                    <div className='w-100 my-10 flex justify-center'><Image alt='profitAll Logo' src='/images/logo-purple.svg' width={100} height={18} priority /></div>
                
                </form>

            </AppCard>
        </div>

    )

}

export default SetPasswordForm