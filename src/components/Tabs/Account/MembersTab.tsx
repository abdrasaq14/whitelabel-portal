"use client"
import React, { useEffect } from 'react'
import AppButton from '../../forms/AppButton'
import { ButtonType, SpinnerType } from '@/enums/ComponentEnums'
import useAccount from '@/customHooks/useAccount'
import DownloadIcon from '../../icons/DownloadIcon'
import Table from '../../layouts/Table'
import Image from 'next/image'
import Spinner from '../../feedbacks/Spinner'
import StaffInfoModal from '../../modals/StaffInfoModal'
import CreateStaffModal from '../../modals/CreateStaffModal'
import Pagination from '../../feedbacks/Pagination'
import NoDataFound from '../../feedbacks/NoDataFound'
import { openCreateStaffModal, closeCreateStaffModal, closeStaffInfoModal, openStaffInfoModal } from '@/store/slices/modalSlice'

const MembersTab = ({handleOpenModal, handleCloseModal, showCreateStaffModal, showStaffInfoModal, loading, staffsResult}: any) => {

    // console.log(staffsResult);

    const columns = [
        { key: 'sn', label: 'S/N' },
        { key: 'name', label: 'Staff', render: (row: any) => (
            <div className='flex items-center gap-2'>
                <Image className='rounded-full' src={row.image} height={40} width={40} alt="User image" />
                <div className='flex flex-col'>
                    <span className='font-satoshiMedium text-base text-accent-dark'>{`${row.firstName} ${row.lastName}`}</span>
                    <span className='font-satoshiRegular text-sm text-accent-dark'>{`${row.email}`}</span>
                </div>
            </div>
          )},
        { key: 'role', label: 'Role', render: (row: any) => (
            <span className={`py-1 px-10 rounded-3xl ${row.role === 'Admin' ? 'bg-[#E3EFFC]' : 'bg-[#E7F6EC]'}`}>{row.role}</span>
        )},
    ];

    const additionalActions = (row: any) => [
        { label: 'View Staff', action: () => handleOpenModal(openStaffInfoModal, row) }
    ];



    return (
        <div className='gap-8 grid grid-cols-3'>
            <div>
                <h3 className='font-satoshiBold text-base text-accent-dark3'>Team Members</h3>
                <p className='font-satoshiRegular text-sm text-accent-dark mt-2'>Invite your colleagues to work faster and collaborate together.</p>
                <div className='mt-5 flex w-100 gap-2'>
                    <AppButton text="Export CSV" handleClick={() => {}} type={ButtonType.SECONDARY} icon={DownloadIcon} />
                    <AppButton text="Invite new member" handleClick={() => handleOpenModal(openCreateStaffModal)} type={ButtonType.PRIMARY} />
                </div>
            </div>
            <div className='col-span-2'>
                {loading ? <div className='flex justify-center items-center h-full w-full'>
                        <Spinner type={SpinnerType.PRIMARY} height={40} width={40} />
                    </div> : !staffsResult ? <NoDataFound image={<Image src="/icons/people.svg" alt="People icon" height={439} width={275} />} text="You haven't invited any staff members to the platform yet. You can invite coworkers to join and collaborate with you, and their information will be displayed here." /> : 
                    <>
                        <Table
                            columns={columns}
                            data={staffsResult?.results}
                            additionalActions={additionalActions}
                        />
                        <Pagination
                            page={staffsResult.page}
                            totalPages={staffsResult.totalPages}
                            onPageChange={() => {}}
                        />
                    </>
                }
            </div>

            <StaffInfoModal handleCloseModal={() => handleCloseModal(closeStaffInfoModal)} showStaffInfoModal={showStaffInfoModal} />

            <CreateStaffModal handleCloseModal={() => handleCloseModal(closeCreateStaffModal)} showCreateStaffModal={showCreateStaffModal} />
            
        </div>
    )
}

export default MembersTab