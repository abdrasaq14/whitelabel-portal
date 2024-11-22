"use client"
import React from 'react'
import AppModal from '../utilities/AppModal'
import { ButtonType, ModalType } from '@/enums/ComponentEnums'
import CloseRed from '../icons/CloseRed'
import AppButton from '../forms/AppButton'
import NewNotification from '../feedbacks/NewNotification'

const NotificationModal = ({showNotificationModal, handleCloseModal, newNotifications, viewNotification}: any) => {

    // console.log("New notifications", newNotifications)

    return (
        <AppModal isOpen={showNotificationModal} type={ModalType.NOTIFICATION} style="w-96 h-screen !p-0">
            
            <div className='flex justify-between items-center p-5'>
                <span className='text-black font-satoshiMedium text-lg'>Notification Area</span>
                <div className="flex justify-end items-center gap-1 cursor-pointer" onClick={handleCloseModal}>
                    <CloseRed />
                    <span className="font-SatoshiRegular text-sm text-danger-main">Close</span>
                </div>
            </div>

            <div className='h-screen'>
                <div className="h-4/5 overflow-y-auto border-y border-accent-light">
                    
                    { newNotifications?.map( (notification: any) => <NewNotification key={notification._id} notification={notification} viewNotification={viewNotification} /> ) }
                
                </div>

                <div className='flex justify-center items-center gap-2 mt-5'>

                    <div className='w-1/2'><AppButton type={ButtonType.PRIMARY} text="View all notification" handleClick={() => {}} /></div>

                </div>
            </div>
        
        </AppModal>
    )
}

export default NotificationModal