import React, { useEffect, useState } from 'react'
import { BreadCrumbClient } from '../../../components/Breadcrumb';
import SearchInput from '../../../components/FormInputs/SearchInput';
// import { OrderDetailsMockData } from '../../../utils/ProductList';
import { Table } from '../../../components/Table/Table2';
import { Modal } from '../../../components/Modal/StaffModal';
import { formatAmount } from '../../../utils/Helpfunctions';
import CopyToClipboard from '../../../components/CopytoClipboard/Copy';
import { InfoCard } from '../../../components/InfoCard/InfoCard';
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import { OrderService } from '../../../services/order.service';
import { fDateTime } from '../../../utils/formatTime';
import { useAuth } from '../../../zustand/auth.store';

interface PaginationInfo {
  currentPage: number;
  pageSize: number;
}

const Orders = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [order, setOrder] = useState({})
  const profile: any = useAuth((s) => s.profile)
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("")

  const generateSerialNumber = (index: number, pageInfo: PaginationInfo): number => {
    const { currentPage, pageSize } = pageInfo;
    return (currentPage - 1) * pageSize + index + 1;
  };

  const { data: allOrders, isLoading, refetch } = useFetchWithParams(
    ["query-all-orders", {
      page: currentPage, limit: pageSize, search, platform: profile.whiteLabelName
    }],
    OrderService.getOrders,
    {
      onSuccess: (data: any) => {
        // console.log(data.data);
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )

  console.log(allOrders && allOrders.result.results)

  useEffect(() => {
    refetch()
  }, [])

  const handlePageSize = (val: any) => {
    setPageSize(val);
    // setFilterParams({ ...filterParams, pageSize: val });
  };

  const handleCurrentPage = (val: any) => {
    setCurrentPage(val);
    // setFilterParams({ ...filterParams, pageNum: val - 1 });
  };

  const handleViewOrderInfo = (row: any) => {
    setOrder(row)
    setIsViewModalOpen(true);
  }

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const timeline = ["All", "Last Month", "This Month"]

  return (
    <div className='px-4 pt-8 h-full flex flex-col '>
      <div className='bg-white rounded-md h-auto w-full p-8 flex flex-col'>
        <BreadCrumbClient backText="Dashboard" currentPath="Orders & Transaction" brand='Landmark' />
        <div className='flex justify-start bg-red-flex-wrap gap-8 w-full py-8'>
          <InfoCard header="Total Orders" value="0" iconName='3dcube' className='flex flex-col justify-between' timeline={timeline} />
          <InfoCard header="Pending Orders" value="0" iconName='clock' className='flex flex-col justify-between' timeline={timeline} />
          <InfoCard header="Completed Orders" value="0" iconName='ic_deals' className='flex flex-col justify-between' timeline={timeline} />
        </div>
        <div className='flex justify-between'>
          <h1 className='text-primary-text text-sm font-normal'>All Orders <span className='ml-2 bg-[#EEEFF0] py-1 px-2 rounded-full font-medium text-black'>{ }</span></h1>
          <div>
          </div>
          <div>
            <SearchInput onClear={() => setSearch("")} value={search} onChange={(e: any) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }} placeholder='Search' />
          </div>
        </div>

        <div className='h-auto flex-grow '>

          {
            allOrders ? <Table data={allOrders && allOrders.result.results}
              emptyMessage={
                <div className='h-full flex-grow flex flex-col justify-center items-center'>
                  <img src='/images/no_transaction_history.svg' alt='No Order Completed yet' />
                  <p className='text-center text-xl mt-4 font-medium font-satoshiMedium text-primary-text'>“You currently have no transaction or order records to display."</p>
                </div>
              }
              hideActionName={true}
              rowActions={(row: any) => [
                {
                  name: "View Order Details",
                  action: () => {
                    handleViewOrderInfo(row)
                  },
                },

              ]}
              columns={[
                {
                  header: "S/N",
                  view: (row: any, id) => <div className="pc-text-blue">{generateSerialNumber(id, {
                    currentPage,
                    pageSize
                  })}</div>
                },
                {
                  header: "Order Id",
                  view: (row: any) => <div>{row.orderReference}</div>,
                },
                {
                  header: "Amount",
                  view: (row: any) => <div>
                    {formatAmount(row.totalPrice)}</div>,
                },
                {
                  header: "Date",
                  view: (row: any) => <div>{fDateTime(row.orderedAt)}</div>,
                },
                {
                  header: "Status",
                  view: (row: any) => <Label status={row?.status} />,
                },

              ]}
              loading={isLoading}
              pagination={
                {
                  page: currentPage,
                  pageSize: pageSize,
                  totalRows: allOrders?.result.totalPages,
                  setPageSize: handlePageSize,
                  setPage: handleCurrentPage
                }
              }

            /> : <div className='h-full flex-grow flex flex-col justify-center items-center'>
              <img src='/images/no_transaction_history.svg' alt='No Order Completed yet' />
              <p className='text-center text-xl mt-4 font-medium font-satoshiMedium text-primary-text'>“You currently have no transaction or order records to display."</p>
            </div>
          }


          <OrderModal isOpen={isViewModalOpen} order={order} closeViewModal={closeViewModal} />

        </div>


      </div>
    </div>
  )
}

export default Orders



const Label = ({ status }: any) => {
  return (
    <p className={`text-sm font-semibold py-1 px-2 text-center rounded ${(status === "pending" || status === "NEW") && "text-[#865503] bg-[#FEF6E7]"} ${status === "delivered" && "text-[#036B26] bg-[#E7F6EC]"} ${status === "cancelled" && "text-red-600 bg-red-200"} `}>{status}</p>
  )
}

