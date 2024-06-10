import React, { useState } from 'react'
import { BreadCrumbClient } from '../../../components/Breadcrumb';
import SearchInput from '../../../components/FormInputs/SearchInput';
import { Label } from '../../../components/Label/Label';
import { Table } from '../../../components/Table/Table2';
import { Button } from '../../../components/Button/Button';
import StarRating from '../../../components/Rating.tsx';
import Modal from '../../../components/Modal/Modal';

const MerchantList = []

const AddMerchants = () => {
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
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div>
      <Modal open={modalOpen} onClick={() => setModalOpen(false)} header={
        <div className='flex gap-2 items-center'>
          <div>
            <img className='h-12 w-12 rounded full' src='/avatar-temp.png' />
          </div>
          <div>
              <h3>Ese's Store</h3>
              <h3 className='text-xs font-normal'>Joined on Jan 24th, 2022</h3>
          </div>


        </div>
      } className='w-[670px] p-8' >
        <div className='text-black' >

          <Button label='Invite Merchant' className='ml-auto mt-auto' />
        </div>
      </Modal>
      <div className='px-4 pt-8 h-full'>

        <div className='bg-white rounded-md h-auto w-full p-8 flex flex-col'>
          <BreadCrumbClient backText="Dashboard" currentPath="Add Merchants" brand='Landmark' />
          <div className='flex justify-between'>

            <div>
              <SearchInput placeholder='Search' />
            </div>

            <Button label='Invite All' className='px-4' />
          </div>


          {
            mockData.data.length > 0 ? (
              <div className='h-full flex-grow '>
                <Table data={mockData?.data}
                  hideActionName={true}
                  clickRowAction={(row) => setModalOpen(true)}
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
                      header: "STORE NAME",
                      view: (row: any) => <div>{row.name}</div>,
                    },
                    {
                      header: "CATEGORY",
                      view: (row: any) => <div>{row.category}</div>,
                    },
                    {
                      header: "Customer Rating",
                      view: (row: any) => <StarRating totalRatings={4} />,
                    },
                    {
                      header: "Location",
                      view: (row: any) => <div>{row.Location}</div>,
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
      </div>
    </div>

  )
}

export default AddMerchants