import SetupHeader from "./Setup/SetupHeader";
import ColorPicker from "./Setup/ColorPicker";
import OtherServices from "./Setup/OtherServices";
import OtherInformation from "./Setup/OtherInformation";
import {FaArrowRightLong} from "react-icons/fa6";
import LivePreview from "./Setup/LivePreview";
import Spinner from "../../components/spinner/Spinner";
import React from "react";
import AddSocials from "./Setup/AddSocials";
import AboutUs from "./Setup/AboutUs";

export default function Step2({data, isLoading, setAboutData, setSocial, prev, processStage2}: any) {

    return (
        <main className="bg-[#fffefe] grid grid-cols-5 gap-4 w-[95%] h-[90%] mx-2 overflow-y-auto">
            <div className="col-start-1 col-end-3 p-3">
                <SetupHeader stage={1} prev={prev} />
                <AddSocials data={data.socialMedia} setSocial={setSocial} />
                <AboutUs data={data.aboutUs} setAboutData={setAboutData} />
                <button onClick={processStage2} className='mt-5 bg-primary w-full text-white text-center p-2.5 font-satoshiBold inline-flex items-center justify-center h-[48px]'>Continue &nbsp; {isLoading ? <Spinner color="#ffffff" /> :  < FaArrowRightLong color={"#ffffff"} size={20} className="ml-2" />}</button>
            </div>

            <LivePreview processStage2={processStage2} data={data} stage={2} />
        </main>
    );
}