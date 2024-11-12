import React from 'react'
import AppModal from '../utilities/AppModal'
import useNavs from '@/customHooks/useNavs';
import { ButtonType, ModalFooterType, ModalHeaderType } from '@/enums/ComponentEnums';
import StaffInfoForm from '../forms/AccountInformation/StaffInfoForm';

const StaffInfoModal = () => {
    const {showStaffInfoModal, handleCloseStaffInfoModal} = useNavs();

    return (
        <AppModal isOpen={showStaffInfoModal} header={{title: 'Update Staff', subtitle: 'Update the form to change staff information', type: ModalHeaderType.START}} hasClose={true} closeClicked={handleCloseStaffInfoModal} >
            
            <StaffInfoForm />
        
        </AppModal>
    )
}

export default StaffInfoModal