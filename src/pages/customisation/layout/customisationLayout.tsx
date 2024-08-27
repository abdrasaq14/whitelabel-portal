import { LayoutOutlet } from "../../../Routes/Layout";
import { useAuth } from "../../../zustand/auth.store";

export default function CustomisationLayout() {
  const whiteLabelDetails = useAuth(
    // @ts-ignore
    (s) => s.profile?.companyLogo
  );
  return (
    <div className=" w-screen h-screen ">
      <div className="overflow-y-auto h-full flex flex-col bg-foundation-lightPurple">
        <div className="w-full hidden sm:flex justify-center items-center bg-white p-2  shadow min-h-[80px]  h-[80px] border-b-[1px] border-foundation-darkPurple ">
          <img
            alt="Client logo"
            src={whiteLabelDetails}
            width={100}
            height={18}
          />
        </div>
        <div className="flex-1 w-full flex flex-col justify-center items-center bg-foundation-lightPurple p-8">
          <LayoutOutlet />
        </div>
      </div>
    </div>
  );
}
