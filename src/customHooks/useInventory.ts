"use client"
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addInventoryCategory, allInventoryFetched, allInventoryRequests, allRequestHistory, inventoryCreated, updateInventoryRequest, updateInventory } from '@/store/slices/inventorySlice'
import { getInventorySlice } from '@/store/slices/inventorySlice'
import toast from 'react-hot-toast'
import useStorage from './useStorage'
import { Inventory, InventoryCategory } from '@/interfaces/AppInterfaces'
import useModal from './useModal'
import { closeAddInventoryModal, closeEditInventoryModal, closeInventoryRequestModal } from '@/store/slices/modalSlice'

const useInventory = () => {
    
    const inventorySlice = useAppSelector(getInventorySlice);

    const {currentUser} = useStorage();

    const {handleCloseModal} = useModal();
    
    const dispatch = useAppDispatch();

    useEffect(() => {if (!inventorySlice.inventoriesResult) handleFetchInventories()}, []);

    useEffect(() => {

        if(inventorySlice.error){

            toast.error(inventorySlice.error);

        }

    }, [inventorySlice.error])

    const handleFetchInventories = async () => await dispatch(allInventoryFetched())

    const handleFetchInventoryRequest = async () => await dispatch(allInventoryRequests({whiteLabelName: currentUser?.user?.whiteLabelName}))

    const handleRequestHistory = async () => await dispatch(allRequestHistory({whiteLabelName: currentUser?.user?.whiteLabelName}))

    const handleCreateInventory = async (data: Inventory) => {
        
        // console.log("Inventory Data", data);

        const payload = {...data, quantityOut: 0, whiteLabelName: currentUser?.user?.whiteLabelName};
        
        const createInventory = await dispatch(inventoryCreated(payload))

        // console.log("Inventory created", createInventory)

        if(createInventory?.payload?.status === 'Failed'){
            
            toast.error(createInventory?.payload?.message)
            
            return;
        
        }

        toast.success("Succefully added inventory")

        handleFetchInventories();

        handleCloseModal(closeAddInventoryModal);

    }

    const handleCreateInventoryCategory = async (data: InventoryCategory) => {
        
        const createInventoryCategory = await dispatch(addInventoryCategory(data))

        // console.log("Inventory category created", createInventoryCategory)

    }

    const handleUpdateInventoryRequest = async (data: any) => {
        
        // console.log("Inventory Data", data);

        const updateInventory = await dispatch(updateInventoryRequest(data))

        // console.log("Inventory updated", updateInventory.payload)

        if(updateInventory?.payload?.status === 'Failed'){
            
            toast.error(updateInventory?.payload?.message)
            
            return;
        
        }

        toast.success(`Succefully ${data?.status === "APPROVED" ? 'approved' : 'declined'} inventory`)

        handleFetchInventoryRequest();

        handleCloseModal(closeInventoryRequestModal);

    }

    const handleUpdateInventory = async (inventoryId: string, data: any) => {
        
        // console.log("Inventory Data", inventoryId, data);

        const inventoryUpdated = await dispatch(updateInventory({...data, inventoryId}))

        // console.log("Inventory updated", inventoryUpdated.payload)

        if(inventoryUpdated?.payload?.status === 'Failed'){
            
            toast.error(inventoryUpdated?.payload?.message)
            
            return;
        
        }

        toast.success(`Succefully updated inventory`)

        handleFetchInventories();

        handleCloseModal(closeEditInventoryModal);

    }

    return {

        loading: inventorySlice.loading,

        inventoriesResult: inventorySlice.inventoriesResult,

        inventoryRequestResult: inventorySlice.inventoryRequestResult,

        requestHistoryResult: inventorySlice.requestHistoryResult,

        handleFetchInventoryRequest,

        handleRequestHistory,

        handleCreateInventory,

        handleCreateInventoryCategory,

        handleUpdateInventoryRequest,

        handleUpdateInventory
    
    }
}

export default useInventory