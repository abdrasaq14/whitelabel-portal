import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/Button/Button'
import { BreadCrumbClient } from '../../../components/Breadcrumb'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchWithParams from '../../../hooks/useFetchWithParams'
import { MerchantService } from '../../../services/merchant.service'
import { Label } from '../../../components/Label/Label'
import StarRating from '../../../components/Rating.tsx'
import CopyToClipboard from '../../../components/CopytoClipboard/Copy'
import { fDate, fDateTime } from '../../../utils/formatTime'
import { Table } from '../../../components/Table/Table2'
import { ViewProductModal } from '../../../components/Modal/ProductModal'
import { ProductService } from '../../../services/product.service'
import { SuspendModal } from '../../../components/Modal/MerchantModal'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { useAuth } from '../../../zustand/auth.store'
import AllInventory from './AllInventory'
import InventoryRequest from './InventoryRequest'
import History from './History'
import AvailableInventory from './AvailableInventory'
import RequestedInvetory from './RequestedInvetory'
import { AddInventory, MakeRequest } from '../../../components/Modal/InventoryModals'
import { InventoryService } from '../../../services/inventory.service'

interface PaginationInfo {
    currentPage: number;
    pageSize: number;
}

const Inventory = () => {
    const navigate = useNavigate()
    const profile: any = useAuth((s) => s.profile)
    const accountTabTitle = profile.roleId === "663a5c848b1a1f64469b98bf" ? ['All Inventory', 'Inventory Request', 'History'] : ['Available Inventory', 'Requested Inventory', 'History']
    const [tabIndex, setTabIndex] = useState<number>(0)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false) 
    const [isMakeModalOpen, setIsMakeModalOpen] = useState(false) 
   

    // console.log(profile.role_id);
   


    const displayAccountContent = (tabIndex: number) => {

        if (profile.roleId === "663a5c848b1a1f64469b98bf") {
            switch (tabIndex) {
                case 0:
                    return <AllInventory isAddModalOpen={isAddModalOpen} closeViewModal={() => setIsAddModalOpen(false)} />
                case 1:
                    return <InventoryRequest  isAddModalOpen={isAddModalOpen} closeViewModal={() => setIsAddModalOpen(false)} />
                case 2:
                    return <History isAddModalOpen={isAddModalOpen} closeViewModal={() => setIsAddModalOpen(false)} />
                default:
                    return <AllInventory />
                // return <BioProfile />
            }
        } else {
            switch (tabIndex) {
                case 0:
                    return <AvailableInventory />
                case 1:
                    return <RequestedInvetory />
                case 2:
                    return <History />
                default:
                    return <AvailableInventory />
                // return <BioProfile />
            }
        }



    }




    return (
        <div className='px-4 pt-8 h-full'>

            <div className="pt-4 bg-white pb-10 px-6 rounded-2xl mx-2">
                <div className='flex item-center justify-between py-3'>
                    <BreadCrumbClient backText="Dashboard" currentPath="Inventory" brand='Landmark' />
                   { profile.role_id === "663a5c848b1a1f64469b98bf" ?  <Button onClick={() => setIsAddModalOpen(true)} label='Add Inventory' /> : <Button onClick={() => setIsMakeModalOpen(true)} label='Make Request' /> }
                </div>
                <div className="flex items-center justify-between gap-10 border-b w-full">
                    <div className="flex items-center w-5/6 gap-2 flex-wrap">
                        {accountTabTitle.map((val, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`py-3 px-6 border-b-2 border-b-transparent !rounded-none hover:text-primary focus:text-primary active:text-primary transition-all
                    ${tabIndex === index && 'text-[#470E81] !border-b-[#470E81]'}
                    ${tabIndex !== index && 'text-[#6C6C73]'}
                  `}
                                onClick={() => setTabIndex(index)}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                </div>
                {displayAccountContent(tabIndex)}
            </div>

            

            <MakeRequest isOpen={isMakeModalOpen} closeViewModal={() => {setIsMakeModalOpen(false)}} />

           

        </div>
    )
}


export default Inventory