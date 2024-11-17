"use client"
import { User } from "@/interfaces/AppInterfaces";
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
  const { getSessionData } = useStorage();
  const profile = getSessionData("UserData")?.user as User;
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
        platform: profile.whiteLabelName
      };
      handleToggleBan(body);
    } else {
      const body = {
        id: product._id || product.id,
        status: "unblock",
        platform: profile.whiteLabelName
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
          productOwnerId: product.userId,
          productName: product.name
        },
        whiteLabelClient: {
          whiteLabelClientId: profile._id,
          email: profile.email,
          whiteLabelName: profile.whiteLabelName
        }
      }
    ];

    handleProduct(body);
  };
  useEffect(() => {
    if (isOpen && product && profile?.whiteLabelName) {
      checkIfProductAlreadyRequested({
        productId: product.id,
        whiteLabelName: profile.whiteLabelName
      });
    }
  }, [isOpen, product, profile?.whiteLabelName]);

    return {
        isProductBan,
        isRequested,
        isLoading,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
        profile,
        // router,
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