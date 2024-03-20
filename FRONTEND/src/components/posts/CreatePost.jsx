import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import { createPostApi } from "../../APIrequests/posts/postAPI";
import { useState } from "react";
import { toolbarOptions } from "../../utilities/quillToolbar";
import { FaTimesCircle } from "react-icons/fa";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // post mutation
  const postMutation = useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPostApi,
  });

  const formik = useFormik({
    initialValues: { title: "", description: "", image: "" },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      image: Yup.string(),
    }),
    onSubmit: (values) => {
      //form data
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", description);
      formData.append("image", values.image);
      console.log(formData);
      postMutation.mutate(formData);
    },
  });

  const handleFileChange = (event) => {
    console.log(event);
    const file = event.currentTarget.files[0];
    if (file.size > 1048576) {
      setImageErr("File size exceed 1MB");
      return;
    }
    if (
      !["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.type)
    ) {
      setImageErr("Invalid file type");
    }
    formik.setFieldValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
  };

  const modules = {
    toolbar: toolbarOptions,
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
      <form
        onSubmit={formik.handleSubmit}
        className=""
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          {...formik.getFieldProps("title")}
          className={`flex flex-col mb-3 border-[1px] border-blue-300 rounded-[4px] focus:outline-none w-full bg-transparent   `}
        />
        <div className="flex justify-center items-center w-full">
          <input
            id="images"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="images"
            className="cursor-pointer bg-blue-500 mb-3 text-white px-2 py-1 rounded shadow hover:bg-blue-600"
          >
            Select post Image
          </label>
        </div>
        {formik.touched.image && formik.errors.image && (
          <p className="text-sm text-red-600">{formik.errors.image}</p>
        )}
        {imageErr && <p className="text-sm text-red-600">{imageErr}</p>}
        {imagePreview && (
          <div className="relative flex w-4/5 mx-auto mb-3">
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2  w-full object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute right-2 top-2 transform translate-x-1/2 -translate-y-1/2 bg-red-400 rounded-full p-1 hover:bg-red-600"
            >
              <FaTimesCircle className="text-white" />
            </button>
          </div>
        )}
        <div className="text-black w-[100%]">
          <ReactQuill
            className={``}
            theme="snow"
            modules={modules}
            formats={formats}
            value={description}
            onChange={(value) => {
              setDescription(value);
              formik.setFieldValue("description", value);
            }}
          />
        </div>
        <input
          type="submit"
          className="cursor-pointer w-2/5 items-center  justify-center bg-blue-500 flex mx-auto mt-20 text-white px-2 py-1 rounded shadow hover:bg-blue-600"
          value="Create Post"
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
