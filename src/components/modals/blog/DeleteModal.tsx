import React from "react";
<<<<<<< HEAD
import AppModal from "@/components/utilities/AppModal";
import { AxiosResponse } from "axios";
import { depressedEmoji } from "../../../../public/images/blog";
import AppButton from "../../forms/AppButton";
import { ButtonType } from "@/enums/ComponentEnums";
import { UseMutationResult } from "react-query/types/react/types";
=======
import AppModal from "../../AppModal";
import { AxiosResponse } from "axios";
import { depressedEmoji } from "../../../../public/images/blog";
import AppButton from "../../forms/AppButton";
import { ButtonType } from "@/enums/ComponentEnums";
<<<<<<< HEAD
>>>>>>> 94f4fa5 (blog module completed)
=======
import { UseMutationResult } from "react-query/types/react/types";
>>>>>>> 9a9d945 (blog module in progress)

interface BlogModalProps {
  isOpen: boolean;
  handleClose: () => void;
<<<<<<< HEAD
<<<<<<< HEAD
  modalTitle: string;
=======
>>>>>>> 9a9d945 (blog module in progress)
  handleDeleteApi: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    string,
    unknown
  >;
<<<<<<< HEAD
  idToDelete: string;
=======
  handleDeleteApi: any;
>>>>>>> 94f4fa5 (blog module completed)
=======
>>>>>>> 9a9d945 (blog module in progress)
}
const DeleteBlogModal: React.FC<BlogModalProps> = ({
  isOpen,
  handleClose,
  handleDeleteApi,
<<<<<<< HEAD
  modalTitle,
  idToDelete
=======
>>>>>>> 94f4fa5 (blog module completed)
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
<<<<<<< HEAD
          {modalTitle}
=======
          Are you sure you want to delete this post from your blog?
>>>>>>> 94f4fa5 (blog module completed)
        </span>

        <div className="w-full flex justify-between items-center gap-4 mt-6 mb-4">
          <AppButton
            disabled={handleDeleteApi.isLoading}
            text={`${
              handleDeleteApi.isLoading ? "Deleting..." : "Yes Proceed"
            }`}
<<<<<<< HEAD
            handleClick={() => handleDeleteApi.mutate(idToDelete)}
=======
            handleClick={handleClose}
>>>>>>> 94f4fa5 (blog module completed)
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
