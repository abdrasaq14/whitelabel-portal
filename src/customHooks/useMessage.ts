import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { activeConversation, activePartner, conversationsFetched, getMessageSlice, messageSent, messagesFetched, realtimeMessageAdded } from '@/store/slices/messageSlice'
import { useEffect } from 'react'
import useStorage from './useStorage'
import { io } from "socket.io-client";

// const socket = io('https://devsocket.profitall.co.uk');
const socket = io('http://localhost:5000');

const useMessage = () => {

    const {currentUser} = useStorage();

    // console.log(currentUser)

    const dispatch = useAppDispatch();

    const messageSlice = useAppSelector(getMessageSlice);

    useEffect(() => {

        getAllConversations();
    
    }, []);

    useEffect(() => {
        socket.on("message", (message) => {
            console.log("Socket Message", message);
            addMessageRealtime(message);    
        });
    }, []);

    useEffect(() => {
        
        if(messageSlice.activeConversation){
            
            handleSetActivePartner()
        
        }

    }, [messageSlice.activeConversation]);

    const getAllConversations = async () => {
        
        const conversations = await dispatch(conversationsFetched({userId: currentUser?.user?._id}))

        // console.log("Convos", conversations.payload)

        handleSetActiveConversation(conversations?.payload?.result[0])

        socket.emit("subscribe", `room-${conversations?.payload?.result[0]._id}`);
    }

    const getAllMessages = async (conversationId: string) => await dispatch(messagesFetched({conversationId}))

    const handleSetActiveConversation = (conversation: any) => {

        const prevActiveConversation = messageSlice.activeConversation !== null ? {...messageSlice.activeConversation} : null
        
        dispatch(activeConversation(conversation))

        if(prevActiveConversation !== null){
            socket.emit("unsubscribe", `room-${prevActiveConversation._id}`);
        }
    
    }

    const handleSetActivePartner = () => {
        
        const activeConversation = {...messageSlice.activeConversation};

        const partner = activeConversation?.members?.find((member: any) => member?.id !== currentUser?.user?._id);

        dispatch(activePartner(partner))

        getAllMessages(activeConversation._id)
    
    }

    const handleSendMessage = async (values: any) => {

        console.log("Message test", values)

        const activeConversation = {...messageSlice.activeConversation};

        const data = {conversationId: activeConversation?._id, senderId: currentUser?.user?._id, text: values.messageText }

        const handleSendMessage = await dispatch(messageSent(data));

        console.log(handleSendMessage.payload)

        socket.emit("message", {roomId: `room-${activeConversation._id}`, message: handleSendMessage?.payload?.result?.data});

    }

    const addMessageRealtime = (message: any) => {
        console.log("messages result", messageSlice.messagesResult);
        // const reduxMessages = [...messageSlice.messagesResult]

        // const messageExists = reduxMessages.find((rmessage: any) => rmessage.id === message.id)

        // if(!messageExists) dispatch(realtimeMessageAdded(message))
    }

    return {

        conversations: messageSlice.conversationsResult,

        loading: messageSlice.loading,

        currentUser,

        setActiveConversation: handleSetActiveConversation,

        activeConversation: messageSlice.activeConversation,

        activePartner: messageSlice.activePartner,

        messageLoading: messageSlice.messageLoading,

        messages: messageSlice.messagesResult,

        handleSendMessage,

        sendLoading: messageSlice.sendLoading
    
    }
}

export default useMessage