import React, { useState } from "react";
import SearchInput from "../../../components/FormInputs/SearchInput";
import { BreadCrumbClient } from "../../../components/Breadcrumb";
import { MdFilterList } from "react-icons/md";
import Filter from "../../../components/Filter/Filter";
import { Paginator } from "../../../components/Table/Paginator";
import useFetchWithParams from "../../../hooks/useFetchWithParams";
import { MerchantService } from "../../../services/merchant.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../zustand/auth.store";
import { Table } from "../../../components/Table/Table2";
import { generateSerialNumber } from "../../../utils/functions";
import { formatDate } from "../../../utils/Helpfunctions";
import Spinner from "../../../components/spinner/Spinner";

const MerchantRequest = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const profile: any = useAuth((s) => s.profile);
  const [filterParams, setFilterParams] = useState<any>({})

  
  const { data: allRequest, isLoading } = useFetchWithParams(
    [
      "query-all-products-request",
      {
        page: currentPage,
        limit: pageSize,
        status: "not-accepted",
        whiteLabelClientId: profile._id
      }
    ],
    MerchantService.getProductRequest,
    {
      onSuccess: (data: any) => {
        // console.log(data.data);
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true
    }
  );
  console.log(allRequest);
  const handlePageSize = (val: any) => {
    setPageSize(val);
    // setFilterParams({ ...filterParams, pageSize: val });
  };

  const handleCurrentPage = (val: any) => {
    setCurrentPage(val);
    // setFilterParams({ ...filterParams, pageNum: val - 1 });
  };
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
          <h1 className="text-primary-text text-sm font-normal">
            Products Request{" "}
            <span className="ml-2 bg-[#EEEFF0] py-1 px-2 rounded-full font-medium text-black">
              {allRequest ? allRequest?.result.totalResults : 0}
            </span>
          </h1>
          <div className="flex mt-6 justify-center gap-2 ml-auto items-center">
            <div>
              <SearchInput placeholder="Search" />
            </div>
            <button
              onClick={() => setShowFilter(true)}
              className="px-3 py-2 border border-primary rounded text-sm flex items-center gap-2"
            >
              <MdFilterList /> Filter
            </button>
          </div>
        </div>

        {allRequest ? (
          <Table
            showCheckbox={false}
            data={allRequest?.result?.results}
            emptyMessage={
              <div className="h-auto flex-grow flex justify-center flex-col items-center">
                <img src="/images/NoVendor.svg" alt="No Product Found" />
                <p className="font-normal text-primary-text text-sm sm:text-xl">
                  No products request available.
                </p>
              </div>
            }
            hideActionName={true}
            // clickRowAction={(row) => handleMerchantInfoModal(row)}
            columns={[
              {
                header: "S/N",
                view: (row: any, id: number) => (
                  <div className="pc-text-blue">
                    {generateSerialNumber(id, {
                      currentPage,
                      pageSize
                    })}
                  </div>
                )
              },
              {
                header: "Product Name",
                view: (row: any) => <div>{row.product.productName}</div>
              },
              {
                header: "Request Date",
                view: (row: any) => <div>{formatDate(row.createdAt)}</div>
              },
              {
                header: "Status",
                view: (row: any) => <div className={`py-1 px-2 flex items-center justify-center w-[70%] ${row.status === "rejected" ? 'bg-red-300' : "bg-blue-100"} rounded-md`}>{row.status}</div>
              }
            ]}
            loading={isLoading}
            pagination={{
              page: currentPage,
              pageSize: pageSize,
              totalRows: allRequest?.result.totalResults,
              setPageSize: handlePageSize,
              setPage: handleCurrentPage
            }}
          />
        ) : (
          <div className="h-auto py-20 flex-grow flex justify-center flex-col items-center">
            {
              isLoading ? <Spinner color="#000" /> : <>
                <img src="/images/NoVendor.svg" alt="No Product Found" />
                <p className="font-normal text-primary-text text-sm sm:text-xl">
                  No products request available.
                </p>
              </>
            }

          </div>
        )}
      </div>
    </div>
  );
};

const Request = ({ items }: { items: any }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2 ">
        <div>
          <img src="/avatar.png" />
        </div>
        <div className="px-3 py-6">
          <h3 className="font-medium">{items.product.productName}</h3>
          {/* <h3 className='font-normal'>Fashion & Clothing | Arts | Books</h3>
          <span className='text-sm flex items-center gap-1 font-medium'><img src='/icons/location.svg' /> Abuja, Nigeria</span> */}
        </div>
      </div>
      <div className="flex gap-3">
        <button className="font-medium text-[#D42620]">Decline</button>
        <button className="px-3 py-2 bg-[#0F973D] text-white rounded font-medium w-[140px] ">
          Accept
        </button>
        <button
          onClick={() =>
            navigate(`/merchant/profile/${items.product.merchantId}`)
          }
          className="px-3 py-2 border border-primary rounded font-medium w-[140px] "
        >
          View Account
        </button>
      </div>
    </div>
  );
};

export default MerchantRequest;
