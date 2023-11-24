import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../Custom Hooks/useAuth";
import useAxiosSecureInterceptors from "../../Custom Hooks/useAxiosSecureInterceptors";

const RegisterForm = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { createUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecureInterceptors();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = (data) => {
    console.log(data);

    createUser(data.userEmail, data.password)
      .then((res) => {
        updateUserProfile(data.userName, data.photo).then(() => {
          const user = {
            email: data.userEmail,
            name: data.userName,
            firebaseId: res.user.uid,
          };

          //   axiosSecure.post("/users", user).then((res) => {
          //     if (res.data.insertedId) {
          //       reset();
          //       Swal.fire(
          //         "Success!",
          //         "You have logged in successfully!",
          //         "success"
          //       );
          //       navigate(location?.state ? location.state : "/");
          //     }
          //   });
        });
      })
      .catch((error) => {
        const errorCode = error.code.split("auth/")[1];
        Swal.fire("Ooppss!", `${errorCode}`, "error");
      });
  };
  return (
    <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
      <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight border-b pt-4 pb-6 dark:text-primary text-gray-900">
            Create account
          </h1>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
            className="space-y-4 md:space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-lg font-semibold dark:text-primary text-gray-900"
              >
                Your Name
              </label>
              <input
                type="text"
                {...register("userName", {
                  required: { value: true, message: "User Name is required" },
                })}
                className="bg-[#F3F3F3] text-gray-900 sm:text-sm rounded-lg border border-primary focus:outline-none focus:ring focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:text-white"
                placeholder="Enter Your Name"
              />
              <p className="mt-2 text-sm text-red-600 font-medium">
                {errors?.userName?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="photo"
                className="block mb-2 text-lg font-semibold dark:text-primary text-gray-900"
              >
                Photo URL
              </label>
              <input
                type="text"
                {...register("photo", {
                  required: {
                    value: true,
                    message: "User Photo is required",
                  },
                })}
                className="bg-[#F3F3F3] text-gray-900 sm:text-sm rounded-lg border border-primary focus:outline-none focus:ring focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:text-white"
                placeholder="Enter Photo URL"
              />
              <p className="mt-2 text-sm text-red-600 font-medium">
                {errors?.photo?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-lg font-semibold dark:text-primary text-gray-900"
              >
                Email Address
              </label>
              <input
                type="email"
                {...register("userEmail", {
                  required: {
                    value: true,
                    message: "User Email is required",
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid Email Format",
                  },
                })}
                className="bg-[#F3F3F3] text-gray-900 sm:text-sm rounded-lg border border-primary focus:outline-none focus:ring focus:ring-blue-500 block w-full p-3 dark:bg-gray-500 dark:text-white"
                placeholder="Enter your email address"
              />
              <p className="mt-2 text-sm text-red-600 font-medium">
                {errors?.userEmail?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-semibold dark:text-primary text-gray-900"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    pattern: {
                      value:
                        /^(?=.*[0-9])(?=.*[!@#$%^&*()_+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z0-9!@#$%^&*()_+,\-./:;<=>?@[\\\]^_`{|}~]{6,}$/,
                      message:
                        "Password must have at least 6 characters and contain at least one uppercase letter, one lowercase letter and one special character",
                    },
                  })}
                  id=""
                  className="bg-[#F3F3F3] text-gray-900 sm:text-sm rounded-lg border border-primary focus:outline-none focus:ring focus:ring-blue-500 block w-full p-3 dark:bg-gray-500 dark:text-white"
                  placeholder="••••••••"
                  required
                />
                <span
                  className="absolute right-3 top-3.5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </span>
              </div>
              <p className="mt-2 text-sm text-red-600 font-medium">
                {errors?.password?.message}
              </p>
            </div>
            <div className="flex items-start my-5">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  {...register("terms", {
                    required: {
                      value: true,
                      message: "Please accept terms and conditions",
                    },
                  })}
                  id="terms"
                  className="w-4 h-4 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  aria-describedby="terms"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-[#706F6F] dark:text-white"
                >
                  I accept the{" "}
                  <a
                    className="font-medium text-primary hover:underline"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <p className="mt-2 text-sm text-orange-500 font-medium">
              {errors?.terms?.message}
            </p>
            <input
              type="submit"
              value="Sign Up"
              className="w-full text-white bg-[#13A5C9] hover:bg-[white] hover:outline hover:text-[#13A5C9] font-medium px-5 py-3 text-center my-2 dark:hover:bg-primary dark:hover:text-white"
            />
            <h1 className="text-center text-lg">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-primary">Sign In here</span>
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
