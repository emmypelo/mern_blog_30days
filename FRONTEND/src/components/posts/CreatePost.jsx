import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import { createPostApi } from "../../APIrequests/posts/postAPI";
import { useState } from "react";
import { toolbarOptions } from "../../utilities/quillToolbar";

const CreatePost = () => {
  const [description, setDescription] = useState("");

  // post mutation
  const postMutation = useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPostApi,
  });

  const formik = useFormik({
    // set initial form values
    initialValues: { title: "", description: "" },
    // set validation with yup
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    // Create on submit function
    onSubmit: (values) => {
      console.log(values);
      postMutation.mutate(values);
    },
  });

  // Customize the toolbar options
  const modules = {
    toolbar: toolbarOptions,
    //  [
    //   [{ header: [1, 2, false] }],
    //   ["bold", "italic", "underline", "strike", "blockquote"],
    //   [{ list: "ordered" }, { list: "bullet" }],
    //   ["link", "image"],
    //   [{ "code-block": true }],
    //   ["clean"],
    // ]
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "code-block",
  ];

  return (
    <div className="flex flex-col w-[95vw] items-center mx-auto min-h-[600px]">
      <h2 className="mb-3">Create a new Post</h2>
      <form onSubmit={formik.handleSubmit} className="">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="title"
          {...formik.getFieldProps("title")}
          className="flex flex-col mb-3 w-full "
        />
        <div className="text-white w-[100%]">
          <ReactQuill
            className=""
            theme="snow"
            modules={modules}
            formats={formats}
            value={description} // Updated to use 'description' state directly
            onChange={(value) => {
              setDescription(value);
              formik.setFieldValue("description", value);
            }}
          />
        </div>

        <input
          type="submit"
          className=" mx-auto bg-blue-400 mt-[80px] w-full"
          value="Create Post "
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500">{formik.errors.title}</p>
        )}
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500">{formik.errors.description}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
