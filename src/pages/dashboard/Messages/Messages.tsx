import React, { useEffect, useState } from 'react'
import { BreadCrumbClient } from '../../../components/Breadcrumb'
import { useNavigate } from 'react-router-dom'
import { MessageService } from '../../../services/message.service'
import { useMutation } from 'react-query'
import { fToNow } from '../../../utils/formatTime';
import { io } from "socket.io-client";
import Spinner from '../../../components/spinner/Spinner';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
const socket = io('https://socket.profitall.co.uk');

interface Conversation{
  id: string,
  firstName: string | null,
  lastName: string | null,
  image: string | null,
  businessName: string | null,
  email: string,
  conversationId: string
  // userName: string | null,
  // phone: string,
}

const Messages = () => {
  let profile:any = sessionStorage.getItem("profitall-client-auth")
  profile = JSON.parse(profile)
  const userId = profile.state.profile._id;

  const navigate = useNavigate()

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string>();
  const [messages, setMessages] = useState<any>([]);
  const [messageInfo, setMessageInfo] = useState<any>({})
  const [text, setText] = useState("")
  const [loadingConversation, setLoadingConversation] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {

    fetchConversations.mutate()
  
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("Socket Message", message);
        addMessage(message, true);    
    });
  }, [messages]);

  const addMessage = (message: any, replacement: boolean) => {
    const copyMessages = [...messages];
    if(replacement){
      copyMessages[0] = message;
      setMessages([...copyMessages]);
      return;
    }
    setMessages([message, ...copyMessages]);
  }

  const createConversationList = async (conversations: any): Promise<Conversation[]> => {
    
    // console.log("Inside convo", conversations);
    
    return new Promise((resolve, reject) => {
      
      const allConversation: any[] = [];
      
      conversations.map((conversation: any, index: number) => {
        
        // console.log("Inside convo loop", conversation);
        
        const userData = conversation.members.find((conv: any) => conv.id !== userId);
        
        // console.log("Getting other user", userData);
        
        allConversation.push({...userData, conversationId: conversation.id});
        
        if(index == conversations.length - 1){
          
          resolve(allConversation);
        
        }
      
      });
    
    });
  
  }

  const fetchConversations = useMutation(
    async () => {
      return await MessageService.getConversations();
    },
    {
        onSuccess: async (response) => {
          const conversations = response.data.result;
          const conversationList: Conversation[] = await createConversationList(conversations);
          setConversations(conversationList)
          setActiveConversationId(conversationList[0].conversationId)
          setMessageInfo({ name: conversationList[0].businessName == null ? `${conversationList[0].firstName} ${conversationList[0].lastName}` : `${conversationList[0].businessName}`, image: conversationList[0].image, id: conversationList[0].id })
          setLoadingConversation(false);
          getMessages.mutate(conversationList[0].conversationId)
          socket.emit("subscribe", `room-${conversationList[0].conversationId}`);
        },
        onError: (err: any) => {
          console.log("error happened", err);
        },
    }
  )

  const getMessages = useMutation(
    async (values: string) => {
      return await MessageService.getMessages(values);
    },
    {
        onSuccess: async (response) => {
          console.log("All messages", response.data.result.results);
          setMessages(response.data.result.results)
          setLoadingMessages(false);
        },
        onError: (err: any) => {
            console.log("error happened", err);
        },
    }
  )

  const sendMessage = useMutation(
    async (values: {conversationId: string, message: {senderId: string, text: string}}) => {
      addMessage({conversationId: activeConversationId, text, sender: userId, createdAt: new Date().toISOString(), loading: true }, false);
      return await MessageService.sendMessage(values);
    },
    {
        onSuccess: async (response) => {
          console.log("Message sent", response.data)

          setText("");
          if(response.data.result.status === "success"){
            socket.emit("message", {roomId: `room-${activeConversationId}`, message: response.data.result.data});
          }
        },
        onError: (err: any) => {
            console.log("error happened", err);
        },
    }
  )

  const handleEnter = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage.mutate({conversationId: activeConversationId!, message: {senderId: userId, text}})
    }
  }
  

  return (
    <div className='px-4 pt-8 h-full'>
      <div className='flex items-center gap-6'>
        <button onClick={() => navigate(-1)} className='flex items-center -mt-6 text-primary gap-2'><img className='h-4 w-auto' src="/icons/arrow-left.svg" />Back</button>
        <BreadCrumbClient backText="Dashboard" currentPath="Messages" brand='Landmark' />



      </div>
      <div className='className="mt-2 px-2 md:px-6  w-full"'>
        {
          loadingConversation ?
          <div className='w-full h-full flex px-3 py-3 rounded-md bg-white flex-col items-center justify-center'>
            <Spinner color="#000000"/>
          </div> :
          conversations.length === 0 ?
            <div className='w-full h-full flex px-3 py-3 rounded-md bg-white flex-col items-center justify-center'>
              <img src='no-notification.png' />
              <h3 className='text-center text-black font-medium text'>No Message Yet!</h3>
              <h5 className='text-center'>Here you will be able to see all your messages. Stay tuned</h5>
            </div>
            :

            <div className='w-full grid grid-cols-1 lg:gap-3 lg:grid-cols-3'>
              <div className="w-full mx-auto h-[525px] px-4 py-3 rounded-md bg-white overflow-y-auto">
                {conversations.slice().sort((a: any, b: any) => b - a).map((items: any) => <Chats 
                id={items?.conversationId} image={items?.image} 
                name={items?.businessName == null ? `${items?.firstName} ${items?.lastName}` : `${items?.businessName}`} 
                key={items?.id} email={items?.email}
                onClick={() => {
                  setMessageInfo({ name: items?.businessName == null ? `${items?.firstName} ${items?.lastName}` : `${items?.businessName}`, image: items?.image, id: items.id })
                  setLoadingMessages(true);
                  getMessages.mutate(items?.conversationId);
                  setActiveConversationId(items?.conversationId)
                  socket.emit("subscribe", `room-${items?.conversationId}`);
                }}
                />)}
            </div>

              <div className={`col-span-2  relative h-[90vh] lg:h-[625px] lg:bg-white lg:rounded-md w-full`}>
                <div className='w-full flex  px-3 items-center  h-[65px] lg:rounded-t-md bg-[#470E81]'>
                  <div className='w-full flex py-5 items-center gap-2'>
                  {messageInfo.image == "" ? <span className='w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center text-base font-semibold'>{messageInfo.name.charAt(0)}</span> : <img src={messageInfo.image} className='w-10 h-10 rounded-full bg-gray-400' />}
                  <div>
                    <div className='flex items-center gap-2 text-white'><h3 className='font-semibold'>{messageInfo.name}</h3><img src='verify.svg' className='mt-1' /></div>
                  </div>

                  </div>
                </div>
                
                {loadingMessages ? 
                  <div className='h-[75%] flex justify-center items-center custom-scrollbar overflow-y-auto w-full px-3 py-3'>
                    <Spinner color="#000000"/>
                  </div> :
                  <div className='h-[75%] flex flex-col-reverse custom-scrollbar overflow-y-auto w-full px-3 py-3'>
                  {messages.map((message: any, index: number) => <ChatMessage
                  time={message?.createdAt}
                  key={index}
                  message={message?.text}
                  isSentByMe={message?.sender === userId}
                  loading={message?.loading}
                />)}
                </div>}

                <div className='w-full px-3 py-2 flex items-center gap-3  absolute bottom-0 h-[80px] rounded-b-md bg-[#C8CCD0]'>
                  <input value={text} onChange={(e) => { e.preventDefault(); setText(e.target.value) }} onKeyDown={handleEnter} placeholder='Type a message' className='bg-white px-3 w-full h-[42.05px] rounded text-black placeholder:text-gray-400 focus:outline-none' />
                  <button onClick={() => sendMessage.mutate({conversationId: activeConversationId!, message: {senderId: userId, text}})} className='h-[42.05px] px-3 text-white bg-[#470E81] rounded'>send</button>
                </div>

              </div>

            </div>
        }

      </div>

    </div>
  )
}

