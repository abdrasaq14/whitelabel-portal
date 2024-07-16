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





// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("*Email must be a valid address")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(8, "*Password must be at least 8 characters").required("*Password is required"),
});

export default function Login() {


  const { showPassword, handleClickShowPassword } = usePasswordToggle();
  const router = useNavigate();
  const form = useFormik<Yup.Asserts<typeof validationSchema>>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values: any) => {
      sessionStorage.setItem("loginRequest", JSON.stringify(values))
      handleSubmit.mutate(values);
    },
  });


  const handleSubmit = useMutation(
    async (values: { email: string; password: string }) => {
      return await AuthService.login(values);
    },
    {
      onSuccess: (response) => {
        if (response.data.result.otpMessage) {
          toast.success(response.data.result.otpMessage)
          requestAnimationFrame(() => {
            router("/authenticate");
          });
        } else {
          AuthActions.setToken(response.data.result.authToken);
          AuthActions.setProfile(response.data.result.user)
          requestAnimationFrame(() => {
            router("/");
          });
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
        Login
      </h2>
      <p className='text-sm xs:mb-4  font-normal sm:text-center mt-2 font-satoshiMedium text-grayish3'>
        Confirm your credentials to proceed
      </p>
      <FormikProvider value={form}>
        <form className="flex flex-col gap-4">
          <div className='flex flex-col gap-4'>
            <TextInput
              {...form.getFieldProps("email")}
              name='email'
              type='email'
              placeholder='Email address'
              label="Email"
              leftIcon={<MdMailOutline size={20} className='text-gray-400' />}
            />
            <TextInput
              {...form.getFieldProps("password")}
              name='password'
              type={showPassword ? "text" : "password"}
              placeholder='Enter your password'
              label="Password"
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
          </div>
          <div className='flex justify-between'>
            <div className='flex items-center gap-2 rounded '>
              <input
                id='remember-me'
                type='checkbox'
                className='w-3 h-3 bg-transparent outline-none'
              />
              <label htmlFor='remember-me' className='text-xs font-normal text-[#6F7174] '>
                Remember me for the next 30 days
              </label>
            </div>
            <Link to='/forgot-password' className="text-xs text-primary font-normal underline">
              <p className='text-xs text-primary font-semibold underline'>
                Forgot password?
              </p>
            </Link>
          </div>
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
