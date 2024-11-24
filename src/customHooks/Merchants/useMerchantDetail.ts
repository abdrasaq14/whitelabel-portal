import { useEffect, useState } from "react";
import useStorage from "../useStorage";
import { IQueryParams } from "@/interfaces/AppInterfaces";
import { MerchantService } from "@/services/merchant";
import toast from "react-hot-toast";

const useMerchantDetails = (merchantId: string) => {
    //   console.log("fetching merchant detailsHook", merchantId);
  const [product, setProduct] = useState({});

  const [allProducts, setAllProduct] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [totalResults, setTotalResults] = useState(0);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [pageSize, setPageSize] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const [merchant, setMerchant] = useState<any>({});
  const { currentUser } = useStorage();

  const accountTabTitle = ["Overview", "All Products", "Product Sold"];
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isSuspendOpen, setIsSuspendOpen] = useState(false);
  
    const fetchMerchantDetails = async () => {
    try {
      const res: any = await MerchantService.getMerchantDetails(merchantId);
      console.log(res, "merchant details");
      if (res.data.result) {
        setIsLoading(false);
        setMerchant(res.data.result);
      }
    } catch (error) {
        console.log("fetching merchant detailsHookError", error);
      setIsLoading(false);
    }
  };

  const SuspendMerchant = async (reason: string, action:'suspend' | 'unsuspend') => {
    try {
      const values = {
        action,
        platform: currentUser.user.whiteLabelName,
        reason: reason
      };
      const res: any = await MerchantService.suspendMerchant(
        values,
        merchantId
      );
      if (res.data.result) {
        toast.success(action === 'suspend' ? "account suspended" : "account unsuspended");
        return;
      }
      toast.error(action === 'suspend' ? "Failed to suspend account" : "Failed to unsuspend account");  
    } catch (error: any) {
      toast.error(error || "An error occured");
    }
  };

  const fetchMerchantProducts = async (query: IQueryParams) => {
    const res: any = await MerchantService.getMerchantProducts(query);

    if (res.data.result.results) {
      setAllProduct(res.data.result.results);
      setTotalResults(res.data.result.totalPages);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (currentUser?.user?.whiteLabelName) {
      //   setIsLoading(true);
      fetchMerchantProducts({
        merchantId,

        limit: pageSize,

        page: currentPage
      });
    }
  }, [merchantId, pageSize, currentPage]);


    useEffect(() => {
      console.log("fetching merchant detailsHook", merchantId);
    fetchMerchantDetails();
  }, []);
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
    currentUser
  };
};

export default useMerchantDetails;
