import React from 'react'
import AppModal from '../../utilities/AppModal'
import { closeViewInventoryModal } from '@/store/slices/modalSlice'
import { ButtonType } from '@/enums/ComponentEnums'
import Image from 'next/image'
import { intlFormat } from '@/utilities/helpers'
import AppButton from '@/components/forms/AppButton'

const ViewInventoryModal = ({handleCloseModal, showViewInventoryModal, inventory, deleteInventory, editInventory}: any) => {

  // console.log("Inventory", inventory)

  return (
    <AppModal 
        hasClose={true} 
        isOpen={showViewInventoryModal} 
        closeClicked={() => handleCloseModal(closeViewInventoryModal)}
        style="w-[600px]"
        // footer={{
        //     type: ModalFooterType.END, 
        //     cancelButton: {type: ButtonType.SECONDARY, text: 'Delete Item', handleClick: () => {}}, 
        //     submitButton: {type: ButtonType.PRIMARY, text: 'Edit Item', handleClick: () => {}}
        // }}
    >
        
        <div className='my-8 pr-7 overflow-auto h-auto w-full sm:shadow-custom max-h-[624px]'>
          
          {/* <h2 className='text-2xl font-satoshiBold text-accent-main mb-2'>View Inventory</h2> */}

          <div className='w-full p-5 bg-accent-light5 flex justify-center items-center'>
            <div className="max-h-44 overflow-hidden">
              <Image
                src={inventory?.image}
                alt="item image"
                width={0}
                height={0}
                className="max-h-44 w-auto"
                sizes="100vw"
              />
            </div>
          </div>

          <div className='my-5 flex justify-between items-center'>
            <span className='font-satoshiBold text-2xl text-accent-dark5'>{inventory?.name}</span>
            <span className='font-satoshiBold text-xl text-accent-dark'>{intlFormat(inventory?.unitPrice)}</span>
          </div>

          <div className='flex items-center gap-7'>
            <div className='flex flex-col gap-2'>
              <span className='text-accent-light text-sm font-satoshiBold'>Categories</span>
              <span className='font-satoshiMedium text-xs cursor-pointer hover:bg-purple-lighter py-2 px-2 rounded text-accent-light hover:text-purple-main text-purple-main bg-purple-lighter'>{inventory?.categoryName}</span>
            </div>

            <div className='flex flex-col gap-2'>
              <span className='text-accent-light text-sm font-satoshiBold'>Item Quantity</span>
              <span className='font-satoshiMedium text-xs cursor-pointer py-2 px-2 rounded text-purple-main bg-purple-lighter'>{inventory?.quantityIn}</span>
            </div>
          </div>

          <div className='flex justify-end items-center gap-4 mt-10'>
              <div className='w-36'><AppButton text="Delete Item" type={ButtonType.SECONDARY} handleClick={() => {
               handleCloseModal(closeViewInventoryModal);
               deleteInventory(); 
              }}/></div>
              <div className='w-36'><AppButton text="Edit Item" type={ButtonType.PRIMARY} handleClick={() => {
                handleCloseModal(closeViewInventoryModal);
                editInventory()
              }}/></div>
          </div>
          
        </div>
    
    </AppModal>
  )
}

export default ViewInventoryModal