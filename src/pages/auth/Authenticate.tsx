import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdMailOutline, MdOutlineLock, MdOutlineArrowForward } from "react-icons/md";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import TextInput from "../../components/FormInputs/TextInput2";
import { AuthService } from "../../services/auth";
import { AuthActions } from "../../zustand/auth.store";
import { useMutation } from "react-query";
import Spinner from "../../components/spinner/Spinner";
import OtpInput from "../../components/FormInputs/OtpInpput";
import { useEffect, useState } from "react";
import ResendOtpButton from "../../components/ResendOtpButton";





// Validation schema
const validationSchema = Yup.object({
    otp: Yup.string()
        .trim()
        .required()
});

export default function Authenticate() {


    const { showPassword, handleClickShowPassword } = usePasswordToggle();
    const router = useNavigate();
    const [loginRequest, setLoginRequest] = useState<any>({}) 
    const form = useFormik<Yup.Asserts<typeof validationSchema>>({
        initialValues: {
            otp: "",
        },
        // validationSchema,
        onSubmit: (values: any) => {
            const body = {
                email: loginRequest.email,
                otp: values.otp
            }
            handleSubmit.mutate(body);
        },
    });

    useEffect(() => {

       const data:any =  sessionStorage.getItem("loginRequest")
       setLoginRequest(JSON.parse(data))
    },[])

    const handleResendOtp = useMutation(
        async (values: { email: string; password: string }) => {
          return await AuthService.login(values);
        },
        {
          onSuccess: (response) => {
           toast.success(response.data.result.otpMessage)
    
          },
          onError: (err: any) => {
            toast.error(err.response.data.message);
            form.setSubmitting(false)
          },
        }
      );


    const handleSubmit = useMutation(
        async (values: { email: string; otp: string }) => {
            return await AuthService.verifyOtp(values);
        },
        {
            onSuccess: (response) => {
                AuthActions.setToken(response.data.result.authToken);
                if (response.data.result.user.role_id) {
                    AuthActions.setProfile(response.data.result.user)
                    toast.success("login successful");
                    form.setSubmitting(false)
                    requestAnimationFrame(() => {
                        router("/dashboard");
                    });
                } else {
                    toast.error("You do no not have access to this platform")
                }

            },
            onError: (err: any) => {
                toast.error(err.response.data.message);
                form.setSubmitting(false)
            },
        }
    );



    return (
        <main className='bg-white mt-8 sm:border-[0.4px] sm:border-foundation-darkPurple rounded-lg h-auto  w-full sm:w-[464px] py-4 px-9 sm:shadow-custom max-h-[624px]'>
            <h2 className='text-xl font-extrabold sm:text-center font-gooperBlack text-black mb-2'>
            Account Aunthentication
            </h2>
            <p className='text-sm xs:mb-4  font-normal sm:text-center mt-2 font-satoshiMedium text-grayish3'>
                Enter your OTP to proceed
            </p>
            <FormikProvider value={form}>
                <form className="flex flex-col gap-4">
                    <OtpInput onChange={(e:any) => form.setFieldValue('otp', e)} length={6} />

                    <h3 className="text-sm font-normal text-[#6F7174] ">Enter the verification code sent to your email address {loginRequest.email}</h3>

                    <span className="flex items-center gap-2">Didn't get Code? <ResendOtpButton onResend={() => handleResendOtp.mutate(loginRequest)} /></span>
                    <button
                        type='button'
                        disabled={form.isSubmitting}
                        onClick={() => form.handleSubmit()}
                        className='bg-primary w-full rounded-lg text-white text-sm inline-flex gap-2 my-4 items-center justify-center text-center p-2.5 font-medium disabled:bg-opacity-50 disabled:cursor-not-allowed'
                    >

                        {form.isSubmitting ? <Spinner /> : <>
                            Proceed <span><MdOutlineArrowForward size={16} /></span>
                        </>}

                    </button>


                </form>

            </FormikProvider>
            {/* <div className="divider mt-8">Or</div>
          <button
                    type='submit'
                    disabled={false}
                    className='bg-transparent w-full text-base rounded-lg border-[1px] border-[#C8CCD0] text-primary-text  inline-flex items-center justify-center gap-2 text-center p-2.5 font-medium disabled:bg-opacity-50'
                  >
                   <span>
                        <img
                            alt='Microsoft logo'
                            src='/images/Microsoft.png'
                            width={70}
                            height={24}
                          />
                    
                    </span> 
                    Continue with Microsoft
                  </button>
                  <button
                    type='submit'
                    disabled={false}
                    className='bg-transparent w-full text-base rounded-lg border-[1px] mt-4 border-[#C8CCD0] text-primary-text  inline-flex items-center justify-center gap-2 text-center p-2.5 font-medium disabled:bg-opacity-50'
                  >
                   <span>
                        <img
                            alt='Microsoft logo'
                            src='/images/google.svg'
                            width={24}
                            height={24}
                          />
                    
                    </span> 
                    Continue with Google
                  </button> */}
            <div className="w-full bottom-logo p-4 hidden  items-center justify-center">
                <img alt='Client logo'
                    src='/client-asset/Logo_Landmark.svg' width={118}
                    height={40} />
            </div>


        </main>


    );
}
