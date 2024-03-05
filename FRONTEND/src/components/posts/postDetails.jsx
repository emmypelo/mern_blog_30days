import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { postDetailsApi, updatePostApi } from "../../APIrequests/posts/postAPI";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useState } from "react";

const PostDetails = () => {
  const { postId } = useParams();

  const { error, isLoading, isSuccess, data } = useQuery({
    queryKey: ["postDetails"],
    queryFn: () => postDetailsApi(postId),
  });

  // post mutation
  const postMutation = useMutation({
    mutationKey: ["updatetePost"],
    mutationFn: updatePostApi,
  });

  const formik = useFormik({
    // set initial form values
    initialValues: {
      title: data?.post?.title || "",
      description: data?.post?.description || "",
    },
    // set validation with yup
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    enableReinitialize: true,
    // Create on submit function
    onSubmit: (values) => {
      const updateData = {
        title: values?.title,
        description: values?.description,
        postId,
      };
      postMutation.mutate(updateData);
      setEditable(false);
    },
  });

  const [editable, setEditable] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setEditable(!editable);
  };
  return (
    <div>
      <div>
        {isLoading && <p>Loading...</p>}
        {isSuccess && <p>Posts Details</p>}
        {error && <p>{error.message}</p>}
        <h1>{data?.post?.title}</h1>
        <p>{data?.post?.description}</p>

        <button onClick={handleClick}>Edit Post</button>
      </div>

      {editable && (
        <div>
          <h2>Update post</h2>
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
            <input type="submit" value="Uodate Post" />
            {formik.touched.title && formik.errors.title && (
              <p>{formik.errors.title}</p>
            )}
            {formik.touched.description && formik.errors.description && (
              <p>{formik.errors.description}</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
