import React from 'react'
import TextInput from '../../components/FormInputs/TextInput2';
import { MdMailOutline,MdOutlineArrowForward } from "react-icons/md";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import Spinner from '../../components/spinner/Spinner';

export const RequestPasswordReset  = () => {

    const router = useNavigate();
    const validationSchema = Yup.object({
        email: Yup.string()
          .trim()
          .email("*Email must be a valid address")
          .required("*Email is required"),
      });

      const form = useFormik<Yup.Asserts<typeof validationSchema>>({
        initialValues: {
          email: "",
        },
        validationSchema,
        onSubmit: (values: any) => {
          handleSubmit.mutate(values);
        },
      });
      
      const handleSubmit = useMutation(
        async (values: { email: string }) => {
          const response = await AuthService.forgotPassword(values);
          return response; 
        },
        {
          onSuccess: (response) => {
            toast.success(response.data.message);
            form.setSubmitting(false) 
            // requestAnimationFrame(() => {
            //   router("/reset-password");
            // });
          },
          onError: (err: any) => {
            toast.error(err.response.data.message);
            form.setSubmitting(false)
            
          },
        }
      );

     
      
  return (
    <main className='bg-white sm:border-[0.4px] sm:border-foundation-darkPurple h-auto  rounded-lg  w-full sm:w-[464px] py-4 px-9 sm:shadow-custom max-h-[413px]'>
            <h2 className='text-2xl font-gooperBlack font-extrabold sm:text-center  text-black mb-2'> Password Recovery </h2>
            <p className='text-base mb-12 font-normal sm:text-center mt-2 font-satoshiMedium text-grayish3'>
            Lorem ipsum dolor sit amet consectetur. Urna eget lobortis rhoncus suspendisse cursus tristique eu turpis.
            </p>
           <FormikProvider
           value={form}
           >
            <form className='flex flex-col gap-4'>
            <TextInput
             {...form.getFieldProps("email")}
              name='email'
              type='email'
              placeholder='Email address'
              label="Email"
              leftIcon={<MdMailOutline size={20} className='text-gray-400' />}
              />
               <button
                    type='button'
                    disabled={form.isSubmitting}
                    onClick={() => form.handleSubmit()}  
                    className='bg-primary w-full rounded-lg text-white text-base inline-flex gap-2 mt-4 items-center justify-center text-center p-2.5 font-medium disabled:bg-opacity-50 disabled:cursor-not-allowed'
                  >
                    {form.isSubmitting ? <Spinner /> : <>
                    Proceed <span><MdOutlineArrowForward size={16}  /></span>
                    </>}
                      
                  </button>

            </form>

           </FormikProvider>
          <div className="w-full p-4 mt-8 hidden sm:flex  items-center justify-center">
                  <img alt="Client Portal powered by Profitall" src="/client-asset/Client_logo.svg" width={58} height={20} />
                  </div>
    </main>
  )
}

