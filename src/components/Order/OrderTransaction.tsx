"use client"

import React from 'react'
import { BreadCrumbClient } from '../Breadcrumb'
import useStorage from '@/customHooks/useStorage'
import StatsCard from '../utilities/StatsCard'
import { IoCubeOutline } from "react-icons/io5";
import useOrders from '@/customHooks/useOrders';
import { fDateTime } from '@/utilities/formatTime';
import Spinner from '../feedbacks/Spinner';
import { SpinnerType } from '@/enums/ComponentEnums';
import Table from '../layouts/Table';

const OrderTransaction = () => {
  const { currentUser } = useStorage()
  const { loading, orders } = useOrders()

  console.log(orders)

  const columns = [
    { key: "sn", label: "S/N" },
    {
      key: "Order Id",
      label: "Order Id",
      render: (row: any) => <div>{row?.orderReference}</div>
    },
    {
      key: "Amount",
      label: "Amount",
      render: (row: any) => <div>{row?.totalPrice}</div>
    },
    {
      key: "Date",
      label: "Date",
      render: (row: any) => (
        <div>{fDateTime(row.orderedAt)}</div>
      )
    },
    {
      key: "Status",
      label: "Status",
      render: (row: any) => (
        <div
          className={`py-1 px-2 flex items-center justify-center w-[70%] ${row.status === "active" ? "bg-green-300" : "bg-red-300"
            } rounded-md`}
        >
          {row.status}
        </div>
      )
    }
  ];
  return (
    <div className='px-4 w-full pt-8 h-full flex flex-col '>
      <div className='bg-white rounded-md h-auto w-full p-8 flex flex-col'>
        <BreadCrumbClient backText="Dashboard" currentPath="Orders & Transaction" brand={currentUser?.user?.whiteLabelName} />
        <div className='flex justify-start bg-red-flex-wrap gap-8 w-full py-8'>
          <StatsCard title='Total Orders' loading={loading} value='0' actionButtons={[{ text: 'All', action: () => { console.log("All") } }, { text: 'Last Month', action: () => { console.log("Last month") } }, { text: 'This Month', action: () => { console.log("This month") } }]} icon={<IoCubeOutline />} />
          <StatsCard title='Pending Orders' loading={loading} value='0' actionButtons={[{ text: 'All', action: () => { console.log("All") } }, { text: 'Last Month', action: () => { console.log("Last month") } }, { text: 'This Month', action: () => { console.log("This month") } }]} icon={<IoCubeOutline />} />
          <StatsCard title='Completed Orders' loading={loading} value='0' actionButtons={[{ text: 'All', action: () => { console.log("All") } }, { text: 'Last Month', action: () => { console.log("Last month") } }, { text: 'This Month', action: () => { console.log("This month") } }]} icon={<IoCubeOutline />} />
        </div>
        <div className='flex mb-2 justify-between'>
          <h1 className='text-purple-main text-sm font-normal'>All Orders <span className='ml-2 bg-[#EEEFF0] h-2 w-2 py-1 px-2 rounded-full font-medium text-black'>{ }</span></h1>
          <div>
          </div>
          <div>

          </div>
          
        </div>
        {loading ? (
            <Spinner type={SpinnerType.PRIMARY} height={50} width={50} />
          ) : orders && orders?.results?.length > 0 ? (
            <div className="h-full flex-grow ">
              <Table
                columns={columns}
                data={orders && orders?.results}
              />
            </div>
          ) : (
            <div className="h-auto flex-grow py-20 flex justify-center flex-col items-center">
              (
              <>
                <img src="/images/no_transaction_history.svg" alt="No Product Found" />
                <p className='text-center text-xl mt-4 font-medium font-satoshiMedium text-primary-text'>“You currently have no transaction or order records to display."</p>
              </>
              )
            </div>
          )}

      </div>

    </div>
  )
}

export default OrderTransaction