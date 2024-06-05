import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineLock, MdOutlineArrowForward  } from "react-icons/md";
import * as Yup from "yup";
import { Form, Formik, ErrorMessage } from "formik";
import { useNavigate, Link, useParams, useSearchParams } from "react-router-dom";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import TextInput from "../../components/FormInputs/TextInput2";
import Input from "../../components/FormInputs/Input";
import { LoadingModal, SetUp2FAModal, Select2FAMethodModal } from "../../components/Modal/AuthModel";
import toast from "react-hot-toast";
import { AuthActions } from "../../zustand/auth.store";
import { useMutation } from "react-query";
import { AuthService } from "../../services/auth";


export const PasswordSetup = () => {
  const { showPassword, handleClickShowPassword } = usePasswordToggle();
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token")

  // const param = useParams()


console.log(token)
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePasswordChange = (e: any) => {
    const password = e.target.value;
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
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
      .required("*Confirm password is required")
  })

  const userPassword = {
    password: "",
    confirmPassword: ""
  }

  const handleSubmit = useMutation(
    async (values: { email: string; password: string }) => {

      const body = {
        password: values.password,
        resetToken: token,
      }
      console.log(body);
      
      return await AuthService.resetPassword(body);
    },
    {
      onSuccess: (response:any) => {
       
        toast.success(response.data.message)
        requestAnimationFrame(() => {
          navigate("/login");
        });

      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
        // form.setSubmitting(false)
      },
    }
  );

  // const handleSubmit = (values: any) => {
  //   openModal();
  //   console.log(values);
  //   setTimeout(() => {
  //     navigate('/login');
  //   }, 5000);
  // }


  return (
    <>
      <main className='bg-white sm:border-[0.4px] sm:mt-8 sm:border-foundation-darkPurple form-margin rounded-lg h-auto  w-full sm:w-[464px] py-4 px-9 sm:shadow-custom max-h-[624px]'>
        <h2 className='text-xl font-extrabold sm:text-center font-gooperBlack text-black mb-2'>Password Set Up </h2>
        <p className='text-xs sm:text-sm xs:mb-4  font-normal sm:text-center mt-2 font-satoshiMedium text-grayish3'>
          Kindly set up your account password</p>
        <Formik
          validationSchema={validationSchema}
          initialValues={userPassword}
          onSubmit={(values:any, formikActions) => {
            console.log("hello")
            if (values) {

              handleSubmit.mutate(values);
            }
          }}>
          {({ handleChange }) => {
            return (
              <Form className='flex flex-col gap-2  '>
                <Input
                  name='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter your password'
                  label="Password"
                  // onChange={(e: any) => {
                  //   handleChange(e);
                  //   // handlePasswordChange(e);
                  // }}
                  leftIcon={
                    <MdOutlineLock
                      size={20}
                      className='text-gray-400'
                    />
                  }
                  rightIcon={
                    showPassword ? (
                      <AiOutlineEye size={20} className='cursor-pointer' />
                    ) : (
                      <AiOutlineEyeInvisible size={20} />
                    )
                  }
                  onRightIconClick={handleClickShowPassword}
                />
                <div>

                </div>
                <TextInput
                  name='confirmPassword'
                  type={showPassword ? "text" : "password"}
                  placeholder='Confirm your password'
                  label="Confirm Password"
                  leftIcon={
                    <MdOutlineLock
                      size={20}
                      className='text-gray-400'
                    />
                  }
                  rightIcon={
                    showPassword ? (
                      <AiOutlineEye size={20} className='cursor-pointer' />
                    ) : (
                      <AiOutlineEyeInvisible size={20} />
                    )
                  }
                  onRightIconClick={handleClickShowPassword}
                />
                <button
                  type='submit'
                  disabled={false}
                  className='bg-primary w-full rounded-lg text-white text-sm mt-4  inline-flex gap-2 items-center justify-center text-center p-3 font-normal disabled:bg-opacity-50 disabled:cursor-not-allowed'
                >
                  Set Up Account
                </button>
              </Form>
            )
          }}
        </Formik>
        <div className="w-full p-2 mt-8 hidden sm:flex  items-center justify-center">
          <img alt='Client logo'
            src='/client-asset/Logo_Landmark.svg' width={68} height={20} />
        </div>
      </main>
      <LoadingModal isOpen={handleSubmit.isLoading} closeModal={closeModal} />

    </>

  )
}


