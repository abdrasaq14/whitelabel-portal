import React from 'react'
import NoDataFound from '../../feedbacks/NoDataFound'
import Image from 'next/image'
import Spinner from '../../feedbacks/Spinner'
import { SpinnerType } from '@/enums/ComponentEnums'
import Table from '../../layouts/Table'
import Pagination from '../../feedbacks/Pagination'
import { formatDate, intlFormat } from '@/utilities/helpers'

const AllInventoryTab = ({loading, inventoriesResult, handleOpenModal}: any) => {

    const columns = [
        { key: 'sn', label: 'S/N' },
        { key: 'name', label: 'Item', render: (row: any) => (
            <div className='flex items-center gap-3'>
                <Image src={row.image} height={40} width={40} alt="User image" />
                <span className='font-satoshiRegular text-base text-accent-main'>{`${row.name}`}</span>
            </div>
        )},
        { key: 'quantityIn', label: 'Quantity'},
        { key: 'categoryName', label: 'Category'},
        { key: 'unitPrice', label: 'Unit Price', render: (row: any) => <span>{intlFormat(row.unitPrice)}</span>},
        { key: 'createdAt', label: 'Date Listed', render: (row: any) => (<span>{formatDate(row.createdAt)}</span>)},
        { key: 'status', label: 'Status', render: (row: any) => (
            <span className={`py-1 flex px-2 w-[100px] justify-center items-center rounded-3xl font-satoshiMedium ${row.quantityIn > 5 ? 'bg-success-light2 text-success-dark2' : row.quantityIn <=5 && row.quantityIn > 0 ? 'bg-warning-lighter text-warning-dark' : 'bg-danger-light2 text-danger-light'}`}>{
                row.quantityIn > 5 ? 'In Stock' : row.quantityIn <=5 && row.quantityIn > 0 ? 'Low in Stock' : 'Out of Stock'
            }</span>
        )},
    ];

    const additionalActions = (row: any) => [
        { label: 'View Details', action: () => {handleOpenModal(row)} }
    ];

    return (
        <div>
            {
                loading ? 
                <div className='flex justify-center items-center h-full w-full'>
                    <Spinner type={SpinnerType.PRIMARY} height={40} width={40} />
                </div> : 
                !inventoriesResult ? <NoDataFound image={<Image src="/icons/noinventory.svg" alt="Crane icon" height={448} width={448} />} text="Your Inventory list would appear here" /> :
                <>
                    <Table
                        columns={columns}
                        data={inventoriesResult?.results}
                        additionalActions={additionalActions}
                    />
                    <Pagination
                        page={inventoriesResult.page}
                        totalPages={inventoriesResult.totalPages}
                        onPageChange={() => {}}
                    />
                </>
            }
        </div>
    )
}

export default AllInventoryTab