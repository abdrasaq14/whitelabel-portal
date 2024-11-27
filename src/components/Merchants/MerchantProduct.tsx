import { useState } from "react";
import { ViewProductModal } from "../modals/ViewProductModal";
import Table from "../layouts/Table";
import Spinner from "../feedbacks/Spinner";
import { SpinnerType } from "@/enums/ComponentEnums";
import { fDateTime } from "@/utilities/helperFunctions";
import Pagination from "../feedbacks/Pagination";
import useMerchantDetails from "@/customHooks/Merchants/useMerchantDetail";

const Products = ({ id }: { id: string }) => {
  const {
    allProducts,
    totalResults,
    currentPage,
    setCurrentPage,
    isLoading,
    isViewModalOpen,
    product,
    closeViewModal
  } = useMerchantDetails(id);
    
    
  const columns = [
    { key: "sn", label: "S/N" },
    {
      key: "Product Name",
      label: "Product Name",
      render: (row: any) => <div>{row.name}</div>
    },
    // {
    //   key: "Merchant",
    //   label: "Merchant",
    //   render: (row: any) => <div>{row.productOwner}</div>
    // },
    {
      key: "Category",
      label: "Category",
      render: (row: any) => (
        <div>{row?.categories.map((item: any) => item.title).join(" | ")} </div>
      )
    },
    {
      key: "Date Listed",
      label: "Date Listed",
      render: (row: any) => (
        <div>{row.createdAt && fDateTime(row.createdAt)}</div>
      )
    }
  ];
  return (
    <div className="h-full flex-grow ">
      {isLoading ? (
        <div className="h-full flex-grow flex justify-center items-center">
          <Spinner type={SpinnerType.PRIMARY} height={50} width={50} />
        </div>
      ) : allProducts && allProducts.length ? (
        <>
          <Table
            columns={columns}
            data={allProducts && allProducts}
            // additionalActions={additionalActions}
          />

          <Pagination
            page={currentPage}
            totalPages={totalResults}
            onPageChange={() => {
              setCurrentPage(currentPage + 1);
            }}
          />
        </>
      ) : (
        <>
          <img src="/images/NoProduct.svg" alt="No Product Found" />

          <p className="font-normal max-w-[539px] text-[#4D5154] text-center text-sm">
            This merhcant has not sold any product yet
          </p>
        </>
      )}

      <ViewProductModal
        isOpen={isViewModalOpen}
        product={product}
        closeViewModal={closeViewModal}
      />
    </div>
  );
};

export default Products;