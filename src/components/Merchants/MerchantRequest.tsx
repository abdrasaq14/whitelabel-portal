"use client";
import React, { useState } from "react";
import useMerchantRequest from "@/customHooks/Merchants/useMerchantRequest";
import Filter from "../Filter/Filter";
import { BreadCrumbClient } from "../Breadcrumb";
import SearchInput from "../forms/SearchInput";
import { MdFilterList } from "react-icons/md";
import { isEmpty } from "@/utilities/helperFunctions";
import { ButtonType, SpinnerType } from "@/enums/ComponentEnums";
import Spinner from "../feedbacks/Spinner";
import { MerchantService } from "@/services/merchant";
import Pagination from "../feedbacks/Pagination";
import { useRouter } from "next/navigation";
import AppButton from "../forms/AppButton";
import toast from "react-hot-toast";
import FilterButton from "../Filter/FilterButton";

function MerchantRequest() {
  const {
    allRequest,
    totalResults,
    isLoading,
    setPageSize,
    setIsLoading,
    showFilter,
    setShowFilter,
    currentPage,
    setCurrentPage,
    filterParams,
    setFilterParams
  } = useMerchantRequest();

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
          currentPath="Merchant Request"
          brand="Landmark"
        />
        <div className="flex justify-between">
          <h1 className="text-primary-text text-sm font-normal">
            Merchants Request{" "}
            <span className="ml-2 bg-[#EEEFF0] py-1 px-2 rounded-full font-medium text-black">
              {totalResults ? totalResults : 0}
            </span>
          </h1>
          <div className="flex my-6 justify-center gap-2 ml-auto items-center">
            <div>
              <SearchInput placeholder="Search" onChange={() => {}} />
            </div>
            <FilterButton setShowFilter={setShowFilter} />
          </div>
        </div>

        {allRequest && allRequest.length ? (
          <div className="py-4">
            {allRequest &&
              allRequest.map((items: any, index: number) => (
                <Request items={items} key={index} />
              ))}

            {/* <Request />
          <Request /> */}

            <div className="flex items-center justify-center">
              <Pagination
                page={currentPage}
                totalPages={totalResults}
                onPageChange={() => {
                  setCurrentPage(currentPage + 1);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-[60vh] flex flex-col   items-center justify-center">
            {isLoading ? (
              <Spinner type={SpinnerType.PRIMARY} height={50} width={50} />
            ) : (
              <>
                <img src="/images/NoVendor.svg" alt="No Product Found" />
                <h3 className="font-normal max-w-[539px] text-[#4D5154] text-center text-sm">
                  {" "}
                  {isEmpty(filterParams)
                    ? "You have no active vendor requests. Browse through our merchant discovery to onboard and list a product on your marketplace now."
                    : "No search result found"}
                </h3>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MerchantRequest;

const Request = ({ items }: { items: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const updateRequest = async (payload: { id: string; action: string }) => {
    try {
      setIsLoading(true);
      const res: any = await MerchantService.updateMerchantRequest(payload.id, {
        status: payload.action
      });
      if (res.data.result) {
        setIsLoading(false);
        toast.success("Request updated successfully");
      }
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error);
      console.log("erro", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2 ">
        <div>
          <img src="/avatar.png" />
        </div>
        <div className="px-3 py-6">
          <h3 className="font-medium">{items.merchant.merchantName}</h3>
          {/* <h3 className='font-normal'>Fashion & Clothing | Arts | Books</h3>
          <span className='text-sm flex items-center gap-1 font-medium'><img src='/icons/location.svg' /> Abuja, Nigeria</span> */}
        </div>
      </div>
      <div className="flex gap-3">
        <AppButton
          type={isLoading ? ButtonType.DISABLED : ButtonType.PRIMARY}
          loader={{ loading: isLoading }}
          text="Decline"
          style="border border-primary text-[#D42620]"
          handleClick={() => updateRequest({ id: items._id, action: "reject" })}
        />
        <AppButton
          type={isLoading ? ButtonType.DISABLED : ButtonType.PRIMARY}
          loader={{ loading: isLoading }}
          text="Accept"
          style="bg-[#0F973D] px-3 py-2 bg-[#0F973D] text-white"
          handleClick={() => updateRequest({ id: items._id, action: "accept" })}
        />
        <AppButton
          type={isLoading ? ButtonType.DISABLED : ButtonType.PRIMARY}
          loader={{ loading: isLoading }}
          text="View Account"
          style="border border-primary text-primary"
          handleClick={() =>
            router.push(`/merchant/profile/${items.merchant.merchantId}`)
          }
        />
      </div>
    </div>
  );
};
