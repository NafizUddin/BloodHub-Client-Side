import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import district from "../../Jsons/districtInfo.json";
import modifiedUpazilla from "../../Jsons/modifiedUpazillaInfo.json";
import useAuth from "../../Custom Hooks/useAuth";
import useUserDetails from "../../Custom Hooks/useUserDetails";
import { ImSpinner6 } from "react-icons/im";
import useAxiosPublic from "../../Custom Hooks/useAxiosPublic";
import useAxiosSecureInterceptors from "../../Custom Hooks/useAxiosSecureInterceptors";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProfile = () => {
  const { register, handleSubmit, reset, formState, control } = useForm();
  const { errors } = formState;
  const { loadedUser, refetch } = useUserDetails();
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState(
    loadedUser?.district
  );

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecureInterceptors();
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = (data) => {
    setLoading(true);
    const imageFile = { image: data.photo[0] };

    axiosPublic
      .post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          const {
            _id,
            name,
            district,
            upazilla,
            bloodGroup,
            user_img,
            ...restInfo
          } = loadedUser;

          //   const newInputData = {
          //     name: data.name,
          //     bloodGroup: data.bloodGroup,
          //     district: data.district,
          //     upazilla: data.upazilla,
          //     user_img: res.data.data.display_url,
          //     email: loadedUser?.email,
          //     firebaseId: loadedUser?.firebaseId,
          //     role: loadedUser?.role,
          //     status: loadedUser?.status,
          //   };
          const newUserInfo = {
            ...restInfo,
            name: data?.name,
            bloodGroup: data?.bloodGroup,
            district: data?.district,
            upazilla: data?.upazilla,
            user_img: res.data.data.display_url,
          };

          axiosSecure
            .patch(`/users/singleUser/${loadedUser?._id}`, newUserInfo)
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                setLoading(false);
                toast.success("You have Updated your profile");
                navigate("/dashboard/profile");
                refetch();
              }
            });
        }
      });
  };
  return (
    <div>
      <h2 className="text-3xl md:text-4xl text-center text-[#D60C0C]">
        Update Profile Information
      </h2>
      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="mt-12 space-y-5 bg-transparent max-w-lg mx-auto"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <div className="flex-1">
            <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
              <input
                type="text"
                defaultValue={loadedUser?.name}
                {...register("name", {
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
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex-1">
            <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
              <Controller
                name="bloodGroup"
                defaultValue={loadedUser?.bloodGroup}
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
                defaultValue={loadedUser?.district}
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
                defaultValue={loadedUser?.upazilla}
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

        <div className="flex flex-col">
          <label htmlFor="" className="text-lg mb-3">
            Change Avatar
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

        <div className="mt-6 flex items-center justify-end gap-x-6 pb-7">
          <Link to="/dashboard/profile">
            <button
              type="button"
              className="text-sm font-semibold bg-white outline text-[#D60C0C] hover:bg-[#AB0A0A] hover:text-white px-5 py-3 shadow-sm rounded-full"
            >
              Cancel
            </button>
          </Link>

          <button
            type="submit"
            className="bg-[#D60C0C] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 rounded-full hover:text-[#D60C0C] hover:outline"
          >
            {loading ? (
              <ImSpinner6 className="animate-spin m-auto text-xl" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