const OrderModal = ({ order, closeViewModal, isOpen, }: any) => {
  console.log(order)
  return (
    <Modal isOpen={isOpen} closeModal={closeViewModal} containerStyle="w-[90%] h-auto overflow-y-auto mt-4 flex flex-col gap-8 max-h-[80%]  sm:w-full max-w-[650px]">
      <div className='bg-primary px-4 py-2 rounded-t-md flex justify-between items-center'>
        <div>
          <h1 className='text-white text-base font-medium font-satoshiMedium'>Order Details</h1>
          <p className='text-white text-sm font-bold mt-1 font-satoshiBold'>{order.orderReference}</p>
        </div>
        <Label status={order?.status} />
      </div>
      <div className='sm:p-2 flex flex-col gap-4'>
        <div className='flex justify-between w-full'>
          <div className='flex gap-2'>
            <img alt='Customer Name' src='/icons/profile-2user.svg' />
            <div className=''>
              <p className='text-[#4D5154] text-base whitespace-nowrap  font-medium font-sashoshiMedium'> Customer Name</p>
              <p className='text-[#2B2C34] text-base font-medium font-sashoshiMedium'>{order?.delivery_name}</p>
            </div>

          </div>
          <CopyToClipboard text={order?.delivery_name} />
        </div>
        <div className='flex justify-between w-full'>
          <div className='flex gap-2'>
            <img alt='Customer Phone Number' src='/icons/call.svg' />
            <div>
              <p className='text-[#4D5154] text-base whitespace-nowrap font-medium font-sashoshiMedium'> Customer Phone Number</p>
              <p className='text-[#2B2C34] text-base font-medium font-sashoshiMedium'>{order?.phone}</p>
            </div>

          </div>
          <CopyToClipboard text={order?.phone} />
        </div>
        <div className='flex justify-between w-full'>
          <div className='flex gap-2'>
            <img alt='Date of Order' src='/icons/calendar-2.svg' />
            <div>
              <p className='text-[#4D5154] whitespace-nowrap text-base font-medium font-sashoshiMedium'>Date of order</p>
              <p className='text-[#2B2C34] whitespace-nowrap text-sm font-medium font-sashoshiMedium'>{order?.orderedAt && fDateTime(order?.orderedAt)}</p>
            </div>

          </div>
          <CopyToClipboard text={order?.orderedAt} />
        </div>
        <div className='flex justify-between w-full'>
          <div className='flex gap-2'>
            <img alt='Number of Items' src='/icons/note.svg' />
            <div>
              <p className='text-[#4D5154] text-base whitespace-nowrap font-medium font-sashoshiMedium'>NO. OF ITEMS</p>
              <p className='text-[#2B2C34] text-base font-medium font-sashoshiMedium'>{order?.products && order?.products.length}</p>
            </div>

          </div>
          <CopyToClipboard text={order?.quantity} />
        </div>
        <div className='flex justify-between w-full'>
          <div className='flex gap-2'>
            <img alt='Order Amount' src='/icons/moneys.svg' />
            <div>
              <p className='text-[#4D5154] text-base font-medium font-sashoshiMedium'>Amount</p>
              <p className='text-[#2B2C34] text-sm font-medium font-sashoshiMedium'>{order?.totalPrice && formatAmount(order?.totalPrice)}</p>
            </div>

          </div>
          <CopyToClipboard text={order?.amount} />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='bg-foundation-lightPurple px-4 py-2 rounded-t-md flex justify-between items-center'>
          <div>
            <h1 className='text-primary-subtext text-base font-medium font-satoshiMedium'>ITEMS IN THE ORDER</h1>
            <p className='text-primary-text text-sm font-bold mt-1 font-satoshiBold'>{order.OrderId}</p>
          </div>
          <p className='bg-red-700 text-white rounded-full h-8  w-8 text-sm flex justify-center items-center'>{order?.productInfo?.length}</p>
        </div>
        {
          order.productInfo && order.productInfo.map((product: any, index: number) => (
            <div key={index} className='flex flex-col gap-2'>
              <p className='text-primary-text text-sm font-bold mt-1 font-satoshiBold'>{product.productId}</p>
              <ProductDetail product={product} />

            </div>
          ))
        }

      </div>

      <div className='bg-primary px-4 py-2 rounded-md flex flex-col  justify-between'>
        <h2 className='text-white text-base font-medium font-satoshiMedium'>Delivery Information</h2>
        <div className='flex gap-2 items-center'>
          <img alt='Delivery Method' src='/icons/truck-time-white.svg' />
          <p className='text-white text-sm font-medium mt-1 font-satoshiRegular'>{order.deliveryMethod} Delivery</p>
        </div>
        <p className='text-white text-sm font-normal mt-1 font-satoshiRegular'>{order?.customerInfo?.address}</p>

      </div>

    </Modal>
  )
}


const ProductDetail = ({ product }: any) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2'>
      <div className='col-span-1'>
        <img alt='Product' src="/images/BagPack.png" />
      </div>
      <div className='col-span-1 flex flex-col gap-2'>
        <p className='text-primary-subtext font-normal text-sm'>
          {product.description}
        </p>
        <div>
          <p className='text-primary-subtext text-sm font-bold mt-1 font-satoshiBold'>Quantity: {product.quantity}</p>
          <p className='text-primary-subtext text-sm font-bold mt-1 font-satoshiBold'>Price: {product.price}</p>
        </div>
        <p className='text-primary text-sm font-bold mt-1 font-satoshiBold'>{product.vendor}</p>


      </div>

    </div>
  )
}


