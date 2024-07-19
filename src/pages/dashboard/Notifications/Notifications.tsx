import React from 'react'
import { BreadCrumbClient } from '../../../components/Breadcrumb'
import { Notification } from '../../../components/common/NotificationSidebar'
import { useNavigate } from 'react-router-dom'
import { NotificationService } from '../../../services/notification.service'
import { useAuth } from '../../../zustand/auth.store'
import { useQuery } from 'react-query'

const Notifications = () => {

    const navigate = useNavigate()
    const profile: any = useAuth((s) => s.profile)
    const { data: notifications, } = useQuery(
        ["query-user-Notifications-sales", profile],
        async () => {
            return await NotificationService.getUsersNotification();
        },
        {
            enabled: true,
            onSuccess: (res) => {
            },
            onError: (err: any) => {
                console.log("Error Occured:", err.response);
            },

        }
    );
    return (
        <div className='px-4 pt-8 h-full  '>
            <div className='flex items-center gap-6'>
                <button onClick={() => navigate(-1)} className='flex items-center -mt-6 text-primary gap-2'><img alt="arrow-left-img" className='h-4 w-auto' src="/icons/arrow-left.svg" />Back</button>
                <BreadCrumbClient backText="Dashboard" currentPath="Notifications" brand='Landmark' />



            </div>
            <div className='grid  gap-3  grid-cols-2'>
                <div className='col-span-1 mb-3 overflow-y-auto  h-[80vh] rounded bg-white '>
                    <div
                        className="py-5 flex justify-between items-center px-5"
                    >
                        <div className="flex items-center">
                            <h6 className="text-[#101010] font-semibold text-lg">Notification Area</h6>

                        </div>

                    </div>
                    <div className="h-[95%]  scrollbar px-6 py-4 ">

                        <div className="mb-24 h-full">
                            {notifications?.data.result &&
                                notifications?.data.result.map((items: any, index: number) => <Notification key={index} data={items} />)
                            }
                        </div>



                    </div>
                </div>
                {/* <div className='col-span-1 h-[60vh] rounded bg-white'>

                </div> */}

            </div>
        </div>
    )
}

export default Notifications