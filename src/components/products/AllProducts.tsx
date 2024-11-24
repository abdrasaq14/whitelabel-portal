"use client";
import React, {  } from "react";
import Filter from "../Filter/Filter";
import { BreadCrumbClient } from "../Breadcrumb";
import { MdFilterList } from "react-icons/md";
import { fDateTime, formatAmount, isEmpty } from "@/utilities/helperFunctions";
import SearchInput from "../forms/SearchInput";
import { SpinnerType } from "@/enums/ComponentEnums";
import Spinner from "../feedbacks/Spinner";
import AppButton from "../forms/AppButton";
import { ViewProductModal } from "../modals/ViewProductModal";
import Table from "../layouts/Table";
import Pagination from "../feedbacks/Pagination";
import useFetchAllProducts from "@/customHooks/Products/useAllProducts";
import { ButtonType } from "@/enums/ComponentEnums";
import useNavigation from "@/customHooks/useNavigation";
import FilterButton from "../Filter/FilterButton";

function AllProducts() {
  
  const {
    
    product,
    
    allProducts,
    
    totalResults,
    
    isLoading,
    
    isViewModalOpen,
    
    search,
    
    showFilter,
    
    currentPage,
    
    filterParams,
    
    currentUser,
    
    setFilterParams,
    
    setSearch,
    
    setShowFilter,
    
    setCurrentPage,
    
    handleViewProductInfo,
    
    closeViewModal
  
  } = useFetchAllProducts({ status: undefined });

  // console.log("isLoadingAllProducts", isLoading);

  const {push} = useNavigation();

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
        <div className="whitespace-wrap text-wrap text-ellipsis !whitespace-normal">
          {row?.name}{" "}
        </div>
      )
    },
    
    {
      key: "Listing Price",
      label: "Listing Price",
      render: (row: any) => <div>{row?.price && formatAmount(row.price)} </div>
    },
    
    {
      key: "Selling Price",
      label: "Selling Price",
      render: (row: any) => {
        const sellingPrice =
          row?.price && currentUser?.user?.commisionPecentage
            ? (row.price * parseFloat(currentUser?.user?.commisionPecentage)) / 100 +
              row.price
            : row?.price; // Fallback to 0 if price or commission is missing

        return <div>{formatAmount(sellingPrice)}</div>;
      }
      
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
        
        <div className="flex justify-between mb-5">
        
          <h1 className="text-accent-darker text-sm font-normal">
            All Products{" "}
            <span className="ml-2 bg-[#EEEFF0] py-1 px-2 rounded-full font-medium text-black">
              {allProducts ? allProducts.length : 0}
            </span>
          </h1>
        
        </div>
        
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
          
          <FilterButton setShowFilter={setShowFilter} />
        
        </div>
        
        <div className="h-full flex-grow mt-5">
          
          {isLoading ? (
            <Spinner type={SpinnerType.PRIMARY} height={50} width={50} />
          ) : allProducts && allProducts.length ? (
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
            
              (
              <>
                <img src="/images/NoProduct.svg" alt="No Product Found" />
                <p className="font-normal max-w-[539px] text-[#4D5154] text-center text-sm">
                  {isEmpty(filterParams)
                    ? "You have no products listed on your marketplace yet. Browse through our product directory to start listing products now!"
                    : "No search result found"}
                </p>

                <AppButton
                  handleClick={() => push("/DiscoverProducts")}
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

export default AllProducts;
