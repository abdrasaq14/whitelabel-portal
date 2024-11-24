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
          <div className="w-full flex mt-4 justify-between  ">
            <button
              type="button"
              onClick={() => closeModal()}
              disabled={false}
              className="border-primary-subtext border-[1px] rounded-lg text-primary text-sm inline-flex gap-2  items-center justify-center text-center sm:w-[40%] px-8 py-3 font-medium hover:bg-purple-700 hover:text-white "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => setIsConfirm(true)}
              disabled={false}
              className="bg-primary hover:bg-purple-700 rounded-lg text-white text-sm inline-flex gap-2  items-center justify-center text-center  sm:w-[40%] px-12 py-3  font-medium "
            >
              Yes{" "}
              <span>
                <MdOutlineArrowForward size={12} />
              </span>
            </button>
          </div>
        </>
      )}
    </AppModal>
  );
};
