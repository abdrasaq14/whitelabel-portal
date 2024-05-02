import React, { useState } from 'react'
import SearchInput from '../../../components/FormInputs/SearchInput'
import { BreadCrumbClient } from '../../../components/Breadcrumb'
import { MdFilterList } from 'react-icons/md';
import Filter from '../../../components/Filter/Filter'
import { Paginator } from '../../../components/Table/Paginator';
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import { MerchantService } from '../../../services/merchant.service';

const MerchantRequest = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const { data: allRequest, isLoading } = useFetchWithParams(
    ["query-all-merchants-request", {

    }],
    MerchantService.getMerchantRequest,
    {
      onSuccess: (data: any) => {
        // console.log(data.data);
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )
  console.log(allRequest)
  return (
    <div className='px-4 pt-8 h-full'>
      <Filter onClose={() => setShowFilter(false)} open={showFilter} />
      <div className='bg-white rounded-md h-auto w-full p-8 flex flex-col'>
        <BreadCrumbClient backText="Dashboard" currentPath="Merchant Request" brand='Jumia' />
        <div className='flex justify-between'>
          <h1 className='text-primary-text text-sm font-normal'>Merchants Request <span className='ml-2 bg-[#EEEFF0] py-1 px-2 rounded-full font-medium text-black'>{1}</span></h1>
          <div className='flex mt-6 justify-center gap-2 ml-auto items-center'>
            <div>
              <SearchInput placeholder='Search' />
            </div>
            <button onClick={() => setShowFilter(true)} className='px-3 py-2 border border-primary rounded text-sm flex items-center gap-2'><MdFilterList /> Filter</button>
          </div>
        </div>

        <div>
          
          {/* {
            allRequest && allRequest[0] && allRequest[0].members.map((items: any) => <Request items={items} />)
          } */}

          <Request />
          <Request />

          <div className='flex items-center justify-center'>
            <Paginator loading={false} currentLength={10} totalRows={100} page={1} pageSize={10} />
          </div>

        </div>



      </div>
    </div>
  )
}

const Request = () => {

  return (
    <div className='w-full flex items-center justify-between'>
      <div className='flex items-center gap-2 '>
        <div>
          <img src='/avatar.png' />
        </div>
        <div className='px-3 py-6'>
          <h3 className='font-medium'>Ese Monday</h3>
          <h3 className='font-normal'>Fashion & Clothing | Arts | Books</h3>
          <span className='text-sm flex items-center gap-1 font-medium'><img src='/icons/location.svg' /> Abuja, Nigeria</span>

        </div>

      </div>
      <div className='flex gap-3'>
        <button className='font-medium text-[#D42620]'>Decline</button>
        <button className='px-3 py-2 bg-[#0F973D] text-white rounded font-medium w-[140px] '>Accept</button>
        <button className='px-3 py-2 border border-primary rounded font-medium w-[140px] '>View Account</button>

      </div>
    </div>
  )
}

export default MerchantRequest