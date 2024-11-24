"use client"
import Image from "next/image";
import LoginForm from "@/components/forms/Auth/LoginForm";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* <AppModal isOpen={true} hasClose={true} header={{title: "This is the header text", subtitle: "This is the subtitle text for the modal", type: ModalHeaderType.START}} footer={{type: ModalFooterType.END, cancelButton: {text: 'Cancel', icon: FaRegEnvelope, type: ButtonType.SECONDARY, handleClick: () => {console.log("Close modal")}}, submitButton: {text: 'Proceed', icon: FaArrowRight, type: ButtonType.PRIMARY, handleClick: () => {console.log("Proceed")}}}}>
        <div className="h-40 overflow-y-auto">
          <p>Modal content goes here</p>
          <p>Modal content goes here</p>
          <p>Modal content goes here</p>
          <p>Modal content goes here</p>
          <p>Modal content goes here</p>
          <p>Modal content goes here</p>
          <p>Modal content goes here</p>
          <p>Modal content goes here</p>
        </div>
      </AppModal> */}
      <div className="w-full hidden sm:flex justify-center items-center bg-white p-2  shadow h-[64px] border-b-[1px] border-purple-main ">
        <Image alt='profitAll Logo' src='/images/logo-purple.svg' width={100} height={18} priority/>
      </div>
      <div className="grow flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
