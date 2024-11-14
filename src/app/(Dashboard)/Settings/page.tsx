"use client"
import { BreadCrumbClient } from '@/components/Breadcrumb';
import Security from '@/components/Settings/Security';
import Tabs from '@/components/utilities/SettingsTabs';
import useNavigation from '@/customHooks/useNavigation';
import React, { useEffect } from 'react'

const page = () => {

    const { checkUserAuthenticity } = useNavigation();

    const tabsData = [

        { label: 'security', content: <Security /> },

        { label: 'settings', content: "<MembersTab />" },


    ];

    useEffect(() => checkUserAuthenticity(), []);
    return (
        <div className='px-4 pt-8 h-full'>
            <div className='bg-white rounded-md h-auto w-full p-8 flex flex-col'>
                <BreadCrumbClient backText="Dashboard" currentPath="Settings" brand='Landmark' />
                <div className="pt-4 pb-10 bg-white rounded-2xl mx-2">
                    <Tabs tabs={tabsData} />
                </div>
            </div>

        </div>
    )
}

export default page