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

const page = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="grow flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}

export default page;
