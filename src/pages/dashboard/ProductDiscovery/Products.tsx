import React, { useEffect, useState } from 'react'
// import { mockProductList } from '../../../utils/ProductList'
import { Table } from '../../../components/Table/Table2'
import StarRating from '../../../components/Rating.tsx';
import { MdFilterList } from "react-icons/md";
import { ViewProductDiscoveryModal } from '../../../components/Modal/ProductModal';
import useFetchWithParams from '../../../hooks/useFetchWithParams';
// import { MerchantService } from '../../../services/merchant.service';
import { ProductService } from '../../../services/product.service';
import SearchInput from '../../../components/FormInputs/SearchInput';
import { formatAmount } from '../../../utils/Helpfunctions';
import { Button } from '../../../components/Button/Button';
import { useAuth } from '../../../zustand/auth.store';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import Filter from '../../../components/Filter/Filter';


interface PaginationInfo {
  currentPage: number;
  pageSize: number;
}


const Products = () => {
  const [product, setProduct] = useState<any>({})
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false)
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("")
  const profile: any = useAuth((s) => s.profile)
  const [selectedProducts, setSelectedProducts] = useState<any>([])

  const generateSerialNumber = (index: number, pageInfo: PaginationInfo): number => {
    const { currentPage, pageSize } = pageInfo;
    return (currentPage - 1) * pageSize + index + 1;
  };


  const { data: allProducts, isLoading, refetch } = useFetchWithParams(
    ["query-all-products-discovery", {
      page: currentPage, limit: pageSize, search,
      whiteLabelName: profile?.whiteLabelName
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
  })

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

  const AddProducts = useMutation(async () => {
    const formattedBody = selectedProducts.map((product: any) => ({
      product: {
        productId: product.id,
        productOwnerId: product.userId,
        productName: product.name
      },
      whiteLabelClient: {
        whiteLabelClientId: profile._id,
        email: profile.email,
        whiteLabelName: profile.whiteLabelName
      }
    }));
    console.log(formattedBody, "body")
    return await ProductService.sendProductRequest(formattedBody);
  },
    {
      onSuccess: () => {
        toast.success("request sent successfully")
        //    navigate(-1)
      },
      onError(error: any) {
        toast.error(error.response.data.message);

      },
    }
  )

  return (
    <div className='h-full flex-grow'>
      <Filter onClose={() => setShowFilter(false)} open={showFilter} />
      <div className='flex justify-between items-center'>
        <div >
          <SearchInput onClear={() => setSearch("")} value={search} onChange={(e: any) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }} className='w-[200px]' placeholder='Search for products' />
        </div>

        {
          allProducts && (
            (selectedProducts.length > 0) ? <Button disabled={AddProducts.isLoading} isLoading={AddProducts.isLoading} onClick={() => AddProducts.mutate()} label="Add selected products" className='px-3 py-2 whitespace-nowrap font-semibold border-primary  border text-sm rounded bg-primary ' /> : <button onClick={() => setShowFilter(true)} className='px-3 py-2 border border-primary rounded text-sm flex items-center gap-2'><MdFilterList /> Filter</button>

          )
        }
      </div>
      <div className='h-full flex-grow '>
        {
          allProducts ? <Table data={allProducts?.result?.results && allProducts.result.results}
            emptyMessage={
              <div className='h-auto flex-grow flex justify-center flex-col items-center'>
                <img src='/images/NoVendor.svg' alt='No Product Found' />
                <p className='font-normal text-primary-text text-sm sm:text-xl'>No merchants are currently available to sell on your platform.</p>
              </div>
            }
            onSelectRows={(row: any) => setSelectedProducts(Array.from(row.values()))}
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
              // {
              //   header: "Product Id",
              //   view: (row: any) => <div className='flex items-center gap-3'><img alt="row-img" src={row.image ?? ""} className='h-10 w-10 object-contain' />{row.id}</div>,
              // }, 
              {
                header: "Product Name",
                view: (row: any) => <div className='whitespace-wrap text-wrap text-ellipsis !whitespace-normal min-w-[300px]' >{row.name}</div>,
              },
              {
                header: "Category",
                view: (row: any) => <Categories categories={row.categories} />,
              },
              {
                header: "Product Rating",
                view: (row: any) => <StarRating totalRatings={5} />,
              },
              {
                header: "Listing Price",
                view: (row: any) => <div>{row?.price && formatAmount(row.price)} </div>,
              },
              {
                header: "Location",
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

          /> : <div className='h-auto flex-grow flex justify-center flex-col items-center'>
            <img src='/images/NoVendor.svg' alt='No Product Found' />
            <p className='font-normal text-primary-text text-sm sm:text-xl'>No merchants are currently available to sell on your platform.</p>
          </div>
        }

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
    <div className='flex flex-wrap items-center gap-1'>
      {categories && categories.map((category: any, index: number) => (
        <div className='flex flex-nowrap items-center gap-1' key={index}>
          <p>{category?.title}</p>
          {index !== (categories.length - 1) && "|"}
        </div>
      ))}
    </div>
  );
};