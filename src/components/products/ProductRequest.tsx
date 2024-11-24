"use client";
import React from "react";
import useProductRequest from "@/customHooks/Products/useProductRequest";
import Filter from "../Filter/Filter";
import { BreadCrumbClient } from "../Breadcrumb";
import SearchInput from "../forms/SearchInput";
import { MdFilterList } from "react-icons/md";
import Table from "../layouts/Table";
import Pagination from "../feedbacks/Pagination";
import { formatDate, isEmpty } from "@/utilities/helperFunctions";
import { SpinnerType } from "@/enums/ComponentEnums";
import Spinner from "../feedbacks/Spinner";
import FilterButton from "../Filter/FilterButton";

function ProductRequest() {
  const {
    allRequest,

    totalResults,

    isLoading,

    showFilter,

    setShowFilter,

    currentPage,

    setCurrentPage,

    filterParams
  } = useProductRequest();

  const columns = [
    { key: "sn", label: "S/N" },

    {
      key: "Product Name",
      label: "Product Name",
      render: (row: any) => (
        <div className="whitespace-wrap text-wrap text-ellipsis !whitespace-normal min-w-[300px]">
          {row?.product?.productId.name}{" "}
        </div>
      )
    },

    {
      key: "Request Date",
      label: "Request Date",
      render: (row: any) => (
        <div>{row.createdAt && formatDate(row.createdAt)}</div>
      )
    },

    {
      key: "Status",
      label: "Status",
      render: (row: any) => (
        <div
          className={`py-1 px-2 flex items-center justify-center w-[70%] ${
            row.status === "rejected" ? "bg-red-300" : "bg-blue-100"
          } rounded-md`}
        >
          {row.status}
        </div>
      )
    }
  ];

  return (
    <div className="px-4 pt-8 h-full">
      <Filter onClose={() => setShowFilter(false)} open={showFilter} />

      <div className="bg-white rounded-md h-auto w-full p-8 flex flex-col">
        <BreadCrumbClient
          backText="Dashboard"
          currentPath="Product Request"
          brand="Landmark"
        />

        <div className="flex justify-between">
          <h1 className="text-accent-darker text-sm font-normal">
            Products Request{" "}
            <span className="ml-2 bg-[#EEEFF0] py-1 px-2 rounded-full font-medium text-black">
              {allRequest ? allRequest.length : 0}
            </span>
          </h1>

          <div className="flex mt-6 justify-center gap-2 ml-auto items-center">
            <div>
              <SearchInput placeholder="Search" />
            </div>

            <FilterButton setShowFilter={setShowFilter} />
          </div>
        </div>

        {isLoading ? (
          <Spinner type={SpinnerType.PRIMARY} height={50} width={50} />
        ) : allRequest && allRequest.length ? (
          <div className="mt-5">
            <Table
              columns={columns}
              data={allRequest && allRequest}
              //   additionalActions={additionalActions}
            />

            <Pagination
              page={currentPage}
              totalPages={totalResults}
              onPageChange={() => {
                setCurrentPage(currentPage + 1);
              }}
            />
          </div>
        ) : (
          <div className="h-auto py-20 flex-grow flex justify-center flex-col items-center">
            <>
              <img src="/images/NoVendor.svg" alt="No Product Found" />

              <p className="font-normal text-accent-darker text-sm sm:text-xl">
                {isEmpty(filterParams)
                  ? "No products request available."
                  : "No search result found"}
              </p>
            </>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductRequest;
