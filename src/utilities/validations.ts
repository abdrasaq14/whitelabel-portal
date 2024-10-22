import * as Yup from "yup";

export const loginValidation = Yup.object({
    email: Yup.string()
      .trim()
      .email("*Email must be a valid address")
      .required("Email is required"),
    password: Yup.string()
      .trim()
      .min(8, "*Password must be at least 8 characters").required("*Password is required"),
  });