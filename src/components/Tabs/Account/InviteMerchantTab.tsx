import AppButton from '@/components/forms/AppButton'
import Copy from '@/components/icons/Copy'
import { ButtonType } from '@/enums/ComponentEnums'
import React from 'react'

const InviteMerchantTab = ({handleCopyInviteLink}: any) => {
  
    return (

        <div className="mt-5 flex justify-between items-start">

            <div className="flex flex-col">
                <span className="font-satoshiBold text-xl text-accent-dark5">Invite Merchant</span>
                <p className='font-satoshiRegular text-xl text-accent-dark5 mt-3 w-[90%]'>
                    Invite merchants or vendors to sell on your marketplace with ease! Simply copy and share this invitation link
                    with them. This link will grant them access to register and start selling on your marketplace. Alternatively, 
                    you can copy and share the link through email, social media, or messaging apps. Get started now and expand your 
                    marketplace community.
                </p>
            </div>

            <div className='w-[50%]'><AppButton text="Copy Link" icon={Copy} type={ButtonType.SECONDARY} handleClick={handleCopyInviteLink} /></div>
            
        </div>

    )

}

export default InviteMerchantTab