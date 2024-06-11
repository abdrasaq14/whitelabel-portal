import React, { useState } from 'react'
import { Table } from '../../../components/Table/Table2'
import { Label } from '../../../components/Label/Label'
import StarRating from '../../../components/Rating.tsx'
import { fDateTime } from '../../../utils/formatTime'
import { formatAmount } from '../../../utils/Helpfunctions'
import { useAuth } from '../../../zustand/auth.store'
import useFetchWithParams from '../../../hooks/useFetchWithParams'
import { InventoryService } from '../../../services/inventory.service'


const InventoryRequest = () => {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const profile: any = useAuth((s) => s.profile)
    const [search, setSearch] = useState("")
    const [selectedInventory, setSelectedInventory] = useState({})
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    console.log(profile)

    const { data, isLoading, refetch } = useFetchWithParams(
        ["query-all-inventory-request", {
            page: currentPage, limit: pageSize, search, whiteLabelName: profile.whiteLabelName
        }],
        InventoryService.getInventoryRequest,
        {
            onSuccess: (data: any) => {
                // console.log(data.data);
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )
    const mockData = {
        data: [
            {
                serialNumber: "1",
                name: "SuperMart",
                category: "Retail",
                country: "United States",
                status: "Active"
            },
            {
                serialNumber: "2",
                name: "TechZone",
                category: "Electronics",
                country: "Canada",
                status: "Active"
            },
            {
                serialNumber: "3",
                name: "FashionFusion",
                category: "Apparel",
                country: "United Kingdom",
                status: "Inactive"
            },
            {
                serialNumber: "4",
                name: "GreenGrocers",
                category: "Grocery",
                country: "Australia",
                status: "Active"
            },
            {
                serialNumber: "5",
                name: "BookBarn",
                category: "Books",
                country: "India",
                status: "Active"
            },
            {
                serialNumber: "6",
                name: "SportyStuff",
                category: "Sports",
                country: "Germany",
                status: "Active"
            },
            {
                serialNumber: "7",
                name: "HomeDecor",
                category: "Home Goods",
                country: "France",
                status: "Inactive"
            },
            {
                serialNumber: "8",
                name: "PetParadise",
                category: "Pets",
                country: "Brazil",
                status: "Active"
            },
            {
                serialNumber: "9",
                name: "MusicMania",
                category: "Music",
                country: "Japan",
                status: "Active"
            },
            {
                serialNumber: "10",
                name: "HealthHaven",
                category: "Health",
                country: "Mexico",
                status: "Active"
            }
        ],
        pagination: {
            page: 1,
            pageSize: 10,
            totalRows: 40,
        },
    }
    return (
        <div>

            {
                data && data?.result.length > 0 ? (
                    <div className='h-full flex-grow '>
                        <Table data={data?.result}
                            hideActionName={true}
                            // clickRowAction={(row) => setModalOpen(true)}
                            rowActions={(row) => [
                                {
                                    name: "View Item",
                                    action: () => {
                                        setSelectedInventory(row)
                                        setIsViewModalOpen(true)
                                    },
                                },
                                {
                                    name: "Update Item",
                                    action: () => { },
                                }, {
                                    name: "Delete",
                                    action: () => { },
                                },
                            ]}
                            columns={[
                                {
                                    header: "S/N",
                                    view: (row: any) => <div className="pc-text-blue">{row.serialNumber}</div>
                                },
                                {
                                    header: "Item",
                                    view: (row: any) => <div>{row.name}</div>,
                                },
                                {
                                    header: "Quantity",
                                    view: (row: any) => <div>{row.quantityIn}</div>,
                                },
                                {
                                    header: "Category",
                                    view: (row: any) => <div>{row.categoryName}</div>,
                                },
                                {
                                    header: "Unit Price",
                                    view: (row: any) => <div>{formatAmount(row.unitPrice)}</div>,
                                },
                                {
                                    header: "Date Listed",
                                    view: (row: any) => <div>{fDateTime(row.createdAt)}</div>,
                                }, {
                                    header: "Status",
                                    view: (row: any) => <Label variant='success'>In stock</Label>,
                                },

                            ]}
                            loading={false}
                            pagination={mockData.pagination}

                        />

                    </div>
                )
                    : (
                        <div className='h-auto flex-grow flex justify-center flex-col items-center'>
                            <img src='/images/inventory-requst.svg' alt='No Product Found' />
                            <p className='font-normal text-primary-text text-sm sm:text-xl'>Your Inventory request would appear here</p>
                        </div>
                    )
            }
           
        </div>
    )
}

export default InventoryRequest