import React from 'react';
import { BreadCrumbClient } from '../../../components/Breadcrumb';
import SearchInput from '../../../components/FormInputs/SearchInput';
import { Table } from '../../../components/Table/Table2';
import { Label } from '../../../components/Label/Label';

const MerchantList = []


// interface Store {
//   serialNumber: string;
//   name: string;
//   category: string;
//   country: string;
//   status: string;
// }

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


// console.log(mockData);


const SuspendedMerchant = () => {
  return (
    <div className='px-4 pt-8 h-full'>
      <div className='bg-white rounded-md h-auto w-full p-8 flex flex-col'>
        <BreadCrumbClient backText="Dashboard" currentPath="Suspended Merchants" brand='Jumia' />
        <div className='flex justify-between'>
          <h1 className='text-primary-text text-sm font-normal'>Suspended Merchant <span className='ml-2 bg-[#EEEFF0] py-1 px-2 rounded-full font-medium text-black'>{MerchantList.length}</span></h1>
          <div>
            <SearchInput placeholder='Search' />
          </div>
        </div>


        {
          mockData.data.length > 0 ? (
            <div className='h-full flex-grow '>
              <Table data={mockData?.data}
              hideActionName={true}
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
                    view: (row: any) => <Label variant="success" >{row?.category} </Label>,
                  },
                  {
                    header: "COUNTRY",
                    view: (row: any) => <div>{row.country}</div>,
                  },
                  {
                    header: "STATUS",
                    view: (row: any) => <div>{row.status}</div>,
                  }
                ]}
                loading={false}
                pagination={mockData.pagination}

              />
              {/* <Table loading={loading} data={ProductList} columns={columns} /> */}

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
  )
}

export default SuspendedMerchant