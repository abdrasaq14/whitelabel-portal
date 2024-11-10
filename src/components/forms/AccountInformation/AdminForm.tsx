import React from 'react'
import AppTextBox from '../AppTextBox'
import AppButton from '../AppButton';
import { ButtonType, SpinnerType, TextboxType } from '@/enums/ComponentEnums';
import ValidationError from '../ValidationError';
import { BsExclamationCircle } from 'react-icons/bs';
import { useCustomFormik } from '@/customHooks/useCustomFormik';
import { loginValidation } from '@/utilities/validations';
import { AccountForm } from '@/interfaces/ComponentInterfaces';
import { AdminAccountInfo } from '@/interfaces/AppInterfaces';
import useAccount from '@/customHooks/useAccount';

const AdminForm = ({currentUser}: AccountForm) => {

    const {editMode, loading, toggleEditMode} = useAccount()

    console.log("Representative data", currentUser?.representative?.phoneNumber)
     
    const initialValues: AdminAccountInfo = { 
        companyName: currentUser?.buinessName, 
        companyEmail: currentUser?.email, 
        adminName: currentUser?.representative?.fullName, 
        adminEmail: currentUser?.representative?.email, 
        companyPhoneNumber: currentUser?.phoneNumber, 
        adminPhoneNumber: currentUser?.representative?.phoneNumber, 
        companyAddress: currentUser?.address 
    };

    const onSubmit = (values: any) => {
        console.log("Account info", values);
    };

    const {handleBlur, handleChange, errors, values, handleSubmit, touched} = useCustomFormik(initialValues, onSubmit, loginValidation);

    return (
        <form onSubmit={handleSubmit} className='w-full'>
            <div className='grid grid-cols-2 gap-4'>
                <div className='w-full'>
                    <AppTextBox 
                        name="companyName" 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        value={values.companyName}  
                        topLabel="Company Name" 
                        type={TextboxType.TEXT}
                        disabled={true} 
                        placeholder='Enter Company Name' 
                        bottomLabel={touched.companyName && errors.companyName ? <ValidationError icon={BsExclamationCircle} message={String(errors.companyName)} /> : ""}
                    />
                </div>

                <div className='w-full'>
                    <AppTextBox 
                        name="adminName" 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        value={values.adminName}  
                        topLabel="Admin Name" 
                        type={TextboxType.TEXT}
                        disabled={editMode} 
                        placeholder='Enter Admin Name' 
                        bottomLabel={touched.adminName && errors.adminName ? <ValidationError icon={BsExclamationCircle} message={String(errors.adminName)} /> : ""}
                    />
                </div>

                <div className='w-full'>
                    <AppTextBox 
                        name="companyEmail" 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        value={values.companyEmail}  
                        topLabel="Company Email" 
                        type={TextboxType.EMAIL}
                        disabled={true} 
                        placeholder='Enter Company Email' 
                        bottomLabel={touched.companyEmail && errors.companyEmail ? <ValidationError icon={BsExclamationCircle} message={String(errors.companyEmail)} /> : ""}
                    />
                </div>

                <div className='w-full'>
                    <AppTextBox 
                        name="adminEmail" 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        value={values.adminEmail}  
                        topLabel="Admin Email" 
                        type={TextboxType.EMAIL}
                        disabled={editMode} 
                        placeholder='Enter Admin Email' 
                        bottomLabel={touched.adminEmail && errors.adminEmail ? <ValidationError icon={BsExclamationCircle} message={String(errors.adminEmail)} /> : ""}
                    />
                </div>

                <div className='w-full'>
                    <AppTextBox 
                        name="companyPhoneNumber" 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        value={values.companyPhoneNumber}  
                        topLabel="Company Phone Number" 
                        type={TextboxType.TEXT}
                        disabled={true} 
                        placeholder='Enter Company Phone Number' 
                        bottomLabel={touched.companyPhoneNumber && errors.companyPhoneNumber ? <ValidationError icon={BsExclamationCircle} message={String(errors.companyPhoneNumber)} /> : ""}
                    />
                </div>

                <div className='w-full'>
                    <AppTextBox 
                        name="adminPhoneNumber" 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        value={values.adminPhoneNumber}  
                        topLabel="Admin Phone Number" 
                        type={TextboxType.TEXT}
                        disabled={editMode} 
                        placeholder='Enter Admin Phone Number' 
                        bottomLabel={touched.adminPhoneNumber && errors.adminPhoneNumber ? <ValidationError icon={BsExclamationCircle} message={String(errors.adminPhoneNumber)} /> : ""}
                    />
                </div>

                <div className='w-full'>
                    <AppTextBox 
                        name="companyAddress" 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        value={values.companyAddress}  
                        topLabel="Company Address" 
                        type={TextboxType.NUMBER}
                        disabled={true} 
                        placeholder='Enter Company Address' 
                        bottomLabel={touched.companyAddress && errors.companyAddress ? <ValidationError icon={BsExclamationCircle} message={String(errors.companyAddress)} /> : ""}
                    />
                </div>
            </div>

            {!editMode && <div className='w-full flex items-center justify-end mt-10'>
                <div className='w-1/2 flex gap-5'>
                    <AppButton type={ButtonType.SECONDARY} text='Cancel' handleClick={toggleEditMode} />
                    <AppButton loader={{loading, type: SpinnerType.SECONDARY, height: 25, width: 25}} type={ButtonType.PRIMARY} text='Save' handleClick={() => {}} />
                </div>
            </div>}
        </form>
    )
}

export default AdminForm