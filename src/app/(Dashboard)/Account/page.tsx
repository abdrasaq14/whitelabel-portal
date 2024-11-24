"use client"
import AccountTab from '@/components/Tabs/Account/AccountTab'
import InviteMerchantTab from '@/components/Tabs/Account/InviteMerchantTab'
import MembersTab from '@/components/Tabs/Account/MembersTab'
import AppCard from '@/components/utilities/AppCard'
import Tabs from '@/components/utilities/Tabs'
import useAccount from '@/customHooks/useAccount'
import useModal from '@/customHooks/useModal'
import useNavigation from '@/customHooks/useNavigation'
import { CardType } from '@/enums/ComponentEnums'
import React, { useEffect } from 'react'

const page = () => {

    const {checkUserAuthenticity} = useNavigation();

    const {handleOpenModal, handleCloseModal, showCreateStaffModal, showStaffInfoModal} = useModal();

    const {staffsResult, loading, handleCopyLink} = useAccount();

    useEffect(() => checkUserAuthenticity(), []);
    
    const tabsData = [

        { label: 'Account', content: <AccountTab /> },
        
        { label: 'Team Members', content: <MembersTab handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} showCreateStaffModal={showCreateStaffModal} showStaffInfoModal={showStaffInfoModal} staffsResult={staffsResult} loading={loading} /> },
        
        { label: 'Invite Merchants', content: <InviteMerchantTab handleCopyInviteLink={handleCopyLink} /> },
    
    ];

    return (
        
        <div className='w-full'>
        
            <AppCard type={CardType.NOSHADOW}>
        
                <Tabs tabs={tabsData} />
        
            </AppCard>
        
        </div>
    
    )
}

export default page