"use client"
import React, { useEffect, useState } from "react";
import { ProductService } from "@/services/product";
import { IQueryParams, User } from "@/interfaces/AppInterfaces";
import useStorage from "../useStorage";

const useProductRequest = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterParams, setFilterParams] = useState<IQueryParams>();
  const { currentUser } = useStorage();
  const [isLoading, setIsLoading] = useState(true);
  const [allRequest, setAllRequest] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const queryProductRequest = async (filterParams: IQueryParams) => {
    const res = await ProductService.getProductRequest(filterParams);
    // @ts-ignore
    if (res.data.result.results) {
      // @ts-ignore
      setAllRequest(res.data.result.results);
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
    if (currentUser?.user?.whiteLabelName) {
      //   setIsLoading(true);
      queryProductRequest({
        whiteLabelClientId: currentUser?.user?._id,
        limit: pageSize,
        page: currentPage
      });
    }
  }, [currentUser?.user?.whiteLabelName, pageSize, currentPage]);
  return {
      allRequest,
    totalResults,
    isLoading,
    showFilter,
    setShowFilter,
    pageSize,
    currentPage,
    setCurrentPage,
    filterParams,
    currentUser,
    handlePageSize,
    handleCurrentPage
  };
};

export default useProductRequest;
