import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../Custom Hooks/useAuth";
import useAxiosSecureInterceptors from "../../Custom Hooks/useAxiosSecureInterceptors";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner6 } from "react-icons/im";

const LoginForm = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const location = useLocation();
  const navigate = useNavigate();
  const { logInWithGoogle, logInWithGithub, signInUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxiosSecureInterceptors();

  useEffect(() => {
    window.scrollTo(0, 0);
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
  };

  return (
    <div>
      <div className="mt-8 flex flex-wrap sm:grid gap-6 grid-cols-2">
        <button className="w-full h-11 rounded-full border border-gray-300/75 bg-white px-6 transition active:bg-gray-50">
          <div
            onClick={handleGoogleLogin}
            className="w-max mx-auto flex items-center justify-center space-x-4"
          >
            <FcGoogle className="text-xl" />
            <span className="block w-max text-sm font-semibold tracking-wide text-cyan-700 dark:text-white">
              With Google
            </span>
          </div>
        </button>
        <button className="w-full h-11 rounded-full bg-gray-900 px-6 transition hover:bg-gray-800 focus:bg-gray-700 active:bg-gray-600 dark:bg-gray-700 dark:border dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700">
          <div
            onClick={handleGithubLogin}
            className="w-max mx-auto flex items-center justify-center space-x-4 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-5"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span className="block w-max text-sm font-semibold tracking-wide text-white">
              With Github
            </span>
          </div>
        </button>
      </div>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="mt-10 space-y-8 text-white"
        noValidate
      >
        <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
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
            className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition"
            placeholder="Enter your email"
          />
          <p className="mt-2 text-sm text-red-600 font-medium">
            {errors?.userEmail?.message}
          </p>
        </div>
        <div>
          <div className="flex flex-col items-end">
            <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
                id=""
                className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none transition"
                placeholder="Enter your password"
                required
              />
              <span
                className="absolute right-3 top-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </span>
            </div>
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors?.password?.message}
            </p>
            <button type="reset" className="-mr-3 w-max p-3">
              <span className="text-sm tracking-wide text-white">
                Forgot password ?
              </span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-6 py-3 transition hover:bg-white hover:text-[#D60C0C] focus:bg-red-700 active:bg-red-800 hover:outline font-semibold text-white"
        >
          {loading ? (
            <ImSpinner6 className="animate-spin m-auto text-xl" />
          ) : (
            "LogIn"
          )}
        </button>
      </form>
      <div className="w-full rounded-lg md:mt-4 sm:max-w-md xl:p-0">
        <h1 className="text-center text-white">
          Don&apos;t have an account?{" "}
          <Link to="/register">
            <span className="text-white hover:underline">
              Create free account
            </span>
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default LoginForm;
