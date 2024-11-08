"use client"
import AccountTab from '@/components/Account/AccountTab'
import AppCard from '@/components/utilities/AppCard'
import Tabs from '@/components/utilities/Tabs'
import { CardType } from '@/enums/ComponentEnums'
import React from 'react'

const page = () => {
    const tabsData = [
        { label: 'Account', content: <AccountTab /> },
        { label: 'Team Management', content: <p>Content for Tab 2</p> },
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