"use client"
import AppModal from "@/components/utilities/AppModal";
import useOnClickOutside from "@/customHooks/useClickOutside";
import React, { useRef } from "react";
import { MdOutlineArrowForward } from "react-icons/md";

interface ConfirmModalProps {
  isOpen: boolean;
  closeModal: () => void;
  confirmAddition: any;
  caption: any;
}
export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  closeModal,
  confirmAddition,
  caption
}: any) => {
  const modalRef = useRef<any>();
  useOnClickOutside(modalRef, () => {
    closeModal();
  });

  const handleConfirmAddition = () => {
    confirmAddition();
    closeModal();
  };

  return (
    <AppModal isOpen={isOpen} closeClicked={closeModal} hasClose={true}>
      <div className="">
        <img
          src="/images/add-product.svg"
          alt="Delete Staff"
          className="max-h-[280px]"
        />
      </div>
      <div>
        <p className="text-[#2B2C34] mt-4 text-sm text-center  sm:text-base font-satoshiMedium">
          {caption}
        </p>
      </div>
      <div className="w-full flex mt-4  justify-between  ">
        <button
          type="button"
          onClick={() => closeModal()}
          disabled={false}
          className="border-primary-subtext border-[1px] rounded-lg text-accent-darker text-sm inline-flex gap-2  items-center justify-center text-center sm:w-[40%] px-8 py-3 font-medium hover:bg-purple-700 hover:text-white "
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleConfirmAddition}
          disabled={false}
          className="bg-primary hover:bg-purple-700 rounded-lg text-white text-sm inline-flex gap-2  items-center justify-center text-center  sm:w-[40%] px-12 py-3  font-medium "
        >
          Yes{" "}
          <span>
            <MdOutlineArrowForward size={12} />
          </span>
        </button>
      </div>
    </AppModal>
  );
};
