import { Link } from "react-router-dom";


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
  const defaultHeroImage = "/images/heroImage.png";
  const backgroundImage = heroImage
    ? `url(${heroImage})`
    : `url(${defaultHeroImage})`;

  const containerStyles = {
    backgroundColor: secondaryColor,
    backgroundImage: `linear-gradient(
      90deg,
      rgba(43, 46, 51, 0.6) 26%,
      rgba(43, 46, 51, 0.6) 74.58%
    ), ${backgroundImage}`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  };

  return (
    <div
      style={containerStyles}
      className="max-w-[1560px] mx-auto flex items-center justify-center p-4 md:px-[36px] h-[260px] gap-4"
    >
      <div className="w-[90%] flex flex-col justify-center items-center">
        <h3
          className="font-semiBold text-xl text-center sm:text-start text-black leading-8"
          dangerouslySetInnerHTML={{
            __html: heroText ? heroText : "Lorem ipsum dolor sit"
          }}
        />
        <Link
          to={""}
          style={{ backgroundColor: primaryColor }}
          className="py-2 text-white rounded-md w-[150px] text-center"
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default BannerTemplate;
