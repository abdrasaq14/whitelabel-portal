import React from "react";
import Template1 from "./template1";
import Template2 from "./template2";
import Template3 from "./template3";

interface BannerTemplateProps {
  scrollRef?: React.RefObject<HTMLDivElement>;
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
  template,
}: BannerTemplateProps) {
  const renderTemplate = () => {
    switch (template) {
      case 0:
        return (
          <Template1
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            heroImage={heroImage}
            heroText={heroText}
          />
        );
      case 1:
        return (
          <Template2
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            heroImage={heroImage}
            heroText={heroText}
          />
        );
      case 2:
        return (
          <Template3
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            heroImage={heroImage}
            heroText={heroText}
          />
        );
      default:
        return (
          <Template1
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            heroImage={heroImage}
            heroText={heroText}
          />
        );
    }
  };

  return <div ref={scrollRef}>{renderTemplate()}</div>;
}

export default BannerTemplate;
