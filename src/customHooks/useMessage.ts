import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { activeConversation, activePartner, conversationsFetched, conversationsFetchedAgain, getMessageSlice, messageSent, messagesFetched, realtimeMessageAdded, setMessageToSeen } from '@/store/slices/messageSlice'
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
        
        // Register the socket listener
        const handleMessage = async (message: any) => {
            
            // console.log("Socket Message", message, messageSlice?.activeConversation);
            
            if(messageSlice?.activeConversation){

                if(message.conversationId === messageSlice?.activeConversation?._id){

                    // console.log("Add realtime message")
                
                    addMessageRealtime(message);
                
                }else{
    
                    // console.log("Just fetch conversation")
    
                    await dispatch(conversationsFetchedAgain({userId: currentUser?.user?._id}))
    
                }

            }
        
        };

        socket.on("message", handleMessage);

        // Cleanup function to avoid duplicate listeners
        return () => {
            socket.off("message", handleMessage);
        };
    
    }, [messageSlice?.activeConversation, messageSlice?.messagesResult]);

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

        "Subscribe to the room receiverId to always listen to messages from inactive conversations"
        socket.emit("subscribe", `room-${currentUser?.user?._id}`);
    }

    const handleSetActiveConversation = async (conversation: any) => {

        // console.log("New Active Conversation", conversation)

        const prevActiveConversation = messageSlice.activeConversation !== null ? {...messageSlice.activeConversation} : null
        
        dispatch(activeConversation(conversation))

        if(prevActiveConversation !== null){
            socket.emit("unsubscribe", `room-${prevActiveConversation._id}`);
            socket.emit("subscribe", `room-${conversation?._id}`);
        }

        await dispatch(setMessageToSeen({conversationId: conversation?._id, userId: currentUser?.user?._id}))

        await dispatch(conversationsFetchedAgain({userId: currentUser?.user?._id}))
    
    }

    const getAllMessages = async (conversationId: string) => await dispatch(messagesFetched({conversationId}))

    const handleSetActivePartner = () => {
        
        const activeConversation = {...messageSlice.activeConversation};

        const partner = activeConversation?.members?.find((member: any) => member?.id !== currentUser?.user?._id);

        dispatch(activePartner(partner))

        getAllMessages(activeConversation._id)
    
    }

    const handleSendMessage = async (values: any) => {

        // console.log("Message test", values)

        const activeConversation = {...messageSlice.activeConversation};

        const data = {conversationId: activeConversation?._id, senderId: currentUser?.user?._id, text: values.messageText }

        const handleSendMessage = await dispatch(messageSent(data));

        // console.log(handleSendMessage.payload)

        socket.emit("message", {roomId: `room-${activeConversation._id}`, message: handleSendMessage?.payload?.result?.data});

    }

    const addMessageRealtime = async (message: any) => {
        // console.log("Current state in messageSlice:", messageSlice);

        // console.log("messages result", messageSlice.messagesResult, message);

        const reduxMessages = messageSlice.messagesResult && [...messageSlice.messagesResult]

        const messageExists = reduxMessages && reduxMessages.find((rmessage: any) => rmessage.id === message.id)

        // console.log("Message exists", messageExists)

        if(!messageExists) {

            dispatch(realtimeMessageAdded(message))

            await dispatch(setMessageToSeen({conversationId: message.conversationId, userId: currentUser?.user?._id}))

            await dispatch(conversationsFetchedAgain({userId: currentUser?.user?._id}))

        }
        
    }

    const getNewConversations = (conversations: any) => {
        const unseenMessages = conversations?.filter((conversation: any) => conversation?.unseenMessagesCount > 0)

        return unseenMessages;
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

        sendLoading: messageSlice.sendLoading,

        getNewConversations
    
    }
}

export default useMessage