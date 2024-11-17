import React from "react";
import AppModal from "@/components/utilities/AppModal";
import { AxiosResponse } from "axios";
import { depressedEmoji } from "../../../../public/images/blog";
import AppButton from "../../forms/AppButton";
import { ButtonType } from "@/enums/ComponentEnums";
import { useAppSelector } from "@/store/hooks";

interface BlogModalProps {
  isOpen: boolean;
  handleClose: () => void;
  modalTitle: string;
  handleDeleteApi: (idToDelete: string) => void;
  idToDelete: string;
  }
const DeleteBlogModal: React.FC<BlogModalProps> = ({
  isOpen,
  handleClose,
  handleDeleteApi,
  modalTitle,
  idToDelete
}) => {
  const isLoading = useAppSelector((state) => state.blog.loading);
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
        <p className="text-accent-darker font-black text-xl text-center my-2">
          Oopss!!!
        </p>
        <span className="text-accent-darker w-[80%] text-center mx-auto">

          {modalTitle}
        </span>

        <div className="w-full flex justify-between items-center gap-4 mt-6 mb-4">
          <AppButton
            disabled={isLoading}
            text={`${
              isLoading ? "Deleting..." : "Yes Proceed"
            }`}

            handleClick={() => handleDeleteApi(idToDelete)}
            type={
              isLoading
                ? ButtonType.DISABLED
                : ButtonType.SECONDARY
            }
            style="border w-[50%] border-primary font-semibold rounded-md !text-primary p-2"
          />
          <AppButton
            disabled={isLoading}
            text="No"
            handleClick={handleClose}
            type={
              isLoading
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
