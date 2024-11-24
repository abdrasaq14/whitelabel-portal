import React from 'react'
import { closeDialogModal } from '@/store/slices/modalSlice'
import { ButtonType} from '@/enums/ComponentEnums'
import Image from 'next/image'
import AppButton from '@/components/forms/AppButton'
import AppModal from '../utilities/AppModal'

const DialogModal = ({handleCloseModal, showDialogModal, title="", message="", image=""}: any) => {

  return (
    <AppModal 
        hasClose={true} 
        isOpen={showDialogModal} 
        closeClicked={() => handleCloseModal(closeDialogModal)}
        style="w-[600px]"
    >
        
        <div className='my-8 pr-7 overflow-auto h-auto w-full flex flex-col justify-center items-center sm:shadow-custom max-h-[624px]'>
          
            <Image
            src={image}
            alt="item image"
            width={0}
            height={0}
            className="max-h-48 w-auto"
            sizes="100vw"
            />

            <h3 className='font-satoshiBold text-2xl text-black my-5'>{title}</h3>

            <p className='font-satoshiRegular text-base text-[#464749] w-[60%] text-center'>{message}</p>

            <div className='flex justify-end items-center gap-4 mt-10'>
                <div className='w-36'><AppButton text="No" type={ButtonType.SECONDARY} handleClick={() => {}}/></div>
                <div className='w-36'><AppButton text="Yes, Proceed" type={ButtonType.PRIMARY} handleClick={() => {}}/></div>
            </div>
          
        </div>
    
    </AppModal>
  )
}

export default DialogModal