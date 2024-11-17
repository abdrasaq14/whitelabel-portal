import { useState, useEffect } from "react";
import useStorage from "../useStorage";
import { IQueryParams, User } from "@/interfaces/AppInterfaces";
import { useAppDispatch } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
interface PaginationInfo {
  currentPage: number;
  pageSize: number;
}

export const useAllProducts = () => {
  const [product, setProduct] = useState({});
  const allProducts = useAppSelector((state) => state.product.products.all);
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
      dispatch(fetchProducts({ whiteLabelName: profile?.whiteLabelName }));
    }
  }, [dispatch, profile?.whiteLabelName]);

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
    router,
    product,
    isViewModalOpen,
    search,
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
    generateSerialNumber,
  };
};
