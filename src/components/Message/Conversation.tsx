import React from 'react'
import Image from 'next/image'

const Conversation = ({partner, unseenMessages, setActiveConversation, activePartner} : any) => {

    // console.log("partners", partner, activePartner)
  
    return (

        <div className={`flex items-center justify-between w-full border-b border-accent-light5 py-3 hover:bg-success-light2 p-2 rounded-lg cursor-pointer ${partner?.id === activePartner?.id && `bg-success-light`}`} onClick={setActiveConversation}>
                    
            <div className='flex items-center gap-2'>
            
                {partner?.image === '' ? <div className='bg-success-dark w-[45px] h-[45px] rounded-full flex justify-center items-center text-white text-base font-satoshiBold'>{partner?.firstName.charAt(0)} {partner?.lastName.charAt(0)}</div> : <Image src={partner?.image} height={45} width={45} alt="Avatars" />}
            
                <span className='text-base font-satoshiBold text-black'>{partner.businessName || `${partner.firstName} ${partner.lastName}`}</span>
            
            </div>
            
            {unseenMessages > 0 && <span className='bg-success-dark text-white h-6 w-6 rounded-lg text-xs font-satoshiMedium flex justify-center items-center'>{unseenMessages}</span>}
        
        </div>

    )
}

export default Conversation