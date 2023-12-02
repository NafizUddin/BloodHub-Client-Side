import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../Custom Hooks/useAuth";
import useAxiosSecureInterceptors from "../../Custom Hooks/useAxiosSecureInterceptors";
import district from "../../Jsons/districtInfo.json";
import modifiedUpazilla from "../../Jsons/modifiedUpazillaInfo.json";
import useAxiosPublic from "../../Custom Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { ImSpinner6 } from "react-icons/im";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const RegisterForm = () => {
  const { register, handleSubmit, reset, formState, control } = useForm();
  const { errors } = formState;
  const { createUser, updateUserProfile, loading } = useAuth();
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
                    bloodGroup: data.bloodGroup,
                    district: data.district,
                    upazilla: data.upazilla,
                    status: "active",
                    role: "donor",
                    user_img: res.data.data.display_url,
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
            accept="image/*"
            {...register("photo", {
              required: { value: true, message: "User Photo is required" },
            })}
            className="file-input file-input-bordered file-input-error w-full max-w-sm"
            required
          />
          <p className="mt-2 text-sm text-red-600 font-medium">
            {errors?.photo?.message}
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-6 py-3 transition hover:bg-white hover:text-[#D60C0C] hover:outline font-semibold text-white"
        >
          {loading ? (
            <ImSpinner6 className="animate-spin m-auto text-xl" />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
