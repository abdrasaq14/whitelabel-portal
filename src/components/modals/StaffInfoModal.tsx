import React from 'react'
import AppModal from '../utilities/AppModal'
import { ModalHeaderType } from '@/enums/ComponentEnums';
import StaffInfoForm from '../forms/AccountInformation/StaffInfoForm';

const StaffInfoModal = ({showStaffInfoModal, handleCloseModal}: any) => {

    return (
        <AppModal isOpen={showStaffInfoModal} header={{title: 'Update Staff', subtitle: 'Update the form to change staff information', type: ModalHeaderType.START}} hasClose={true} closeClicked={handleCloseModal} >
            
            <StaffInfoForm />
        
        </AppModal>
    )
}

export default StaffInfoModal