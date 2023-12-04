import { Controller, useForm } from "react-hook-form";
import { ImSpinner6 } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import district from "../../Jsons/districtInfo.json";
import modifiedUpazilla from "../../Jsons/modifiedUpazillaInfo.json";
import { useState } from "react";
import useAxiosSecureInterceptors from "../../Custom Hooks/useAxiosSecureInterceptors";
import Swal from "sweetalert2";

const AddUserInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state.userData;
  const { handleSubmit, reset, formState, control } = useForm();
  const { errors } = formState;
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecureInterceptors();
  console.log(location.state);

  const handleAddInformation = (data) => {
    setLoading(true);

    const userInfo = {
      ...userData,
      bloodGroup: data?.bloodGroup,
      district: data?.district,
      upazilla: data?.upazilla,
    };

    console.log(userInfo);
    axiosSecure.post("/users", userInfo).then((res) => {
      if (res.data.insertedId) {
        reset();
        setLoading(false);
        Swal.fire("Success!", "You have logged in successfully!", "success");
        navigate("/");
      }
    });
  };
  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/3786166/pexels-photo-3786166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}
        className="m-auto xl:container px-12 sm:px-0 mx-auto bg-no-repeat bg-cover bg-right lg:bg-center"
      >
        <div className="mx-auto sm:w-max">
          <div className="py-[90px]">
            <div className="rounded-3xl border -mx-6 sm:-mx-10 p-8 sm:p-10 backdrop-blur-md">
              <h3 className="text-2xl font-semibold mt-4 text-center">
                Add Profile Information
              </h3>
              <form
                onSubmit={handleSubmit(handleAddInformation)}
                noValidate
                className="py-5"
              >
                <div className="mb-5">
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

                <div className="py-5">
                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
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

                <div className="py-5">
                  <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <Controller
                      name="upazilla"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition"
                        >
                          <option value="">Select Donor Upazilla</option>
                          {modifiedUpazilla?.map((singleUpazilla, index) => {
                            if (
                              selectedDistrict === singleUpazilla?.district_name
                            ) {
                              return (
                                <option
                                  key={index}
                                  value={singleUpazilla?.name}
                                >
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

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-6 py-3 transition hover:bg-white hover:text-[#D60C0C] hover:outline font-semibold text-white"
                >
                  {loading ? (
                    <ImSpinner6 className="animate-spin m-auto text-xl" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserInfo;
