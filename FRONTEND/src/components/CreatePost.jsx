import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";

import * as Yup from "yup";
import { createPostApi } from "../APIrequests/posts/postAPI";

const CreatePost = () => {
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

  return (
    <div>
      <h2>Create new form</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="title"
          {...formik.getFieldProps("title")}
        />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="description"
          {...formik.getFieldProps("description")}
        />
        <input type="submit" value="Create Post" />
        {formik.touched.title && formik.errors.title && (
          <p>{formik.errors.title}</p>
        )}
        {formik.touched.description && formik.errors.description && (
          <p>{formik.errors.description}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
