import { useState, useRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {MdOutlineLock} from "react-icons/md";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useLocation} from "react-router-dom";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import TextInput from "../../components/FormInputs/TextInput2";
import Input from "../../components/FormInputs/Input";
import { Modal } from "../../components/Modal/StaffModal";
import  useOnClickOutside  from "../../hooks/useClickOutside";
import { AuthService } from "../../services/auth";
import { useMutation } from "react-query";
import Spinner from "../../components/spinner/Spinner";
import { useNavigate } from "react-router-dom";

 export const ResetPassword = () => {
    const { showPassword, handleClickShowPassword } = usePasswordToggle();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };

    const handlePasswordChange = (e: any) => {
        const password = e.target.value;
      };

   

const router = useNavigate();  
const { search } = useLocation();
const token = new URLSearchParams(search).get('token')!;

const form = useFormik({
  initialValues: {
    password: "",
    confirmPassword: "",
  },
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .trim()
      .min(8, "*Password must be at least 8 characters")
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "*Password must contain at least one number, one special character, one uppercase letter, and one lowercase letter"
      )
      .required("*Password is required"),
    confirmPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref("password"), null], "*Passwords must match")
      .required("*Confirm password is required"),
  }),
  onSubmit: async (values) => {
    try {
      setLoading(true)
       handleSubmit.mutate({ password: values.password, token });
      // toast.success("Password updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data.message || "Failed to update password.");
    }
  },
});
  
    const handleSubmit = useMutation(
   
      async (values: { password: string, token: string }) => {
        const response = await AuthService.resetPassword({
          password: values.password,
          resetToken: token
        });
          return response; 
      },
      {
        onSuccess: (response) => {
          toast.success(response.data.message);
          form.setSubmitting(false) 
          requestAnimationFrame(() => {
            router("/login");
          });
          setLoading(false)
        },
        onError: (err: any) => {
          toast.error(err.response.data.message);
          form.setSubmitting(false)
          setLoading(false)
        },
      }
    );
    
   
  return (
    <>
     <main className='bg-white mt-8 sm:border-[0.4px] sm:border-foundation-darkPurple form-margin rounded-lg h-auto  w-full sm:w-[464px] py-4 px-9 sm:shadow-custom max-h-[624px]'>
         <h2 className='text-2xl font-extrabold sm:text-center font-gooperBlack text-black mb-2'>Create new password</h2>
          <p className='text-base xs:mb-4 md:mb-8 font-normal sm:text-center mt-2 font-satoshiMedium text-grayish3'>
          Kindly set up your account password</p>
          <FormikProvider value={form}>
            <form className="flex flex-col gap-4 mt-1">
            <Input
                    name='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter your password'
                    label="Password"
                    onChange={(e:any) => {
                      handlePasswordChange(e);
                    }}
                    leftIcon={
                            <MdOutlineLock
                            size={20}
                            className='text-gray-400'/>}
                    rightIcon={
                            showPassword ? (
                            <AiOutlineEye size={20} className='cursor-pointer' />
                            ) : (
                            <AiOutlineEyeInvisible size={20} />
                            )}
                    onRightIconClick={handleClickShowPassword}
                   />
                                   
            <TextInput
              name='confirmPassword'
              type={showPassword ? "text" : "password"}
              placeholder='Confirm your password'
              label="Confirm Password"
              leftIcon={
                    <MdOutlineLock
                    size={20} className='text-gray-400' />}
              rightIcon={
                      showPassword ? (
                      <AiOutlineEye size={20} className='cursor-pointer' />
                          ) : (
                        <AiOutlineEyeInvisible size={20} />
                           )}
                        onRightIconClick={handleClickShowPassword}/>
                <button
                type="button"
                disabled={form.isSubmitting}
                onClick={() => form.handleSubmit()}  
                className='bg-primary w-full rounded-lg text-white text-base inline-flex gap-2 items-center justify-center text-center p-3 font-normal disabled:bg-opacity-50 disabled:cursor-not-allowed' >
                  {loading ? <Spinner /> : "Set up password"}
               </button>
            </form>

          </FormikProvider>
       
          {/* <div className="w-full p-4 mt-8 hidden sm:flex  items-center justify-center">
                  <img alt='Client logo'
                src='/client-asset/Logo_Landmark.svg' width={58} height={20} />
          </div> */}
    </main>
    <LoadingModal isOpen={isOpen} closeModal={closeModal} />
    
    </>
   
  )
}



const LoadingModal = ({isOpen, closeModal}: any) => {
  const modalRef = useRef<any>();
  useOnClickOutside(modalRef, () => {
    closeModal();
    });
  return (
   <Modal open={isOpen} closeModal={closeModal} containerStyle="text-black flex flex-col justify-center items-center align-middle max-w-2xl  z-20 bg-white w-[80%] rounded-xl h-[50%] sm:w-[553px] sm:h-[332px]">
    <div className='h-48 w-48'>
        <img src="/images/verified-account.svg" alt='Account Verified' style={{objectFit: 'contain'}} />
        </div>
                
      <p className=' font-normal text-base sm:text-xl  text-primary-text mt-8' >Account Successfully Set up</p>
   </Modal>
  )
}

