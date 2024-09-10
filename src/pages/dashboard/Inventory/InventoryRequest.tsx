import React, { useState, useEffect } from 'react'
import { Table } from '../../../components/Table/Table2'
import { Label } from '../../../components/Label/Label'
import StarRating from '../../../components/Rating.tsx'
import { fDateTime } from '../../../utils/formatTime'
import { formatAmount } from '../../../utils/Helpfunctions'
import { useAuth } from '../../../zustand/auth.store'
import useFetchWithParams from '../../../hooks/useFetchWithParams'
import { InventoryService } from '../../../services/inventory.service'
import { AddInventory, InventoryRequestDetails } from '../../../components/Modal/InventoryModals'
import { generateSerialNumber } from '../../../utils/functions'


const InventoryRequest = ({ isAddModalOpen = false, closeViewModal }: { isAddModalOpen?: boolean, closeViewModal?: any }) => {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const profile: any = useAuth((s) => s.profile)
    const [search, setSearch] = useState("")
    const [selectedInventory, setSelectedInventory] = useState()
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [inventoryRequests, setInventoryRequests] = useState([])
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    console.log("Inventory Request Profile", profile)

    const { data, isLoading, refetch } = useFetchWithParams(
        ["query-all-inventory-request", {
            page: currentPage, limit: pageSize, search, whiteLabelName: profile.whiteLabelName
        }],
        InventoryService.getInventoryRequest,
        {
            onSuccess: (data: any) => {
                console.log("All inventory requests", data.data);
                setInventoryRequests(data?.result.requests)
            },
            onError: (err: any) => {
                console.log("Error Occured:", err.response);
                setInventoryRequests([])
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )

    // console.log("Request data", data)

    useEffect(() => {
        refetch()
        // console.log(isMakeModalOpen)
    }, [isAddModalOpen])

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

    const calculateTotalPrice = (items: any, itemDetails: any) => {
        // Create a dictionary from itemDetails for quick lookup
        const itemDetailsDict = itemDetails.reduce((dict: any, item: any) => {
            dict[item._id] = item;
            return dict;
        }, {});

        // Calculate total price
        let totalPrice = 0;

        items.forEach((item: any) => {
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

    const handlePageSize = (val: any) => {
        setPageSize(val);
        // setFilterParams({ ...filterParams, pageSize: val });
    };

    const handleCurrentPage = (val: any) => {
        setCurrentPage(val);
        // setFilterParams({ ...filterParams, pageNum: val - 1 });
    };

    return (
        <div>

            {
                inventoryRequests.length > 0 ? (
                    <div className='h-full flex-grow '>
                        <Table data={inventoryRequests}
                            hideActionName={true}
                            clickRowAction={(row) => {
                                setSelectedInventory(row)
                                setIsViewModalOpen(true)
                            }}
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
                                    view: (row: any, index: number) => <div className="pc-text-blue">{generateSerialNumber(index, {
                                        currentPage,
                                        pageSize
                                    })}</div>
                                },
                                {
                                    header: "Request From",
                                    view: (row: any) => <div>{row.requesterName ?? row.requesterId}</div>,
                                },
                                {
                                    header: "No of Item",
                                    view: (row: any) => <div>{row.items[0].quantity}</div>,
                                },
                                // {
                                //     header: "Total Price",
                                //     view: (row: any) => <div>{formatAmount(calculateTotalPrice(row.items, row.itemDetails))}</div>,
                                // },
                                {
                                    header: "Date Requested",
                                    view: (row: any) => <div>{fDateTime(row.createdAt)}</div>,
                                }
                            ]}
                            loading={isLoading}
                            pagination={
                                {
                                    page: currentPage,
                                    pageSize: pageSize,
                                    totalRows: data?.result.totalResults,
                                    setPageSize: handlePageSize,
                                    setPage: handleCurrentPage
                                }
                            }


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
            <AddInventory isOpen={isAddModalOpen} closeViewModal={async () => {
               await refetch()
               closeViewModal()

            }} />

            {
                selectedInventory && <InventoryRequestDetails details={selectedInventory} isOpen={isViewModalOpen} closeViewModal={async () => {
                    await refetch()
                    setIsViewModalOpen(false)
                }} />
            }



        </div>
    )
}

export default InventoryRequest