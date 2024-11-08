import React from "react";
import AppModal from "@/components/utilities/AppModal";
import { AxiosResponse } from "axios";
import { depressedEmoji } from "../../../../public/images/blog";
import AppButton from "../../forms/AppButton";
import { ButtonType } from "@/enums/ComponentEnums";
import { UseMutationResult } from "react-query/types/react/types";

interface BlogModalProps {
  isOpen: boolean;
  handleClose: () => void;
  modalTitle: string;
  handleDeleteApi: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    string,
    unknown
  >;
  idToDelete: string;
}
const DeleteBlogModal: React.FC<BlogModalProps> = ({
  isOpen,
  handleClose,
  handleDeleteApi,
  modalTitle,
  idToDelete
}) => {
  return (
    <AppModal hasClose={true} isOpen={isOpen} closeClicked={handleClose}>
      <div className="flex flex-col items-center justify-between w-full lg:min-w-[450px] h-full px-8 rounded-md">
        <div className="flex-1 h-[65%] flex items-center justify-center ">
          <img
            src={depressedEmoji.src}
            alt=""
            className="max-h-[15rem] w-full h-full object-cover"
          />
        </div>
        <p className="text-primary-text font-black text-xl text-center my-2">
          Oopss!!!
        </p>
        <span className="text-primary-text w-[80%] text-center mx-auto">
          {modalTitle}
        </span>

        <div className="w-full flex justify-between items-center gap-4 mt-6 mb-4">
          <AppButton
            disabled={handleDeleteApi.isLoading}
            text={`${
              handleDeleteApi.isLoading ? "Deleting..." : "Yes Proceed"
            }`}
            handleClick={() => handleDeleteApi.mutate(idToDelete)}
            type={
              handleDeleteApi.isLoading
                ? ButtonType.DISABLED
                : ButtonType.SECONDARY
            }
            style="border w-[50%] border-primary font-semibold rounded-md !text-primary p-2"
          />
          <AppButton
            disabled={handleDeleteApi.isLoading}
            text="No"
            handleClick={handleClose}
            type={
              handleDeleteApi.isLoading
                ? ButtonType.DISABLED
                : ButtonType.PRIMARY
            }
          />
        </div>
      </div>
    </AppModal>
  );
};

export default DeleteBlogModal;
