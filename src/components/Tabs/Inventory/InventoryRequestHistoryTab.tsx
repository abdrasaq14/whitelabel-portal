import React, { useEffect } from 'react'
import NoDataFound from '../../feedbacks/NoDataFound'
import Image from 'next/image'
import Spinner from '../../feedbacks/Spinner';
import { SpinnerType } from '@/enums/ComponentEnums';
import Table from '../../layouts/Table';
import Pagination from '../../feedbacks/Pagination';
import { formatDate, intlFormat } from '@/utilities/helpers';

const InventoryRequestHistoryTab = ({loading, handleRequestHistory, requestHistoryResult, handleOpenModal}: any) => {

    useEffect(() => {

        if(!requestHistoryResult) handleRequestHistory()
    
    }, [])

    const columns = [
        { key: 'sn', label: 'S/N' },
        { key: 'requesterName', label: 'Request from'},
        { key: 'items', label: 'No of Items', render: (row: any) => <span className='font-satoshiRegular text-base text-accent-main'>{`${row?.items?.length}`}</span>},
        { key: 'totalPrice', label: 'Total Price', render: (row: any) => <span className='font-satoshiRegular text-base text-accent-main'>{intlFormat(Number(`${row?.itemDetails?.reduce((sum: number, item: any) => sum + item.unitPrice, 0)}`))}</span>},
        { key: 'createdAt', label: 'Date Responded', render: (row: any) => <span>{formatDate(row.createdAt)}</span>},
        { key: 'status', label: 'Status', render: (row: any) => (
            <span className={`py-1 flex px-2 w-[100px] justify-center items-center rounded-3xl font-satoshiMedium ${row.status === 'APPROVED' ? 'bg-success-light2 text-success-dark2' : 'bg-danger-light2 text-danger-light'}`}>{
                row.status === 'APPROVED' ? 'Approved' : 'Declined'
            }</span>
        )},
    ];

    const additionalActions = (row: any) => [
        { label: 'View Details', action: () => handleOpenModal(row) }
    ];
    
    return (
        <div>
            {
                loading ? 
                <div className='flex justify-center items-center h-full w-full'>
                    <Spinner type={SpinnerType.PRIMARY} height={40} width={40} />
                </div> : 
                !requestHistoryResult ? <NoDataFound image={<Image src="/icons/nohistory.svg" alt="Crane icon" height={300} width={300} />} text="Your inventory requests history will appear here." /> :
                <>
                    <Table
                        columns={columns}
                        data={requestHistoryResult?.results}
                        additionalActions={additionalActions}
                    />
                    <Pagination
                        page={requestHistoryResult.page}
                        totalPages={requestHistoryResult.totalPages}
                        onPageChange={() => {}}
                    />
                </>
            }
        </div>
    )
}

export default InventoryRequestHistoryTab