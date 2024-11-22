"use client"
import NewNotification from '@/components/feedbacks/NewNotification'
import AppCard from '@/components/utilities/AppCard'
import useNavs from '@/customHooks/useNavs'
import { CardType } from '@/enums/ComponentEnums'
import { formatDate } from '@/utilities/helpers'
import React from 'react'
import Image from 'next/image'
import Star from '@/components/icons/Star'
import StoreName from '@/components/icons/StoreName'
import Copy from '@/components/icons/Copy'
import StoreLink from '@/components/icons/StoreLink'
import Location from '@/components/icons/Location'
import Bag from '@/components/icons/Bag'

const page = () => {

    const {notifications, viewNotification, activeNotification} = useNavs();

    const notificationDetails = notifications?.find((notification) => notification._id === activeNotification)

    // console.log("Notification details", notificationDetails)

    const stars = [1, 2, 3, 4, 5];

    return (
        
        <div className="grid grid-cols-2 gap-5">
        
            <div className=''>
        
                <AppCard type={CardType.NOSHADOW}>
        
                    <h1 className='text-black font-satoshiBold text-2xl py-5'>Notification Area</h1>

                    <div className="h-screen overflow-y-auto border-y border-accent-light">
                        
                        { notifications?.map( (notification: any) => <NewNotification key={notification._id} notification={notification} viewNotification={() => viewNotification(notification._id)} /> ) }
                    
                    </div>
        
                </AppCard>
        
            </div>

            <div className=''>
        
                {notificationDetails && <AppCard type={CardType.NOSHADOW}>

                    <h1 className='text-[#2e2e2e] font-satoshiMedium text-2xl pt-5'>{notificationDetails?.title}</h1>

                    <span className="text-accent-main font-satoshiRegular text-xs">{formatDate(notificationDetails?.createdAt)}</span>

                    <p className="text-accent-main font-satoshiRegular text-sm mt-5">{notificationDetails?.body[0][1]}</p>  

                    <div className="border border-accent-light5 mt-7 p-5">

                        <div className='flex items-center gap-2'>
                
                            {notificationDetails?.sender?.image ? <Image src={notificationDetails?.sender?.image} height={64} width={64} alt="Avatars" /> : <div className='bg-success-dark w-[45px] h-[45px] rounded-full flex justify-center items-center text-white text-base font-satoshiBold'>{notificationDetails?.sender?.firstName.charAt(0)} {notificationDetails?.sender?.lastName.charAt(0)}</div>}
                        
                            <div className='flex flex-col justify-center items-center'>
                                <span className='text-3xl font-satoshiBold text-accent-dark5'>{notificationDetails?.sender?.businessName || `${notificationDetails?.sender?.firstName} ${notificationDetails?.sender?.lastName}`}</span>
                                <span className="text-sm font-satoshiMedium text-[#6f7174]">{notificationDetails?.userName || 'https://mymarsq.com'}</span>
                            </div>
                        
                        </div>

                        <div className='flex flex-col mt-5'>
                            <span className='font-satoshiMedium text-accent-dark text-sm'>Rating</span>
                            <div className='flex items-center gap-3'>
                                <span className='font-satoshiMedium text-accent-dark text-sm'>4.8/5.0 Rating</span>
                                {stars.map(star => <Star key={star} />)}
                            </div>
                        </div>

                        <div className='flex justify-between my-5'>
                            <div className='flex gap-2'>
                                <StoreName />
                                <div className='flex flex-col'>
                                    <span className='text-accent-dark font-satoshiRegular text-sm'>Store Name</span>
                                    <span className='text-accent-dark font-satoshiMedium text-base'>Finna Store</span>
                                </div>
                            </div>
                            <Copy />
                        </div>

                        <div className='flex justify-between my-5'>
                            <div className='flex gap-2'>
                                <StoreLink />
                                <div className='flex flex-col'>
                                    <span className='text-accent-dark font-satoshiRegular text-sm'>Store Link</span>
                                    <span className='text-accent-dark font-satoshiMedium text-base'>httpe://mymarketsq.com</span>
                                </div>
                            </div>
                            <Copy />
                        </div>

                        <div className='flex justify-between my-5'>
                            <div className='flex gap-2'>
                                <Location />
                                <div className='flex flex-col'>
                                    <span className='text-accent-dark font-satoshiRegular text-sm'>Store Address</span>
                                    <span className='text-accent-dark font-satoshiMedium text-base'>123 Bannex Shopping plaza, Wuse</span>
                                </div>
                            </div>
                            <Copy />
                        </div>

                        <div className='flex justify-between my-5'>
                            <div className='flex gap-2'>
                                <Location />
                                <div className='flex flex-col'>
                                    <span className='text-accent-dark font-satoshiRegular text-sm'>Location</span>
                                    <span className='text-accent-dark font-satoshiMedium text-base'>Abuja, Nigeria</span>
                                </div>
                            </div>
                            <Copy />
                        </div>

                        <div className='flex justify-between my-5'>
                            <div className='flex gap-2'>
                                <Bag />
                                <div className='flex flex-col'>
                                    <span className='text-accent-dark font-satoshiRegular text-sm'>Product Categories</span>
                                    <span className='text-accent-dark font-satoshiMedium text-base'>Cosmetics | Fashion</span>
                                </div>
                            </div>
                            <Copy />
                        </div>

                    </div>                  

                </AppCard>}

            </div>

        </div>

    )

}

export default page