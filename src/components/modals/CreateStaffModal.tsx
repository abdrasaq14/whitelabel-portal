import React from 'react'
import AppModal from '../utilities/AppModal'
import useNavs from '@/customHooks/useNavs';
import { ModalHeaderType } from '@/enums/ComponentEnums';
import CreateStaffForm from '../forms/AccountInformation/CreateStaffForm';

const CreateStaffModal = ({handleCloseModal, showCreateStaffModal}: any) => {
    
    return (
        <AppModal isOpen={showCreateStaffModal} header={{title: 'Add Staff', subtitle: 'Fill and submit the form to add a new staff to the team', type: ModalHeaderType.START}} hasClose={true} closeClicked={handleCloseModal} >
            
            <CreateStaffForm closeModal={handleCloseModal} />
        
        </AppModal>
    )
}

export default CreateStaffModal