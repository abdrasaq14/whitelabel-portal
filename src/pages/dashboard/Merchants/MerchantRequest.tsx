import React, { useState } from 'react'
import SearchInput from '../../../components/FormInputs/SearchInput'
import { BreadCrumbClient } from '../../../components/Breadcrumb'
import { MdFilterList } from 'react-icons/md';
import Filter from '../../../components/Filter/Filter'
import { Paginator } from '../../../components/Table/Paginator';
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import { MerchantService } from '../../../services/merchant.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../zustand/auth.store';
import { useMutation } from 'react-query';
import { Button } from '../../../components/Blog/Button';
import toast from 'react-hot-toast';
import { handleError } from '../../../utils/Helpfunctions';
import Spinner from '../../../components/spinner/Spinner';
import { isEmpty } from '../../../utils/functions';

const MerchantRequest = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const profile: any = useAuth((s) => s.profile)
  const [filterParams, setFilterParams] = useState<any>({})

  const { data: allRequest, isLoading } = useFetchWithParams(
    ["query-all-merchants-request", {
      page: currentPage,
      limit: pageSize,
      status: "pending",
      whiteLabelId: profile._id

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
  // console.log(allRequest)

  const handlePageSize = (val: any) => {
    setPageSize(val);
    // setFilterParams({ ...filterParams, pageSize: val });
  };

  const handleCurrentPage = (val: any) => {
    setCurrentPage(val);
    // setFilterParams({ ...filterParams, pageNum: val - 1 });
  };

  return (
    <div className='px-4 pt-8 h-full'>
            <Filter isLoading={isLoading} type='merchant' onFilter={(e: any) => setFilterParams(e)} onClose={() => {
        setShowFilter(false)
        setFilterParams({})
      }} open={showFilter} />
      <div className='bg-white rounded-md h-auto w-full p-8 flex flex-col'>
        <BreadCrumbClient backText="Dashboard" currentPath="Merchant Request" brand='Landmark' />
        <div className='flex justify-between'>
          <h1 className='text-primary-text text-sm font-normal'>Merchants Request <span className='ml-2 bg-[#EEEFF0] py-1 px-2 rounded-full font-medium text-black'>{allRequest ? allRequest?.result.totalResults : 0}</span></h1>
          <div className='flex mt-6 justify-center gap-2 ml-auto items-center'>
            <div>
              <SearchInput placeholder='Search' onChange={() => { }} />
            </div>
            <button onClick={() => setShowFilter(true)} className='px-3 py-2 border border-primary rounded text-sm flex items-center gap-2'><MdFilterList /> Filter</button>
          </div>
        </div>

        {
          allRequest ? <div className='py-4'>

            {
              allRequest && allRequest.result.results.map((items: any, index: number) => <Request items={items} key={index} />)
            }

            {/* <Request />
          <Request /> */}

            <div className='flex items-center justify-center'>
              <Paginator setPage={handleCurrentPage} loading={isLoading} currentLength={allRequest && allRequest.result.length} totalRows={1} page={currentPage} pageSize={pageSize} />
            </div>

          </div> :
            <div className='w-full h-[60vh] flex flex-col   items-center justify-center'>
              {
                isLoading ? <Spinner color='#000' /> : <>
                  <img src='/images/NoVendor.svg' alt='No Product Found' />
                  <h3 className='font-normal max-w-[539px] text-[#4D5154] text-center text-sm'> { isEmpty(filterParams) ?"You have no active vendor requests. Browse through our merchant discovery to onboard and list a product on your marketplace now." : "No search result found"}
                  </h3>
                </>
              }




            </div>
        }





      </div>
    </div>
  )
}

const Request = ({ items }: { items: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const updateRequest = useMutation(
    async (payload: { id: string, action: string }) => {
      setIsLoading(true);
      return await MerchantService.updateMerchantRequest(payload.id, { status: payload.action });
    },
    {
      onSuccess: (response) => {
        setIsLoading(false);
        console.log("response", response);
        toast.success("Request updated successfully");
      },
      onError: (error) => {
        setIsLoading(false);
        const e = handleError(error);
        toast.error(e);
        console.log("erro", error);
      }
    }
  );
  return (
    <div className='w-full flex items-center justify-between'>
      <div className='flex items-center gap-2 '>
        <div>
          <img src='/avatar.png' />
        </div>
        <div className='px-3 py-6'>
          <h3 className='font-medium'>{items.merchant.merchantName}</h3>
          {/* <h3 className='font-normal'>Fashion & Clothing | Arts | Books</h3>
          <span className='text-sm flex items-center gap-1 font-medium'><img src='/icons/location.svg' /> Abuja, Nigeria</span> */}

        </div>

      </div>
      <div className='flex gap-3'>
        <Button
          isLoading={isLoading}
          label="Decline"
          onClick={() => updateRequest.mutate({ id: items._id, action: "reject" })}
          className={`font-medium text-[#D42620]`}
        />
        <Button
          isLoading={isLoading}
          label="Accept"
          onClick={() => updateRequest.mutate({ id: items._id, action: "accept" })}
          className={`px-3 py-2 bg-[#0F973D] text-white rounded font-medium w-[140px] `}
        />
        {/* <button className='font-medium text-[#D42620]'>Decline</button>
        <button className='px-3 py-2 bg-[#0F973D] text-white rounded font-medium w-[140px] '>Accept</button> */}
        <button onClick={() => navigate(`/merchant/profile/${items.merchant.merchantId}`)} className='px-3 py-2 border border-primary rounded font-medium w-[140px] '>View Account</button>

      </div>
    </div>
  )
}

export default MerchantRequest