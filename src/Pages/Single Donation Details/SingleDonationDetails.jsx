import { useLoaderData } from "react-router-dom";
import detailsDonation from "../../assets/Icons/detailsDonation.png";
import { useState } from "react";
import { ImSpinner6 } from "react-icons/im";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useUserDetails from "../../Custom Hooks/useUserDetails";
import useAxiosSecureInterceptors from "../../Custom Hooks/useAxiosSecureInterceptors";

const SingleDonationDetails = () => {
  const singleDonationData = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const { handleSubmit, register } = useForm();
  const { loadedUser } = useUserDetails();
  const axiosSecure = useAxiosSecureInterceptors();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDonateBlood = (data) => {
    // console.log(data);
    setLoading(true);

    const { status, _id, ...restInfo } = singleDonationData;

    const newDonationInfo = { ...restInfo, status: "In Progress" };

    axiosSecure
      .patch(
        `/donation/singleDonation/${singleDonationData?._id}`,
        newDonationInfo
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setLoading(false);
          setSuccessMsg("Your donation is in progress");
          document
            .getElementById("donate_btn")
            .setAttribute("disabled", "disabled");
        }
      });
  };

  return (
    <div>
      <h1 className="text-center mt-5 text-[#D60C0C] text-3xl md:text-5xl">
        Details of Donation
      </h1>
      <div className="flex items-center justify-center mt-7">
        <img src={detailsDonation} className="w-52" />
      </div>
      <div className="max-w-xl mx-auto mt-8 pb-16">
        <div className="flex flex-col gap-3 mx-8 xl:mx-0">
          <h1 className="text-xl">
            Requester Name: {singleDonationData?.donorName}
          </h1>
          <h1 className="text-xl">
            Requester Email: {singleDonationData?.donorEmail}
          </h1>
          <h1 className="text-xl">
            Recipient Name: {singleDonationData?.recipientName}
          </h1>
          <h1 className="text-xl">
            Recipient Location: {singleDonationData?.recipientUpazilla},{" "}
            {singleDonationData?.recipientDistrict}.
          </h1>
          <h1 className="text-xl">
            Hospital Name: {singleDonationData?.hospitalName}
          </h1>
          <h1 className="text-xl">
            Hospital Address: {singleDonationData?.hospitalAddress}
          </h1>
          <h1 className="text-xl">
            Donation Date & Time: {singleDonationData?.donationDate},{" "}
            {singleDonationData?.donationTime}
          </h1>
          <h1 className="text-xl">
            Requester Message: {singleDonationData?.requesterMessage}
          </h1>
          <div className="mt-6">
            <button
              onClick={() => document.getElementById("my_modal_1").showModal()}
              id="donate_btn"
              className="btn w-full rounded-full bg-[#D60C0C] h-11 flex items-center justify-center px-6 py-3 transition hover:bg-white hover:text-[#D60C0C] hover:outline font-semibold text-white"
            >
              Donate Blood
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box max-w-xl h-[380px]">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="bg-[#D60C0C] text-white btn-circle  absolute right-3 top-3">
                    ✕
                  </button>
                </form>
                <div className="flex flex-col justify-center items-center text-gray-900 dark:text-white">
                  <h3 className="font-bold text-3xl mt-5">
                    🩸 Donor Information 🩸
                  </h3>
                  <form
                    onSubmit={handleSubmit(handleDonateBlood)}
                    className="space-y-4 md:space-y-6 mt-7"
                    noValidate
                    method="dialog"
                  >
                    <div className="flex gap-8 items-center">
                      <label
                        htmlFor="DonorName"
                        className="block mb-2 text-lg font-semibold  text-gray-900"
                      >
                        Donor Name:
                      </label>
                      <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                        <input
                          type="text"
                          readOnly
                          defaultValue={loadedUser?.name}
                          {...register("donorName")}
                          className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition placeholder-slate-500"
                          placeholder="Enter Your Name"
                        />
                      </div>
                    </div>
                    <div className="flex gap-8 items-center">
                      <label
                        htmlFor="DonorEmail"
                        className="block mb-2 text-lg font-semibold  text-gray-900"
                      >
                        Donor Email:
                      </label>
                      <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-red-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                        <input
                          type="email"
                          readOnly
                          defaultValue={loadedUser?.email}
                          {...register("donorEmail")}
                          className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition placeholder-slate-500"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center pt-4">
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
                    </div>
                    <div className="mt-3">
                      {successMsg && (
                        <p className="text-green-600 text-lg text-center">
                          ✅{successMsg}
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDonationDetails;
