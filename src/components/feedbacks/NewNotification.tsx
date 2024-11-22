import React from 'react'
import Indicator from '../icons/Indicator'
import { formatTime } from '@/utilities/helpers'

const NewNotification = ({notification, viewNotification}: any) => {

    // console.log(notification)
  
    return (

        <div className='p-5 border-b border-accent-light hover:bg-purple-lighter cursor-pointer' onClick={() => viewNotification(notification?._id)}>

            <div className="flex justify-between items-center">
                
                <span className={`text-base ${notification?.seen_at === null ? `text-[#2e2e2e] font-satoshiBold` : `text-[#878787] font-satoshiRegular`}`}>{notification?.title}</span>

                {notification?.seen_at === null && <Indicator />}

            </div>

            <div className="flex justify-between items-center mt-2">
                
                <span className="text-accent-dark font-satoshiRegular text-xs">{notification?.body[0][1]}</span>

                <span className="text-accent-dark font-satoshiRegular text-xs">{formatTime(notification?.createdAt)}</span>

            </div>

        </div>
  
    )

}

export default NewNotification