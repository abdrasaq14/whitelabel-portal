import React from 'react'
import Conversation from './Conversation';

const ConversationList = ({conversations, currentUser, setActiveConversation, activePartner}: any) => {          

    return (
        
        conversations?.map((conversation: any, index: number) => {
            
            const partner =  conversation.members.find((member: any) => member.id !== currentUser._id);

            // console.log("Conversation single", conversation)

            return ( 
            
                <Conversation partner={partner} key={index} unseenMessages={conversation?.unseenMessagesCount} setActiveConversation={() => setActiveConversation(conversation)} activePartner={activePartner} />

            )
            
        })
    
    )

}

export default ConversationList