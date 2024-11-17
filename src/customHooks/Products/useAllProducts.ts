"use client";
import { useState, useEffect } from "react";
import useStorage from "../useStorage";
import { IQueryParams, User } from "@/interfaces/AppInterfaces";
import { useAppDispatch } from "@/store/hooks";
import { fetchProducts, startProductLoading } from "@/store/slices/productSlice";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

// interface PaginationInfo {
//   currentPage: number;
//   pageSize: number;
// }

interface IUseFetchAllProducts { 
  status?: string;
}
function useFetchAllProducts({ status }: IUseFetchAllProducts) {
  const [product, setProduct] = useState({});
  const allProducts = useAppSelector((state) =>
    status === "BLOCKED"
      ? state.product.products.blocked
      : state.product.products.all
  );
  const totalResults = useAppSelector((state) => state.product.total);
  const isLoading = useAppSelector((state) => state.product.loading);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterParams, setFilterParams] = useState<IQueryParams>();
  const { getSessionData } = useStorage();
  const profile = getSessionData("UserData")?.user as User;
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (profile?.whiteLabelName) {
      dispatch(startProductLoading());
      dispatch(
        fetchProducts({
          whiteLabelName: profile?.whiteLabelName,
          limit: pageSize,
          page: currentPage,
          status: status,
        })
      );
    }
  }, [dispatch, profile?.whiteLabelName, currentPage]);

  const handleViewProductInfo = (row: any) => {
    setProduct(row);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => setIsViewModalOpen(false);

  const handlePageSize = (val: number) => setPageSize(val);

  const handleCurrentPage = (val: number) => setCurrentPage(val);

  // const generateSerialNumber = (
  //   index: number,
  //   pageInfo: PaginationInfo
  // ): number => {
  //   const { currentPage, pageSize } = pageInfo;
  //   return (currentPage - 1) * pageSize + index + 1;
  // };

  return {
    product,
    setProduct,
    isViewModalOpen,
    search,
    totalResults,
    showFilter,
    pageSize,
    currentPage,
    setCurrentPage,
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
    // generateSerialNumber
  };
}

export default useFetchAllProducts;
