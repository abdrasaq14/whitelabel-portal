import React from 'react'
import { BreadCrumbClient } from '../../../components/Breadcrumb'
import { Notification, SampleNotification } from '../../../components/common/NotificationSidebar'
import { useNavigate} from 'react-router-dom'

const Notifications = () => {

    const navigate =  useNavigate()
    return (
        <div className='px-4 pt-8 h-full  '>
            <div className='flex items-center gap-6'>
                <button onClick={() => navigate(-1) } className='flex items-center -mt-6 text-primary gap-2'><img className='h-4 w-auto' src="/icons/arrow-left.svg" />Back</button>
                <BreadCrumbClient backText="Dashboard" currentPath="Notifications" brand='Landmark' />



            </div>
            <div className='grid  gap-3  grid-cols-2'>
                <div className='col-span-1 overflow-y-auto  h-[80vh] rounded bg-white '>
                    <div
                        className="py-5 flex justify-between items-center px-5"
                    >
                        <div className="flex items-center">
                            <h6 className="text-[#101010] font-semibold text-lg">Notification Area</h6>

                        </div>

                    </div>
                    <div className="h-[95%]  scrollbar px-6 py-4 ">

                        <div className="mb-24 h-full">
                            {
                                SampleNotification.map((items: any, index: number) => <Notification key={index} data={items} />)
                            }
                        </div>



                    </div>
                </div>
                <div className='col-span-1 h-[60vh] rounded bg-white'>

                </div>

            </div>
        </div>
    )
}

export default Notifications