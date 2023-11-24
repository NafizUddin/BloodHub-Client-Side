import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../Custom Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import useAxiosSecureInterceptors from "../../Custom Hooks/useAxiosSecureInterceptors";

const LoginForm = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const location = useLocation();
  const navigate = useNavigate();
  const { logInWithGoogle, logInWithGithub, signInUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxiosSecureInterceptors();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then((res) => {
        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          Swal.fire("Success!", "You have logged in with Google!", "success");
          navigate(location?.state ? location.state : "/");
        });
      })
      .catch((error) => {
        console.log(error.code);
        // Swal.fire("Ooppss!", `${error.message}`, "error");
      });
  };

  const handleGithubLogin = () => {
    logInWithGithub()
      .then(() => {
        Swal.fire("Success!", "You have logged in with Github!", "success");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error.code);
        // Swal.fire("Ooppss!", `${error.message}`, "error");
      });
  };

  const handleSignIn = (data) => {
    console.log(data);

    if (validateCaptcha(data?.captcha) == true) {
      toast.success("Captcha matched!", {
        duration: 500,
      });
      signInUser(data.userEmail, data.password)
        .then((res) => {
          const loggedInUser = res.user;
          console.log(loggedInUser);
          reset();
          Swal.fire("Success!", "You have logged in successfully!", "success");
          navigate(location?.state ? location.state : "/");
        })
        .catch((error) => {
          Swal.fire("Ooppss!", "Your Email or Password didn't match", "error");
          console.log(error.code);
        });
    } else {
      toast.error("Captcha does not match", {
        duration: 2500,
      });
      // Swal.fire("Ooppss!", "Captcha does not match!", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 mx-auto">
      <div className="w-full  rounded-lg md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight border-b pt-4 pb-6 dark:text-primary text-gray-900">
            Login to your account
          </h1>
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="space-y-4 md:space-y-6"
            noValidate
          >
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
                    message: "Email is required",
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid Email Format",
                  },
                })}
                className="bg-[#F3F3F3]  text-gray-900 sm:text-sm rounded-lg border border-primary focus:outline-none focus:ring focus:ring-blue-500 block w-full p-3 dark:bg-gray-500 dark:text-white"
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
            <div>
              <label
                htmlFor="captcha"
                className="block my-2 text-lg font-semibold dark:text-primary text-gray-900"
              >
                <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                className="bg-[#F3F3F3]  text-gray-900 sm:text-sm rounded-lg border border-primary focus:outline-none focus:ring focus:ring-blue-500 block w-full p-3 dark:bg-gray-500 dark:text-white"
                {...register("captcha")}
                placeholder="Enter the above text"
              />
            </div>
            <div className="flex items-center justify-between my-5">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-500 "
                    aria-describedby="remember"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="dark:text-primary text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium dark:text-primary text-gray-900 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="submit"
              value="Sign In"
              className="w-full text-white bg-[#13A5C9] hover:bg-[white] hover:outline hover:text-[#13A5C9] font-medium px-5 py-3 text-center my-2 dark:hover:bg-primary dark:hover:text-white"
            />
          </form>
          <div className="flex items-center justify-between">
            <hr className="w-36" />
            <span className="dark:text-primary text-gray-900 text-lg font-medium">
              OR
            </span>
            <hr className="w-36" />
          </div>
          <div className="flex items-center justify-center gap-4">
            <button onClick={handleGoogleLogin}>
              <FcGoogle className="text-3xl"></FcGoogle>
            </button>
            <button onClick={handleGithubLogin}>
              <BsGithub className="text-3xl"></BsGithub>
            </button>
          </div>
          <h1 className="text-center md:text-lg">
            Don&apos;t have an account?{" "}
            <Link to="/register">
              <span className="text-[#13A5C9] hover:underline">
                Create free account
              </span>
            </Link>
          </h1>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginForm;
