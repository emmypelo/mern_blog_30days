import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUserApi } from "../../APIrequests/users/userAPI";

const Login = () => {
  // post mutation
  const userMutation = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: loginUserApi,
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      //form data
      const formData = new FormData();

      formData.append("email", values.email);
      formData.append("password", values.password);
      console.log(formData);
      userMutation.mutate(formData);
    },
  });

  return (
    <div className="flex flex-col w-[95vw] items-center mx-auto min-h-[600px]">
      <h2 className="mb-3">Login into your account</h2>
      <form onSubmit={formik.handleSubmit} className="">
        <div className="relative">
          <label htmlFor="email"> Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Title"
            {...formik.getFieldProps("email")}
            className="flex flex-col mb-3 w-full "
          />
        </div>

        <div className="relative">
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Title"
            {...formik.getFieldProps("password")}
            className="flex flex-col mb-3 w-full "
          />
        </div>

        <input
          type="submit"
          className="mx-auto bg-blue-400 mt-3 w-full"
          value="Login"
        />
        {formik.touched.title && formik.errors.email && (
          <p className="text-red-500">{formik.errors.email}</p>
        )}
        {formik.touched.description && formik.errors.password && (
          <p className="text-red-500">{formik.errors.password}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
