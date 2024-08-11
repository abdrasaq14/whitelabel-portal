/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import BannerTemplate from "./bannerTemplates";
import inventory from "../Setup/DummyProduct";
import Item from "../Setup/Item";
import { BiEnvelope, BiSolidDownArrow } from "react-icons/bi";
import { IoCall, IoHelpCircleOutline, IoSearchOutline } from "react-icons/io5";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { MdFavoriteBorder } from "react-icons/md";
import { GrMenu } from "react-icons/gr";

interface BannerTemplateProps {
  scrollRef: React.RefObject<HTMLDivElement>;
  primaryColor: string;
    secondaryColor: string;
  heroImage: string;
  heroText: string;
  template: number;
  data: any;
}
function LivePreview({
  scrollRef,
  primaryColor,
  secondaryColor,
  heroImage,
  heroText,
  template,
  data
}: BannerTemplateProps) {
  useEffect(() => {
  
console.log("changed", heroImage)
}, [heroImage])

  return (
    <div className="bg-white h-full w-[98%] flex flex-col">

        <div
          className={`h-[2rem] w-full px-5 py-1 flex justify-start items-center`}
          style={{ backgroundColor: primaryColor }}
        >
          <div className="flex items-center">
            <BiEnvelope color="#ffffff" size={12} />
            <span className="text-[#ffffff] text-[12px] mx-2">
              {data.contact.email.supportEmail || "example@support.com"}
            </span>
          </div>
          <div className="flex items-center">
            <IoCall color="#ffffff" size={12} />
            <span className="text-[#ffffff] text-[12px] mx-2">
              {data.contact.phone || "08010000000"}
            </span>
          </div>
        </div>


      <div className="bg-[#ffffff] px-5 py-3">
        <div className="grid grid-cols-7">
          <div className="col-start-1 col-end-3">
            <img alt="logo" src={data.image.logo} style={{ maxWidth: 100 }} />
          </div>
          <div className="col-start-3 col-end-5 flex justify-center items-center">
            <div
              className={`border border-[${primaryColor}] w-full h-[35px] flex justify-between items-center pl-2 rounded-md`}
            >
              <span className="font-satoshi text-[14px] text-[#6F7174] leading-5 tracking-tighter">
                Search
              </span>
              <div
                className={`h-[35px] w-[35px] items-center justify-center flex bg-[${primaryColor}] rounded-r-md`}
              >
                <IoSearchOutline size={20} color="#ffffff" />
              </div>
            </div>
          </div>
          <div className="col-start-5 col-end-8 flex justify-between items-center pl-16">
            <PiShoppingCartSimpleBold
              size={18}
              color={primaryColor}
              className="font-extrabold"
            />
            <MdFavoriteBorder size={18} color={primaryColor} />
            <div className="flex items-center">
              <IoHelpCircleOutline size={18} color={primaryColor} />
              <span
                className={`text-[${primaryColor}] text-[12px] font-satoshi`}
              >
                Help
              </span>
            </div>
            <div className="flex items-center">
              <div
                className={`w-[30px] h-[30px] bg-[${primaryColor}] rounded-full flex justify-center items-center`}
              >
                <img src="/icons/user_icon.svg" className="w-[80%] h-[80%]" />
              </div>
              <span
                className={`ml-1 text-[${primaryColor}] text-[12px] font-satoshi`}
                style={{ color: primaryColor }}
              >
                Jane Bella
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <GrMenu color={primaryColor} size={18} />
            <span
              className="font-satoshiMedium mx-2"
              style={{ color: primaryColor }}
            >
              All
            </span>
            <BiSolidDownArrow color={primaryColor} size={18} />
          </div>
          {data.services.map((service: string, idx: number) => (
            <span
              key={idx}
              className="font-satoshiRegular mx-7"
              style={{ color: primaryColor }}
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 border-[2px] border-dotted border-[#D42620] scale-105 bg-white shadow-md  animate-zoomOut">
        <BannerTemplate
          scrollRef={scrollRef}
          template={template}
          heroText={heroText}
          heroImage={heroImage}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </div>
      {/* Explore categories */}
      <div className="w-full bg-[#ffffff] px-8 py-5">
        <h2 className="font-satoshi text-[14px] text-[#2B2C34] leading-2 tracking-tighter">
          Explore Categories
        </h2>
        <div className="flex items-center mt-3 justify-between ">
          <div className="flex flex-col items-center">
            <p
              className="h-[53px] w-[53px] rounded-full flex justify-center items-center text-[#ffffff] font-satoshi text-[12px]"
              style={{ backgroundColor: primaryColor }}
            >
              All
            </p>
            <p className="text-[#000000] text-[10px]">All</p>
          </div>
          <img src="/images/cat1.svg" />
          <img src="/images/cat2.svg" />
          <img src="/images/cat3.svg" />
          <img src="/images/cat4.svg" />
          <img src="/images/cat5.svg" />
          <img src="/images/cat6.svg" />
          <img src="/images/cat7.svg" />
        </div>
      </div>

      {/* products */}
      <div className="w-full bg-[#ffffff] px-8 py-5">
        <h2 className="font-gooperRegular text-[14px] text-[#2B2C34] leading-2 tracking-tighter">
          Top Selling Products
        </h2>
        <div className="grid grid-cols-4 gap-4 mt-5">
          {inventory.map((item, index) => (
            <Item key={index} itemData={item} color={primaryColor} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LivePreview;
