import React from 'react'
import AppTextBox from '../AppTextBox'
import { ButtonType, SpinnerType, TextboxType } from '@/enums/ComponentEnums'
import ValidationError from '../ValidationError'
import { BsExclamationCircle } from 'react-icons/bs'
import useNavs from '@/customHooks/useNavs'
import { useCustomFormik } from '@/customHooks/useCustomFormik'
import { StaffInfoValidation } from '@/utilities/validations'
import DocumentUpload from '../DocumentUpload/DocumentUpload'
import useUpload from '@/customHooks/useUpload'
import ChangeStaffImage from '../DocumentUpload/ChangeStaffImage'
import AppSelectBox from '../AppSelectBox'
import AppButton from '../AppButton'
import useAccount from '@/customHooks/useAccount'

const StaffInfoForm = () => {

    const {activeStaff} = useNavs();

    const {uploading, handleSaveStaffImage} = useUpload();

    const {handleUpdateStaff} = useAccount()

    const initialValues: any = { 
        firstName: activeStaff?.firstName, 
        lastName: activeStaff?.lastName, 
        email: activeStaff?.email, 
        phoneNumber: activeStaff?.phoneNumber, 
        image: activeStaff?.image, 
        role: activeStaff?.role 
    };

    const onSubmit = (values: any) => {
        console.log("Staff info", values);
        handleUpdateStaff(values, activeStaff?._id)
    };

    const {handleBlur, handleChange, errors, values, handleSubmit, touched} = useCustomFormik(initialValues, onSubmit, StaffInfoValidation);
  
    return (
        <div>
            <div className='my-10'>
                <DocumentUpload 
                    uploadInterface={<ChangeStaffImage image={activeStaff?.image} loader={{loading: uploading, type: SpinnerType.PRIMARY, height: 25, width: 25}} />} 
                    validFormats=".jpeg,.png,.jpg"
                    callback={handleSaveStaffImage}
                    otherData={activeStaff?._id}
                />
                {/* <AppButton text='Change Logo' icon={GalleryAddIcon} type={ButtonType.SECONDARY} handleClick={() => {}} />     */}
            </div>

            <form onSubmit={handleSubmit} className='w-full'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='w-full'>
                        <AppTextBox 
                            name="firstName" 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            value={values.firstName}  
                            topLabel="First Name" 
                            type={TextboxType.TEXT} 
                            placeholder='Enter First Name' 
                            bottomLabel={touched.firstName && errors.firstName ? <ValidationError icon={BsExclamationCircle} message={String(errors.firstName)} /> : ""}
                        />
                    </div>

                    <div className='w-full'>
                        <AppTextBox 
                            name="lastName" 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            value={values.lastName}  
                            topLabel="Last Name" 
                            type={TextboxType.TEXT} 
                            placeholder='Enter last Name' 
                            bottomLabel={touched.lastName && errors.lastName ? <ValidationError icon={BsExclamationCircle} message={String(errors.lastName)} /> : ""}
                        />
                    </div>

                    <div className='w-full'>
                        <AppTextBox 
                            name="email" 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            value={values.email}  
                            topLabel="Email Address" 
                            type={TextboxType.EMAIL}
                            placeholder='Enter Email Address' 
                            bottomLabel={touched.email && errors.email ? <ValidationError icon={BsExclamationCircle} message={String(errors.email)} /> : ""}
                        />
                    </div>

                    <div className='w-full'>
                        <AppTextBox 
                            name="phoneNumber" 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            value={values.phoneNumber}  
                            topLabel="Phone Number" 
                            type={TextboxType.TEXT} 
                            placeholder='Enter Phone Number' 
                            bottomLabel={touched.phoneNumber && errors.phoneNumber ? <ValidationError icon={BsExclamationCircle} message={String(errors.phoneNumber)} /> : ""}
                        />
                    </div>

                    <div className='w-full'>
                        <AppSelectBox 
                            name="role" 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            value={values.role}  
                            topLabel="Role" 
                            bottomLabel={touched.phoneNumber && errors.phoneNumber ? <ValidationError icon={BsExclamationCircle} message={String(errors.phoneNumber)} /> : ""}
                        >
                            <option value="Admin">Admin</option>
                            <option value="Staff">Staff</option>
                        </AppSelectBox>
                    </div>
                    
                </div>
            </form>

            <div className='w-full my-10 flex justify-between items-center'>
                <div className='w-1/3'><AppButton style="!border-danger-main !text-danger-main" type={ButtonType.SECONDARY} text='Block Account' handleClick={() => {}} /></div>
                <div className='w-1/3'><AppButton loader={{loading: false, type: SpinnerType.SECONDARY, height: 25, width: 25}} type={ButtonType.PRIMARY} text='Update' handleClick={handleSubmit} /></div>
            </div>
        </div>
    )
}

export default StaffInfoForm