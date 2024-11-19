import React, { useRef } from 'react'
import Image from 'next/image'
import Spinner from '../feedbacks/Spinner'
import { ButtonType, SpinnerType, TextboxType } from '@/enums/ComponentEnums'
import MessageBox from './MessageBox'
import AppTextBox from '../forms/AppTextBox'
import AppButton from '../forms/AppButton'
import { formatTime } from '@/utilities/helpers'
import { useCustomFormik } from '@/customHooks/useCustomFormik'
import { messageValidation } from '@/utilities/validations'
import ValidationError from '../forms/ValidationError'
import { BsExclamationCircle } from 'react-icons/bs'

const ChatBox = ({partner, loading, messages, handleSendMessage, sendLoading}: any) => {

    const messageInputRef = useRef<any>(null);

    const initialValues = { messageText: '' };

    const onSubmit = (values: any) => {
        handleSendMessage(values);
        messageInputRef.current.value = '';
    };

    const {handleBlur, handleChange, errors, values, handleSubmit, touched} = useCustomFormik(initialValues, onSubmit, messageValidation);

    return (
        
        <div className='bg-white rounded-t-lg'>

            {loading ? <Spinner type={SpinnerType.PRIMARY} /> : partner && <div className='bg-success-dark p-2 border-2 border-accent-dark rounded-t-lg flex items-center gap-2'>
                
                {partner?.image === '' ? <div className='bg-white w-[45px] h-[45px] rounded-full flex justify-center items-center text-success-dark text-base font-satoshiBold'>{partner?.firstName.charAt(0)} {partner?.lastName.charAt(0)}</div> : <Image src={partner?.image || '/icons/avartar.svg'} height={45} width={45} alt="Avatars" />}

                <span className='text-base font-satoshiBold text-white'>{partner?.businessName || `${partner?.firstName} ${partner?.lastName}`}</span>

            </div>}

            <div className='h-[500px] overflow-auto flex flex-col gap-8 p-5'>

                {messages?.map((message: any) => <MessageBox key={message.id} text={message.text} isSender={partner?.id !== message?.sender} time={formatTime(message.createdAt)} />)}

            </div>
                
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

        </div>

    )

}

export default ChatBox