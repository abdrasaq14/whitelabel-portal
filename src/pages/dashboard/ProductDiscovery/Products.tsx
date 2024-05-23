import React, { useEffect, useState } from 'react'
import { mockProductList } from '../../../utils/ProductList'
import { Table } from '../../../components/Table/Table2'
import StarRating from '../../../components/Rating.tsx';
import { ViewProductModal, ViewProductDiscoveryModal } from '../../../components/Modal/ProductModal';
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import { MerchantService } from '../../../services/merchant.service';
import { ProductService } from '../../../services/product.service';


interface PaginationInfo {
  currentPage: number;
  pageSize: number;
}


const Products = () => {
  const [product, setProduct] = useState<any>({})
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const generateSerialNumber = (index: number, pageInfo: PaginationInfo): number => {
    const { currentPage, pageSize } = pageInfo;
    return (currentPage - 1) * pageSize + index + 1;
  };


  const { data: allProducts, isLoading, refetch } = useFetchWithParams(
    ["query-all-products-discovery", {
      page: currentPage, limit: pageSize
    }],
    ProductService.getProductDiscovery,
    {
      onSuccess: (data: any) => {
        // console.log(data.data);
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )

  // console.log(allMerchants && allMerchants.result.results)


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


  const handleProductInfoModal = (row: any) => {
    setProduct(row)
    setIsViewModalOpen(true);
  }
  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  return (
    <div className='h-full flex-grow'>
      <div className='h-full flex-grow '>
        <Table data={allProducts?.result?.results && allProducts.result.results}
          emptyMessage={
            <div className='h-auto flex-grow flex justify-center flex-col items-center'>
              <img src='/images/NoVendor.svg' alt='No Product Found' />
              <p className='font-normal text-primary-text text-sm sm:text-xl'>No merchants are currently available to sell on your platform.</p>
            </div>
          }
          hideActionName={true}
          clickRowAction={(row) => handleProductInfoModal(row)}
          rowActions={(row) => [

            {
              name: "View Details",
              action: () => { handleProductInfoModal(row) },
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
              header: "Product ID",
              view: (row: any) => <div>{row.id}</div>,
            },
            {
              header: "Customer Rating",
              view: (row: any) => <StarRating totalRatings={5} />,
            },
            {
              header: "Category",
              view: (row: any) => <Categories categories={row.categories} />,
            },
            {
              header: "Listing Price",
              view: (row: any) => <div>{row.price} </div>,
            },
            {
              header: "Country",
              view: (row: any) => <div>{row.location}</div>,
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

        />
        <ViewProductDiscoveryModal isOpen={isViewModalOpen} product={product} closeViewModal={closeViewModal} />

      </div>

    </div>
  )
}

export default Products

interface Props {
  categories: any;
}

const Categories: React.FC<Props> = ({ categories }) => {
  return (
    <div className='flex flex-nowrap items-center gap-1'>
      {categories && categories.map((category:any, index:number) => (
        <div className='flex flex-nowrap items-center gap-1' key={index}>
          <p>{category?.title}</p>
          {index !== (categories.length - 1) && "|"} 
        </div>
      ))}
    </div>
  );
};