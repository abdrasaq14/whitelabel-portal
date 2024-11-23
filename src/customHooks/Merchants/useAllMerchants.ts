"use client"
import { IQueryParams, User } from "@/interfaces/AppInterfaces";
import React, { useEffect, useState } from "react";
import { MerchantService } from "@/services/merchant";

import useStorage from "../useStorage";

function useAllMerchants() {
  const [search, setSearch] = useState("");
  const [allMerchants, setAllMerchants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterParams, setFilterParams] = useState<IQueryParams>();
  const { getSessionData } = useStorage();
  const profile = getSessionData("UserData")?.user as User;

  console.log(profile);

  const getStatusById = (arr: any, id: string) => {
    const item = arr.find((element: any) => element.platform == id);
    return item && item.status;
  };

  const fetchAllMerchants = async (filterParams: IQueryParams) => {
    const res = await MerchantService.getallMerchants(filterParams);
    // @ts-ignore
    if (res.data.result.results) {
      // @ts-ignore
      setAllMerchants(res.data.result.results);
      // @ts-ignore
      setTotalResults(res.data.result.totalPages);
    }
    setIsLoading(false);
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
    if (profile?.whiteLabelName) {
      //   setIsLoading(true);
      fetchAllMerchants({
        whiteLabelName: profile?.whiteLabelName,
        limit: pageSize,
        page: currentPage
      });
    }
  }, [profile?.whiteLabelName, pageSize, currentPage]);
  return {
    allMerchants,
    isLoading,
    showFilter,
    pageSize,
    currentPage,
    filterParams,
    profile,
      setFilterParams,
    search,
    setSearch,
    setShowFilter,
    setCurrentPage,
    handlePageSize,
    handleCurrentPage,
    totalResults
  };
}

export default useAllMerchants;
