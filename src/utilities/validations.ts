import * as Yup from "yup";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
const PASSWORD_ERROR_MESSAGE = "Password must contain at least one uppercase, lowercase and number";


export const loginValidation = Yup.object({
  email: Yup.string()
    .trim()
    .email("*Email must be a valid address")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(8, "*Password must be at least 8 characters").required("*Password is required"),
});

export const AdminAccountInfoValidation = Yup.object().shape({
  companyName: Yup.string().required('Company name is required'),
  companyEmail: Yup.string().email('Invalid email').required('Company email is required'),
  adminName: Yup.string().matches(/^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/, "Must be a valid fullname").required('Admin fullname is required'),
  adminEmail: Yup.string().email('Invalid email').required('Admin email is required'),
  companyPhoneNumber: Yup.string().required('Company Phone Number is required'),
  adminPhoneNumber: Yup.string().required('Admin Phone number is required'),
  companyAddress: Yup.string().required('Company address is required'),
});

export const StaffInfoValidation = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Staff email is required'),
  firstName: Yup.string().required('firstName is required'),
  lastName: Yup.string().required('lastName is required'),
  phoneNumber: Yup.string().required("PhoneNumber is required"),
  role: Yup.string().required('role is required'),
});

export const ChangePasswordValidation = Yup.object({
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
    .oneOf([Yup.ref("password"),], "Both passwords must be the same")
    .nullable(),
});