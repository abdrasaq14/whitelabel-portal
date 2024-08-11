
// ChatBox.tsx
import React, { useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatPrompt from './ChatPrompt';
import useOnClickOutside from '../../hooks/useClickOutside';

interface ChatBoxProps {
  onClose: () => void;
}



const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
  const API_HOST = process.env.NEXT_PUBLIC_API_URL || "";

  const [sessionDetails, setSessionDetails] = useState<any>({})
  const [sessionId, setSessionId] = useState<string>("")
  const [messages, setMessages] = useState<any>([]);
  const [text, setText] = useState("")
  const [preview, setPreview] = useState("");
  const [isUploadingImg, setIsUploadImg] = useState(false)


  const modalRef = useRef<any>();

  useOnClickOutside(modalRef, () => {
      onClose();
  });

const handleProductImgChange = async (e: any) => {
    e.preventDefault();
    console.log(e.target.files[0])
}
// const handleEnter = async (e: any) => {
//     e.preventDefault();
//     console.log(e.key)
// }


const details ={
    email: ""
}
  return (
    <div className='h-screen w-full bg-foundation-darkPurple/45 z-50 fixed top-0 left-0'>
         <div className="fixed z-[100] bottom-0 md:bottom-24 transition md:right-4 w-full h-screen md:w-[360px] md:h-auto bg-white rounded-md shadow-md"  ref={modalRef}>
      <div className='relative w-full h-full'>
        
          <div className='flex items-center gap-2 w-full py-3 px-6  h-20 rounded-t-md bg-primary'>
            <div className='h-8 w-8 flex items-center justify-center rounded-full'>
              <img src='/icons/status/profile-circle.svg' className='content-fit fit' />
            </div>
            <h3 className='text-base font-bold font-satoshiBold text-white'>Help Desk</h3>

          </div>
          <div className='py-4 flex items-center justify-center'>
            <h3 className='text-sm font-satoshiBold font-bold text-primary-text'>Today</h3>
          </div>
        
       
        {/* Add your chat content here */}
        <div className='w-full h-[375px] p-3 overflow-y-auto '>
          
          {
            messages.map((message: any, id: number) => <ChatMessage key={id} time={message.createdAt} message={message.text} isSentByMe={!message.isAdmin} />)
          }
          {isUploadingImg && <ChatMessage isSentByMe={true} message='uploading Image...' time={Date.now()} />}

        </div>
        <div className='absolute flex items-center bottom-0 p-3 w-full rounded-md  border bg-[#C8CCD0]'>
            <div className='flex bg-white w-full rounded-lg'>
            <input onChange={(e) => {setText(e.target.value) }}  placeholder='Type a message' className='py-2 w-full px-6 bg-transparent outline-none focus:outline-none' />
                <button className='bg-primary px-6 py-2 z- text-white rounded-lg'>Send</button>

            </div>
       
        </div>
      </div>



    </div>

    </div>
   
  );
};




export default ChatBox;
