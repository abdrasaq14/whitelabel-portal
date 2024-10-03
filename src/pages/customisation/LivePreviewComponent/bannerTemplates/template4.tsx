import { Link } from "react-router-dom";


interface Template4Props {
  primaryColor: string;
  secondaryColor: string;
  heroImage?: string;
  heroText: string;
}

const Template4 = ({
  primaryColor,
  secondaryColor,
  heroImage,
  heroText
}: Template4Props) => {
  const defaultHeroImage = "/blogimage.svg";
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
          className="font-bold font-satishiMedium text-xl w-[80%] mx-auto text-center text-[16px] text-white leading-7 mb-4"
          dangerouslySetInnerHTML={{
            __html: heroText
              ? heroText
              : "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          }}
        />
        <img src="/searchBox.svg"/>
      </div>
    </div>
  );
};

export default Template4;
