import CopyToClipboard from "@/components/feedbacks/CopytoClipboard";
import StarRating from "@/components/feedbacks/StarRating";
import AppButton from "@/components/forms/AppButton";
import { ProductImageCarousel } from "@/components/products/ProductCarousel";
import AppModal from "@/components/utilities/AppModal";
import { ButtonType } from "@/enums/ComponentEnums";
import React, { useEffect, useRef, useState } from "react";
import { ConfirmModal } from "./ConfirmModal";
import { stripHtml } from "@/utilities/helperFunctions";
import useViewProduct from "@/customHooks/Products/useViewProduct";
import Categories from "../products/Categories";

interface ViewProductModalProps {
  product: any;
  closeViewModal: () => void;
  isOpen: boolean;
}
export const ViewProductModal: React.FC<ViewProductModalProps> = ({
  product,
  closeViewModal,
  isOpen
}) => {
  const {
    isRequested,
    isLoading,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    toggleProductBan,
    handleAddProduct,
    handleProductAddedSuccess,
    currentUser
  } = useViewProduct({ product, isOpen, closeViewModal });
  return (
    <AppModal isOpen={isOpen} hasClose={true} closeClicked={closeViewModal}>
      <div className="grid grid-cols-2 w-full gap-8">
        <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
          <ProductImageCarousel
            media={[product?.image, ...(product?.gallery_image || [])]}
          />
        </div>
        <div className="col-span-2 sm:col-span-1 flex flex-col gap-4 ">
          <div className="w-full flex justify-between font-satoshiBold text-accent-darker items-center">
            <h1 className=" text-2xl">{product.name}</h1>
            <p className="text-sm ">N{product.price}</p>
          </div>
          <p className="text-primary-subtext font-normal text-sm">
            {product.caption}
          </p>
          <div className="flex justify-between">
            <div>
              <h2 className="font-bold font-satoshiBold text-sm text-primary-subtext">
                Product Type
              </h2>
              <p className="text-primary text-xs bg-foundation-lightPurple px-2 py-1 w-auto text-center mt-2 ">
                {product.type} Product
              </p>
            </div>
            <div>
              <h2 className="font-bold font-satoshiBold text-sm text-primary-subtext">
                Categories
              </h2>
              <div className="w-auto flex gap-2 mt-2">
                <Categories categories={product.categories} />
              </div>
            </div>
          </div>
        </div>
        <div className=" col-span-2 w-full  flex flex-col mt-8 gap-4">
          <h2 className="font-bold font-satoshiBold text-base text-accent-darker">
            Product Description
          </h2>
          <p className="text-primary-subtext font-normal text-sm">
            {product?.description &&
              product?.description.trim() &&
              stripHtml(product?.description)}
          </p>
          <div>
            <h2 className="font-bold font-satoshiBold text-base text-accent-darker">
              Merchant Description
            </h2>
            <div className="mt-4">
              <p className="font-medum font-satoshiMedium text-sm text-primary-subtext">
                Store Name
              </p>
              <p className="mt-1 text-accent-darker text-base font-medum font-satoshiMedium ">
                {product.businessName ?? product.merchantName}
              </p>
            </div>
            <div className="mt-4">
              <p className="font-medum font-satoshiMedium text-sm text-primary-subtext">
                Rating
              </p>
              <div className="flex gap-2 items-center mt-1">
                <p className=" text-accent-darker text-base font-medum font-satoshiMedium">
                  {product.rating}/5
                </p>
                <StarRating totalRatings={product.rating} />
              </div>
            </div>
            <div>
              <p className="font-medum font-satoshiMedium text-sm text-primary-subtext">
                Store Link
              </p>
              <div className=" flex justify-between w-full">
                <p className="text-accent-darker text-base font-medum font-satoshiMedium">
                  {product.storeLink}
                </p>
                <CopyToClipboard text={product.storeLink} />
              </div>
            </div>
            <div className="mt-4 w-full">
              <p className="font-medum font-satoshiMedium text-sm text-primary-subtext">
                Product Categories
              </p>
              <Categories categories={product.categories} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-between gap-4">
        <div className="gap-4 flex w-full justify-between">
          {currentUser?.user?.role !== "Staff" && !isLoading && (
            <div className="flex gap-4 justify-between w-full">
              {isRequested ? (
                <div className="flex justify-between w-full items-center  mt-4">
                  <span className="text-red-400 p-2 rounded-lg">
                    Product already requested
                  </span>
                  <AppButton
                    type={isLoading ? ButtonType.DISABLED : ButtonType.PRIMARY}
                    loader={{ loading: isLoading }}
                    text={
                      product.status !== "ACTIVE"
                        ? "Unban product"
                        : "Ban product"
                    }
                    handleClick={toggleProductBan}
                    disabled={false}
                    style={` text-sm inline-flex gap-2 rounded-lg items-center justify-center text-center   px-12 py-3  font-medium ${
                      product.status == "ACTIVE"
                        ? "border-[1px] border-red-500  bg-red-500 text-white"
                        : "text-white bg-green-500 hover:bg-green-800"
                    } `}
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleAddProduct}
                  disabled={false}
                  className={` text-sm inline-flex gap-2 rounded-lg items-center justify-center text-center   px-12 py-3  font-medium bg-primary text-white`}
                >
                  Add Product
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        closeModal={() => setIsConfirmModalOpen(false)}
        caption="Are you sure you want to add this Product ?"
        confirmAddition={handleProductAddedSuccess}
      />
    </AppModal>
  );
};
