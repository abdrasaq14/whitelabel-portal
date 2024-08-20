import { BreadCrumbWithBackButton } from "../../components/Breadcrumb";
import { TextInput } from "../../components/Blog/Inputs";
import { IoCalendarOutline } from "react-icons/io5";
import FileUpload from "../../components/FormInputs/FIleUpload2";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import BlogDescription from "../../components/Blog/CkEditor";
const validationSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
  date: Yup.date().required("Date is required"),
  content: Yup.string().trim().required("Description is required"),
  image: Yup.string().trim().required("Image is required")
});

const CreateBlogPost = () => {
  const form = useFormik({
    initialValues: {
      title: "",
      date: "",
      content: "",
      image: ""
    },
    validationSchema,
    onSubmit: (values) => {
      //   handleSubmit.mutate(values);
    },
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true
  });
  return (
    <div className="px-4 pt-8 h-full">
      <div className="bg-white rounded-md h-auto w-full p-8 flex flex-col">
        <div className="w-full">
          <BreadCrumbWithBackButton
            backText="Blog"
            showBackButton={true}
            currentPath="Create"
            handleBackAction={() => {}}
          />
          <div className="flex justify-between items-center text-primary-text">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg md:text-2xl font-bold">Post Blog</h2>
              <span className="text-primary-text w-[90%]">
                Provide all the information you want to post below, you can
                preview it before you post.
              </span>
            </div>
            <button
              type="button"
              className="border border-primary font-semibold hover:bg-primary hover:text-white rounded-md text-primary-text p-2"
            >
              Preview
            </button>
          </div>

          <FormikProvider value={form}>
            <form className="w-full md:gap-4 grid grid-cols-1 md:grid-cols-2 justify-center mt-8">
              <TextInput
                {...form.getFieldProps("title")}
                title="Blog Title"
                type="text"
                placeholder="Blog title"
                wrapperClass=""
              />
              <TextInput
                {...form.getFieldProps("date")}
                icon={<IoCalendarOutline />}
                title="Date"
                type="date"
                placeholder="Blog title"
                wrapperClass=" !w-[50%]"
              />

              <div className="flex flex-col gap-2 col-span-1">
                <span className="text-primary-text font-semibold">
                  Content (Blog Description)
                </span>
                <BlogDescription name="content" />
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <span className="text-primary-text font-semibold">
                  Blog Image
                </span>
                <FileUpload
                  {...form.getFieldProps("image")}
                  name="image"
                  fileType="image"
                ></FileUpload>
              </div>
            </form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPost;
