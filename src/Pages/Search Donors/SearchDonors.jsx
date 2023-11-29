import { Controller, useForm } from "react-hook-form";
import SectionTitle from "../../Components/Section Title/SectionTitle";
import district from "../../Jsons/districtInfo.json";
import modifiedUpazilla from "../../Jsons/modifiedUpazillaInfo.json";
import { useState } from "react";
import { ImSpinner6 } from "react-icons/im";
import searchImg from "../../assets/Icons/SearchDonor.png";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Custom Hooks/useAxiosPublic";

const SearchDonors = () => {
  const { register, handleSubmit, reset, formState, control } = useForm();
  const { errors } = formState;
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [searchDonors, setSearchedDonors] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosPublic = useAxiosPublic();

  const handleSearchDonor = (data) => {
    setLoading(true);

    axiosPublic
      .get(
        `/users/?email=${data?.donorEmail}&blood=${data?.bloodGroup}&district=${data?.district}&upazilla=${data?.upazilla}&role=donor`
      )
      .then((res) => {
        setSearchedDonors(res.data);
        setLoading(false);
        setSelectedDistrict("");
        reset();
      });
  };
  return (
    <div>
      <SectionTitle
        sub={"Connecting Lifesavers, One Donation at a Time"}
        heading={"Search Blood Donors"}
        description={
          "Easily find and connect with willing blood donors in your area. Our user-friendly search tool facilitates swift communication, fostering a community dedicated to saving lives through blood donation."
        }
      ></SectionTitle>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-6 gap-6 xl:mx-0 mx-6">
        <div className="col-span-2 bg-slate-50 px-8 pb-8 mb-7 mx-auto">
          <h1 className="text-center text-[#D60C0C] text-2xl my-5 mb-8">
            Search Donor Form
          </h1>
          <form
            onSubmit={handleSubmit(handleSearchDonor)}
            noValidate
            className="pb-5"
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
                      <option value="">Select Blood Group</option>
                      <option value="A positive">A+</option>
                      <option value="A negative">A-</option>
                      <option value="B positive">B+</option>
                      <option value="B negative">B-</option>
                      <option value="O positive">O+</option>
                      <option value="O negative">O-</option>
                      <option value="AB positive">AB+</option>
                      <option value="AB negative">AB-</option>
                    </select>
                  )}
                />
              </div>
            </div>

            <div className="py-5">
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
                      <option value="">Select Donor District</option>
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

            <div className="py-5">
              <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input
                  type="email"
                  {...register("donorEmail", {
                    required: {
                      value: true,
                      message: "Donor Email is required",
                    },
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Invalid Email Format",
                    },
                  })}
                  className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition placeholder-slate-500"
                  placeholder="Enter Donor Email"
                />
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors?.donorEmail?.message}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-6 py-3 transition hover:bg-white hover:text-[#D60C0C] hover:outline font-semibold text-white"
            >
              {loading ? (
                <ImSpinner6 className="animate-spin m-auto text-xl" />
              ) : (
                "Search"
              )}
            </button>
          </form>
        </div>
        <div className="col-span-4">
          {searchDonors ? (
            <div className="mt-5">
              <h1 className="text-[#D60C0C] text-2xl">
                Found Donors: {searchDonors?.length}
              </h1>
              <div className="overflow-x-auto mt-5">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Blood Group</th>
                      <th>Upazilla</th>
                      <th>District</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchDonors?.map((singleDonor, index) => (
                      <tr key={singleDonor?._id}>
                        <th>{index + 1}</th>
                        <td>{singleDonor?.name}</td>
                        <td>{singleDonor?.email}</td>
                        <td>{singleDonor?.bloodGroup}</td>
                        <td>{singleDonor?.upazilla}</td>
                        <td>{singleDonor?.district}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col">
              <div className="pt-32">
                <img src={searchImg} className="w-52" />
              </div>
              <p className="max-w-lg text-center text-lg">
                Get the desired donors who can make a life-changing impact by
                contributing their invaluable blood donations to those in urgent
                need.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDonors;
