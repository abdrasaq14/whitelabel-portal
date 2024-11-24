import React from 'react'
import SenderSend from '../icons/SenderSend'
import ReceiverSend from '../icons/ReceiverSend'

const MessageBox = ({text, isSender, time}: any) => {
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
        <div className={`w-2/3 gap-2 flex flex-col justify-between rounded-lg font-satoshiRegular text-sm p-5 ${isSender ? 'bg-success-dark text-white' : 'bg-accent-light text-accent-dark6'}`}>
            <span>{text}</span>
            <div className='flex gap-2 justify-end items-center'>
                <span className={`text-xs text-satoshiRegular ${isSender ? 'text-[#d1d1d1]' : 'text-[#667781]'}`}>{time}</span>
                {isSender ? <SenderSend /> : <ReceiverSend />}
            </div>
        </div>
    </div>
  )
}

export default MessageBox