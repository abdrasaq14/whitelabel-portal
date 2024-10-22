"use client"
import AppButton from "@/components/forms/AppButton";
import AppTextBox from "@/components/forms/AppTextBox";
import { ButtonType, ModalFooterType, ModalHeaderType, TextboxType } from "@/enums/ComponentEnums";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import {FaRegEnvelope} from "react-icons/fa6";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import AppModal from "@/components/AppModal";
import LoginForm from "@/components/forms/LoginForm";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full">
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
      <LoginForm />
    </div>
  );
}
