import React, { useState } from 'react'
import SearchInput from '../../../components/FormInputs/SearchInput'
import { BreadCrumbClient } from '../../../components/Breadcrumb'
import { mockProductList } from '../../../utils/ProductList'
import { Table } from '../../../components/Table/Table2'
import { ViewProductModal } from '../../../components/Modal/ProductModal'
import { MdFilterList } from "react-icons/md";
import Filter from '../../../components/Filter/Filter'




const AllProducts = () => {
  const [product, setProduct] = useState({})
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [showFilter, setShowFilter] = useState<boolean>(false)

  const handleViewProductInfo = (row: any) => {
    setProduct(row)
    setIsViewModalOpen(true);
    console.log(row, 'row')
  }
  const closeViewModal = () => {
    setIsViewModalOpen(false);
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
              <Table data={mockProductList?.data}
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
                    view: (row: any) => <div className="pc-text-blue">{row.serialNumber}</div>
                  },
                  {
                    header: "Product Id",
                    view: (row: any) => <div>{row.productId}</div>,
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
                loading={false}
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