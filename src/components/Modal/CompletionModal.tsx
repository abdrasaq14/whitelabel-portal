import { CompletionImage } from "../../assets/customisation";
import { IoMdArrowForward } from "react-icons/io";


interface ICompletionModal {
  isOpen: boolean;
  handleProceed: () => void;
}
export const CompletionModal = ({
  isOpen,
  handleProceed
}: ICompletionModal) => {
  return (
    <>
      isOpen && (
      <div className="modal-background fixed top-0 left-0 right-0 bottom-0 bg-opacity-60 bg-[#1A002E]">
        <div className="flex items-center justify-around min-w-44 h-screen">
          <div
            className={`flex flex-col  sm:p-8 align-middle sm:max-w-[600px] items-center rounded z-24 w-[80%] overflow-y-auto max-h-[90%] sm:w-full h-auto gap-4 p-8 bg-white `}
          >
            <div className="w-full text-[#2B2C34] flex flex-col justify-center items-center">
              <div className="w-[80%] mx-auto">
                <img
                  src={CompletionImage}
                  alt="Completion"
                  className="object-contain"
                />
              </div>

              <p className=" font-satoshiBold sm:text-xl text-center md:w-[80%] mb-2 ">
                Congratulation, you completed your marketplace customization.
              </p>
              <p className=" font-satoshiRegular text-sm text-center">
                Enjoy, while we help customize your marketplace account
              </p>
              <button
                type="button"
                onClick={handleProceed}
                className="w-full rounded-lg mt-8  bg-foundation-darkPurple p-4 min-h-[20px] text-center flex items-center justify-center text-white"
              >
                Proceed to dashboard <IoMdArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
      )
    </>
  );
};
