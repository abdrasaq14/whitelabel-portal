"use client"
import { ProductService } from "@/services/product";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import useOnClickOutside from "../useClickOutside";
import useStorage from "../useStorage";
interface useViewProductProps {
    product: any;
    isOpen: boolean;
    closeViewModal: () => void;
 }
const useViewProduct = ({product, isOpen, closeViewModal}: useViewProductProps) => {
  const [isProductBan, setIsProductBan] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { currentUser } = useStorage();
  //   const navigate = useNavigate();
  console.log("ViewProductModal", product);
  const modalRef = useRef<any>();
  useOnClickOutside(modalRef, () => {
    closeViewModal();
    setIsLoading(true);
  });
  const toggleProductBan = () => {
    console.log("toggleProductBan", product);
    if (product.status === "ACTIVE") {
      const body = {
        id: product._id || product.id,
        status: "block",
        platform: currentUser?.user?.whiteLabelName
      };
      handleToggleBan(body);
    } else {
      const body = {
        id: product._id || product.id,
        status: "unblock",
        platform: currentUser?.user?.whiteLabelName
      };
      handleToggleBan(body);
    }
  };

  const handleToggleBan = async (values: any) => {
    try {
      const res: any = await ProductService.blockAndUnblockProducts(values);
      if (res.data.result) {
        toast.success(res.data.result);
        closeViewModal();
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  const checkIfProductAlreadyRequested = async (values: {
    productId: string;
    whiteLabelName: string;
  }) => {
    const res: any = await ProductService.checkIfProductAlreadyRequested(
      values
    );
    setIsLoading(false);
    if (res.data.message === "Product already requested") {
      console.log("checkingRPoductSuccessYes", res);
      setIsRequested(true);
    } else {
      setIsRequested(false);
    }
  };

  const handleAddProduct = () => {
    setIsConfirmModalOpen(true);
  };

  const handleProduct = async (values: any) => {
    try {
      const res: any = await ProductService.sendProductRequest(values);
      if (res.data.status === "Fail") {
        toast.error(res.data.message);
        return
      } else {
        setIsConfirmModalOpen(false);
        toast.success("Request to add the this product has been sent.");
        closeViewModal();
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleProductAddedSuccess = () => {
    const body = [
      {
        product: {
          productId: product.id,
          productOwnerId: product.userId.id,
          productName: product.name
        },
        whiteLabelClient: {
          whiteLabelClientId: currentUser?.user?._id,
          email: currentUser?.user?.email,
          whiteLabelName: currentUser?.user?.whiteLabelName
        }
      }
    ];

    handleProduct(body);
  };
  useEffect(() => {
    if (isOpen && product && currentUser?.user?.whiteLabelName) {
      checkIfProductAlreadyRequested({
        productId: product.id,
        whiteLabelName: currentUser?.user?.whiteLabelName
      });
    }
  }, [isOpen, product, currentUser?.user?.whiteLabelName]);

    return {
        isProductBan,
        isRequested,
        isLoading,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
        currentUser,
        modalRef,
        toggleProductBan,
        handleToggleBan,
        checkIfProductAlreadyRequested,
        handleAddProduct,
        handleProduct,
        handleProductAddedSuccess
}
}

export default useViewProduct;