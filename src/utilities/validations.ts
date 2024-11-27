import * as Yup from "yup";
import { countSpecialCharacters } from "./helperFunctions";

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
    .nullable()
    .test(
      "required-if-published",
      "Image is required when the status is 'published'",
      function (value) {
        const { status } = this.parent; // Access sibling field
        return status === "published" ? !!value : true;
      }
    ),

  status: Yup.string().trim().required("Status is required"),

  allowComments: Yup.boolean(),

  allowLikes: Yup.boolean(),
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

export const InventoryValidation = Yup.object({
    name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters long'),
    categoryName: Yup.string().required('Category name is required').min(2, 'Category name must be at least 2 characters long'),
    quantityIn: Yup.number().required('Quantity In is required').integer('Quantity In must be an integer').min(1, 'Quantity In cannot be less than 1'),
    unitPrice: Yup.number().required('Unit Price is required').positive('Unit Price must be greater than zero').min(1, 'Unit Price cannot be less than 1')
});

export const messageValidation = Yup.object({
  messageText: Yup.string().required('')
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


export const LanguageValidation = Yup.object().shape({
  language: Yup.string().required('Language is required'),
});

export const CurrencyValidation = Yup.object().shape({
  currency: Yup.string().required('Currency is required'),
});

export const PricingValidation = Yup.object().shape({
  commisionPercentage: Yup.string().required('Price is required'),
});

export const SetPasswordValidation = Yup.object({
  password: Yup.string()
    .trim()
    .required("*Password is required")
    .min(6, "Password must be at least 6 characters long")
    .matches(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
  confirmPassword: Yup.string()
    .trim()
    .required("*Confirm Password is required")
    .oneOf([Yup.ref("password"),], "Both passwords must be the same")
    .nullable(),
});

export const emailValidation = Yup.object({
  email: Yup.string()
    .trim()
    .email("*Email must be a valid address")
    .required("Email is required"),
});

