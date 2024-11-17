"use client";
import React, { useEffect, useState } from "react";
import Filter from "../Filter/Filter";
import { BreadCrumbClient } from "../Breadcrumb";
import { MdFilterList } from "react-icons/md";
import { fDateTime, formatAmount, isEmpty } from "@/utilities/helperFunctions";
import SearchInput from "../forms/SearchInput";
import { SpinnerType } from "@/enums/ComponentEnums";
import Spinner from "../feedbacks/Spinner";
import AppButton from "../forms/AppButton";
import { FaArrowRight } from "react-icons/fa6";
import { ViewProductModal } from "../modals/ViewProductModal";
import Table from "../layouts/Table";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import { useRouter } from "next/navigation";
import useStorage from "@/customHooks/useStorage";
import { IQueryParams, User } from "@/interfaces/AppInterfaces";
import Pagination from "../feedbacks/Pagination";
import useFetchAllProducts from "@/customHooks/Products/useAllProducts";

function BlockedProducts() {
  const {
    product,
    allProducts,
    totalResults,
    isLoading,
    isViewModalOpen,
    search,
    showFilter,
    pageSize,
    currentPage,
    filterParams,
    profile,
    setFilterParams,
    setSearch,
    setShowFilter,
    setCurrentPage,
    handlePageSize,
    handleCurrentPage,
    handleViewProductInfo,
    closeViewModal
  } = useFetchAllProducts({ status: "BLOCKED" });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const additionalActions = (row: any) => [
    { label: "View Product", action: () => handleViewProductInfo(row) }
  ];
  const columns = [
    { key: "sn", label: "S/N" },
    {
      key: "Merchant",
      label: "Merchant",
      render: (row: any) => <div>{row.userId.businessName}</div>
    },
    {
      key: "Product Name",
      label: "Product Name",
      render: (row: any) => (
        <div className="whitespace-wrap text-wrap text-ellipsis !whitespace-normal min-w-[300px]">
          {row?.name}{" "}
        </div>
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
    <div className="px-4 pt-8 h-full">
      <Filter
        isLoading={isLoading}
        type="product"
        onFilter={(e: any) => setFilterParams(e)}
        onClose={() => {
          setShowFilter(false);
          setFilterParams({});
        }}
        open={showFilter}
      />
      <div className="bg-white rounded-md h-auto w-full p-8 flex flex-col">
        <BreadCrumbClient
          backText="Dashboard"
          currentPath="All Products"
          brand="Landmark"
        />

        <div className="flex mt-6 justify-center gap-2 ml-auto items-center">
          <div>
            <SearchInput
              onClear={() => setSearch("")}
              value={search}
              onChange={(e: any) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search"
            />
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className="px-3 py-2 border border-primary rounded text-sm flex items-center gap-2 text-accent-darker"
          >
            <MdFilterList /> Filter
          </button>
        </div>
        <div className="h-full flex-grow ">
          {allProducts && allProducts.length ? (
            <>
              <Table
                columns={columns}
                data={allProducts && allProducts}
                additionalActions={additionalActions}
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
            <div className="h-auto flex-grow py-20 flex justify-center flex-col items-center">
              {isLoading ? (
                <Spinner type={SpinnerType.PRIMARY} height={50} width={50} />
              ) : (
                <>
                  <img src="/images/NoProduct.svg" alt="No Product Found" />
                  <p className="font-normal max-w-[539px] text-[#4D5154] text-center text-sm">
                    {isEmpty(filterParams)
                      ? "You have not blocked any product from appearing on your marketplace. All blocked products will appear here"
                      : "No search result found"}
                  </p>
                </>
              )}
            </div>
          )}

          <ViewProductModal
            isOpen={isViewModalOpen}
            product={product}
            closeViewModal={closeViewModal}
          />
        </div>
      </div>
    </div>
  );
}

export default BlockedProducts;
