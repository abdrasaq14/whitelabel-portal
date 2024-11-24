import { useState, useEffect } from "react";
import useStorage from "../useStorage";
import { MerchantService } from "@/services/merchant";

const useMerchantRequest = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const { currentUser } = useStorage();
  const profile = currentUser.user;
  const [allRequest, setAllRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterParams, setFilterParams] = useState<any>({});

  const fetchMerchantRequest = async () => {
    try {
      const data: any = await MerchantService.getMerchantRequest({
        page: currentPage,
        limit: pageSize,
        status: "pending",
        whiteLabelId: profile._id || profile.id || profile.clientId
      });
      if (data.data.result.results) {
        setIsLoading(false);
        setAllRequest(data.data.result.results);
        setTotalResults(data.data.result.totalResults);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  // console.log(allRequest)

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
      fetchMerchantRequest();
    }
  }, []);
  return {
    showFilter,
    setShowFilter,
    filterParams,
    setFilterParams,
    totalResults,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    allRequest,
    isLoading,
    setIsLoading,
    handlePageSize,
    handleCurrentPage
  };
};

export default useMerchantRequest;
