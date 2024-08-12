import { Link } from "react-router-dom";
import { HeroImage } from "../../../../assets/customisation";

interface Template1Props {
  primaryColor: string;
  secondaryColor: string;
  heroImage?: string;
  heroText?: string;
}
const Template1 = ({
  primaryColor,
  secondaryColor,
  heroImage,
  heroText
}: Template1Props) => {
  return (
    <div
      style={{ backgroundColor: secondaryColor }}
      className="max-w-[1560px] mx-auto grid grid-cols-1 sm:grid-cols-[50%,50%] p-6  h-[260px] gap-4 overflow-hidden"
    >
      <div className="col-span-1 flex flex-col gap-4 justify-center items-center sm:items-start max-h-[270px]">
        <h3
          className="font-bold font-gooperSemiBold text-lg text-center sm:text-start text-red leading-8"
          dangerouslySetInnerHTML={{
            __html: heroText ? heroText : "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
      <div className="col-span-1 flex overflow-visible p-2">
        <div className="flex justify-center items-center h-full w-full">
          <img
            src={heroImage ? heroImage : HeroImage}
            alt="Hero"
            className=" h-full max-h-[270px] object-contain scale-110"
          />
        </div>
      </div>
    </div>
  );
};

export default Template1;
