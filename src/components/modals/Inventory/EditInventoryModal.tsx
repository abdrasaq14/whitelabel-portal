import React from 'react'
import AppModal from '../../utilities/AppModal'
import { closeEditInventoryModal } from '@/store/slices/modalSlice'
import EditInventoryForm from '@/components/forms/Inventory/EditInventoryForm'

const EditInventoryModal = ({handleCloseModal, showEditInventoryModal, inventory}: any) => {

  return (
    <AppModal hasClose={true} isOpen={showEditInventoryModal} closeClicked={() => handleCloseModal(closeEditInventoryModal)}>
        
        <div className='my-8 pr-7 overflow-auto h-auto w-full sm:w-[464px] sm:shadow-custom max-h-[624px]'>
          
          <h2 className='text-2xl font-satoshiBold text-accent-main mb-2'>Edit Inventory</h2>

          <EditInventoryForm inventory={inventory} />
          
        </div>
    
    </AppModal>
  )
}

export default EditInventoryModal