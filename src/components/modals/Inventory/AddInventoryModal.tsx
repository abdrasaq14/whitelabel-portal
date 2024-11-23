import React from 'react'
import AppModal from '../../utilities/AppModal'
import { closeAddInventoryModal } from '@/store/slices/modalSlice'
import AddInventoryForm from '../../forms/Inventory/AddInventoryForm'

const AddInventoryModal = ({handleCloseModal, showAddInventoryModal}: any) => {

  return (
    <AppModal hasClose={true} isOpen={showAddInventoryModal} closeClicked={() => handleCloseModal(closeAddInventoryModal)}>
        
        <div className='my-8 pr-7 overflow-auto h-auto w-full sm:w-[464px] sm:shadow-custom max-h-[624px]'>
          
          <h2 className='text-2xl font-satoshiBold text-accent-main mb-2'>Add Inventory</h2>

          <AddInventoryForm />
          
        </div>
    
    </AppModal>
  )
}

export default AddInventoryModal