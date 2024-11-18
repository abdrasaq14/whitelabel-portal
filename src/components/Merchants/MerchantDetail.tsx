"use client"
import { useState } from "react";

const ProductsSold = ({}) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [product, setProduct] = useState({});
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { id } = useParams();

  const { data: allProducts, isLoading } = useFetchWithParams(
    [
      "query-all-products-sold",
      {
        merchantId: id,
        page: currentPage
      }
    ],
    ProductService.getProductsSold,
    {
      onSuccess: (data: any) => {
        // console.log(data.data);
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true
    }
  );

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const handlePageSize = (val: any) => {
    setPageSize(val);
    // setFilterParams({ ...filterParams, pageSize: val });
  };

  const handleCurrentPage = (val: any) => {
    setCurrentPage(val);
    // setFilterParams({ ...filterParams, pageNum: val - 1 });
  };

  return (
    <div className="h-full flex-grow ">
      <Table
        data={allProducts && allProducts.result.results}
        hideActionName={true}
        // rowActions={(row) => [
        //   {
        //     name: "View Product",
        //     action: () => {
        //       handleViewProductInfo(row)
        //     },
        //   },
        //   {
        //     name: "Ban product",
        //     action: () => {
        //       handleViewProductInfo(row)
        //     },
        //   },
        //   {
        //     name: "View Seller",
        //     action: () => {
        //       handleViewProductInfo(row)
        //     },
        //   },
        // ]}
        columns={[
          {
            header: "S/N",
            view: (row: any, id) => (
              <div className="pc-text-blue">
                {generateSerialNumber(id, {
                  currentPage,
                  pageSize
                })}
              </div>
            )
          },
          // {
          //     header: "Product Id",
          //     view: (row: any) => <div>{row._id}</div>,
          // },
          {
            header: "Product Name",
            view: (row: any) => <div>{row.name}</div>
          },
          {
            header: "Merchant",
            view: (row: any) => <div>{row.productOwner}</div>
          },
          {
            header: "Category",
            view: (row: any) => (
              <div>
                {row?.categories.map((item: any) => item.title).join(" | ")}{" "}
              </div>
            )
          },
          {
            header: "Date Listed",
            view: (row: any) => (
              <div>{row.createdAt && fDateTime(row.createdAt)}</div>
            )
          }
        ]}
        loading={isLoading}
        pagination={{
          page: currentPage,
          pageSize: pageSize,
          totalRows: allProducts?.result.totalPages,
          setPageSize: handlePageSize,
          setPage: handleCurrentPage
        }}
      />
      <ViewProductModal
        isOpen={isViewModalOpen}
        product={product}
        closeViewModal={closeViewModal}
      />
    </div>
  );
};
