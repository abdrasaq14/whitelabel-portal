"use client"
import Spinner from '@/components/feedbacks/Spinner'
import ChatBox from '@/components/Message/ChatBox'
import ConversationList from '@/components/Message/ConversationList'
import AppCard from '@/components/utilities/AppCard'
import useMessage from '@/customHooks/useMessage'
import { CardType, SpinnerType } from '@/enums/ComponentEnums'
import React from 'react'

const page = () => {

    const {conversations, 
        currentUser, 
        loading, 
        setActiveConversation, 
        activePartner, 
        messages, 
        messageLoading, 
        handleSendMessage, 
        sendLoading
    } = useMessage();

    // console.log(conversations, currentUser?.user, messages);

    return (
        
        <div className='container grid grid-cols-4 gap-4'>
            
            <AppCard type={CardType.NOSHADOW}>

                <div className="max-h-96 overflow-auto">

                    {loading ? <Spinner type={SpinnerType.PRIMARY} /> : <ConversationList activePartner={activePartner} conversations={conversations} currentUser={currentUser?.user} setActiveConversation={setActiveConversation}/>}

                </div>
            
            </AppCard>
            
            <div className='col-span-3'>
            
                <ChatBox partner={activePartner} loading={messageLoading} sendLoading={sendLoading} messages={messages} handleSendMessage={handleSendMessage} />
            
            </div>
        
        </div>
    
    )

}

export default page