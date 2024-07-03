import { BsShield, BsShieldLockFill } from "react-icons/bs";
import * as Yup from "yup";
import { FaCreditCard } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ErrorMessage, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { ImSpinner8 } from "react-icons/im";
import { BsBank } from "react-icons/bs";
import { CiPercent } from "react-icons/ci"
import { FiPercent } from "react-icons/fi";
import { log } from "console";
import { Button } from "../../../components/Button/Button";
import { useMutation } from "react-query";
import { UserService } from "../../../services/user";
import toast from "react-hot-toast";
import { AuthActions } from "../../../zustand/auth.store";


const SecurityPassword = () => {
  // Validation schema
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
  const PASSWORD_ERROR_MESSAGE =
    "Password must contain at least one uppercase, lowercase and number";

  const validationSchema = Yup.object({
    password: Yup.string()
      .trim()
      .required("*Password is required")
      .min(6, "Password must be at least 6 characters long")
      .matches(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
    oldPassword: Yup.string()
      .trim()
      .required("*Current Password is required")
      .min(6, "Password must be at least 6 characters long")
      .matches(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
    confirmPassword: Yup.string()
      .trim()
      .required("*Confirm Password is required")
      .when("password", {
        is: (val: string | any[]) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Both password must be the same"
        ),
      }),
  });
  interface InitialValues {
    password: string;
    oldPassword: string;
    confirmPassword?: string;
  }
  interface ChangePasswordDataValues {
    password: string;
    oldPassword: string;
  }
  const passwordData: InitialValues = {
    password: "",
    oldPassword: "",
    confirmPassword: "",
  };


  const changePassword = useMutation(
    async (values: any) => {
      return await UserService.changePassword(values);
    },
    {
      onSuccess: (response) => {
        toast.success(response.data.result.message)
        AuthActions.logout()
      },onError: (err:any) => {
        toast.error(err.response.data.result.message)
      }


    },
  )



  return (
    <>
      <h1 className="text-lg text-black font-bold font-satoshiBold mb-3 flex items-center gap-2">
        Password
        <span className="font-regular font-satoshiBold text-sm text-gray-400">
          Change Password
        </span>
      </h1>
      <Formik
        initialValues={passwordData}
        validationSchema={validationSchema}
        onSubmit={async (values, formikActions) => {
          await changePassword.mutate(values)
          formikActions.resetForm()
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { oldPassword, password, confirmPassword } = values;
          return (
            <Form onSubmit={handleSubmit} className="w-full grid gap-7">
              <div className="grid gap-1 w-full">
                <label
                  htmlFor="oldPassword"
                  className="capitalize text-[#000000] font-satoshiRegular text-sm font-medium"
                >
                  Current Password
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  placeholder="******************"
                  className="p-3 h-[50px] rounded-md outline-none border text-black text-sm  font-satoshiMedium border-gray-300"
                  value={oldPassword}
                  name="oldPassword"
                  onBlur={handleBlur("oldPassword")}
                  onChange={handleChange("oldPassword")}
                // required
                />
                <p className="pt-0 block text-xs text-red-400">
                  {touched.oldPassword && errors.oldPassword}
                </p>
              </div>
              <div className="grid gap-1 w-full">
                <label
                  htmlFor="newPassword"
                  className="capitalize text-[#000000]  font-satoshiRegular text-sm font-medium"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  placeholder="******************"
                  className="p-3 h-[50px] rounded-md outline-none border text-black text-sm  font-satoshiMedium border-gray-300"
                  value={password}
                  name="password"
                  onBlur={handleBlur("password")}
                  onChange={handleChange("password")}
                // required
                />
                <p className="pt-0 block text-xs text-red-400">
                  {touched.password && errors.password}
                </p>
              </div>
              <div className="grid gap-1 w-full">
                <label
                  htmlFor="repeatPassword"
                  className="capitalize text-[#000000]  font-satoshiRegular text-sm font-medium"
                >
                  Repeat Password
                </label>
                <input
                  id="repeatPassword"
                  type="password"
                  placeholder="******************"
                  className="p-3 h-[50px] rounded-md outline-none border text-black text-sm  font-satoshiMedium border-gray-300"
                  value={confirmPassword}
                  name="confirmPassword"
                  onBlur={handleBlur("confirmPassword")}
                  onChange={handleChange("confirmPassword")}
                // required
                />
                <p className="pt-0 block text-xs text-red-400">
                  {touched.confirmPassword && errors.confirmPassword}
                </p>
              </div>
              <Button
                type="submit"
                disabled={changePassword.isLoading}
                isLoading={changePassword.isLoading}
                label="Change Password"
                className="bg-primary py-3 px-4 rounded-lg  text-center font-satoshiBold font-bold text-white text-sm disabled:bg-opacity-50"
              />

            </Form>
          );
        }}
      </Formik>
    </>
  );
};


const SecurityTFA = () => {
  return (
    <>
      <h1 className="text-lg text-black font-bold font-satoshiBold mb-3 flex items-center gap-2">
        2FA
        <span className="font-regular font-satoshiBold text-sm text-gray-400">
          Change OTP settings
        </span>
      </h1>
      <div className="grid gap-3 w-full">
        <p className="text-sm text-black font-satoshiRegular">
          I want to recieve OTP via
        </p>
        <form className="w-full grid gap-5">
          <div className="border border-gray-300 rounded-lg flex items-center justify-between px-4 h-12">
            <label htmlFor="text" className="capitalize  2text-sm">
              text message
            </label>
            <input
              type="radio"
              name="otp"
              id="text"
              className="h-6 w-6 accent-primary"
            />
          </div>
          <div className="border border-gray-300 rounded-lg flex items-center justify-between px-4 h-12">
            <label htmlFor="email" className="capitalize  2text-sm">
              Email Address
            </label>
            <input
              type="radio"
              name="otp"
              id="email"
              className="h-6 w-6 accent-primary"
            />
          </div>
        </form>
      </div>
    </>
  );
};



const Security = () => {
  const securityTabList = [
    {
      Icon: BsShieldLockFill,
      name: "Password",
    },
    {
      Icon: BsShield,
      name: "2FA",
    },
  ];
  const [selectedSecurityTab, setSelectedSecurityTab] = useState<number>(0);
  const displaySecurityContent = (selectedSecurityTab: number) => {
    switch (selectedSecurityTab) {
      case 0:
        return <SecurityPassword />;
      case 1:
        return <SecurityTFA />;
      default:
        return <SecurityPassword />;
    }
  };

  return (
    <div className="flex w-full flex-wrap h-full items-stretch gap-5 lg:gap-10">
      <p className="text-base text-[#919191] font-bold lg:hidden">
        Security Panel
      </p>
      <div className="w-full lg:w-[33%] xl:w-2/5  rounded-lg p-0 lg:p-4 items-center lg:h-[400px] xl:max-w-[200px] flex flex-row lg:flex-col gap-2">
        {securityTabList.map(({ Icon, name }, index) => (
          <button
            key={index}
            type="button"
            className={`text-xs lg:text-sm px-4 py-3 lg:px-3 lg:py-4 justify-center lg:w-full rounded-xl flex items-center gap-2 transition-all
                ${selectedSecurityTab === index && "bg-[#EDE6F3] border border-primary"
              } outline-none
              `}
            onClick={() => setSelectedSecurityTab(index)}
          >
            <Icon className="lg:text-xl text-base" />
            {name}
          </button>
        ))}
      </div>
      <div className="w-full lg:w-[70%] xl:w-3/4  h-full max-w-[394px]">
        {displaySecurityContent(selectedSecurityTab)}
      </div>
    </div>
  );
};

export default Security;
