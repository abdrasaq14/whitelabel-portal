import { useRef, useState } from "react";
import AppModal from "../utilities/AppModal";
import useOnClickOutside from "@/customHooks/useClickOutside";
import { MdOutlineArrowForward } from "react-icons/md";
import AppButton from "../forms/AppButton";
import { ButtonType } from "@/enums/ComponentEnums";
interface SuspendModalProps {
  isOpen: boolean;
  closeModal: () => void;
  confirmDelete: (reason: string) => void;
  merchant: any;
}
export const SuspendModal = ({
  isOpen,
  closeModal,
  confirmDelete,
  merchant
}: SuspendModalProps) => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [reason, setReason] = useState("");

  const modalRef = useRef<any>();
  useOnClickOutside(modalRef, () => {
    closeModal();
  });

  const handleConfirmDelete = async () => {
    await confirmDelete(reason);
    closeModal();
    setIsConfirm(false);
  };

  return (
    <AppModal isOpen={isOpen} closeClicked={closeModal} hasClose={true}>
      {isConfirm ? (
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-medium">
            Please provide a reason to suspend this account to sell on this
            platform
          </h3>

          <div className="mt-4 w-full">
            <label className="text-xs text-gray-600">
              Kindly provide a reason
            </label>
            <textarea
              onChange={(e) => setReason(e.target.value)}
              className="w-full mt-1 text-sm h-[90px] px-3 py-3 border rounded focus:outline-none"
              placeholder="Provide reason"
            />
          </div>
          <div className="w-full flex mt-4 justify-center gap-2  ">
            <AppButton
              text="Cancel"
              handleClick={() => closeModal()}
              type={ButtonType.SECONDARY}
            />
            <AppButton
              handleClick={handleConfirmDelete}
              text="Submit"
              type={ButtonType.PRIMARY}
              //   icon={<MdOutlineArrowForward size={12} />}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="">
            <img
              src="/images/delete-staff.svg"
              alt="Delete Staff"
              className="max-h-[280px]"
            />
          </div>
          <div>
            <p className="text-red-400 mt-4 text-sm text-center  sm:text-base font-satoshiMedium">
              Are you sure you want to suspend this Account ?
            </p>
          </div>
          <div className="w-full flex mt-4 gap-4 justify-between  ">
            <AppButton
              text="Cancel"
              handleClick={() => closeModal()}
              type={ButtonType.SECONDARY}
            />
            <AppButton
              text="Yes"
              handleClick={() => setIsConfirm(true)}
              type={ButtonType.PRIMARY}
              //   icon={<MdOutlineArrowForward size={12} />}
/>
          </div>
        </>
      )}
    </AppModal>
  );
};
