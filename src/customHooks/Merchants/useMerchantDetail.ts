import { useEffect, useState } from "react";
import useStorage from "../useStorage";
import { IQueryParams } from "@/interfaces/AppInterfaces";
import { MerchantService } from "@/services/merchant";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectMerchantDetail } from "@/store/slices/merchantDetailSlice";
import {
  fetchMerchantDetails,
  suspendMerchant,
} from "@/store/slices/merchantDetailSlice";

const useMerchantDetails = (merchantId: string) => {
  //   console.log("fetching merchant detailsHook", merchantId);
  const [product, setProduct] = useState({});
  const dispatch = useAppDispatch();
  const merchantSlice = useAppSelector(selectMerchantDetail);
  const [allProducts, setAllProduct] = useState([]);
  const [productSold, setProductSold] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const merchantLoading = merchantSlice.loading;
  const [totalResults, setTotalResults] = useState(0);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [pageSize, setPageSize] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const merchant = merchantSlice.merchant;
  const { currentUser } = useStorage();

  const accountTabTitle = ["Overview", "All Products", "Product Sold"];
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isSuspendOpen, setIsSuspendOpen] = useState(false);
console.log("TabeIndex", tabIndex);
  const fetchMerchantInfo = async () => {
    try {
      await dispatch(fetchMerchantDetails(merchantId));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const SuspendMerchant = async (
    reason: string,
    action: "suspend" | "unsuspend"
  ) => {
    try {
      const res = await dispatch(
        suspendMerchant({
          action,
          platform: currentUser.user.whiteLabelName,
          reason,
          merchantId,
        })
      );
      if (res.payload) {
        toast.success(
          action === "suspend" ? "account suspended" : "account unsuspended"
        );
        dispatch(fetchMerchantDetails(merchantId));
        return;
      }
    } catch (error: any) {
      toast.error(error || "An error occured");
    }
  };

  const fetchMerchantProducts = async (query: IQueryParams) => {
    try {
      const res: any = await MerchantService.getMerchantProducts(query);

      if (res.data.result.results) {
        setAllProduct(res.data.result.results);
        setTotalResults(res.data.result.totalPages);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const fetchProductSold = async (query: IQueryParams) => {
    try {
      const res: any = await MerchantService.getProductSoldByMerchant(query);
      if (res.data.result.results) {
        setProductSold(res.data.result.results);
        setTotalResults(res.data.result.totalPages);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
    // };
    // useEffect(() => {
    //   if (tabIndex === 1) {
    //     fetchMerchantProducts({
    //       merchantId,
    //       limit: pageSize,
    //       page: currentPage,
    //     });
    //   }
    //   if (tabIndex === 2) {
    //     fetchProductSold({
    //       merchantId,
    //       limit: pageSize,
    //       page: currentPage,
    //     });
    //   }
    // }, [merchantId, pageSize, currentPage]);

    // not ideal, i need to fix the re-render issue in the parent componentn
    useEffect(() => {
      fetchMerchantProducts({
        merchantId,
        limit: pageSize,
        page: currentPage,
      });
    }, [merchantId, pageSize, currentPage]);

    useEffect(() => {
      fetchProductSold({
        merchantId,
        limit: pageSize,
        page: currentPage,
      });
    }, [merchantId, pageSize, currentPage]);

    useEffect(() => {
      console.log("fetching merchant detailsHook", merchantId);
      if (!merchant?.businessName) {
        fetchMerchantInfo();
      }
    }, [dispatch, merchantId]);
    const closeViewModal = () => {
      setIsViewModalOpen(false);
    };

    const handlePageSize = (val: any) => {
      setPageSize(val);
      // setFilterParams({ ...filterParams, pageSize: val });
    };

    const handleCurrentPage = (val: any) => {
      setCurrentPage(val);
      // setFilterParams({ ...filterParams, pageNum: val - 1 });
    };
    const handleViewProductInfo = (row: any) => {
      setProduct(row);
      setIsViewModalOpen(true);
      console.log(row, "row");
    };
    return {
      product,
      allProducts,
      productSold,
      merchantLoading,
      isLoading,
      totalResults,
      isViewModalOpen,
      setIsViewModalOpen,
      pageSize,
      currentPage,
      setCurrentPage,
      handlePageSize,
      handleCurrentPage,
      closeViewModal,
      handleViewProductInfo,
      fetchMerchantDetails,
      merchant,
      accountTabTitle,
      tabIndex,
      setTabIndex,
      isSuspendOpen,
      setIsSuspendOpen,
      SuspendMerchant,
      // startConversation,
      currentUser: currentUser?.user,
    };
  }

export default useMerchantDetails;