const Chats = ({ name, email, onClick = () => { }, image, id }: { name: string; email: string, onClick: (e?: any) => void, image: string, id: string }) => {
  return (
    <div onClick={() => onClick(id)} className='w-full cursor-pointer flex py-5 border-b items-center gap-2'>
      {image == "" ? <div className='w-10 h-10 rounded-full bg-gray-400 flex justify-center items-center'>{name.charAt(0)}</div> : <img src={image} className='w-10 h-10 rounded-full bg-gray-400' />}
      <div>
        <div className='flex items-center gap-2'>
          <h3 className='font-semibold'>{name}</h3>
          {/* <img src='/verify2.svg' className='mt-1' /> */}
        </div>
        <h5 className='text-gray-600 font-medium text-xs'>{email}</h5>
      </div>

    </div>
  )
}

const ChatMessage = ({ message, isSentByMe, time, loading }: { message?: string; isSentByMe?: boolean, time: any, loading: boolean }) => {
  return (
    <div className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={` text-sm p-2 rounded ${isSentByMe ? 'bg-[#470E81] text-white' : 'bg-[#470E810D] text-gray-800'}`}>
        {message}
        <div className={`flex justify-between items-center text-xs text-right block ${isSentByMe ? 'text-gray-200' : 'text-gray-600'}`}>
          {fToNow(time)}
          {loading ? <Spinner color={isSentByMe ? "#f5f5f5" : "#666"} width={14} height={14} /> : <IoCheckmarkDoneOutline color={isSentByMe ? "#f5f5f5" : "#666"} width={14} height={14} />}
        </div>
      </div>
    </div>
  );
}

export default Messages