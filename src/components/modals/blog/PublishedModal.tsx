import AppModal from "@/components/utilities/AppModal";
import { noContentImage } from "../../../../public/images/blog";
import AppButton from "../../forms/AppButton";
import { ButtonType } from "@/enums/ComponentEnums";
import { IPreviewPayload } from "@/interfaces/ComponentInterfaces";

interface BlogModalProps {
  isOpen: boolean;
  handleClose: (isView: boolean) => void;
  form?: any;
  blogDetails?: IPreviewPayload;
}
const BlogPubLishedModal: React.FC<BlogModalProps> = ({ isOpen, handleClose, form, blogDetails }) => {
  const status = form ? form.values.status : blogDetails?.status;
  return (
    <AppModal
      hasClose={true}
      isOpen={isOpen}
      closeClicked={() => handleClose(false)}
    >
      <div className="flex flex-col items-center justify-between w-full lg:min-w-[450px] h-full px-8 rounded-md">
        <div className="flex-1 h-[65%] flex items-center justify-center ">
          <img
            src={noContentImage.src}
            alt=""
            className="max-h-[15rem] w-full h-full object-cover"
          />
        </div>
        <p className="text-primary-text font-black text-xl text-center my-2">

          {status === "draft"
            ? "Saved to Draft!!! "
            : "Published!!!"}
        </p>
        {status === "published" && (
          <p className="text-primary-text">
            Your post has been published and its now live!!
          </p>
        )}
        <div className="w-full flex justify-between items-center gap-4 mt-6 mb-4">
          <AppButton
            text="Dismiss"
            handleClick={()=>handleClose(false)}
            type={
              status === "draft"
                ? ButtonType.PRIMARY
                : ButtonType.SECONDARY
            }
            style={`border border-primary font-semibold p-2 ${
              status === "draft" ? "w-full" : "w-[50%]"
            }`}
          />
         {status === "published" && (
            <AppButton
              text="View"
              handleClick={() => handleClose(true)}
              type={ButtonType.PRIMARY}
              style="border border-primary font-semibold  p-2 w-[50%]"
            />
          )}
        </div>
      </div>
    </AppModal>
  );
};

export default BlogPubLishedModal;
