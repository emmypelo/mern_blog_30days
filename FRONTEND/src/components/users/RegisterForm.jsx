import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaUser } from "react-icons/fa";
import { FaUserLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import {
  checkUserApi,
  checkUsernameApi,
  registerUserApi,
} from "../../APIrequests/users/userAPI";
import AlertMessage from "../Alerts/AlertMessage";

const RegisterForm = () => {
  const registerUserMutation = useMutation({
    mutationKey: ["reisterUser"],
    mutationFn: registerUserApi,
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      passMatch: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      username: Yup.string()
        .required("Username is required")
        .test("USername-exists", "Username already exists", async (value) => {
          try {
            const response = await checkUsernameApi(value);
            if (response.userExist === false) {
              return true; // Username is valid and not in the database
            } else {
              throw new Yup.ValidationError("Username already in database");
            }
          } catch (error) {
            console.error(error);
            return false;
          }
        }),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required")
        .test("email-exists", "Email already exists", async (value) => {
          try {
            const response = await checkUserApi(value);
            if (response.userExist === false) {
              return true; // Email is valid and not in the database
            } else {
              throw new Yup.ValidationError("Email already in database");
            }
          } catch (error) {
            console.error(error);
            return false;
          }
        }),
      password: Yup.string()
        .required("Password is required")
        .oneOf([Yup.ref("passMatch")], "Passwords does not match"),
      passMatch: Yup.string()
        .required("Password is required")
        .oneOf([Yup.ref("password")], "Passwords does not match"),
    }),

    onSubmit: (values) => {
      registerUserMutation
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
      {registerUserMutation.isPending && (
        <div className="absolute top-9 w-full left-[-0.1rem]">
          <AlertMessage type={"loading"} message={"Registering..."} />
        </div>
      )}
      {registerUserMutation.isError && (
        <div className="absolute top-9 w-full left-[-0.1rem]">
          <AlertMessage
            type={"error"}
            message={
              registerUserMutation.error?.response?.data?.error ||
              registerUserMutation.error?.message
            }
          />
        </div>
      )}
      <div className="div">
        <h1>User Register</h1>
        <form className="register-form" onSubmit={formik.handleSubmit}>
          <div className="input-container">
            <div className=" flex">
              <label htmlFor="name">Name </label>
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs flex  items-center w-full justify-end">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <input
              type="text"
              name="name"
              {...formik.getFieldProps("name")}
              id="name"
              placeholder="Enter your name"
            />
            <FaUser className="form-icon  " />
          </div>
          <div className="input-container">
            <div className=" flex">
              <label htmlFor="username">Userame </label>
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-xs flex  items-center w-full justify-end">
                  {formik.errors.username}
                </p>
              )}
            </div>
            <input
              type="text"
              name="username"
              {...formik.getFieldProps("username")}
              id="username"
              placeholder="Enter your username"
            />
            <FaUserLock className="form-icon bg" />
          </div>
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
          <div className="input-container">
            <div className=" flex">
              <label htmlFor="passMatch">Confirm </label>
              {formik.touched.passMatch && formik.errors.passMatch && (
                <p className="text-red-500 text-xs flex  items-center w-full justify-end">
                  {formik.errors.passMatch}
                </p>
              )}
            </div>
            <input
              type="password"
              name="passMatch"
              {...formik.getFieldProps("passMatch")}
              id="passMatch"
              placeholder="Confirm password"
            />
            <RiLockPasswordFill className="form-icon" />
          </div>
          <div className="my-2">
            <button type="submit" className="register-button">
              Register
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
          Already have an account ?
          <span>
            <Link className="ml-3 text-blue-500" to="/sign-in">
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
