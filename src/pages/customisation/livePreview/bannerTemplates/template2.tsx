import { Link } from "react-router-dom";
import { HeroImage } from "../../../../assets/customisation";

interface BannerTemplateProps {
  primaryColor: string;
  secondaryColor: string;
  heroImage?: string;
  heroText: string;
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
      <div className="col-span-1 flex overflow-hidden">
        <div className="flex justify-center items-center h-full w-full">
          <img
            src={heroImage ? heroImage : HeroImage}
            alt="Hero"
            className=" h-full max-h-[260px] sm:w-full sm:h-full object-contain"
          />
        </div>
      </div>
      <div className="col-span-1  flex flex-col gap-4 justify-center items-center sm:items-start  ">
        <h3
          className="font-semiBold text-xl text-center sm:text-start text-black leading-8"
          dangerouslySetInnerHTML={{
            __html: heroText ? heroText : "Lorem ipsum dolor sit"
          }}
        />
        <Link
          to={""}
          style={{ backgroundColor: primaryColor }}
          className=" py-2 text-white rounded-md w-[150px] text-center "
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default BannerTemplate;
