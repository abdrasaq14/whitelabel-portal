import * as Yup from "yup";
import { countSpecialCharacters } from "./helperFunctions";

export const loginValidation = Yup.object({
    email: Yup.string()
      .trim()
      .email("*Email must be a valid address")
      .required("Email is required"),
    password: Yup.string()
      .trim()
      .min(8, "*Password must be at least 8 characters").required("*Password is required"),
});


export const BlogValidationSchema = Yup.object({
  title: Yup.string()
    .test("has-alphabet", "Title must contain at least one letter", (value) =>
      value ? /[A-Za-z]/.test(value) : false
    )
    .test(
      "max-special-chars",
      "Title can have a maximum of 3 special characters",
      (value) => (value ? countSpecialCharacters(value) <= 3 : true)
    )
    .trim()
    .required("Title is required")
    .min(2, "Title is too short")
    .max(100, "Title is too long"),
  content: Yup.string().trim().required("Description is required"),
  image: Yup.string()
    .url("Image must be a valid URL")
    .when("status", {
      is: "published",
      then: Yup.string().required("Image is required"),
      otherwise: Yup.string().nullable().notRequired()
    }),
  status: Yup.string().trim().required("Status is required"),
  allowComments: Yup.boolean(),
  allowLikes: Yup.boolean()
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

