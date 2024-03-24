import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { loginUserApi } from "../../APIrequests/users/userAPI";
import AlertMessage from "../Alerts/AlertMessage";

const LoginForm = () => {
  const loginUserMutation = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: loginUserApi,
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: (values) => {
      loginUserMutation
        .mutateAsync(values)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <div className="form-wrapper  text-center w-[95%] mx-auto bg-slate-100 ">
      {loginUserMutation.isPending && (
        <div className="absolute top-9 w-full left-[-0.1rem]">
          <AlertMessage type={"loading"} message={"Logging in..."} />
        </div>
      )}
      {loginUserMutation.isError && (
        <div className="absolute top-9 w-full left-[-0.1rem]">
          <AlertMessage
            type={"error"}
            message={
              loginUserMutation.error?.response?.data?.message ||
              loginUserMutation.error?.message
            }
          />
        </div>
      )}
      <div className="div">
        <h1>Login into your account</h1>
        <form className="register-form" onSubmit={formik.handleSubmit}>
          <div className="input-container">
            <div className=" flex">
              <label htmlFor="email">Email </label>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs flex  items-center w-full justify-end">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <input
              type="text"
              name="email"
              {...formik.getFieldProps("email")}
              id="email"
              placeholder="Enter your email"
            />
            <MdEmail className="form-icon" />
          </div>
          <div className="input-container">
            <div className=" flex">
              <label htmlFor="password">Password </label>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs flex  items-center w-full justify-end">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <input
              type="password"
              name="password"
              {...formik.getFieldProps("password")}
              id="password"
              placeholder="Password"
            />
            <RiLockPasswordFill className="form-icon" />
          </div>

          <div className="my-2">
            <button type="submit" className="register-button">
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="div">
        <p className="line-or">Or </p>
        <p>Sign in with</p>
        <a href="http://localhost:4000/api/users/google">
          <button className="register-button flex items-center mx-auto justify-center gap-2">
            <FcGoogle />
            Google
          </button>
        </a>
      </div>
      <div className="div">
        <p>
          {"Don't have an account ?"}
          <span>
            <Link className="ml-3 text-blue-500" to="/register">
              Register
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
