import { useLoaderData, useNavigate } from "react-router-dom";
import bear from "../../assets/Icons/bear.png";
import { Controller, useForm } from "react-hook-form";
import useUserDetails from "../../Custom Hooks/useUserDetails";
import { useState } from "react";
import district from "../../Jsons/districtInfo.json";
import modifiedUpazilla from "../../Jsons/modifiedUpazillaInfo.json";
import DatePicker from "react-datepicker";
import { ImSpinner6 } from "react-icons/im";
import SectionTitle from "../../Components/Section Title/SectionTitle";
import useAxiosSecureInterceptors from "../../Custom Hooks/useAxiosSecureInterceptors";
import Swal from "sweetalert2";

const UpdateDonation = () => {
  const singleDonationData = useLoaderData();
  const { register, handleSubmit, reset, formState, control } = useForm();
  const { errors } = formState;
  const { loadedUser } = useUserDetails();
  const [selectedDistrict, setSelectedDistrict] = useState(
    singleDonationData?.recipientDistrict
  );
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const axiosSecure = useAxiosSecureInterceptors();
  const navigate = useNavigate();

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes, seconds] = time24.split(":");
    const parsedHours = parseInt(hours, 10);

    const meridiem = parsedHours >= 12 ? "PM" : "AM";
    const hours12 = parsedHours % 12 || 12;

    return `${hours12}:${minutes}:${seconds}${meridiem}`;
  };

  const handleUpdateDonationRequest = (data) => {
    console.log(data);
    setLoading(true);

    const donationDate = data?.donationDate?.toString().slice(4, 15);

    const donationTime = data?.donationDate?.toString().slice(16, 25);
    const convertedTime = convertTo12HourFormat(donationTime);

    const updatedDonationInfo = {
      recipientName: data?.recipientName,
      recipientDistrict: data?.recipientDistrict,
      recipientUpazilla: data?.recipientUpazilla,
      donationDate: donationDate,
      donationTime: convertedTime,
      status: singleDonationData?.status,
      donorName: singleDonationData?.donorName,
      donorEmail: singleDonationData?.donorEmail,
      hospitalName: data?.hospitalName,
      hospitalAddress: data?.hospitalAddress,
      requesterMessage: data?.requesterMessage,
    };

    axiosSecure
      .patch(
        `/donation/singleDonation/${singleDonationData?._id}`,
        updatedDonationInfo
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setLoading(false);
          Swal.fire("Good job!", "You updated the donation request", "success");
          reset();
        }
      });
  };
  return (
    <div>
      <SectionTitle
        sub={"Be a Lifesaver Today"}
        heading={"Update Blood Donation Request"}
        description={
          "Join us in the mission to save lives through blood donation. Discover local events, check eligibility, and make a difference. Your generosity can be the lifeline someone desperately needs. Be a part of creating a healthier and more resilient community. Give the precious gift of life — donate blood now."
        }
      ></SectionTitle>

      {loadedUser?.status === "active" ? (
        <div className="mt-7">
          <form
            onSubmit={handleSubmit(handleUpdateDonationRequest)}
            className="space-y-8"
            noValidate
          >
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="flex-1">
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input
                    type="text"
                    readOnly
                    defaultValue={loadedUser?.name}
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
                    defaultValue={loadedUser?.email}
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
                    defaultValue={singleDonationData?.recipientName}
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
                    defaultValue={singleDonationData?.recipientDistrict}
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
                    defaultValue={singleDonationData?.recipientUpazilla}
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
                    defaultValue={singleDonationData?.hospitalName}
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
                    defaultValue={singleDonationData?.hospitalAddress}
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
                        minDate={today}
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
                    defaultValue={singleDonationData?.requesterMessage}
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
                    {errors?.requesterMessage?.message}
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
                "Update Donation Request"
              )}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div className="h-[350px] flex flex-col justify-center items-center gap-5">
            <img src={bear} className="w-28 md:w-40" />
            <p className="md:max-w-3xl lg:mx-auto text-center mx-6 md:mx-10 text-2xl md:text-3xl text-[#D60C0C]">
              You have been restricted from Updating request.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateDonation;
