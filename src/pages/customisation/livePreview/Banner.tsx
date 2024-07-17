import { Link } from "react-router-dom";
import { HeroImage } from "../../../assets/customisation";

interface BannerTemplateProps {
  primaryColor: string;
  secondaryColor: string;
  heroImage?: string;
  heroText?: string;
}
const BannerTemplate = ({
  primaryColor,
  secondaryColor,
  heroImage,
  heroText
}: BannerTemplateProps) => {
  return (
    <div
      style={{ backgroundColor: secondaryColor }}
      className="max-w-[1560px] mx-auto grid grid-cols-1 sm:grid-cols-2 p-4 md:px-[36px] h-[260px] gap-4"
    >
      <div className="col-span-1  flex flex-col gap-4 justify-center items-center sm:items-start order-2 ">
        <h3 className="font-medium font-satoshiMedium text-xl text-center sm:text-start sm:text-2xl lg:text-4xl text-black leading-10 ">
          {heroText
            ? heroText
            : "Lorem ipsum dolor sit"}
        </h3>
        <Link
          to={""}
          style={{ backgroundColor: primaryColor }}
          className=" py-2 text-white rounded-md w-[250px] text-center "
        >
          Explore
        </Link>
      </div>
      <div className="col-span-1 flex order-1 sm:order-2">
        <div className="flex justify-center items-center h-full w-full">
          <img
            src={HeroImage}
            alt="Hero"
            className=" h-[179px] w-[208px] sm:w-full sm:h-full max-h-[334.76px]"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerTemplate;
