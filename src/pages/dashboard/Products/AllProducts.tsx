import React, { useEffect, useState } from 'react'
import SearchInput from '../../../components/FormInputs/SearchInput'
import { BreadCrumbClient } from '../../../components/Breadcrumb'
import { mockProductList } from '../../../utils/ProductList'
import { Table } from '../../../components/Table/Table2'
import { ViewProductModal } from '../../../components/Modal/ProductModal'
import { MdFilterList } from "react-icons/md";
import Filter from '../../../components/Filter/Filter'
import useFetchWithParams from '../../../hooks/useFetchWithParams'
import { ProductService } from '../../../services/product.service'


interface PaginationInfo {
  currentPage: number;
  pageSize: number;
}


const AllProducts = () => {
  const [product, setProduct] = useState({})
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleViewProductInfo = (row: any) => {
    setProduct(row)
    setIsViewModalOpen(true);
    console.log(row, 'row')
  }
  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const { data: allProducts, isLoading } = useFetchWithParams(
    ["query-all-merchants", {
     whiteLabelName: "landmark"
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
 },[])

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
        <BreadCrumbClient backText="Dashboard" currentPath="All Products" brand='Jumia' />
        <div className='flex justify-between'>
          <h1 className='text-primary-text text-sm font-normal'>All Products <span className='ml-2 bg-[#EEEFF0] py-1 px-2 rounded-full font-medium text-black'>{mockProductList.data.length}</span></h1>

        </div>
        <div className='flex mt-6 justify-center gap-2 ml-auto items-center'>
          <div>
            <SearchInput placeholder='Search' />
          </div>
          <button onClick={() => setShowFilter(true)} className='px-3 py-2 border border-primary rounded text-sm flex items-center gap-2'><MdFilterList /> Filter</button>
        </div>
        {
          mockProductList.data.length > 0 ? (
            <div className='h-full flex-grow '>
              <Table data={allProducts && allProducts.result.results}
                hideActionName={true}
                rowActions={(row) => [
                  {
                    name: "View Product",
                    action: () => {
                      handleViewProductInfo(row)
                    },
                  },
                  {
                    name: "Ban product",
                    action: () => {
                      handleViewProductInfo(row)
                    },
                  },
                  {
                    name: "View Seller",
                    action: () => {
                      handleViewProductInfo(row)
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
                    header: "Product Id",
                    view: (row: any) => <div>{row._id}</div>,
                  },
                  {
                    header: "Merchant",
                    view: (row: any) => <div>{row.merchant}</div>,
                  },
                  {
                    header: "Category",
                    view: (row: any) => <div >{row?.category} </div>,
                  },
                  {
                    header: "Date Listed",
                    view: (row: any) => <div>{row.dateListed}</div>,
                  },

                ]}
                loading={isLoading}
                pagination={mockProductList.pagination}

              />
              <ViewProductModal isOpen={isViewModalOpen} product={product} closeViewModal={closeViewModal} />

            </div>
          )
            : (
              <div className='h-full flex-grow flex justify-center items-center'>
                <img src='/images/NoProduct.svg' alt='No Product Found' />
              </div>
            )
        }
      </div>
    </div>
  )
}

export default AllProducts