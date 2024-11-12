"use client"
import AccountTab from '@/components/Account/AccountTab'
import MembersTab from '@/components/Account/MembersTab'
import AppCard from '@/components/utilities/AppCard'
import Tabs from '@/components/utilities/Tabs'
import useNavigation from '@/customHooks/useNavigation'
import { CardType } from '@/enums/ComponentEnums'
import React, { useEffect } from 'react'

const page = () => {

    const {checkUserAuthenticity} = useNavigation();

    useEffect(() => checkUserAuthenticity(), []);
    
    const tabsData = [

        { label: 'Account', content: <AccountTab /> },
        
        { label: 'Team Members', content: <MembersTab /> },
        
        { label: 'Invite Merchants', content: <p>Content for Tab 3</p> },
    
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