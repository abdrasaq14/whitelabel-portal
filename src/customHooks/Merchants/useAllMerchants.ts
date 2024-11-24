"use client";
import { IQueryParams, User } from "@/interfaces/AppInterfaces";
import React, { useEffect, useState } from "react";
import { MerchantService } from "@/services/merchant";

import useStorage from "../useStorage";

function useAllMerchants({ status }: { status?: string }) {
  const [search, setSearch] = useState("");
  const [allMerchants, setAllMerchants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterParams, setFilterParams] = useState<IQueryParams>();
  const { currentUser } = useStorage();
// console.log("currentUSer", currentUser);
  const fetchAllMerchants = async (filterParams: IQueryParams) => {
    try {
      const res: any = await MerchantService.getallMerchants(filterParams);
      if (res.data.result.results) {
        setIsLoading(false);
        setAllMerchants(res.data.result.results);
        setTotalResults(res.data.result.totalPages);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handlePageSize = (val: any) => {
    setPageSize(val);
    // setFilterParams({ ...filterParams, pageSize: val });
  };

  const handleCurrentPage = (val: any) => {
    setCurrentPage(val);
    // setFilterParams({ ...filterParams, pageNum: val - 1 });
  };

  useEffect(() => {
    if (currentUser?.user?.whiteLabelName) {
      //   setIsLoading(true);
      fetchAllMerchants({
        whiteLabelName: currentUser?.user?.whiteLabelName,
        limit: pageSize,
        page: currentPage,
        status,
      });
    }
  }, [currentUser?.user?.whiteLabelName, pageSize, currentPage]);
  return {
    allMerchants,
    isLoading,
    showFilter,
    pageSize,
    currentPage,
    filterParams,
    currentUser: currentUser?.user,
    setFilterParams,
    search,
    setSearch,
    setShowFilter,
    setCurrentPage,
    handlePageSize,
    handleCurrentPage,
    totalResults,
  };
}

export default useAllMerchants;
