import { useQuery } from "@tanstack/react-query";
import useUserDetails from "../../../Custom Hooks/useUserDetails";
import { MdBloodtype } from "react-icons/md";
import useAxiosSecureInterceptors from "../../../Custom Hooks/useAxiosSecureInterceptors";
import Loading from "../../../Components/Loading/Loading";

const AdminHome = () => {
  const { loadedUser } = useUserDetails();
  const axiosSecure = useAxiosSecureInterceptors();

  const { data: allUsersCount } = useQuery({
    queryKey: ["allUsersCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allUsersCount");
      return res.data.count;
    },
  });

  const { data: allDonationCount } = useQuery({
    queryKey: ["allDonationCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allDonationCount");
      return res.data.count;
    },
  });

  const { data: allFundingCount, isLoading } = useQuery({
    queryKey: ["allFundingCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/funding");
      return res.data[0]?.total;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h1 className="text-[#D60C0C] text-xl md:text-2xl lg:text-3xl font-semibold text-center">{`Hi ${loadedUser?.name},`}</h1>
      <h1 className="text-[#D60C0C] text-2xl md:text-3xl font-bold text-center mt-2">
        Welcome to BloodHub
      </h1>
      <p className="xl:max-w-2xl mx-auto text-center mt-2">
        Congratulations on joining the life-saving mission. This central hub
        empowers you to efficiently manage donor records, oversee campaigns, and
        glean crucial insights. Stay updated on new features, make a significant
        impact by promoting campaigns and keeping donor information up-to-date.
        Thank you for being a vital part of{" "}
        <span className="text-[#D60C0C]">BloodHub</span>!
      </p>

      <div className="w-full flex justify-center mt-10">
        <div>
          <div className="m-6">
            <div className="flex flex-wrap -mx-6">
              <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 h-[130px]">
                  <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                    <svg
                      className="h-8 w-8 text-white"
                      viewBox="0 0 28 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      {allUsersCount}
                    </h4>
                    <div className="text-gray-500">Total Users</div>
                  </div>
                </div>
              </div>

              <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 h-[130px]">
                  <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="h-8 w-8 text-white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg>
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      ${allFundingCount}
                    </h4>
                    <div className="text-gray-500">Total Funding</div>
                  </div>
                </div>
              </div>

              <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 h-[130px]">
                  <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                    <MdBloodtype className="h-8 w-8 text-white" />
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      {allDonationCount}
                    </h4>
                    <div className="text-gray-500">Total Donation Request</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
