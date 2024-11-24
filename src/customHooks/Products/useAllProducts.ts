"use client";
import { useState, useEffect } from "react";
import useStorage from "../useStorage";
import { IQueryParams, User } from "@/interfaces/AppInterfaces";
import { useAppDispatch } from "@/store/hooks";
import { fetchProducts, getProductSlice, startProductLoading } from "@/store/slices/productSlice";
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
  
  const allProductSlice = useAppSelector(getProductSlice);
  
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  const [search, setSearch] = useState("");
  
  const [showFilter, setShowFilter] = useState(false);
  
  const [pageSize, setPageSize] = useState(20);
  
  const [currentPage, setCurrentPage] = useState(1);
  
  const [filterParams, setFilterParams] = useState<IQueryParams>();
  
  const { currentUser } = useStorage();
  
  const dispatch = useAppDispatch();

  useEffect(() => {
  
    if (currentUser?.user?.whiteLabelName) {
  
      dispatch(startProductLoading());
  
      dispatch(
  
        fetchProducts({
          whiteLabelName: currentUser?.user?.whiteLabelName,
          limit: pageSize,
          page: currentPage,
          status: status,
        })
      
      );
    
    }
  
  }, [dispatch, currentUser?.user?.whiteLabelName, currentPage]);

  const handleViewProductInfo = (row: any) => {
  
    setProduct(row);
  
    setIsViewModalOpen(true);
  
  };

  const closeViewModal = () => setIsViewModalOpen(false);

  const handlePageSize = (val: number) => setPageSize(val);

  const handleCurrentPage = (val: number) => setCurrentPage(val);


  return {
  
    product,
  
    setProduct,
  
    isViewModalOpen,
  
    search,
  
    totalResults: allProductSlice.total,
  
    showFilter,
  
    pageSize,
  
    currentPage,
  
    setCurrentPage,
  
    filterParams,
  
    currentUser,
  
    allProducts,
  
    isLoading: allProductSlice.loading,
  
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
