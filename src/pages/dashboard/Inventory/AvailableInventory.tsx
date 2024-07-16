import React from 'react'
import { Table } from '../../../components/Table/Table2'
import { Label } from '../../../components/Label/Label'
import StarRating from '../../../components/Rating.tsx'

const AvailableInventory = () => {
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
        mockData.data.length > 0 ? (
            <div className='h-full flex-grow '>
                <Table data={mockData?.data}
                    hideActionName={true}
                    // clickRowAction={(row) => setModalOpen(true)}
                    rowActions={(row) => [
                        {
                            name: "View Hub",
                            action: () => { },
                        },
                        {
                            name: "Do Something",
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
                            view: (row: any) => <div>{row.category}</div>,
                        },
                        {
                            header: "Category",
                            view: (row: any) => <StarRating totalRatings={4} />,
                        },
                        {
                            header: "Unit Price",
                            view: (row: any) => <div>{row.Location}</div>,
                        },
                        {
                            header: "Date Listed",
                            view: (row: any) => <div>{row.Location}</div>,
                        },{
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
                    <img src='/images/NoVendor.svg' alt='No Product Found' />
                    <p className='font-normal text-primary-text text-sm sm:text-xl'>No merchants are currently available to sell on your platform.</p>
                </div>
            )
    }
</div>
  )
}

export default AvailableInventory