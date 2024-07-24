import Template1 from "./template1";
import Template2 from "./template2";
import Template3 from "./template3";

interface BannerTemplateProps {
  scrollRef: React.RefObject<HTMLDivElement>;
  primaryColor: string;
  secondaryColor: string;
  heroImage: string;
  heroText: string;
  template: number;
}
function BannerTemplate({
  scrollRef,
  primaryColor,
  secondaryColor,
  heroImage,
  heroText,
  template
}: BannerTemplateProps) {

  return (
    <div ref={scrollRef}>
      {template === 0 && (
        <Template1
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          heroImage={heroImage}
          heroText={heroText}
        />
      )}
      {template === 1 && (
        <Template2
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          heroImage={heroImage}
          heroText={heroText}
        />
      )}
      {template === 2 && (
        <Template3
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          heroImage={heroImage}
          heroText={heroText}
        />
      )}
    </div>
  );
}

export default BannerTemplate;
