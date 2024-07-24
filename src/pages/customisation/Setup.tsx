import SetupHeader from "./Setup/SetupHeader";
import ColorPicker from "./Setup/ColorPicker";
import OtherServices from "./Setup/OtherServices";
import OtherInformation from "./Setup/OtherInformation";
import {FaArrowRightLong} from "react-icons/fa6";
import LivePreview from "./Setup/LivePreview";
import Spinner from "../../components/spinner/Spinner";
import React from "react";

export default function Setup({data, setColor, setService, setInfo, processStage1, isLoading}: any) {

    return (
        <main className="bg-[#fffefe] grid grid-cols-5 gap-4 w-[95%] h-[90%] mx-2 overflow-y-auto">
            <div className="col-start-1 col-end-3 p-3">
                <SetupHeader stage={0} />
                <ColorPicker setColor={setColor} theme={data.theme} />
                <OtherServices data={data.services} setService={setService} />
                <OtherInformation setInfo={setInfo} contact={data.contact} />
                <button onClick={processStage1} className='mt-5 bg-primary w-full text-white text-center p-2.5 font-satoshiBold inline-flex items-center justify-center h-[48px]'>Continue {isLoading ? <Spinner color="#4B0082" /> :  < FaArrowRightLong color={"#ffffff"} size={20} className="ml-2" />}</button>
            </div>

            <LivePreview data={data} stage={1} />
        </main>
    );
}