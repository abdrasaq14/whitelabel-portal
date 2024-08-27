import {BiEnvelope, BiSolidDownArrow} from "react-icons/bi";
import {IoCall, IoHelpCircleOutline, IoSearchOutline} from "react-icons/io5";
import {MdFavoriteBorder} from "react-icons/md";
import {PiShoppingCartSimpleBold} from "react-icons/pi";
import {GrMenu, GrTwitter} from "react-icons/gr";
import Item from "./Item";
import {ImFacebook} from "react-icons/im";
import {TbBrandInstagram} from "react-icons/tb";
import inventory from "./DummyProduct";
import BannerTemplate from "../LivePreviewComponent/bannerTemplates";



export default function LivePreview({data, stage}: any) {
    const {primaryColor, secondaryColor, footerColor} = data.theme;
    const {email, phone} = data.contact;
    const {logo} = data.image;
    const {shortText} = data.aboutUs;

    return (
        <>
            <div className="bg-primary col-start-3 col-end-6 p-5">
                <p className="text-[#FFFFFF] text-[18px] tracking-tighter leading-6 font-satoshiBold">Live Preview</p>

                <div className="w-full mt-10">
                    {stage === 1 && <div className="flex p-2 w-full bg-[#380062] items-center" style={{ backgroundColor: primaryColor }}>
                        <div className="flex items-center px-10">
                            <BiEnvelope color="#ffffff" size={14}/>
                            <span className="text-[#ffffff] text-[12px] mx-2">{email.supportEmail}</span>
                        </div>
                        <div className="flex items-center px-3">
                            <IoCall color="#ffffff" size={14}/>
                            <span className="text-[#ffffff] text-[12px] mx-2">{phone}</span>
                        </div>
                    </div>}

                    {stage === 1 && <div className="bg-[#ffffff] px-10 py-3">
                        <div className="grid grid-cols-7">
                            <div className="col-start-1 col-end-3"><img alt="logo" src={data.image.logo}
                                                                        style={{maxWidth: 60}}/></div>
                            <div className="col-start-3 col-end-5 flex justify-center items-center">
                                <div
                                    className={`border border-[${primaryColor}] w-full h-[35px] flex justify-between items-center pl-2 rounded-md`}>
                                    <span
                                        className="font-satoshi text-[14px] text-[#6F7174] leading-5 tracking-tighter">Search</span>
                                    <div
                                        className={`h-[35px] w-[35px] items-center justify-center flex bg-[${primaryColor}] rounded-r-md`}>
                                        <IoSearchOutline size={20} color="#ffffff"/></div>
                                </div>
                            </div>
                            <div className="col-start-5 col-end-8 flex justify-between items-center pl-16">
                                <PiShoppingCartSimpleBold size={18} color={primaryColor} className="font-extrabold"/>
                                <MdFavoriteBorder size={18} color={primaryColor}/>
                                <div className="flex items-center"><IoHelpCircleOutline size={18} color={primaryColor}/>
                                    <span className={`text-[${primaryColor}] text-[12px] font-satoshi`}>Help</span>
                                </div>
                                <div className="flex items-center">
                                    <div
                                        className={`w-[30px] h-[30px] bg-[${primaryColor}] rounded-full flex justify-center items-center`}>
                                        <img src="/icons/user_icon.svg" className="w-[80%] h-[80%]"/></div>
                                    <span className={`ml-1 text-[${primaryColor}] text-[12px] font-satoshi`}
                                          style={{color: primaryColor}}>Jane Bella</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center mt-2">
                            <div className="flex items-center">
                                <GrMenu color={primaryColor} size={18}/>
                                <span className="font-satoshiMedium mx-2" style={{color: primaryColor}}>All</span>
                                <BiSolidDownArrow color={primaryColor} size={18}/>
                            </div>
                            {data.services.map((service: string, index: number) => <span key={index}
                                                                                                 className="font-satoshiRegular mx-7"
                                                                                                 style={{color: primaryColor}}>{service}</span>)}
                        </div>
                    </div>}

                    {stage === 1 && (
                        <BannerTemplate primaryColor={ primaryColor} secondaryColor={secondaryColor} heroImage={data.banner.imageUrl} heroText={data.banner.text} template={data.banner.tempate === "Template 3" ? 2 : data.banner.tempate === "Template 2" ? 1 : 0 } />
                    )
                    //     <div className={"w-full h-[220px] grid grid-cols-2"} style={{ backgroundColor: secondaryColor }}>
                    //     <div className="h-[220px] flex flex-col justify-center items-end">
                    //         <div className="w-[100%] flex justify-end">
                    //             <p className="text-[18px] font-satoshi w-[80%]">One - Stop Online Shopping on LandMart
                    //                 for all your Basic Needs</p>
                    //         </div>
                    //         <div className="w-[80%] flex">
                    //             <button onClick={() => {
                    //             }}
                    //                     className='mt-1 text-white text-center px-7 py-1 rounded font-satoshiMedium inline-flex items-center justify-center'
                    //                     style={{backgroundColor: primaryColor}}>Explore
                    //             </button>
                    //         </div>
                    //     </div>
                    //     <div className="h-[220px] flex flex-col justify-center items-center"><img
                    //         src="/banner_img.svg"/></div>
                    // </div>
                    }

                    {stage === 1 && <div className="w-full bg-[#ffffff] px-10 py-5">
                        <h2 className="font-satoshi text-[14px] text-[#2B2C34] leading-2 tracking-tighter">Explore
                            Categories</h2>
                        <div className="flex items-center mt-3 justify-between items-center">
                            <div className="flex flex-col items-center">
                                <p className="h-[53px] w-[53px] rounded-full flex justify-center items-center text-[#ffffff] font-satoshi text-[12px]"
                                   style={{backgroundColor: primaryColor}}>All</p>
                                <p className="text-[#000000] text-[10px]">All</p>
                            </div>
                            <img src="/images/cat1.svg"/>
                            <img src="/images/cat2.svg"/>
                            <img src="/images/cat3.svg"/>
                            <img src="/images/cat4.svg"/>
                            <img src="/images/cat5.svg"/>
                            <img src="/images/cat6.svg"/>
                            <img src="/images/cat7.svg"/>
                        </div>
                    </div>}

                    <div className="w-full bg-[#ffffff] px-10 py-5">
                        <h2 className="font-satoshi text-[14px] text-[#2B2C34] leading-2 tracking-tighter">Dummy Data</h2>
                        <div className="grid grid-cols-4 gap-4 mt-5">
                            {inventory.map((item, index) => <Item key={index} itemData={item} color={primaryColor}/>)}
                        </div>
                    </div>

                    {stage === 2 && <div className="bg-[#ffffff] pt-10 px-10">
                        <div className="text-center text-[18px] font-satoshi" style={{color: primaryColor}}>About Us</div>
                        <div className="text-[12px] text-center mt-5 w-full border text-balance">{shortText}</div>

                        <div className="mt-10 grid grid-cols-4 gap-5">
                            <div className="flex items-center justify-around p-2 border rounded-md"
                                 style={{borderColor: primaryColor}}>
                                <img src="/images/lock.svg"/>
                                <span className="font-satoshiRegular text-[#006600] text-[12px]"
                                      style={{color: primaryColor}}>Secure Payment</span>
                            </div>
                            <div className="flex items-center justify-around p-2 border rounded-md"
                                 style={{borderColor: primaryColor}}>
                                <img src="/images/truck-fast.svg"/>
                                <span className="font-satoshiRegular text-[#006600] text-[12px]"
                                      style={{color: primaryColor}}>Fast Delivery</span>
                            </div>
                            <div className="flex items-center justify-around p-2 border rounded-md"
                                 style={{borderColor: primaryColor}}>
                                <img src="/images/tick-circle.svg"/>
                                <span className="font-satoshiRegular text-[12px]" style={{color: primaryColor}}>100% Guarantee</span>
                            </div>
                            <div className="flex items-center justify-around p-2 border rounded-md"
                                 style={{borderColor: primaryColor}}>
                                <img src="/images/hand.svg"/>
                                <span className="font-satoshiRegular text-[#006600] text-[12px]"
                                      style={{color: primaryColor}}>Reliable Service</span>
                            </div>
                        </div>
                    </div>}

                    {stage === 2 && <div className="bg-[#ffffff] pt-5">
                        <p style={{backgroundColor: primaryColor}}
                           className="h-[40px] w-full font-satoshiMedium text-[12px] flex justify-center items-center text-[#ffffff] mt-10">Back
                            to top</p>
                    </div>}

                    <div className="p-10 grid grid-cols-2" style={{backgroundColor: footerColor}}>
                        <div className="flex flex-col">
                            <img src={logo} style={{maxWidth: 100}}/>
                            <p className="font-satoshiMedium mt-5 text-[14px] text-[#ffffff] leading-2 tracking-tight">New to Landmark</p>
                            <p className="font-satoshiRegular text-[12px] text-[#ffffff] leading-2 tracking-tight">Subscribe to our newsletter to get updates on our new offers</p>
                            <div className="flex mt-3">
                                <div className="w-[70%] bg-[#ffffff] h-[30px] rounded-l-md text-[12px] px-5 flex items-center font-satoshiMedium">Enter your email address</div>
                                <div className="w-[30%] h-[30px] rounded-r-md text-[12px] text-[white] font-satoshiRegular flex justify-center items-center" style={{backgroundColor: primaryColor}}>Subscribe</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-[#ffffff] font-satoshiMedium text-[14px]">Company</p>
                            <p className="text-[#ffffff] font-satoshiRegular text-[12px]">About Us</p>
                            <p className="text-[#ffffff] font-satoshiRegular text-[12px]">Terms and Conditions</p>
                            <p className="text-[#ffffff] font-satoshiRegular text-[12px]">Register/Login</p>

                            <p className="text-[#ffffff] font-satoshiMedium text-[14px] mt-5">Help Center</p>
                            <p className="text-[#ffffff] font-satoshiRegular text-[12px]">Contact Us</p>
                            <p className="text-[#ffffff] font-satoshiRegular text-[12px]">F.A.Q</p>
                            <p className="text-[#ffffff] font-satoshiRegular text-[12px]">Help Center</p>

                            <div className="flex mt-5 gap-3 items-center">
                                <span className="text-[#ffffff] font-satoshiRegular text-[12px]">JOIN US ON</span>
                                <ImFacebook color={"#ffffff"} size={12} />
                                <TbBrandInstagram color={"#ffffff"} size={12} />
                                <GrTwitter color={"#ffffff"} size={12} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
