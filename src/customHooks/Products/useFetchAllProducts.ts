import { useState, useEffect } from "react";
import useFetchWithParams from "../useFetchWithParams";
import { ProductService } from "@/services/product";
import useStorage from "../useStorage";
import { IQueryParams, User } from "@/interfaces/AppInterfaces";

interface PaginationInfo {
  currentPage: number;
  pageSize: number;
}

export const useAllProducts = () => {
  const [product, setProduct] = useState({});
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterParams, setFilterParams] = useState<IQueryParams>();
  const { getSessionData } = useStorage();
  const profile = getSessionData("UserData")?.user as User;

  const {
    data: allProducts,
    isLoading,
    refetch
  } = useFetchWithParams(
    [
      "query-all-products",
      {
        page: currentPage,
        limit: pageSize,
        search,
        categories: filterParams?.category,
        sortBy: filterParams?.sortBy,
        whiteLabelName: profile?.whiteLabelName
      }
    ],
    ProductService.fetchAll,
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true
    }
  );

  const handleViewProductInfo = (row: any) => {
    setProduct(row);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => setIsViewModalOpen(false);

  const handlePageSize = (val: number) => setPageSize(val);

  const handleCurrentPage = (val: number) => setCurrentPage(val);

  const generateSerialNumber = (
    index: number,
    pageInfo: PaginationInfo
  ): number => {
    const { currentPage, pageSize } = pageInfo;
    return (currentPage - 1) * pageSize + index + 1;
  };

  return {
    product,
    isViewModalOpen,
    search,
    showFilter,
    pageSize,
    currentPage,
    filterParams,
    profile,
    allProducts,
    isLoading,
    setSearch,
    setShowFilter,
    handleViewProductInfo,
    closeViewModal,
    handlePageSize,
    handleCurrentPage,
    setFilterParams,
    generateSerialNumber,
    refetch
  };
};
