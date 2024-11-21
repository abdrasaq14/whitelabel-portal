import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Spinner from '../feedbacks/Spinner'
import { SpinnerType } from '@/enums/ComponentEnums'
import MessageBox from './MessageBox'
import { formatTime } from '@/utilities/helpers'
import MessageForm from '../forms/MessageForm'

const ChatBox = ({partner, loading, messages, handleSendMessage, sendLoading}: any) => {

    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        
        if (lastMessageRef.current) {
          
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        
        }
    
    }, [messages]);

    return (
        
        <div className={`bg-white rounded-t-lg ${loading && `flex justify-center items-center h-96`}`}>

            {loading ? <Spinner type={SpinnerType.PRIMARY} /> : partner && <div className='bg-success-dark p-2 border-2 border-accent-dark rounded-t-lg flex items-center gap-2'>
                
                {partner?.image === '' ? <div className='bg-white w-[45px] h-[45px] rounded-full flex justify-center items-center text-success-dark text-base font-satoshiBold'>{partner?.firstName.charAt(0)} {partner?.lastName.charAt(0)}</div> : <Image src={partner?.image || '/icons/avartar.svg'} height={45} width={45} alt="Avatars" />}

                <span className='text-base font-satoshiBold text-white'>{partner?.businessName || `${partner?.firstName} ${partner?.lastName}`}</span>

            </div>}

            {!loading && <div className='h-[500px] overflow-auto flex flex-col gap-8 p-5'>

                {messages?.map((message: any) => <MessageBox key={message.id} text={message.text} isSender={partner?.id !== message?.sender} time={formatTime(message.createdAt)} />)}

                {/* Invisible div to track the last message */}
                <div ref={lastMessageRef} />

            </div>}
                
            {!loading && <MessageForm handleSendMessage={handleSendMessage} sendLoading={sendLoading} />}

        </div>

    )

}

export default ChatBox