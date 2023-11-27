import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Custom Hooks/useAuth";
import useAxiosSecureInterceptors from "../../../Custom Hooks/useAxiosSecureInterceptors";
import Loading from "../../../Components/Loading/Loading";
import { useState } from "react";
import SectionTitle from "../../../Components/Section Title/SectionTitle";
import { Controller, useForm } from "react-hook-form";
import district from "../../../Jsons/districtInfo.json";
import modifiedUpazilla from "../../../Jsons/modifiedUpazillaInfo.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { ImSpinner6 } from "react-icons/im";

const BloodRequest = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecureInterceptors();
  //   const [donor, setDonor] = useState(null);
  const { register, handleSubmit, reset, formState, control } = useForm();
  const { errors } = formState;
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes, seconds] = time24.split(":");
    const parsedHours = parseInt(hours, 10);

    const meridiem = parsedHours >= 12 ? "PM" : "AM";
    const hours12 = parsedHours % 12 || 12;

    return `${hours12}:${minutes}:${seconds} ${meridiem}`;
  };

  const handleDonationRequest = (data) => {
    // console.log(data);

    const donationDate = data?.donationDate?.toString().slice(4, 15);

    const donationTime = data?.donationDate?.toString().slice(16, 25);
    const convertedTime = convertTo12HourFormat(donationTime);
    console.log(convertedTime);
  };

  //   console.log(user.email);

  const {
    data: donor,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["donor"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  //   useEffect(() => {
  //     axiosSecure.get(`/users/${user?.email}`).then((res) => setDonor(res.data));
  //   }, [axiosSecure, user?.email]);

  return (
    <div>
      <SectionTitle
        sub={"Be a Lifesaver Today"}
        heading={"Blood Donation Request"}
        description={
          "Join us in the mission to save lives through blood donation. Discover local events, check eligibility, and make a difference. Your generosity can be the lifeline someone desperately needs. Be a part of creating a healthier and more resilient community. Give the precious gift of life — donate blood now."
        }
      ></SectionTitle>

      <div className="mt-7">
        <form
          onSubmit={handleSubmit(handleDonationRequest)}
          className="space-y-8"
          noValidate
        >
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex-1">
              <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input
                  type="text"
                  readOnly
                  defaultValue={donor?.name}
                  {...register("requester_name")}
                  className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition placeholder-slate-500"
                  placeholder="Enter Your Name"
                />
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors?.requester_name?.message}
                </p>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input
                  type="email"
                  readOnly
                  defaultValue={donor?.email}
                  {...register("requester_email")}
                  className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition placeholder-slate-500"
                  placeholder="Enter your email address"
                />
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors?.requester_email?.message}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex-1">
              <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input
                  type="text"
                  {...register("recipientName", {
                    required: {
                      value: true,
                      message: "Recipient Name is required",
                    },
                  })}
                  className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition placeholder-slate-500"
                  placeholder="Enter Recipient Name"
                />
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors?.recipientName?.message}
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <Controller
                  name="recipientDistrict"
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
                      <option value="">Select Recipient District</option>
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
                  name="recipientUpazilla"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition"
                    >
                      <option value="">Select Recipient Upazilla</option>
                      {modifiedUpazilla?.map((singleUpazilla, index) => {
                        if (
                          selectedDistrict === singleUpazilla?.district_name
                        ) {
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
              <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input
                  type="text"
                  {...register("hospitalName", {
                    required: {
                      value: true,
                      message: "Hospital Name is required",
                    },
                  })}
                  className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition placeholder-slate-500"
                  placeholder="Enter Hospital Name"
                />
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors?.hospitalName?.message}
                </p>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input
                  type="text"
                  {...register("hospitalAddress", {
                    required: {
                      value: true,
                      message: "Hospital Address is required",
                    },
                  })}
                  className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition placeholder-slate-500"
                  placeholder="Enter Hospital Address"
                />
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors?.hospitalAddress?.message}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex-1">
              <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <Controller
                  name="donationDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="dd-MM-yyyy hh:mm aa"
                      showTimeSelect
                      timeIntervals={30}
                      className="w-full bg-transparent pb-3 border-b border-gray-300 outline-none invalid:border-red-400 transition placeholder-slate-500"
                      placeholderText="Enter Donation Date"
                    />
                  )}
                />
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors?.donationDate?.message}
                </p>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input
                  type="text"
                  {...register("requesterMessage", {
                    required: {
                      value: true,
                      message: "Requester Message is required",
                    },
                  })}
                  className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition placeholder-slate-500"
                  placeholder="Enter Requester Message"
                />
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors?.hospitalName?.message}
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-6 py-3 transition hover:bg-white hover:text-[#D60C0C] hover:outline font-semibold text-white"
          >
            {loading ? (
              <ImSpinner6 className="animate-spin m-auto text-xl" />
            ) : (
              "Add Request"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BloodRequest;
