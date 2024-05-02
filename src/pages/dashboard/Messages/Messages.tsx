import React from 'react'
import { BreadCrumbClient } from '../../../components/Breadcrumb'
import { useNavigate } from 'react-router-dom'

const Messages = () => {
  const navigate = useNavigate()

  return (
    <div className='px-4 pt-8 h-full'>
      <div className='flex items-center gap-6'>
        <button onClick={() => navigate(-1)} className='flex items-center -mt-6 text-primary gap-2'><img className='h-4 w-auto' src="/icons/arrow-left.svg" />Back</button>
        <BreadCrumbClient backText="Dashboard" currentPath="Messages" brand='Jumia' />



      </div>
      <div className='className="mt-2 px-2 md:px-6  w-full"'>
        {
          [""].length === 0 ?
            <div className='w-full h-full flex items-center justify-center'>
              <div>
                <img src='/images/help.png' />
              </div>

            </div>
            :

            <div className='w-full grid grid-cols-1 lg:gap-3 lg:grid-cols-3'>
              <div className={`w-full ${true ? "hidden lg:block" : ""} mx-auto h-[625px] px-4 py-3 rounded-md bg-white overflow-y-auto`}>
                {[].slice().sort((a: any, b: any) => b - a).map((items: any, index: number) => "")}


              </div>

              <div className={`col-span-2  relative h-[90vh] lg:h-[625px] lg:bg-white lg:rounded-md w-full`}>
                <div className='w-full flex  px-3 items-center  h-[65px] lg:rounded-t-md bg-[#470E81]'>
                  <div className='w-full flex py-5 items-center gap-2'>

                    <span className='w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center text-base font-semibold'>AB </span>
                    <div>
                      <div className='flex items-center gap-2 text-white'><h3 className='font-semibold'></h3></div>
                    </div>

                  </div>
                </div>
                <div className='h-[75%] flex flex-col-reverse custom-scrollbar overflow-y-auto w-full px-3 py-3'>
                  {/* <h3 className='text-center'>Start a conversation</h3> */}


                  {/* {messages?.map((message: any, index: number) => <ChatMessage
                time={message?.createdAt}
                key={index}
                message={message?.text}
                isSentByMe={message?.isAdmin !== false}
              />)} */}

                </div>

                <div className='w-full px-3 py-2 flex items-center gap-3  absolute bottom-0 h-[80px] rounded-b-md bg-[#C8CCD0]'>
                  <input placeholder='Type a message' className='bg-white px-3 w-full h-[42.05px] rounded text-black placeholder:text-gray-400 focus:outline-none' />
                  <button onClick={() => { }} className='h-[42.05px] px-3 text-white bg-[#470E81] rounded'>send</button>
                </div>


              </div>

            </div>
        }

      </div>

    </div>
  )
}

export default Messages