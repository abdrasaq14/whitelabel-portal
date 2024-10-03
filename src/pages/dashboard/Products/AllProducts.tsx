import React, { useEffect, useState } from 'react'
import SearchInput from '../../../components/FormInputs/SearchInput'
import { BreadCrumbClient } from '../../../components/Breadcrumb'
// import { mockProductList } from '../../../utils/ProductList'
import { Table } from '../../../components/Table/Table2'
import { ViewProductModal } from '../../../components/Modal/ProductModal'
import { MdFilterList } from "react-icons/md";
import Filter from '../../../components/Filter/Filter'
import useFetchWithParams from '../../../hooks/useFetchWithParams'
import { ProductService } from '../../../services/product.service'
import { useAuth } from '../../../zustand/auth.store'
import { fDateTime } from '../../../utils/formatTime'


interface PaginationInfo {
  currentPage: number;
  pageSize: number;
}


const AllProducts = () => {
  const [product, setProduct] = useState({})
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [search, setSearch] = useState("")
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const profile: any = useAuth((s) => s.profile)

  const handleViewProductInfo = (row: any) => {
    setProduct(row)
    setIsViewModalOpen(true);
    console.log(row, 'row')
  }
  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const { data: allProducts, isLoading, refetch } = useFetchWithParams(
    ["query-all-products", {
      page: currentPage, limit: pageSize, search, whiteLabelName: profile.whiteLabelName
    }],
    ProductService.getallProducts,
    {
      onSuccess: (data: any) => {
        // console.log(data.data);
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )


  useEffect(() => {
    // refetch()
  }, [])

  const handlePageSize = (val: any) => {
    setPageSize(val);
    // setFilterParams({ ...filterParams, pageSize: val });
  };

  const handleCurrentPage = (val: any) => {
    setCurrentPage(val);
    // setFilterParams({ ...filterParams, pageNum: val - 1 });
  };

  const generateSerialNumber = (index: number, pageInfo: PaginationInfo): number => {
    const { currentPage, pageSize } = pageInfo;
    return (currentPage - 1) * pageSize + index + 1;
  };

  return (
    <div className='px-4 pt-8 h-full'>
      <Filter onClose={() => setShowFilter(false)} open={showFilter} />
      <div className='bg-white rounded-md h-auto w-full p-8 flex flex-col'>
        <BreadCrumbClient backText="Dashboard" currentPath="All Products" brand='Landmark' />
        <div className='flex justify-between'>
          <h1 className='text-primary-text text-sm font-normal'>All Products <span className='ml-2 bg-[#EEEFF0] py-1 px-2 rounded-full font-medium text-black'>{allProducts ? allProducts.result.totalResults : 0}</span></h1>

        </div>
        <div className='flex mt-6 justify-center gap-2 ml-auto items-center'>
          <div>
            <SearchInput onClear={() => setSearch("")} value={search} onChange={(e: any) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }} placeholder='Search' />
          </div>
          <button onClick={() => setShowFilter(true)} className='px-3 py-2 border border-primary rounded text-sm flex items-center gap-2'><MdFilterList /> Filter</button>
        </div>
        <div className='h-full flex-grow '>
          {
            allProducts ? <Table data={allProducts && allProducts.result.results}
              hideActionName={true}
              emptyMessage={<div className='h-full flex-grow flex justify-center items-center'>
                <img src='/images/NoProduct.svg' alt='No Product Found' />
                <p className='text-center'>You have no products listed on your marketplace yet. Browse through our product directory to start listing products now!</p>
              </div>}
              rowActions={(row) => [
                {
                  name: "View Product",
                  action: () => {
                    handleViewProductInfo(row)
                  },
                },
                // {
                //   name: "Ban product",
                //   action: () => {
                //     handleViewProductInfo(row)
                //   },
                // },
                // {
                //   name: "View Seller",
                //   action: () => {
                //     handleViewProductInfo(row)
                //   },
                // },
              ]}
              columns={[
                {
                  header: "S/N",
                  view: (row: any, id) => <div className="pc-text-blue">{generateSerialNumber(id, {
                    currentPage,
                    pageSize
                  })}</div>
                },
                // {
                //   header: "Product Id",
                //   view: (row: any) => <div className='flex items-center gap-3'><img alt="row-img" src={row.image ?? ""} className='h-10 w-10 object-contain' />{row.productIdOnProfitAll}</div>,
                // },
                {
                  header: "Merchant",
                  view: (row: any) => <div>{row.merchantName}</div>,
                },
                {
                  header: "Product Name",
                  view: (row: any) => <div className='whitespace-wrap text-wrap text-ellipsis !whitespace-normal min-w-[300px]' >{row?.name} </div>,
                },
                {
                  header: "Date Listed",
                  view: (row: any) => <div>{row.createdAt && fDateTime(row.createdAt)}</div>,
                },

              ]}
              loading={isLoading}
              pagination={
                {
                  page: currentPage,
                  pageSize: pageSize,
                  totalRows: allProducts?.result.totalResults,
                  setPageSize: handlePageSize,
                  setPage: handleCurrentPage
                }
              }

            /> : <div className='h-auto flex-grow flex justify-center flex-col items-center'>
              <img src='/images/NoProduct.svg' alt='No Product Found' />
              <p className='font-normal text-primary-text text-center text-sm'>You have no products listed on your marketplace yet. Browse through our product directory to start listing products now!</p>
            </div>
          }

          <ViewProductModal isOpen={isViewModalOpen} product={product} refetch={refetch} closeViewModal={closeViewModal} />

        </div>
      </div>
    </div>
  )
}

export default AllProducts