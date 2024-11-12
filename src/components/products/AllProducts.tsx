import React from 'react'
import Filter from '../Filter/Filter';
import { useAllProducts } from '@/customHooks/Products/useFetchAllProducts';
import { BreadCrumbClient } from '../Breadcrumb';
import { MdFilterList } from 'react-icons/md';
import { fDateTime, formatAmount } from '@/utilities/helperFunctions';
function AllProducts() {
    const {
        allProducts,
        isLoading,
        handleViewProductInfo,
        isViewModalOpen,
        product,
        closeViewModal,
        setSearch,
        setFilterParams,
        setShowFilter,
        showFilter,
        generateSerialNumber,
        handlePageSize,
        handleCurrentPage,
        profile,
        search,
        currentPage,
        pageSize,
        filterParams,
        refetch
    } = useAllProducts();
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
        <div className="flex justify-between">
          <h1 className="text-primary-text text-sm font-normal">
            All Products{" "}
            <span className="ml-2 bg-[#EEEFF0] py-1 px-2 rounded-full font-medium text-black">
              {allProducts ? allProducts.result.totalResults : 0}
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
          <button
            onClick={() => setShowFilter(true)}
            className="px-3 py-2 border border-primary rounded text-sm flex items-center gap-2"
          >
            <MdFilterList /> Filter
          </button>
        </div>
        <div className="h-full flex-grow ">
          {allProducts ? (
            <Table
              data={allProducts && allProducts.result.results}
              hideActionName={true}
              emptyMessage={
                <div className="h-full flex-grow flex justify-center items-center">
                  <img src="/images/NoProduct.svg" alt="No Product Found" />
                  <p className="text-center">
                    You have no products listed on your marketplace yet. Browse
                    through our product directory to start listing products now!
                  </p>
                </div>
              }
              rowActions={(row) => [
                {
                  name: "View Product",
                  action: () => {
                    handleViewProductInfo(row);
                  }
                }
                // {
                //   name: "Ban product",
                //   action: () => {
                //     handleViewProductInfo(row)
                //   },
                // },
                // {
                //   name: "View Seller",
                //   action: () => {
                //     handleViewProductInfo(row)
                //   },
                // },
              ]}
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
                //   header: "Product Id",
                //   view: (row: any) => <div className='flex items-center gap-3'><img alt="row-img" src={row.image ?? ""} className='h-10 w-10 object-contain' />{row.productIdOnProfitAll}</div>,
                // },
                {
                  header: "Merchant",
                  view: (row: any) => <div>{row.userId.businessName}</div>
                },
                {
                  header: "Product Name",
                  view: (row: any) => (
                    <div className="whitespace-wrap text-wrap text-ellipsis !whitespace-normal min-w-[300px]">
                      {row?.name}{" "}
                    </div>
                  )
                },
                {
                  header: "Listing Price",
                  view: (row: any) => (
                    <div>{row?.price && formatAmount(row.price)} </div>
                  )
                },
                {
                  header: "Selling Price",
                  view: (row: any) => {
                    const sellingPrice =
                      row?.price && profile?.commisionPecentage
                        ? (row.price *
                            parseFloat(profile?.commisionPecentage)) /
                            100 +
                          row.price
                        : row?.price; // Fallback to 0 if price or commission is missing

                    return <div>{formatAmount(sellingPrice)}</div>;
                  }
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
                totalRows: allProducts?.result.totalResults,
                setPageSize: handlePageSize,
                setPage: handleCurrentPage
              }}
            />
          ) : (
            <div className="h-auto flex-grow py-20 flex justify-center flex-col items-center">
              {isLoading ? (
                <Spinner color="#000" />
              ) : (
                <>
                  <img src="/images/NoProduct.svg" alt="No Product Found" />
                  <p className="font-normal max-w-[539px] text-[#4D5154] text-center text-sm">
                    {isEmpty(filterParams)
                      ? "You have no products listed on your marketplace yet. Browse through our product directory to start listing products now!"
                      : "No search result found"}
                  </p>

                  <Button
                    onClick={() => navigate("/discover-products")}
                    iconPosition="afterText"
                    icon={<FaArrowRight />}
                    className="mt-6"
                    label="Invite Merchant to List product on your marketplace"
                  />
                </>
              )}
            </div>
          )}

          <ViewProductModal
            isOpen={isViewModalOpen}
            product={product}
            refetch={refetch}
            closeViewModal={closeViewModal}
          />
        </div>
      </div>
    </div>
  );
}

export default AllProducts