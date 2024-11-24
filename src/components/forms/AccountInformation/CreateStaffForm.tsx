import React from 'react'
import AppTextBox from '../AppTextBox'
import { ButtonType, SpinnerType, TextboxType } from '@/enums/ComponentEnums'
import ValidationError from '../ValidationError'
import { BsExclamationCircle } from 'react-icons/bs'
import { useCustomFormik } from '@/customHooks/useCustomFormik'
import { StaffInfoValidation } from '@/utilities/validations'
import DocumentUpload from '../DocumentUpload/DocumentUpload'
import useUpload from '@/customHooks/useUpload'
import ChangeStaffImage from '../DocumentUpload/ChangeStaffImage'
import AppSelectBox from '../AppSelectBox'
import AppButton from '../AppButton'
import useAccount from '@/customHooks/useAccount'

const CreateStaffForm = ({closeModal}: any) => {

    const {uploading, handleHoldImage, imageHolder} = useUpload();

    const {handleCreateStaff, loading} = useAccount()

    const initialValues: any = { 
        firstName: "", 
        lastName: "", 
        email: "", 
        phoneNumber: "", 
        role: "Admin" 
    };

    const onSubmit = (values: any) => {
        
        if(imageHolder){

            values.image = imageHolder;

            // console.log("Staff info", values);

            handleCreateStaff(values)

        }
        
    };

    const {handleBlur, handleChange, errors, values, handleSubmit, touched} = useCustomFormik(initialValues, onSubmit, StaffInfoValidation);
  
    return (
        <div>
            <div className='my-10'>
                <DocumentUpload 
                    uploadInterface={<ChangeStaffImage loader={{ loading: uploading, type: SpinnerType.PRIMARY, height: 25, width: 25 }} image={imageHolder} />} 
                    validFormats=".jpeg,.png,.jpg"
                    callback={handleHoldImage}
                    // otherData={activeStaff?._id}
                />
                {imageHolder == null ? <ValidationError icon={BsExclamationCircle} message='image is required' /> : ""}
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

            <div className='w-full my-10 flex justify-end gap-3 items-center'>
                <div className='w-1/3'><AppButton type={ButtonType.SECONDARY} text='Cancel' handleClick={() => {closeModal()}} /></div>
                <div className='w-1/3'><AppButton loader={{loading, type: SpinnerType.SECONDARY, height: 25, width: 25}} type={ButtonType.PRIMARY} text='Add' handleClick={handleSubmit} /></div>
            </div>
        </div>
    )
}

export default CreateStaffForm