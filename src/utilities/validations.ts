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