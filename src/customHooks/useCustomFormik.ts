import { useFormik } from 'formik';
import * as Yup from 'yup';

export const useCustomFormik = (initialValues: any, onSubmit: (values: any) => void, validationSchema: Yup.ObjectSchema<any>) => {
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });
   console.log("Formik object in useCustomFormik:", formik); // Log everything
    return formik;
};