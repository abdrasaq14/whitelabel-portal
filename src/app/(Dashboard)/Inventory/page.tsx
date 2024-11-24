"use client"
import AppButton from '@/components/forms/AppButton'
import AllInventoryTab from '@/components/Tabs/Inventory/AllInventoryTab'
import InventoryRequestHistoryTab from '@/components/Tabs/Inventory/InventoryRequestHistoryTab'
import InventoryRequestTab from '@/components/Tabs/Inventory/InventoryRequestTab'
import AppCard from '@/components/utilities/AppCard'
import Tabs from '@/components/utilities/Tabs'
import useInventory from '@/customHooks/useInventory'
import useNavigation from '@/customHooks/useNavigation'
import { ButtonType, CardType } from '@/enums/ComponentEnums'
import React, { useEffect } from 'react'
import { openAddInventoryModal, openInventoryHistoryModal, openInventoryRequestModal, openViewInventoryModal, openDialogModal, openEditInventoryModal} from '@/store/slices/modalSlice';
import useModal from '@/customHooks/useModal'
import AddInventoryModal from '@/components/modals/Inventory/AddInventoryModal'
import InventoryHistoryModal from '@/components/modals/Inventory/InventoryHistoryModal'
import InventoryRequestModal from '@/components/modals/Inventory/InventoryRequestModal'
import ViewInventoryModal from '@/components/modals/Inventory/ViewInventoryModal'
import DialogModal from '@/components/modals/DialogModal'
import EditInventoryModal from '@/components/modals/Inventory/EditInventoryModal'

const page = () => {

  const {
    loading, 
    inventoriesResult, 
    inventoryRequestResult, 
    handleFetchInventoryRequest, 
    requestHistoryResult, 
    handleRequestHistory,
    handleUpdateInventoryRequest
  } = useInventory();

  const {checkUserAuthenticity} = useNavigation();

  const {
    handleOpenModal, 
    handleCloseModal, 
    showAddInventoryModal, 
    showInventoryHistoryModal, 
    activeInventoryHistory, 
    showInventoryRequestModal,
    activeInventoryRequest,
    activeInventory,
    showViewInventoryModal,
    showDialogModal,
    showEditInventoryModal
  } = useModal();

  useEffect(() => checkUserAuthenticity(), []);

  // console.log("History result", requestHistoryResult);
  
  const tabsData = [

      { label: 'All Inventory', content: <AllInventoryTab loading={loading} inventoriesResult={inventoriesResult} handleOpenModal={(row: any) => handleOpenModal(openViewInventoryModal, row)} />, counter: inventoriesResult?.totalResults },
      
      { label: 'Inventory Requests', content: <InventoryRequestTab loading={loading} inventoryRequestResult={inventoryRequestResult} handleFetchInventoryRequest={handleFetchInventoryRequest} handleOpenModal={(row: any) => handleOpenModal(openInventoryRequestModal, row)} />, counter: inventoryRequestResult?.totalResults },
      
      { label: 'History', content: <InventoryRequestHistoryTab loading={loading} requestHistoryResult={requestHistoryResult} handleRequestHistory={handleRequestHistory} handleOpenModal={(row: any) => handleOpenModal(openInventoryHistoryModal, row)} />, counter: requestHistoryResult?.totalResults },
  
  ];

  return (
      
      <div className='w-full'>
      
          <AppCard type={CardType.NOSHADOW}>
      
              <div className='flex w-full justify-end items-center'>
                
                <div>
                
                  <AppButton style="px-5" text='Add Inventory' handleClick={() => {handleOpenModal(openAddInventoryModal)}} type={ButtonType.PRIMARY} />
                  
                </div>
              
              </div>

              <Tabs tabs={tabsData} />
      
          </AppCard>
          
          <AddInventoryModal handleCloseModal={handleCloseModal} showAddInventoryModal={showAddInventoryModal} />

          <InventoryHistoryModal handleCloseModal={handleCloseModal} showInventoryHistoryModal={showInventoryHistoryModal} history={activeInventoryHistory} />

          <InventoryRequestModal loading={loading} handleCloseModal={handleCloseModal} showInventoryRequestModal={showInventoryRequestModal} request={activeInventoryRequest} updateRequest={handleUpdateInventoryRequest} />

          <ViewInventoryModal handleCloseModal={handleCloseModal} showViewInventoryModal={showViewInventoryModal} inventory={activeInventory} deleteInventory={() => handleOpenModal(openDialogModal)} editInventory={() => handleOpenModal(openEditInventoryModal)} />

          <EditInventoryModal handleCloseModal={handleCloseModal} showEditInventoryModal={showEditInventoryModal} inventory={activeInventory} />

          <DialogModal handleCloseModal={handleCloseModal} showDialogModal={showDialogModal} title="Oopss!!" message="Are you sure you want to delete this item from inventory?" image="/icons/depressed.svg" />
      
      </div>
  
  )
}

export default page