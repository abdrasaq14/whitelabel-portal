import React from 'react'
import AppModal from '../../utilities/AppModal'
import { closeInventoryHistoryModal } from '@/store/slices/modalSlice'
import Image from 'next/image'
import { formatDate } from '@/utilities/helpers'
import Table from '../../layouts/Table'
import { mergeQuantity } from '@/utilities/helpers'

const InventoryHistoryModal = ({handleCloseModal, showInventoryHistoryModal, history}: any) => {

    // console.log("History", history)

    const tableData = history && mergeQuantity(history?.itemDetails, history?.items);

    const columns = [
        { key: 'sn', label: 'S/N' },
        { key: 'name', label: 'Item', render: (row: any) => (
            <div className='flex items-center gap-3'>
                <Image src={row.image} height={40} width={40} alt="Item image" />
                <span className='font-satoshiRegular text-base text-accent-main'>{`${row.name}`}</span>
            </div>
        )},
        { key: 'quantity', label: 'Quantity', render: (row: any) => <span className='font-satoshiRegular text-base text-accent-main'>{`${row?.quantity}`}</span>}
    ];

    return (
        <AppModal hasClose={true} isOpen={showInventoryHistoryModal} closeClicked={() => handleCloseModal(closeInventoryHistoryModal)} style="w-[684px]">
            
            <div className='my-4 pr-7 overflow-auto h-auto w-full sm:shadow-custom max-h-[624px]'>
            
                <div className='flex justify-between items-start'>
                    <div>
                        <h2 className='text-2xl font-satoshiBold text-accent-main mb-2'>Inventory History</h2>

                        <div className='flex justify-start items-center mt-5'>
                            <Image src="/icons/avatars.svg" height={60} width={60} alt="avatar" />
                            <span className='font-satoshiBold text-xl text-accent-main'>{history?.requesterName}</span>
                        </div>

                    </div>

                    <div className='flex flex-col items-end gap-5'>
                        <p className={`flex px-2 w-[100px] justify-center items-center rounded-3xl font-satoshiMedium text-base ${history?.status === 'APPROVED' ? 'bg-success-main text-white' : 'bg-danger-light2 text-danger-light'}`}>{
                            history?.status === 'APPROVED' ? 'Approved' : 'Declined'
                        }</p>
                        <p className='text-base font-satoshiMedium text-accent-main'>{history?.createdAt && formatDate(history?.createdAt)}</p>
                    </div>
                </div>

                <div className="mt-10">
                    <Table
                        columns={columns}
                        data={tableData}
                    />
                </div>
            
            </div>
        
        </AppModal>
    )
}

export default InventoryHistoryModal