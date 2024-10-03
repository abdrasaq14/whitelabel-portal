import React, { useEffect, useState } from 'react'
import StarRating from '../../../components/Rating.tsx/index'
import { Table } from '../../../components/Table/Table2';
import { ViewAddMerchantModal } from '../../../components/Modal/MerchantModal';
import { MerchantService } from '../../../services/merchant.service';
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import SearchInput from '../../../components/FormInputs/SearchInput';
import { useAuth } from '../../../zustand/auth.store';
import Filter from '../../../components/Filter/Filter';
import { MdFilterList } from 'react-icons/md';
import Spinner from '../../../components/spinner/Spinner';




interface PaginationInfo {
  currentPage: number;
  pageSize: number;
}

const Merchants = () => {
  const [merchant, setMerchant] = useState<any>({})
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const profile: any = useAuth((s) => s.profile)
  const [search, setSearch] = useState("")
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterParams, setFilterParams] = useState<any>({})

  const generateSerialNumber = (index: number, pageInfo: PaginationInfo): number => {
    const { currentPage, pageSize } = pageInfo;
    return (currentPage - 1) * pageSize + index + 1;
  };


  const { data: allMerchants, isLoading, refetch } = useFetchWithParams(
    ["query-all-merchants-discovery", {
      page: currentPage, limit: pageSize, search, whiteLabelName: profile.whiteLabelName, location: filterParams.location, sortBy: filterParams.sortBy
    }],
    MerchantService.getMerchantDiscovery,
    {
      onSuccess: (data: any) => {
        // console.log(data.data);
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )

  console.log("allMerchants", allMerchants && allMerchants.result.results)


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


  const handleMerchantInfoModal = (row: any) => {
    setMerchant(row)
    setIsViewModalOpen(true);
  }
  return (
    <div className='h-full flex-grow'>

      <div className='h-full flex-grow '>
        <div className='flex justify-between items-center'>
          <div >
            <SearchInput onClear={() => setSearch("")} value={search} onChange={(e: any) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }} className='w-[200px]' placeholder='Search for merchant' />
          </div>
          {
            allMerchants && (
              <button onClick={() => setShowFilter(true)} className='px-3 py-2 border border-primary rounded text-sm flex items-center gap-2'><MdFilterList /> Filter</button>

            )
          }
          <Filter isLoading={isLoading} type='merchant' onFilter={(e: any) => setFilterParams(e)} onClose={() => {
            setShowFilter(false)
            setFilterParams({})
          }} open={showFilter} />
        </div>

        {
          allMerchants ? <Table data={allMerchants?.result?.results && allMerchants.result.results.filter((merchant: any) => merchant.location && merchant.location.state !== "State not found")}
            emptyMessage={<div className='h-auto flex-grow flex justify-center flex-col items-center'>
              <img src='/images/NoVendor.svg' alt='No Product Found' />
              <p className='font-normal text-primary-text text-sm sm:text-xl'>No merchants are currently available to sell on your platform.</p>
            </div>}
            hideActionName={true}
            clickRowAction={(row) => handleMerchantInfoModal(row)}
            rowActions={(row) => [

              {
                name: "View Details",
                action: () => { handleMerchantInfoModal(row) },
              },
            ]}
            columns={[
              {
                header: "S/N",
                view: (row: any, id: number) => <div className="pc-text-blue">{generateSerialNumber(id, {
                  currentPage,
                  pageSize
                })}</div>
              },
              {
                header: "Store Name",
                view: (row: any) => <div>{row.businessName}</div>,
              },
              {
                header: "Customer Rating",
                view: (row: any) => <StarRating totalRatings={5} />,
              },
              // {
              //   header: "Category",
              //   view: (row: any) => row?.category,
              // },
              {
                header: "Location",

                view: (row: any) => <div>{row?.location?.state && row?.location.state !== "State not found" ? `${row?.location?.state} state` : <span className='text-gray-400 italic'>Not available</span>}</div>,

              },

            ]}
            loading={isLoading}

            pagination={
              {
                page: currentPage,
                pageSize: pageSize,
                totalRows: allMerchants?.result.totalResults,
                setPageSize: handlePageSize,
                setPage: handleCurrentPage
              }

            }

          />
            : <div className='h-auto flex-grow py-20 flex justify-center flex-col items-center'>
              {
                isLoading ? <Spinner color='#000' /> : <>
                  <img src='/images/NoVendor.svg' className='max-w-[400px] h-auto' alt='No Product Found' />
                  <p className='font-normal max-w-[539px] text-[#4D5154] text-center text-sm'>No merchants are currently available to sell on your platform.</p>
                </>
              }

            </div>
        }


        <ViewAddMerchantModal isOpen={isViewModalOpen} merchant={merchant} closeViewModal={() => setIsViewModalOpen(false)} />

      </div>

    </div>
  )
}

export default Merchants


// interface Props {
//   categories: string[];
// }

// const Categories: React.FC<Props> = ({ categories }) => {
//   return (
//     <div className='flex gap-1'>
//       {categories.map((category, index) => (
//         <React.Fragment key={index}>
//           <p>{category}</p>
//           {index !== categories.length - 1 && <div className='border-r-[.0625rem] pr-1'></div>}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };
