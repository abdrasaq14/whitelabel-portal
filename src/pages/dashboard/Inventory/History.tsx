import React, { useState } from 'react'
import { Table } from '../../../components/Table/Table2'
import StarRating from '../../../components/Rating.tsx'
import { Label } from '../../../components/Label/Label'
import { currencyFormat } from '../../../utils/helpers'
import { formatAmount } from '../../../utils/Helpfunctions'
import { fDateTime } from '../../../utils/formatTime'
import useFetchWithParams from '../../../hooks/useFetchWithParams'
import { InventoryService } from '../../../services/inventory.service'
import { useAuth } from '../../../zustand/auth.store'
import { AddInventory, ViewInventory } from '../../../components/Modal/InventoryModals'
import { generateSerialNumber } from '../../../utils/functions'


const History = ({ isAddModalOpen = false, closeViewModal }: { isAddModalOpen?: boolean, closeViewModal?: any }) => {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const profile: any = useAuth((s) => s.profile)
    const [search, setSearch] = useState("")
    const [selectedInventory, setSelectedInventory] = useState({})
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const { data, isLoading, refetch } = useFetchWithParams(
        ["query-inventory-history", {
            page: currentPage, limit: pageSize, search, whiteLabelName: profile.whiteLabelName, history: true
        }],
        InventoryService.getInventoryRequestHistory,
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

    const calculateTotalPrice = (items:any, itemDetails:any) => {
        // Create a dictionary from itemDetails for quick lookup
        const itemDetailsDict = itemDetails.reduce((dict:any, item:any) => {
            dict[item._id] = item;
            return dict;
        }, {});
    
        // Calculate total price
        let totalPrice = 0;
    
        items.forEach((item : any) => {
            const itemId = item.itemId;
            const quantity = item.quantity;
            
            if (itemDetailsDict[itemId]) {
                const unitPrice = itemDetailsDict[itemId].unitPrice;
                totalPrice += unitPrice * quantity;
            } else {
                console.log(`Item with ID ${itemId} not found in itemDetails.`);
            }
        });
    
        return totalPrice;
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
                                    view: (row: any, index:number) => <div className="pc-text-blue">{generateSerialNumber(index, {
                                        currentPage,
                                        pageSize
                                    })}</div>
                                },
                                {
                                    header: "Request From",
                                    view: (row: any) => <div>{row.requesterId}</div>,
                                },
                                {
                                    header: "No of Item",
                                    view: (row: any) => <div>{row.items.length}</div>,
                                },
                                {
                                    header: "Total Price",
                                    view: (row: any) => <div>{formatAmount(calculateTotalPrice(row.items, row.itemDetails))}</div>,
                                },
                                {
                                    header: "Date Requested",
                                    view: (row: any) => <div>{fDateTime(row.createdAt)}</div>,
                                }, {
                                    header: "Status",
                                    view: (row: any) => <Label variant='warning'>{row.status}</Label>,
                                },

                            ]}
                            loading={false}
                            pagination={mockData.pagination}

                        />

                    </div>
                )
                    : (
                        <div className='h-auto flex-grow flex justify-center flex-col items-center'>
                            <img src='/images/add-product.svg' alt='No Product Found' />
                            <p className='font-normal text-primary-text text-sm sm:text-xl'>No merchants are currently available to sell on your platform.</p>
                        </div>
                    )
            }
            <AddInventory isOpen={isAddModalOpen} closeViewModal={() => {
                closeViewModal()
                refetch()

            }} />
        </div>
    )
}

export default History