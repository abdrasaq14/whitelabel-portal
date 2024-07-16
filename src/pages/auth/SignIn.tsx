import React from 'react'
import TextInput from '../../components/FormInputs/TextInput2';
import { MdMailOutline, MdOutlineArrowForward } from "react-icons/md";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email("*Email must be a valid address")
      .required("*Email is required"),
  });

  const SigninInfo = {
    email: "",
  };


  return (
    <main className='bg-white sm:border-[0.4px] sm:border-foundation-darkPurple h-auto  rounded-lg  w-full sm:w-[464px] py-4 px-9 sm:shadow-custom max-h-[443px]'>
      <h2 className='text-xl font-extrabold sm:text-center font-gooperBlack text-black mb-2'> Welcome </h2>
      <p className='text-sm xs:mb-4  font-normal sm:text-center mt-2 font-satoshiMedium text-grayish3'>
        Confirm your credentials to proceed
      </p>
      <Formik
        initialValues={SigninInfo}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          if (values) {
            navigate("./password-setup")

          }
        }}
      >
        {() => {
          return (
            <Form className='flex flex-col gap-4'>
              <TextInput
                name='email'
                type='email'
                placeholder='Email address'
                label="Email"
                leftIcon={<MdMailOutline size={20} className='text-gray-400' />}
              />

              <div className='flex justify-end  items-center gap-1'>
                <p className='text-xs font-normal text-[#6F7174] '>Wrong Email?</p>
                <Link to='/forgot-password' className="text-xs text-primary font-normal underline">
                  <a className='text-sm text-primary font-semibold underline' href='#'>
                    Get Help
                  </a>
                </Link>
              </div>
              <button
                type='submit'
                disabled={false}
                className='bg-primary w-full rounded-lg text-white text-sm inline-flex gap-2 items-center justify-center text-center p-2.5 font-medium disabled:bg-opacity-50 disabled:cursor-not-allowed'
              >
                Proceed <span><MdOutlineArrowForward size={16} /></span>
              </button>

            </Form>
          );
        }}
      </Formik>
      <div className="w-full p-4 mt-8 hidden sm:flex  items-center justify-center">
        <img alt='Client logo'
          src='/client-asset/Logo_Landmark.svg' width={118}
          height={40} />
      </div>
    </main>
  )
}

export default SignIn


