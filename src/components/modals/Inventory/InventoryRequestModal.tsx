import React from 'react'
import AppModal from '../../utilities/AppModal'
import { closeInventoryRequestModal } from '@/store/slices/modalSlice'
import Image from 'next/image'
import Table from '../../layouts/Table'
import { mergeQuantity } from '@/utilities/helpers'
import { ButtonType, SpinnerType } from '@/enums/ComponentEnums'
import AppButton from '../../forms/AppButton'

const InventoryRequestModal = ({handleCloseModal, showInventoryRequestModal, request, updateRequest, loading}: any) => {

    // console.log("Inventory request", request)

    const tableData = request && mergeQuantity(request?.itemDetails, request?.items);

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
        <AppModal 
            hasClose={true} 
            isOpen={showInventoryRequestModal} 
            closeClicked={() => handleCloseModal(closeInventoryRequestModal)} 
            style="w-[684px]" 
        >
            
            <div className='my-4 pr-7 overflow-auto h-auto w-full sm:shadow-custom max-h-[624px]'>
            
                <div>
                    <h2 className='text-2xl font-satoshiBold text-accent-main mb-2'>Inventory Request</h2>

                    <div className='flex justify-start items-center mt-5'>
                        <Image src="/icons/avatars.svg" height={60} width={60} alt="avatar" />
                        <span className='font-satoshiBold text-xl text-accent-main'>{request?.requesterName}</span>
                    </div>

                </div>
                    
                <div className="my-10">
                    <Table
                        columns={columns}
                        data={tableData}
                    />
                </div>

                <div className='flex gap-4 p-5'>
                    <AppButton loader={{loading, type: SpinnerType.PRIMARY}} text="Decline" type={ButtonType.SECONDARY} handleClick={() => updateRequest({status: "DECLINED", requestId: request._id})}/>
                    <AppButton loader={{loading, type: SpinnerType.PRIMARY}} text="Approve" type={ButtonType.PRIMARY} handleClick={() => updateRequest({status: "APPROVED", requestId: request._id})}/>
                </div>

            
            </div>
        
        </AppModal>
    )
}

export default InventoryRequestModal