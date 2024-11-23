import React from 'react'
import AppModal from '../utilities/AppModal'
import { ButtonType, ModalFooterType } from '@/enums/ComponentEnums';

const LogoutModal = ({showLogoutModal, handleCloseModal, logout}: any) => {

    return (
        <AppModal hasClose={true} footer={{type: ModalFooterType.CENTER, cancelButton: {
            type: ButtonType.SECONDARY,
            text: 'Cancel',
            handleClick: () => handleCloseModal()
        }, submitButton: {type: ButtonType.PRIMARY, text: 'Logout', handleClick: () => logout()}}} isOpen={showLogoutModal} closeClicked={handleCloseModal}>
            
            <div className='h-auto w-full sm:w-[464px] py-8 px-9 sm:shadow-custom max-h-[624px] flex flex-col justify-center items-center'>
                <h2 className='text-2xl font-satoshiBold text-accent-main'>Logout?</h2>
                <p className='mt-5 text-sm font-satoshiRegular text-accent-dark3'>You will be logged out of your account</p>
            </div>
        
        </AppModal>
    )
}

export default LogoutModal