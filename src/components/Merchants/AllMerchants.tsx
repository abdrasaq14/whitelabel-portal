"use client"
import React from "react";
import useAllMerchants from "@/customHooks/Merchants/useAllMerchants";
import Filter from "../Filter/Filter";
import { BreadCrumbClient } from "../Breadcrumb";
import SearchInput from "../forms/SearchInput";
import { MdFilterList } from "react-icons/md";
import Spinner from "../feedbacks/Spinner";
import { ButtonType, SpinnerType } from "@/enums/ComponentEnums";
import Table from "../layouts/Table";
import { isEmpty } from "@/utilities/helperFunctions";
import AppButton from "../forms/AppButton";
import useNavigation from "@/customHooks/useNavigation";

function AllMerchants() {
  
  const {
  
    allMerchants,
  
    isLoading,
  
    showFilter,
  
    search,
  
    setSearch,
  
    setFilterParams,
  
    setShowFilter,
  
    filterParams,
  
    setCurrentPage  

  } = useAllMerchants();

  const {push} = useNavigation();
  
  const columns = [
  
    { key: "sn", label: "S/N" },
  
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
  
    {
      key: "Status",
      label: "Status",
      render: (row: any) => (
        <div
          className={`py-1 px-2 flex items-center justify-center w-[70%] ${
            row.status === "active" ? "bg-green-300" : "bg-red-300"
          } rounded-md`}
        >
          {row.status}
        </div>
      )
    }
  
  ];
  
  const additionalActions = (row: any) => [
  
    { label: "View Merchant", action: () => push(`/Merchant/Profile/${row.id}`) }
  
  ];
  
  return (
  
    <div className="px-4 pt-8 h-full">
  
      <Filter
        isLoading={isLoading}
        type="merchant"
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
          currentPath="All Merchants"
          brand="Landmark"
        />
    
        <div className="flex justify-between mb-5">
          <h1 className="text-accent-darker text-sm font-normal">
            All Merchants{" "}
    
            <span className="ml-2 bg-[#EEEFF0] py-1 px-2 rounded-full font-medium text-black">
              {allMerchants ? allMerchants.length : 0}
            </span>
    
          </h1>
    
          <div className="flex mt-6 justify-center gap-2 ml-auto items-center">
    
            <div>
    
              <SearchInput
                onClear={() => {
                  setSearch("");
                  setCurrentPage(1);
                }}
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
              className="px-3 py-2 border border-primary rounded text-sm flex items-center gap-2"
            >
    
              <MdFilterList /> Filter
    
            </button>
    
          </div>
    
        </div>
    
        {isLoading ? (
    
        <Spinner type={SpinnerType.PRIMARY} height={50} width={50} />
        ) : allMerchants && allMerchants.length > 0 ? (
          <div className="h-full flex-grow ">
            <Table
              columns={columns}
              data={allMerchants && allMerchants}
              additionalActions={additionalActions}
            />
          </div>
        ) : (
          <div className="h-auto flex-grow py-20 flex justify-center flex-col items-center">
            (
        
            <>
        
              <img src="/images/NoVendor.svg" alt="No Product Found" />
        
              <p className="font-normal max-w-[539px] text-[#4D5154] text-center text-sm">
                {isEmpty(filterParams)
                  ? "All merchants you onboard will be displayed here. Add a vendor to your marketplace now to get started."
                  : "No search result found"}
              </p>
        
              <AppButton
                handleClick={() => push("/discover-products")}
                iconPosition="right"
                type={ButtonType.PRIMARY}
                // icon={<FaArrowRight />}
                style="mt-6"
                text="Invite Merchant to List product on your marketplace"
              />
        
            </>
        
            )
        
          </div>
        
        )}
      
      </div>
    
    </div>
  
  );

}

export default AllMerchants;
