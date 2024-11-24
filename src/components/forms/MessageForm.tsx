import React, { useRef } from 'react'
import AppTextBox from './AppTextBox'
import { TextboxType, ButtonType } from '@/enums/ComponentEnums'
import { BsExclamationCircle } from 'react-icons/bs'
import AppButton from './AppButton'
import { useCustomFormik } from '@/customHooks/useCustomFormik'
import { messageValidation } from '@/utilities/validations'
import ValidationError from './ValidationError'

const MessageForm = ({handleSendMessage, sendLoading}: any) => {

    const initialValues = { messageText: '' };

    const onSubmit = (values: any) => {
        handleSendMessage(values);
    };

    const {handleBlur, handleChange, errors, values, handleSubmit, touched} = useCustomFormik(initialValues, onSubmit, messageValidation);

    return (
        <form onSubmit={handleSubmit} className='flex items-center justify-between bg-accent-light p-5 gap-4'>
                    
            <div className="bg-white flex-grow p-0 rounded-xl">
                
                <AppTextBox 
                    type={TextboxType.TEXT}
                    name="messageText" 
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    value={values.messageText}
                    placeholder='Type a message' 
                    bottomLabel={touched.messageText && errors.messageText ? <ValidationError icon={BsExclamationCircle} message={String(errors.messageText)} /> : ""} 
                />

            </div>

            <div className="w-[100px]">
                
                <AppButton loader={{loading: sendLoading}} type={ButtonType.PRIMARY} text={'Send'} style="!bg-success-dark" handleClick={() => {}} />  
            
            </div>

        </form>
    )
}

export default MessageForm