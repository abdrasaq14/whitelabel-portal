import React, { useState } from 'react';
import { BreadCrumbClient } from '../../../components/Breadcrumb';
import SearchInput from '../../../components/FormInputs/SearchInput';
import { Table } from '../../../components/Table/Table2';
import { Label } from '../../../components/Label/Label';
import Filter from '../../../components/Filter/Filter'
import { useNavigate } from 'react-router-dom';
import { MdFilterList } from 'react-icons/md';
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import { MerchantService } from '../../../services/merchant.service';
import StarRating from '../../../components/Rating.tsx';
import { useAuth } from '../../../zustand/auth.store';

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
interface PaginationInfo {
  currentPage: number;
  pageSize: number;
}

// console.log(mockData);


const AllMerchants = () => {
  const navigate = useNavigate()
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("")
  const profile: any = useAuth((s) => s.profile)


  console.log(profile)

  const getStatusById = (arr:any, id:string) => {
    const item = arr.find((element:any)  => element.platform == id);
    return item && item.status;
  }


  const { data: allMerchants, isLoading } = useFetchWithParams(
    ["query-all-merchants", {
      page: currentPage, limit: pageSize, search, whiteLabelName: profile.whiteLabelName
    }],
    MerchantService.getallMerchants,
    {
      onSuccess: (data: any) => {
        // console.log(data.data);
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )

  const generateSerialNumber = (index: number, pageInfo: PaginationInfo): number => {
    const { currentPage, pageSize } = pageInfo;
    return (currentPage - 1) * pageSize + index + 1;
  };

  const handlePageSize = (val: any) => {
    setPageSize(val);
    // setFilterParams({ ...filterParams, pageSize: val });
  };

  const handleCurrentPage = (val: any) => {
    setCurrentPage(val);
    // setFilterParams({ ...filterParams, pageNum: val - 1 });
  };

  // console.log(allMerchants)
  return (
    <div className='px-4 pt-8 h-full'>
      <Filter onClose={() => setShowFilter(false)} open={showFilter} />
      <div className='bg-white rounded-md h-auto w-full p-8 flex flex-col'>
        <BreadCrumbClient backText="Dashboard" currentPath="All Merchants" brand='Landmark' />
        <div className='flex justify-between'>
          <h1 className='text-primary-text text-sm font-normal'>All Merchants <span className='ml-2 bg-[#EEEFF0] py-1 px-2 rounded-full font-medium text-black'>{allMerchants ? allMerchants?.result.totalResults : 0}</span></h1>
          <div className='flex mt-6 justify-center gap-2 ml-auto items-center'>
            <div>
              <SearchInput onClear={() => {
                setSearch("")
                setCurrentPage(1)
              }
              } value={search} onChange={(e: any) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }} placeholder='Search' />
            </div>
            <button onClick={() => setShowFilter(true)} className='px-3 py-2 border border-primary rounded text-sm flex items-center gap-2'><MdFilterList /> Filter</button>
          </div>
        </div>


        {
       allMerchants &&  allMerchants.result.results.length > 0 ? (
            <div className='h-full flex-grow '>
              <Table data={allMerchants && allMerchants.result.results}
                clickRowAction={(e: any) => navigate(`../merchant/profile/${e.id}`)}
                // onSelectRows={(e: any) => { console.log(e) }}
                hideActionName={true}

                // rowActions={(row) => [
                //   {
                //     name: "View Hub",
                //     action: () => { },
                //   },
                //   {
                //     name: "Do Something",
                //     action: () => { },
                //   },
                // ]}
                columns={[
                  {
                    header: "S/N",
                    view: (row: any, i) => <div className="pc-text-blue">{generateSerialNumber(i, {
                      currentPage: 1,
                      pageSize: 100
                    })}</div>
                  },
                  {
                    header: "STORE NAME",
                    view: (row: any) => <div>{row.businessName}</div>,
                  },
                  {
                    header: "CUSTORMER RATING",
                    view: (row: any) => <StarRating totalRatings={4} />,
                  },
                  {
                    header: "CATEGORY",
                    view: (row: any) => <div>{row?.category}</div>,
                  },
                  {
                    header: "Location",
                    view: (row: any) => <div>{row.country}</div>,
                  },
                  {
                    header: "STATUS",
                    view: (row: any) => <Label variant={(getStatusById(row?.platformAccess, profile.whiteLabelName.toUpperCase())) === "active" ? "success" : "danger"} >{row  && (getStatusById(row?.platformAccess, profile.whiteLabelName.toUpperCase()))} </Label>,
                  }
                ]}
                loading={isLoading}
                pagination={
                  {
                    page: currentPage,
                    pageSize: pageSize,
                    totalRows: allMerchants?.result.totalPages,
                    setPageSize: handlePageSize,
                    setPage: handleCurrentPage
                  }

                }
              />


            </div>
          )
            : (
              <div className='h-auto flex-grow flex justify-center flex-col items-center'>
                <img src='/images/NoVendor.svg' alt='No Product Found' />
                <p className='font-normal text-primary-text text-sm '>All merchants you onboard will be displayed here. Add a vendor to your marketplace now to get started.</p>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default AllMerchants