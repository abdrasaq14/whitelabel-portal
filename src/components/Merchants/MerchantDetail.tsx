"use client"
import useFetchMerchantDetails from "@/customHooks/Merchants/useMerchantDetail";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { BreadCrumbClient } from "../Breadcrumb";
import { ButtonType, SpinnerType } from "@/enums/ComponentEnums";
import Spinner from "../feedbacks/Spinner";
import AppButton from "../forms/AppButton";
import { SuspendModal } from "../modals/SuspendMerchantModal";
import Products from "./MerchantProduct";
import ProductsSold from "./MerchantProductSold";
import Overview from "./Overview";
import { IoArrowBack } from "react-icons/io5";
import { getStatusById } from "@/utilities/helperFunctions";

function MerchantDetail() {
  const { id }: any = useParams();
  const router = useRouter();
  const getReason = (action: string) => {
    return action === "suspend"
      ? "unauthorized product"
      : "suspension reviewed";
  };
  const {
    allProducts,
    totalResults,
    currentPage,
    setCurrentPage,
    isLoading,
    isViewModalOpen,
    product,
    closeViewModal,
    merchant,
    fetchMerchantDetails,
    accountTabTitle,
    tabIndex,
    setTabIndex,
    isSuspendOpen,
    setIsSuspendOpen,
    SuspendMerchant,
    // startConversation,
    currentUser
  } = useFetchMerchantDetails(id);
     
    console.log("fetching merchant detailsMerchant", merchant, id);
  const displayAccountContent = (tabIndex: number) => {
    switch (tabIndex) {
      case 0:
        return <Overview merchant={merchant} />;
      // return <BioProfile />
      case 1:
        return <Products id={id} />;
      case 2:
        return <ProductsSold id={id} />;
      default:
        return <Overview merchant={merchant} />;
      // return <BioProfile />
    }
  };
  return (
    <div className="px-4 pt-8 h-full">
      <div className="flex items-center gap-6">
        <button
          onClick={() => router.back()}
          className="flex items-center -mt-6 text-accent-darker gap-2"
        >
          <IoArrowBack size={14} />
          Back
        </button>
        <BreadCrumbClient
          backText="All Merchants"
          currentPath="Account Details"
          brand="Landmark"
        />
      </div>

      <div className="my-6 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={
                merchant && merchant?.image && merchant?.image.trim()
                  ? merchant?.image
                  : "/images/no-profile-pics.jpg"
              }
              className="w-8 h-8 bg-gray-500 border-primary border rounded-full"
            />

            <span className="h-2 w-2 absolute rounded-full bottom-0  right-0 bg-green-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-accent-darker">
              {merchant && merchant?.businessName}
            </h3>
            <a
              target="_blank"
              href={`https://www.mymarketsq.com//${
                merchant && merchant?.userName
              }`}
              className="text-xs text-[#6F7174]"
            >{`https://www.mymarketsq.com/${
              merchant && merchant?.userName
            }`}</a>
          </div>
          <button
            className="border border-primary flex items-center text-sm rounded bg-white p-2 text-accent-light whitespace-nowrap"
            onClick={() => {}}
          >
            Message Merchant{" "}
            {isLoading && (
              <Spinner type={SpinnerType.PRIMARY} height={15} width={15} />
            )}
          </button>
        </div>
        {currentUser?.role !== "Staff" && (
          <>
            {merchant &&
            merchant?.platformAccess &&
            getStatusById(
              merchant?.platformAccess,
              currentUser?.whiteLabelName.toUpperCase()
            ) == "active" ? (
              <AppButton
                type={isLoading ? ButtonType.DISABLED : ButtonType.PRIMARY}
                text="Suspend Merchant"
                handleClick={() => setIsSuspendOpen(true)}
                style="p-2 !max-w-[10rem] font-semibold text-sm rounded !bg-[#F03738]  text-white"
              />
            ) : (
              <AppButton
                type={isLoading ? ButtonType.DISABLED : ButtonType.PRIMARY}
                text="Activate Merchant"
                handleClick={() => SuspendMerchant(getReason("unsuspend"), 'unsuspend')}
                style="p-2 !max-w-[10rem] font-semibold text-sm rounded !bg-[#0F973D]  text-white"
              />
            )}
          </>
        )}
      </div>
      <div className="pt-4 pb-10 px-6 rounded-2xl mx-2">
        <div className="flex items-center mb-10 justify-between gap-10 border-b w-full">
          <div className="flex items-center w-5/6 gap-2 flex-wrap">
            {accountTabTitle.map((val, index) => (
              <button
                key={index}
                type="button"
                className={`py-3 px-6 border-b-2 border-b-transparent !rounded-none hover:text-accent-darker focus:text-accent-darker active:text-accent-darker transition-all
                    ${
                      tabIndex === index && "text-[#470E81] !border-b-[#470E81]"
                    }
                    ${tabIndex !== index && "text-[#6C6C73]"}
                  `}
                onClick={() => setTabIndex(index)}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
        {displayAccountContent(tabIndex)}
      </div>
      <SuspendModal
        confirmDelete={() => {
          SuspendMerchant(getReason("suspend"), 'suspend');
        }}
        isOpen={isSuspendOpen}
        closeModal={() => setIsSuspendOpen(false)}
        merchant={merchant ?? {}}
      />
    </div>
  );
}

export default MerchantDetail;
