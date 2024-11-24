"use client"
import React from "react";
import useAllMerchants from "@/customHooks/Merchants/useAllMerchants";
import Filter from "../Filter/Filter";
import { BreadCrumbClient } from "../Breadcrumb";
import SearchInput from "../forms/SearchInput";
import FilterButton from "../Filter/FilterButton";
import Spinner from "../feedbacks/Spinner";
import { SpinnerType } from "@/enums/ComponentEnums";
import Pagination from "../feedbacks/Pagination";
import Table from "../layouts/Table";

function SuspendedMerchants() {
  const {
    allMerchants,
    isLoading,
    totalResults,
    showFilter,
    search,
    setSearch,
    setFilterParams,
    setShowFilter,
    filterParams,
      setCurrentPage,
    currentPage, currentUser
  } = useAllMerchants({ status: "SUSPENDED" });
  const columns = [
    {
      key: "sn",
      label: "S/N"
    },
    {
      key: "Store Name",
      label: "Store Name",
      render: (row: any) => <div>{row.businessName}</div>
    },
    {
      key: "Customer Rating",
      label: "Customer Rating",
      render: (row: any) => <div>{row?.rating}</div>
    },
    {
      key: "Category",
      label: "Category",
      render: (row: any) => <div>{row?.category}</div>
    },
    {
      key: "Location",
      label: "Location",
      render: (row: any) => (
        <div>
          {row?.location && row.location.state !== "State not found" ? (
            `${row?.location.state}`
          ) : (
            <span className="text-gray-400 italic">Not available</span>
          )}
        </div>
      )
    },
    // {
    //   key: "Status",
    //   label: "Status",
    //   render: (row: any) => (
    //     <Label
    //       variant={
    //         getStatusById(
    //           row?.platformAccess,
    //           profile.whiteLabelName.toUpperCase()
    //         ) === "active"
    //           ? "success"
    //           : "danger"
    //       }
    //     >
    //       {row &&
    //         getStatusById(
    //           row?.platformAccess,
    //           profile.whiteLabelName.toUpperCase()
    //         )}{" "}
    //     </Label>
    //   )
    // }
  ];
  return (
    <div className="px-4 pt-8 h-full">
      <Filter onClose={() => setShowFilter(false)} open={showFilter} />
      <div className="bg-white rounded-md h-auto w-full p-8 flex flex-col">
        <BreadCrumbClient
          backText="Dashboard"
          currentPath="All Merchants"
          brand={`${currentUser?.user?.whiteLabelName}`}
        />
        <div className="flex justify-between">
          <h1 className="text-primary-text text-sm font-normal">
            Suspended Merchants{" "}
            <span className="ml-2 bg-[#EEEFF0] py-1 px-2 rounded-full font-medium text-black">
              {totalResults ? totalResults : 0}
            </span>
          </h1>
          <div className="flex mt-6 justify-center gap-2 ml-auto items-center">
            <div>
              <SearchInput
                value={search}
                onChange={(e: any) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search"
              />
            </div>
            <FilterButton setShowFilter={setShowFilter} />
          </div>
        </div>

        {allMerchants && allMerchants.length ? (
          <div className="h-full flex-grow ">
              <Table
              columns={columns}
              data={allMerchants && allMerchants}
              additionalActions={additionalActions}
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
            {isLoading ? (
              <Spinner type={SpinnerType.PRIMARY} height={50} width={50} />
            ) : (
              <>
                <img src="/images/NoVendor.svg" alt="No Product Found" />
                <p className="font-normal text-primary-text text-sm">
                  Hurray! You have not suspended any merchants yet.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SuspendedMerchants;
