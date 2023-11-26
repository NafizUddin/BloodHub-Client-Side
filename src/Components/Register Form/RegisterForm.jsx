import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../Custom Hooks/useAuth";
import useAxiosSecureInterceptors from "../../Custom Hooks/useAxiosSecureInterceptors";
import district from "../../Jsons/districtInfo.json";
import upazilla from "../../Jsons/upazillaInfo.json";
import modifiedUpazilla from "../../Jsons/modifiedUpazillaInfo.json";
import useAxiosPublic from "../../Custom Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const RegisterForm = () => {
  const { register, handleSubmit, reset, formState, control } = useForm();
  const { errors } = formState;
  const { createUser, updateUserProfile } = useAuth();
  const [showPasswordFirst, setShowPasswordFirst] = useState(false);
  const [showPasswordSecond, setShowPasswordSecond] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecureInterceptors();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   const currentValue = getValues("district");
  //   setSelectedDistrict(currentValue);
  // }, [getValues]);

  const handleFormSubmit = (data) => {
    console.log(data);

    const imageFile = { image: data.photo[0] };

    if (data?.password !== data?.confirm_pass) {
      return toast.error("Password does not match!");
    }

    axiosPublic
      .post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          createUser(data.userEmail, data.password)
            .then((response) => {
              updateUserProfile(data.userName, res.data.data.display_url).then(
                () => {
                  const user = {
                    email: data.userEmail,
                    name: data.userName,
                    firebaseId: response.user.uid,
                    bloodGroup: data.bloodGroupName,
                    district: data.district,
                    upazilla: data.upazilla,
                    status: "active",
                    role: "donor",
                  };

                  axiosSecure.post("/users", user).then((res) => {
                    if (res.data.insertedId) {
                      reset();
                      Swal.fire(
                        "Success!",
                        "You have logged in successfully!",
                        "success"
                      );
                      navigate(location?.state ? location.state : "/");
                    }
                  });
                }
              );
            })
            .catch((error) => {
              const errorCode = error.code.split("auth/")[1];
              Swal.fire("Ooppss!", `${errorCode}`, "error");
            });
        }
      });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="mt-10 space-y-8 bg-transparent"
        noValidate
      >
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1">
            <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
              <input
                type="text"
                {...register("userName", {
                  required: { value: true, message: "User Name is required" },
                })}
                className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition placeholder-slate-500"
                placeholder="Enter Your Name"
              />
              <p className="mt-2 text-sm text-red-600 font-medium">
                {errors?.userName?.message}
              </p>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
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
                className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition placeholder-slate-500"
                placeholder="Enter your email address"
              />
              <p className="mt-2 text-sm text-red-600 font-medium">
                {errors?.userEmail?.message}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1">
            <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
              <Controller
                name="bloodGroup"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition"
                  >
                    <option value="">Select Your Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                )}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
              <Controller
                name="district"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={selectedDistrict}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedDistrict(value);
                      field.onChange(value);
                    }}
                    className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition"
                  >
                    <option value="">Select Your District</option>
                    {district?.map((singleDistrict, index) => (
                      <option key={index} value={singleDistrict?.name}>
                        {singleDistrict?.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
              <Controller
                name="upazilla"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition"
                  >
                    <option value="">Select Your Upazilla</option>
                    {modifiedUpazilla?.map((singleUpazilla, index) => {
                      if (selectedDistrict === singleUpazilla?.district_name) {
                        return (
                          <option key={index} value={singleUpazilla?.name}>
                            {singleUpazilla?.name}
                          </option>
                        );
                      }
                    })}
                  </select>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1">
            <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
              <input
                type={showPasswordFirst ? "text" : "password"}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
                className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none transition"
                placeholder="Enter your password"
                required
              />
              <span
                className="absolute right-3 top-2"
                onClick={() => setShowPasswordFirst(!showPasswordFirst)}
              >
                {showPasswordFirst ? (
                  <FaEyeSlash></FaEyeSlash>
                ) : (
                  <FaEye></FaEye>
                )}
              </span>
            </div>
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors?.password?.message}
            </p>
          </div>
          <div className="flex-1">
            <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
              <input
                type={showPasswordSecond ? "text" : "password"}
                {...register("confirm_pass", {
                  required: {
                    value: true,
                    message: "Confirm Password is required",
                  },
                })}
                className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none transition placeholder-slate-500"
                placeholder="Confirm password"
                required
              />
              <span
                className="absolute right-3 top-2"
                onClick={() => setShowPasswordSecond(!showPasswordSecond)}
              >
                {showPasswordSecond ? (
                  <FaEyeSlash></FaEyeSlash>
                ) : (
                  <FaEye></FaEye>
                )}
              </span>
            </div>
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors?.confirm_pass?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="text-lg mb-3">
            Upload Avatar
          </label>
          <input
            type="file"
            {...register("photo", {
              required: { value: true, message: "User Photo is required" },
            })}
            className="file-input file-input-bordered file-input-error w-full max-w-xs"
            required
          />
          <p className="mt-2 text-sm text-red-600 font-medium">
            {errors?.photo?.message}
          </p>
        </div>

        <input
          type="submit"
          value="Sign Up"
          className="w-full rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-6 py-3 transition hover:bg-white hover:text-[#D60C0C] focus:bg-red-700 active:bg-red-800 hover:outline font-semibold text-white"
        />
      </form>
    </div>
  );
};

export default RegisterForm;

{
  /* <form
  onSubmit={handleSubmit(handleFormSubmit)}
  noValidate
  className="space-y-4 md:space-y-6"
>
  <div className="flex gap-4">
    <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600  focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
      <input
        type="text"
        {...register("userName", {
          required: { value: true, message: "User Name is required" },
        })}
        className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition"
        placeholder="Enter Your Name"
      />
      <p className="mt-2 text-sm text-red-600 font-medium">
        {errors?.userName?.message}
      </p>
    </div>
    <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600  focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
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
        className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition"
        placeholder="Enter your email address"
      />
      <p className="mt-2 text-sm text-red-600 font-medium">
        {errors?.userEmail?.message}
      </p>
    </div>
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
        <a className="font-medium text-primary hover:underline" href="#">
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
</form>; */
}
